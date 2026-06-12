// ── Volume Calculations ──

export function calcRectVolumeCuFt(
  lengthFt: number,
  widthFt: number,
  depthInches: number
): number {
  return lengthFt * widthFt * (depthInches / 12);
}

export function calcCylindricalVolumeCuFt(
  diameterInches: number,
  depthInches: number
): number {
  const radiusFt = diameterInches / 2 / 12;
  return Math.PI * radiusFt * radiusFt * (depthInches / 12);
}

export function cuFtToCuYd(cuFt: number): number {
  return cuFt / 27;
}

export function cuFtToCuM(cuFt: number): number {
  return cuFt * 0.0283168;
}

export function applyWaste(value: number, wasteFactor: number): number {
  return value * (1 + wasteFactor);
}

// ── Concrete Calculator (General) ──

export interface ConcreteResult {
  cubicFeet: number;
  cubicYards: number;
  cubicMeters: number;
  withWaste: {
    cubicFeet: number;
    cubicYards: number;
    cubicMeters: number;
  };
  area: number;
}

export function calcConcrete(
  lengthFt: number,
  widthFt: number,
  depthInches: number,
  wasteFactor: number
): ConcreteResult {
  const cuFt = calcRectVolumeCuFt(lengthFt, widthFt, depthInches);
  const cuYd = cuFtToCuYd(cuFt);
  const cuM = cuFtToCuM(cuFt);
  return {
    cubicFeet: round2(cuFt),
    cubicYards: round2(cuYd),
    cubicMeters: round2(cuM),
    withWaste: {
      cubicFeet: round2(applyWaste(cuFt, wasteFactor)),
      cubicYards: round2(applyWaste(cuYd, wasteFactor)),
      cubicMeters: round2(applyWaste(cuM, wasteFactor)),
    },
    area: round2(lengthFt * widthFt),
  };
}

// ── Slab Calculator ──

export interface SlabResult extends ConcreteResult {
  totalSlabs: number;
  totalCubicYards: number;
  totalWithWaste: number;
  bags80: number;
  bags60: number;
}

export function calcSlab(
  lengthFt: number,
  widthFt: number,
  thicknessInches: number,
  numSlabs: number,
  wasteFactor: number
): SlabResult {
  const single = calcConcrete(lengthFt, widthFt, thicknessInches, wasteFactor);
  const totalCuYd = single.cubicYards * numSlabs;
  const totalWithWaste = single.withWaste.cubicYards * numSlabs;
  const totalCuFtWaste = single.withWaste.cubicFeet * numSlabs;
  return {
    ...single,
    totalSlabs: numSlabs,
    totalCubicYards: round2(totalCuYd),
    totalWithWaste: round2(totalWithWaste),
    bags80: Math.ceil(totalCuFtWaste / 0.60),
    bags60: Math.ceil(totalCuFtWaste / 0.45),
  };
}

// ── Cost Calculator ──

export interface CostResult {
  cubicYards: number;
  cubicYardsWithWaste: number;
  area: number;
  materialCost: number;
  deliveryCost: number;
  laborCost: number;
  totalCost: number;
  costPerSqFt: number;
}

export function calcCost(
  lengthFt: number,
  widthFt: number,
  depthInches: number,
  wasteFactor: number,
  pricePerYard: number,
  deliveryFee: number,
  laborPerSqFt: number
): CostResult {
  const base = calcConcrete(lengthFt, widthFt, depthInches, wasteFactor);
  const ydsWithWaste = base.withWaste.cubicYards;
  const area = base.area;
  const materialCost = ydsWithWaste * pricePerYard;
  const laborCost = area * laborPerSqFt;
  const totalCost = materialCost + deliveryFee + laborCost;
  return {
    cubicYards: base.cubicYards,
    cubicYardsWithWaste: ydsWithWaste,
    area,
    materialCost: round2(materialCost),
    deliveryCost: round2(deliveryFee),
    laborCost: round2(laborCost),
    totalCost: round2(totalCost),
    costPerSqFt: area > 0 ? round2(totalCost / area) : 0,
  };
}

// ── Footing Calculator ──

