'use client';

import { useState, useCallback } from 'react';
import { calcSlab, formatNumber, type SlabResult } from '@/lib/calculations';
import { WASTE_OPTIONS, SLAB_PRESETS } from '@/lib/constants';
import Link from 'next/link';

export default function SlabCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [thickness, setThickness] = useState('4');
  const [numSlabs, setNumSlabs] = useState('1');
  const [waste, setWaste] = useState(0.10);
  const [preset, setPreset] = useState<string | null>(null);
  const [result, setResult] = useState<SlabResult | null>(null);
  const [copied, setCopied] = useState(false);

  const applyPreset = (p: typeof SLAB_PRESETS[number]) => {
    setPreset(p.label);
    setLength(String(p.length));
    setWidth(String(p.width));
    setThickness(String(p.thickness));
  };

  const calculate = useCallback(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const t = parseFloat(thickness);
    const n = parseInt(numSlabs) || 1;
    if (!l || !w || !t || l <= 0 || w <= 0 || t <= 0) return;
    setResult(calcSlab(l, w, t, n, waste));
  }, [length, width, thickness, numSlabs, waste]);

  const reset = () => {
    setLength(''); setWidth(''); setThickness('4'); setNumSlabs('1');
    setWaste(0.10); setPreset(null); setResult(null); setCopied(false);
  };

  const copyResults = () => {
    if (!result) return;
    const text = `Concrete Slab Calculator Results\nVolume: ${formatNumber(result.cubicYards)} yd³\nWith ${waste * 100}% waste: ${formatNumber(result.totalWithWaste)} yd³\nArea: ${formatNumber(result.area)} sq ft\n80 lb bags: ~${result.bags80}\nmaterialcalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="calc-card">
      {/* Presets */}
      <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Project type</div>
      <div className="flex flex-wrap gap-2 mb-5">
        {SLAB_PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => applyPreset(p)}
            className={`preset-btn ${preset === p.label ? 'preset-active' : ''}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Unit Toggle */}
      <div className="flex justify-end mb-4">
        <div className="flex bg-gray-50 rounded-lg p-0.5 border border-gray-100">
          <button className="px-4 py-1.5 rounded-md text-[13px] font-semibold bg-navy text-white">Imperial</button>
          <button className="px-4 py-1.5 rounded-md text-[13px] font-medium text-gray-400">Metric</button>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="s-length" className="input-label">Length</label>
          <div className="relative">
            <input id="s-length" type="number" min="0.1" step="any" value={length} onChange={(e) => { setLength(e.target.value); setPreset(null); }} onKeyDown={(e) => e.key === 'Enter' && calculate()} placeholder="Enter length" className="input-field pr-12" />
            <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">ft</span>
          </div>
        </div>
        <div>
          <label htmlFor="s-width" className="input-label">Width</label>
          <div className="relative">
            <input id="s-width" type="number" min="0.1" step="any" value={width} onChange={(e) => { setWidth(e.target.value); setPreset(null); }} onKeyDown={(e) => e.key === 'Enter' && calculate()} placeholder="Enter width" className="input-field pr-12" />
            <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">ft</span>
          </div>
        </div>
        <div>
          <label htmlFor="s-thickness" className="input-label">Thickness</label>
          <div className="relative">
            <input id="s-thickness" type="number" min="0.5" step="any" value={thickness} onChange={(e) => { setThickness(e.target.value); setPreset(null); }} onKeyDown={(e) => e.key === 'Enter' && calculate()} placeholder="Enter thickness" className="input-field pr-12" />
            <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">in</span>
          </div>
          {preset && <p className="text-[11px] text-gray-400 mt-1">Recommended for {preset.toLowerCase()}</p>}
        </div>
        <div>
          <label htmlFor="s-numslabs" className="input-label">Number of slabs</label>
          <div className="relative">
            <input id="s-numslabs" type="number" min="1" step="1" value={numSlabs} onChange={(e) => setNumSlabs(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && calculate()} className="input-field pr-12" />
            <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">#</span>
          </div>
        </div>
      </div>

      {/* Waste Factor */}
      <div className="flex items-center gap-2 flex-wrap mb-5">
        <span className="text-sm font-medium text-navy">Waste factor:</span>
        {WASTE_OPTIONS.map((opt) => (
          <button key={opt.value} onClick={() => setWaste(opt.value)} className={`pill ${waste === opt.value ? 'pill-active' : ''}`}>{opt.label}</button>
        ))}
      </div>

      <button onClick={calculate} className="btn-primary">Calculate Concrete</button>

      {/* Results */}
      {result && (
        <div className="result-area" aria-live="polite">
          <div className="text-xs font-semibold text-navy uppercase tracking-wider mb-4">Results</div>
          <div className="border-l-[3px] border-orange pl-3 mb-3">
            <div className="text-2xl md:text-[28px] font-bold text-navy tabular-nums">
              {formatNumber(result.totalWithWaste)}
            </div>
            <div className="text-xs font-medium text-gray-400">
              Cubic yards{waste > 0 ? ` (with ${waste * 100}% waste)` : ''}
            </div>
          </div>
          <div className="flex gap-6 text-sm mb-3">
            <div><span className="font-semibold text-gray-600 tabular-nums">{formatNumber(result.cubicFeet)}</span> <span className="text-xs text-gray-400">ft³</span></div>
            <div><span className="font-semibold text-gray-600 tabular-nums">{formatNumber(result.cubicMeters)}</span> <span className="text-xs text-gray-400">m³</span></div>
            <div><span className="font-semibold text-gray-600 tabular-nums">{formatNumber(result.area)}</span> <span className="text-xs text-gray-400">sq ft</span></div>
          </div>
          <div className="text-xs text-gray-400 mb-4">
            ~{result.bags80} bags (80 lb) · ~{result.bags60} bags (60 lb)
          </div>

          {/* Cross-links */}
          <div className="space-y-2 mb-4">
            <Link href="/concrete-cost-calculator/" className="block p-3 border border-dashed border-gray-300 rounded-lg hover:bg-[#FFFBF5] hover:border-orange transition-colors">
              <span className="text-[13px] font-medium text-gray-600">💰 Estimate the cost of this project</span>
              <span className="text-xs font-semibold text-orange ml-2">Cost calculator →</span>
            </Link>
            <Link href="/concrete-bags-calculator/" className="block p-3 border border-dashed border-gray-300 rounded-lg hover:bg-[#FFFBF5] hover:border-orange transition-colors">
              <span className="text-[13px] font-medium text-gray-600">📦 Buying bags instead?</span>
              <span className="text-xs font-semibold text-orange ml-2">Bags calculator →</span>
            </Link>
          </div>

          <div className="flex gap-2 justify-end">
            <button onClick={copyResults} className="btn-secondary">{copied ? '✓ Copied' : 'Copy'}</button>
            <button onClick={reset} className="btn-secondary">Reset</button>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 justify-center">
        {['Quick-select presets', 'Adjustable waste factor', 'Imperial & metric', 'No signup required'].map((t) => (
          <span key={t} className="text-xs text-gray-400 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
