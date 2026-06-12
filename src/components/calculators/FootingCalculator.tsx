'use client';

import { useState, useCallback } from 'react';
import { calcFootingRect, calcFootingCylindrical, formatNumber, type FootingResult } from '@/lib/calculations';
import { WASTE_OPTIONS, FOOTING_PRESETS } from '@/lib/constants';
import Link from 'next/link';

export default function FootingCalculator() {
  const [shape, setShape] = useState<'rectangular' | 'cylindrical'>('rectangular');
  const [length, setLength] = useState('');
  const [widthIn, setWidthIn] = useState('24');
  const [diameter, setDiameter] = useState('12');
  const [depthIn, setDepthIn] = useState('12');
  const [count, setCount] = useState('1');
  const [waste, setWaste] = useState(0.10);
  const [preset, setPreset] = useState<string | null>(null);
  const [result, setResult] = useState<FootingResult | null>(null);
  const [copied, setCopied] = useState(false);

  const applyPreset = (p: typeof FOOTING_PRESETS[number]) => {
    setPreset(p.label);
    setShape(p.shape);
    if (p.shape === 'cylindrical') {
      setDiameter(String((p as { diameter: number }).diameter));
      setDepthIn(String((p as { depth: number }).depth));
    } else {
      setLength(String((p as { length: number }).length));
      setWidthIn(String((p as { width: number }).width));
      setDepthIn(String((p as { depth: number }).depth));
    }
  };

  const calculate = useCallback(() => {
    const c = parseInt(count) || 1;
    if (shape === 'rectangular') {
      const l = parseFloat(length);
      const w = parseFloat(widthIn);
      const d = parseFloat(depthIn);
      if (!l || !w || !d || l <= 0 || w <= 0 || d <= 0) return;
      setResult(calcFootingRect(l, w, d, c, waste));
    } else {
      const dia = parseFloat(diameter);
      const d = parseFloat(depthIn);
      if (!dia || !d || dia <= 0 || d <= 0) return;
      setResult(calcFootingCylindrical(dia, d, c, waste));
    }
  }, [shape, length, widthIn, diameter, depthIn, count, waste]);

  const reset = () => {
    setShape('rectangular'); setLength(''); setWidthIn('24'); setDiameter('12');
    setDepthIn('12'); setCount('1'); setWaste(0.10); setPreset(null); setResult(null); setCopied(false);
  };

  const copyResults = () => {
    if (!result) return;
    const text = `Concrete Footing Results\nPer footing: ${formatNumber(result.volumePerFooting.cuYd)} yd³\nTotal (${count}): ${formatNumber(result.totalVolume.cuYd)} yd³\nWith waste: ${formatNumber(result.withWaste.cuYd)} yd³\n80 lb bags: ~${result.bags80}\nmaterialcalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="calc-card">
      {/* Shape Toggle */}
      <div className="flex bg-gray-50 rounded-lg p-0.5 border border-gray-100 mb-4 w-fit">
        {(['rectangular', 'cylindrical'] as const).map((s) => (
          <button key={s} onClick={() => { setShape(s); setPreset(null); }} className={`px-4 py-2 rounded-md text-[13px] font-medium transition-all capitalize ${shape === s ? 'bg-navy text-white font-semibold' : 'text-gray-400'}`}>
            {s === 'cylindrical' ? 'Cylindrical / Round' : 'Rectangular'}
          </button>
        ))}
      </div>

      {/* Presets */}
      <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Footing type</div>
      <div className="flex flex-wrap gap-2 mb-5">
        {FOOTING_PRESETS.map((p) => (
          <button key={p.label} onClick={() => applyPreset(p)} className={`preset-btn ${preset === p.label ? 'preset-active' : ''}`}>{p.label}</button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {shape === 'rectangular' ? (
          <>
            <div>
              <label htmlFor="f-length" className="input-label">Length</label>
              <div className="relative">
                <input id="f-length" type="number" min="0.1" step="any" value={length} onChange={(e) => { setLength(e.target.value); setPreset(null); }} onKeyDown={(e) => e.key === 'Enter' && calculate()} placeholder="Enter length" className="input-field pr-12" />
                <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">ft</span>
              </div>
            </div>
            <div>
              <label htmlFor="f-width" className="input-label">Width</label>
              <div className="relative">
                <input id="f-width" type="number" min="1" step="any" value={widthIn} onChange={(e) => { setWidthIn(e.target.value); setPreset(null); }} onKeyDown={(e) => e.key === 'Enter' && calculate()} placeholder="Enter width" className="input-field pr-12" />
                <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">in</span>
              </div>
            </div>
          </>
        ) : (
          <div className="md:col-span-2">
            <label htmlFor="f-diameter" className="input-label">Diameter</label>
            <div className="relative">
              <input id="f-diameter" type="number" min="1" step="any" value={diameter} onChange={(e) => { setDiameter(e.target.value); setPreset(null); }} onKeyDown={(e) => e.key === 'Enter' && calculate()} placeholder="Enter diameter" className="input-field pr-12" />
              <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">in</span>
            </div>
          </div>
        )}
        <div>
          <label htmlFor="f-depth" className="input-label">Depth</label>
          <div className="relative">
            <input id="f-depth" type="number" min="1" step="any" value={depthIn} onChange={(e) => { setDepthIn(e.target.value); setPreset(null); }} onKeyDown={(e) => e.key === 'Enter' && calculate()} placeholder="Enter depth" className="input-field pr-12" />
            <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">in</span>
          </div>
        </div>
        <div>
          <label htmlFor="f-count" className="input-label">Number of footings</label>
          <div className="relative">
            <input id="f-count" type="number" min="1" step="1" value={count} onChange={(e) => setCount(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && calculate()} className="input-field pr-12" />
            <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">#</span>
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

      <button onClick={calculate} className="btn-primary">Calculate Concrete</button>

      {/* Results */}
      {result && (
        <div className="result-area" aria-live="polite">
          <div className="text-xs font-semibold text-navy uppercase tracking-wider mb-4">Results</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            <div>
              <div className="text-xs text-gray-400 mb-1">Per footing</div>
              <div className="font-semibold text-gray-600 tabular-nums">{formatNumber(result.volumePerFooting.cuYd)} yd³</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Total ({count} footings)</div>
              <div className="font-semibold text-gray-600 tabular-nums">{formatNumber(result.totalVolume.cuYd)} yd³</div>
            </div>
            <div className="border-l-[3px] border-orange pl-3">
              <div className="text-xs text-gray-400 mb-1">With {waste * 100}% waste</div>
              <div className="text-xl font-bold text-navy tabular-nums">{formatNumber(result.withWaste.cuYd)} yd³</div>
            </div>
          </div>
          <div className="text-xs text-gray-400 pt-3 border-t border-dashed border-gray-300">
            Bags needed: ~{result.bags80} (80 lb) · ~{result.bags60} (60 lb) · ~{result.bags40} (40 lb)
          </div>

          <div className="space-y-2 mt-4 mb-4">
            <Link href="/concrete-bags-calculator/" className="block p-3 border border-dashed border-gray-300 rounded-lg hover:bg-[#FFFBF5] hover:border-orange transition-colors">
              <span className="text-[13px] font-medium text-gray-600">📦 Calculate bags needed for your footing</span>
              <span className="text-xs font-semibold text-orange ml-2">Bags calculator →</span>
            </Link>
            <Link href="/concrete-cost-calculator/" className="block p-3 border border-dashed border-gray-300 rounded-lg hover:bg-[#FFFBF5] hover:border-orange transition-colors">
              <span className="text-[13px] font-medium text-gray-600">💰 Estimate footing project cost</span>
              <span className="text-xs font-semibold text-orange ml-2">Cost calculator →</span>
            </Link>
          </div>

          <div className="flex gap-2 justify-end">
            <button onClick={copyResults} className="btn-secondary">{copied ? '✓ Copied' : 'Copy'}</button>
            <button onClick={reset} className="btn-secondary">Reset</button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 justify-center">
        {['Rectangular & round', 'Multiple footings', 'Bag estimate', 'Free & instant'].map((t) => (
          <span key={t} className="text-xs text-gray-400 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