export interface FootingResult {
  volumePerFooting: { cuFt: number; cuYd: number; cuM: number };
  totalVolume: { cuFt: number; cuYd: number; cuM: number };
  withWaste: { cuFt: number; cuYd: number; cuM: number };
  bags40: number;
  bags60: number;
  bags80: number;
}

export function calcFootingRect(
  lengthFt: number,
  widthInches: number,
  depthInches: number,
  count: number,
  wasteFactor: number
): FootingResult {
  const cuFt = lengthFt * (widthInches / 12) * (depthInches / 12);
  return buildFootingResult(cuFt, count, wasteFactor);
}

export function calcFootingCylindrical(
  diameterInches: number,
  depthInches: number,
  count: number,
  wasteFactor: number
): FootingResult {
  const cuFt = calcCylindricalVolumeCuFt(diameterInches, depthInches);
  return buildFootingResult(cuFt, count, wasteFactor);
}

function buildFootingResult(
  cuFtPer: number,
  count: number,
  wasteFactor: number
): FootingResult {
  const totalCuFt = cuFtPer * count;
  const wasteCuFt = applyWaste(totalCuFt, wasteFactor);
  return {
    volumePerFooting: {
      cuFt: round2(cuFtPer),
      cuYd: round2(cuFtToCuYd(cuFtPer)),
      cuM: round2(cuFtToCuM(cuFtPer)),
    },
    totalVolume: {
      cuFt: round2(totalCuFt),
      cuYd: round2(cuFtToCuYd(totalCuFt)),
      cuM: round2(cuFtToCuM(totalCuFt)),
    },
    withWaste: {
      cuFt: round2(wasteCuFt),
      cuYd: round2(cuFtToCuYd(wasteCuFt)),
      cuM: round2(cuFtToCuM(wasteCuFt)),
    },
    bags40: Math.ceil(wasteCuFt / 0.30),
    bags60: Math.ceil(wasteCuFt / 0.45),
    bags80: Math.ceil(wasteCuFt / 0.60),
  };
}

// ── Bags Calculator ──

export interface BagRow {
  size: number;
  label: string;
  bagsNeeded: number;
  yieldCuFt: number;
  estimatedCost: number | null;
}

export interface BagsResult {
  cubicFeet: number;
  cubicYards: number;
  cubicMeters: number;
  bags: BagRow[];
  bestValueIndex: number;
}

export function calcBags(
  cubicFeet: number,
  wasteFactor: number,
  bagPrices: Record<number, number | null>
): BagsResult {
  const wasteCuFt = applyWaste(cubicFeet, wasteFactor);
  const yields = [
    { size: 40, label: '40 lb', cuFt: 0.30 },
    { size: 50, label: '50 lb', cuFt: 0.375 },
    { size: 60, label: '60 lb', cuFt: 0.45 },
    { size: 80, label: '80 lb', cuFt: 0.60 },
  ];

  const bags: BagRow[] = yields.map((y) => {
    const needed = Math.ceil(wasteCuFt / y.cuFt);
    const price = bagPrices[y.size];
    return {
      size: y.size,
      label: y.label,
      bagsNeeded: needed,
      yieldCuFt: y.cuFt,
      estimatedCost: price != null ? round2(needed * price) : null,
    };
  });

  let bestIdx = bags.length - 1;
  let lowestCost = Infinity;
  bags.forEach((b, i) => {
    if (b.estimatedCost != null && b.estimatedCost < lowestCost) {
      lowestCost = b.estimatedCost;
      bestIdx = i;
    }
  });

  return {
    cubicFeet: round2(wasteCuFt),
    cubicYards: round2(cuFtToCuYd(wasteCuFt)),
    cubicMeters: round2(cuFtToCuM(wasteCuFt)),
    bags,
    bestValueIndex: bestIdx,
  };
}

export function calcBagsFromDimensions(
  lengthFt: number,
  widthFt: number,
  depthInches: number,
  wasteFactor: number,
  bagPrices: Record<number, number | null>
): BagsResult {
  const cuFt = calcRectVolumeCuFt(lengthFt, widthFt, depthInches);
  return calcBags(cuFt, wasteFactor, bagPrices);
}

// ── Utilities ──

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function formatNumber(n: number, decimals = 2): string {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCurrency(n: number): string {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
