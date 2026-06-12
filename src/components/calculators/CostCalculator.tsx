'use client';

import { useState, useCallback } from 'react';
import { calcCost, formatCurrency, formatNumber, type CostResult } from '@/lib/calculations';
import { WASTE_OPTIONS, PRICE_PRESETS } from '@/lib/constants';
import Link from 'next/link';

export default function CostCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('4');
  const [price, setPrice] = useState('150');
  const [delivery, setDelivery] = useState('0');
  const [labor, setLabor] = useState('0');
  const [laborOn, setLaborOn] = useState(false);
  const [waste, setWaste] = useState(0.10);
  const [pricePreset, setPricePreset] = useState<number | null>(150);
  const [result, setResult] = useState<CostResult | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depth);
    const p = parseFloat(price) || 0;
    const del = parseFloat(delivery) || 0;
    const lab = laborOn ? (parseFloat(labor) || 0) : 0;
    if (!l || !w || !d || l <= 0 || w <= 0 || d <= 0) return;
    setResult(calcCost(l, w, d, waste, p, del, lab));
  }, [length, width, depth, waste, price, delivery, labor, laborOn]);

  const reset = () => {
    setLength(''); setWidth(''); setDepth('4'); setPrice('150');
    setDelivery('0'); setLabor('0'); setLaborOn(false);
    setWaste(0.10); setPricePreset(150); setResult(null); setCopied(false);
  };

  const copyResults = () => {
    if (!result) return;
    const text = `Concrete Cost Estimate\nVolume: ${formatNumber(result.cubicYardsWithWaste)} yd³\nMaterial: ${formatCurrency(result.materialCost)}\nDelivery: ${formatCurrency(result.deliveryCost)}\nLabor: ${formatCurrency(result.laborCost)}\nTotal: ${formatCurrency(result.totalCost)}\nPer sq ft: ${formatCurrency(result.costPerSqFt)}\nmaterialcalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="calc-card">
      {/* Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="co-length" className="input-label">Length</label>
          <div className="relative">
            <input id="co-length" type="number" min="0.1" step="any" value={length} onChange={(e) => setLength(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && calculate()} placeholder="Enter length" className="input-field pr-12" />
            <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">ft</span>
          </div>
        </div>
        <div>
          <label htmlFor="co-width" className="input-label">Width</label>
          <div className="relative">
            <input id="co-width" type="number" min="0.1" step="any" value={width} onChange={(e) => setWidth(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && calculate()} placeholder="Enter width" className="input-field pr-12" />
            <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">ft</span>
          </div>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="co-depth" className="input-label">Depth / Thickness</label>
          <div className="relative">
            <input id="co-depth" type="number" min="0.5" step="any" value={depth} onChange={(e) => setDepth(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && calculate()} className="input-field pr-12" />
            <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">in</span>
          </div>
        </div>
      </div>

      {/* Price Presets */}
      <div className="mb-4">
        <label className="input-label">Concrete price per cubic yard</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {PRICE_PRESETS.map((p) => (
            <button
              key={p.value}
              onClick={() => { setPrice(String(p.value)); setPricePreset(p.value); }}
              className={`preset-btn ${pricePreset === p.value ? 'preset-active' : ''}`}
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={() => { setPricePreset(null); setPrice(''); }}
            className={`preset-btn ${pricePreset === null ? 'preset-active' : ''}`}
          >
            Custom
          </button>
        </div>
        {pricePreset === null && (
          <div className="relative">
            <span className="absolute left-4 top-0 h-12 flex items-center text-sm text-gray-400">$</span>
            <input type="number" min="0" step="any" value={price} onChange={(e) => setPrice(e.target.value)} className="input-field pl-8 pr-16" placeholder="Enter price" />
            <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">/ yd³</span>
          </div>
        )}
      </div>

      {/* Delivery & Labor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="co-delivery" className="input-label">Delivery fee</label>
          <div className="relative">
            <span className="absolute left-4 top-0 h-12 flex items-center text-sm text-gray-400">$</span>
            <input id="co-delivery" type="number" min="0" step="any" value={delivery} onChange={(e) => setDelivery(e.target.value)} className="input-field pl-8" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="co-labor" className="text-sm font-medium text-navy">Labor cost per sq ft</label>
            <button
              onClick={() => setLaborOn(!laborOn)}
              className={`w-10 h-5 rounded-full transition-colors relative ${laborOn ? 'bg-orange' : 'bg-gray-100'}`}
              role="switch"
              aria-checked={laborOn}
            >
              <span className={`block w-4 h-4 bg-white rounded-full shadow transition-transform absolute top-0.5 ${laborOn ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-0 h-12 flex items-center text-sm text-gray-400">$</span>
            <input
              id="co-labor" type="number" min="0" step="any" value={labor}
              onChange={(e) => setLabor(e.target.value)} disabled={!laborOn}
              className={`input-field pl-8 pr-16 ${!laborOn ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">/ ft²</span>
          </div>
        </div>
      </div>

      {/* Waste */}
      <div className="flex items-center gap-2 flex-wrap mb-5">
        <span className="text-sm font-medium text-navy">Waste factor:</span>
        {WASTE_OPTIONS.map((opt) => (
          <button key={opt.value} onClick={() => setWaste(opt.value)} className={`pill ${waste === opt.value ? 'pill-active' : ''}`}>{opt.label}</button>
        ))}
      </div>

      <button onClick={calculate} className="btn-primary">Calculate Cost</button>

      {/* Results */}
      {result && (
        <div className="result-area" aria-live="polite">
          <div className="text-xs font-semibold text-navy uppercase tracking-wider mb-4">Cost Breakdown</div>
          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-sm"><span className="text-gray-600">Concrete volume</span><span className="font-medium text-navy tabular-nums">{formatNumber(result.cubicYardsWithWaste)} yd³</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-600">Material cost</span><span className="tabular-nums">{formatCurrency(result.materialCost)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-600">Delivery fee</span><span className="tabular-nums">{formatCurrency(result.deliveryCost)}</span></div>
            {laborOn && <div className="flex justify-between text-sm"><span className="text-gray-600">Labor cost</span><span className="tabular-nums">{formatCurrency(result.laborCost)}</span></div>}
            <div className="border-t-2 border-navy pt-2 flex justify-between font-bold text-navy">
              <span>Total estimated cost</span>
              <span className="text-lg tabular-nums">{formatCurrency(result.totalCost)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400"><span>Cost per square foot</span><span className="tabular-nums">{formatCurrency(result.costPerSqFt)}</span></div>
          </div>

          {/* Cross-links */}
          <div className="space-y-2 mb-4 mt-4">
            <Link href="/concrete-slab-calculator/" className="block p-3 border border-dashed border-gray-300 rounded-lg hover:bg-[#FFFBF5] hover:border-orange transition-colors">
              <span className="text-[13px] font-medium text-gray-600">🧱 Calculate slab dimensions first</span>
              <span className="text-xs font-semibold text-orange ml-2">Slab calculator →</span>
            </Link>
            <Link href="/concrete-bags-calculator/" className="block p-3 border border-dashed border-gray-300 rounded-lg hover:bg-[#FFFBF5] hover:border-orange transition-colors">
              <span className="text-[13px] font-medium text-gray-600">📦 Compare bag cost vs. delivery</span>
              <span className="text-xs font-semibold text-orange ml-2">Bags calculator →</span>
            </Link>
          </div>

          <div className="flex gap-2 justify-end">
            <button onClick={copyResults} className="btn-secondary">{copied ? '✓ Copied' : 'Copy'}</button>
            <button onClick={reset} className="btn-secondary">Reset</button>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="alert-warning mt-4">
        <p className="text-xs text-gray-600"><strong className="text-warning">Pricing disclaimer:</strong> Concrete prices vary by region and season. Enter your local quoted price for the most accurate estimate. Prices reviewed quarterly.</p>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 justify-center">
        {['Price presets', 'DIY vs. contractor', 'Waste factor', 'Free & instant'].map((t) => (
          <span key={t} className="text-xs text-gray-400 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
