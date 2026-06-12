export const SITE = {
  name: 'MaterialCalc',
  domain: 'materialcalc.com',
  url: 'https://materialcalc.com',
  email: 'materialcalcsite@gmail.com',
  description: 'Free construction calculators for homeowners, DIYers, and contractors.',
  social: {
    facebook: 'https://www.facebook.com/materialcalc',
    instagram: 'https://www.instagram.com/materialcalc',
    linkedin: 'https://www.linkedin.com/company/materialcalc',
  },
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export const CALCULATOR_TOOLS = [
  {
    name: 'Concrete Calculator',
    slug: '/',
    description: 'Calculate concrete volume for any project in cubic yards, cubic feet, and cubic meters.',
    shortDesc: 'General volume calculator',
    icon: 'cube',
    color: 'orange' as const,
  },
  {
    name: 'Concrete Slab Calculator',
    slug: '/concrete-slab-calculator/',
    description: 'Calculate exactly how much concrete you need for a patio, driveway, garage floor, or sidewalk slab.',
    shortDesc: 'Patios, driveways, garage floors',
    icon: 'slab',
    color: 'blue' as const,
  },
  {
    name: 'Concrete Cost Calculator',
    slug: '/concrete-cost-calculator/',
    description: 'Estimate your total concrete project cost including materials, delivery, and labor.',
    shortDesc: 'Materials, delivery, labor costs',
    icon: 'dollar',
    color: 'green' as const,
  },
  {
    name: 'Concrete Footing Calculator',
    slug: '/concrete-footing-calculator/',
    description: 'Calculate concrete volume for rectangular or cylindrical footings. Supports multiple footings.',
    shortDesc: 'Deck posts, piers, columns',
    icon: 'footing',
    color: 'pink' as const,
  },
  {
    name: 'Concrete Bags Calculator',
    slug: '/concrete-bags-calculator/',
    description: 'Find out how many 40, 50, 60, or 80 lb bags you need. Compare sizes and plan your purchase.',
    shortDesc: '40, 60, 80 lb bag counts',
    icon: 'bag',
    color: 'purple' as const,
  },
] as const;

export const WASTE_OPTIONS = [
  { label: '0%', value: 0 },
  { label: '5%', value: 0.05 },
  { label: '10%', value: 0.10 },
  { label: '15%', value: 0.15 },
] as const;

export const SLAB_PRESETS = [
  { label: 'Patio', length: 10, width: 10, thickness: 4 },
  { label: 'Driveway', length: 20, width: 20, thickness: 5 },
  { label: 'Garage Floor', length: 24, width: 24, thickness: 6 },
  { label: 'Sidewalk', length: 20, width: 4, thickness: 4 },
  { label: 'Shed Foundation', length: 12, width: 10, thickness: 4 },
] as const;

export const FOOTING_PRESETS = [
  { label: 'Deck Post', shape: 'cylindrical' as const, diameter: 12, depth: 36 },
  { label: 'Fence Post', shape: 'cylindrical' as const, diameter: 8, depth: 24 },
  { label: 'Pier / Sonotube', shape: 'cylindrical' as const, diameter: 12, depth: 48 },
  { label: 'Wall Footing', shape: 'rectangular' as const, length: 20, width: 24, depth: 12 },
  { label: 'Column Footing', shape: 'rectangular' as const, length: 2, width: 24, depth: 12 },
] as const;

export const BAG_PRESETS = [
  { label: 'Fence Post', length: 0.67, width: 0.67, depth: 24 },
  { label: 'Small Patio', length: 8, width: 8, depth: 4 },
  { label: 'Sidewalk', length: 10, width: 3, depth: 4 },
  { label: 'Deck Footing', length: 1, width: 1, depth: 36 },
  { label: 'Mailbox Post', length: 0.67, width: 0.67, depth: 18 },
] as const;

export const PRICE_PRESETS = [
  { label: 'Low ($125)', value: 125 },
  { label: 'Average ($150)', value: 150 },
  { label: 'High ($175)', value: 175 },
] as const;

export const BAG_YIELDS = [
  { size: 40, label: '40 lb', cubicFeet: 0.30, cubicYards: 0.011 },
  { size: 50, label: '50 lb', cubicFeet: 0.375, cubicYards: 0.014 },
  { size: 60, label: '60 lb', cubicFeet: 0.45, cubicYards: 0.017 },
  { size: 80, label: '80 lb', cubicFeet: 0.60, cubicYards: 0.022 },
] as const;

export const COMMON_PROJECTS = [
  { project: 'Patio (10×10)', size: '100 sq ft', depth: '4 inches', yards: '~1.2' },
  { project: 'Driveway (20×20)', size: '400 sq ft', depth: '5 inches', yards: '~6.2' },
  { project: 'Sidewalk (4×20)', size: '80 sq ft', depth: '4 inches', yards: '~1.0' },
  { project: 'Garage (24×24)', size: '576 sq ft', depth: '6 inches', yards: '~10.7' },
  { project: 'Footing (12" round)', size: '36" deep', depth: '—', yards: '~0.07 each' },
] as const;
