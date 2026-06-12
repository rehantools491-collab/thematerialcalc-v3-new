'use client';

import { useState, useCallback } from 'react';
import { calcBagsFromDimensions, calcBags, calcRectVolumeCuFt, formatNumber, formatCurrency, type BagsResult } from '@/lib/calculations';
import { WASTE_OPTIONS, BAG_PRESETS } from '@/lib/constants';
import Link from 'next/link';

export default function BagsCalculator() {
  const [mode, setMode] = useState<'dimensions' | 'volume'>('dimensions');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('4');
  const [volume, setVolume] = useState('');
  const [waste, setWaste] = useState(0.10);
  const [preset, setPreset] = useState<string | null>(null);
  const [p40, setP40] = useState('4.50');
  const [p50, setP50] = useState('5.00');
  const [p60, setP60] = useState('5.50');
  const [p80, setP80] = useState('6.50');
  const [result, setResult] = useState<BagsResult | null>(null);
  const [copied, setCopied] = useState(false);

  const applyPreset = (p: typeof BAG_PRESETS[number]) => {
    setPreset(p.label);
    setMode('dimensions');
    setLength(String(p.length));
    setWidth(String(p.width));
    setDepth(String(p.depth));
  };

  const prices = { 40: parseFloat(p40) || null, 50: parseFloat(p50) || null, 60: parseFloat(p60) || null, 80: parseFloat(p80) || null };

  const calculate = useCallback(() => {
    if (mode === 'dimensions') {
      const l = parseFloat(length); const w = parseFloat(width); const d = parseFloat(depth);
      if (!l || !w || !d || l <= 0 || w <= 0 || d <= 0) return;
      setResult(calcBagsFromDimensions(l, w, d, waste, prices));
    } else {
      const v = parseFloat(volume);
      if (!v || v <= 0) return;
      setResult(calcBags(v, waste, prices));
    }
  }, [mode, length, width, depth, volume, waste, p40, p50, p60, p80]);

  const reset = () => {
    setLength(''); setWidth(''); setDepth('4'); setVolume('');
    setWaste(0.10); setPreset(null); setResult(null); setCopied(false);
  };

  const copyResults = () => {
    if (!result) return;
    const lines = result.bags.map((b) => `${b.label}: ${b.bagsNeeded} bags${b.estimatedCost != null ? ` (~${formatCurrency(b.estimatedCost)})` : ''}`);
    const text = `Concrete Bags Calculator\nVolume: ${formatNumber(result.cubicFeet)} cu ft (${formatNumber(result.cubicYards)} yd³)\n${lines.join('\n')}\nmaterialcalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="calc-card">
      {/* Input Mode */}
      <div className="flex bg-gray-50 rounded-lg p-0.5 border border-gray-100 mb-4 w-fit">
        <button onClick={() => setMode('dimensions')} className={`px-4 py-2 rounded-md text-[13px] font-medium transition-all ${mode === 'dimensions' ? 'bg-navy text-white font-semibold' : 'text-gray-400'}`}>Enter dimensions</button>
        <button onClick={() => setMode('volume')} className={`px-4 py-2 rounded-md text-[13px] font-medium transition-all ${mode === 'volume' ? 'bg-navy text-white font-semibold' : 'text-gray-400'}`}>Enter volume</button>
      </div>

      {/* Presets */}
      {mode === 'dimensions' && (
        <>
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Quick select</div>
          <div className="flex flex-wrap gap-2 mb-5">
            {BAG_PRESETS.map((p) => (
              <button key={p.label} onClick={() => applyPreset(p)} className={`preset-btn ${preset === p.label ? 'preset-active' : ''}`}>{p.label}</button>
            ))}
          </div>
        </>
      )}

      {/* Inputs */}
      {mode === 'dimensions' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="b-length" className="input-label">Length</label>
            <div className="relative">
              <input id="b-length" type="number" min="0.1" step="any" value={length} onChange={(e) => { setLength(e.target.value); setPreset(null); }} onKeyDown={(e) => e.key === 'Enter' && calculate()} placeholder="Enter length" className="input-field pr-12" />
              <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">ft</span>
            </div>
          </div>
          <div>
            <label htmlFor="b-width" className="input-label">Width</label>
            <div className="relative">
              <input id="b-width" type="number" min="0.1" step="any" value={width} onChange={(e) => { setWidth(e.target.value); setPreset(null); }} onKeyDown={(e) => e.key === 'Enter' && calculate()} placeholder="Enter width" className="input-field pr-12" />
              <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">ft</span>
            </div>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="b-depth" className="input-label">Depth / Thickness</label>
            <div className="relative">
              <input id="b-depth" type="number" min="0.5" step="any" value={depth} onChange={(e) => { setDepth(e.target.value); setPreset(null); }} onKeyDown={(e) => e.key === 'Enter' && calculate()} className="input-field pr-12" />
              <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">in</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <label htmlFor="b-volume" className="input-label">Known volume</label>
          <div className="relative">
            <input id="b-volume" type="number" min="0.01" step="any" value={volume} onChange={(e) => setVolume(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && calculate()} placeholder="Enter volume" className="input-field pr-14" />
            <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">cu ft</span>
          </div>
        </div>
      )}

      {/* Bag Prices */}
      <details className="mb-4">
        <summary className="text-sm font-medium text-navy cursor-pointer hover:text-orange transition-colors">Bag prices (optional — for cost comparison)</summary>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
          {[{ lb: '40', val: p40, set: setP40 }, { lb: '50', val: p50, set: setP50 }, { lb: '60', val: p60, set: setP60 }, { lb: '80', val: p80, set: setP80 }].map(({ lb, val, set }) => (
            <div key={lb}>
              <label className="text-xs text-gray-400">{lb} lb bag</label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-0 h-10 flex items-center text-xs text-gray-400">$</span>
                <input type="number" min="0" step="0.01" value={val} onChange={(e) => set(e.target.value)} className="w-full h-10 border border-gray-100 rounded-md pl-6 pr-2 text-sm text-gray-600 focus:border-orange focus:ring-2 focus:ring-orange/10 focus:outline-none" />
              </div>
            </div>
          ))}
        </div>
      </details>

      {/* Waste */}
      <div className="flex items-center gap-2 flex-wrap mb-5">
        <span className="text-sm font-medium text-navy">Waste factor:</span>
        {WASTE_OPTIONS.map((opt) => (
          <button key={opt.value} onClick={() => setWaste(opt.value)} className={`pill ${waste === opt.value ? 'pill-active' : ''}`}>{opt.label}</button>
        ))}
      </div>

      <button onClick={calculate} className="btn-primary">Calculate Bags</button>

      {/* Results */}
      {result && (
        <div className="result-area" aria-live="polite">
          <div className="text-xs font-semibold text-navy uppercase tracking-wider mb-2">Bags Needed</div>
          <div className="text-xs text-gray-400 mb-4">Volume: {formatNumber(result.cubicFeet)} cu ft ({formatNumber(result.cubicYards)} yd³)</div>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-3 py-2.5 rounded-tl-lg font-semibold text-xs">Size</th>
                  <th className="text-left px-3 py-2.5 font-semibold text-xs">Bags</th>
                  <th className="text-left px-3 py-2.5 font-semibold text-xs">Yield</th>
                  <th className="text-left px-3 py-2.5 rounded-tr-lg font-semibold text-xs">Est. Cost</th>
                </tr>
              </thead>
              <tbody>
                {result.bags.map((bag, i) => (
                  <tr
                    key={bag.size}
                    className={i === result.bestValueIndex
                      ? 'bg-orange-light border-l-[3px] border-orange font-semibold'
                      : i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }
                  >
                    <td className="px-3 py-2.5 text-gray-600">
                      {bag.label}
                      {i === result.bestValueIndex && (
                        <span className="ml-2 bg-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded">Best value</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-navy font-semibold tabular-nums">{bag.bagsNeeded}</td>
                    <td className="px-3 py-2.5 text-gray-400 tabular-nums">{bag.yieldCuFt} ft³</td>
                    <td className="px-3 py-2.5 tabular-nums">{bag.estimatedCost != null ? formatCurrency(bag.estimatedCost) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-2 mt-4 mb-4">
            <Link href="/concrete-cost-calculator/" className="block p-3 border border-dashed border-gray-300 rounded-lg hover:bg-[#FFFBF5] hover:border-orange transition-colors">
              <span className="text-[13px] font-medium text-gray-600">💰 Compare bag cost vs. truck delivery</span>
              <span className="text-xs font-semibold text-orange ml-2">Cost calculator →</span>
            </Link>
            <Link href="/" className="block p-3 border border-dashed border-gray-300 rounded-lg hover:bg-[#FFFBF5] hover:border-orange transition-colors">
              <span className="text-[13px] font-medium text-gray-600">🔢 Need full yards instead of bags?</span>
              <span className="text-xs font-semibold text-orange ml-2">Concrete calculator →</span>
            </Link>
          </div>

          <div className="flex gap-2 justify-end">
            <button onClick={copyResults} className="btn-secondary">{copied ? '✓ Copied' : 'Copy'}</button>
            <button onClick={reset} className="btn-secondary">Reset</button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 justify-center">
        {['All bag sizes', 'Cost comparison', 'Best value pick', 'Free & instant'].map((t) => (
          <span key={t} className="text-xs text-gray-400 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
