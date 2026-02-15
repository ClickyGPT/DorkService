
import React, { useState } from 'react';
// Added Shield to imports
import { ExternalLink, Copy, Check, Zap, Loader2, Plus, X, Sparkles, Terminal, Search, Shield } from 'lucide-react';
import { OPERATORS, FILE_TYPES } from '../constants';
import { getDorkSuggestions } from '../services/geminiService';

/**
 * DorkBuilder Component
 * Provides a manual interface for constructing Google Dorks with AI-powered keyword suggestions.
 */
export const DorkBuilder: React.FC = () => {
  // --- State Management ---
  const [keyword, setKeyword] = useState('');
  const [selectedFileType, setSelectedFileType] = useState('');
  const [activeOperators, setActiveOperators] = useState<string[]>([]);
  const [domain, setDomain] = useState('');
  const [copied, setCopied] = useState(false);
  
  // AI Suggestions State
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  // --- Handlers ---
  const toggleOperator = (op: string) => {
    setActiveOperators(prev => 
      prev.includes(op) ? prev.filter(p => p !== op) : [...prev, op]
    );
  };

  const handleGetSuggestions = async () => {
    if (!keyword.trim()) return;
    setIsSuggesting(true);
    setSuggestions([]);
    
    try {
      const results = await getDorkSuggestions(keyword);
      setSuggestions(results);
    } catch (e) {
      console.error("Failed to fetch suggestions:", e);
    } finally {
      setIsSuggesting(false);
    }
  };

  const applySuggestion = (suggestion: string) => {
    // Populate the keyword input with the selected suggestion chip
    setKeyword(suggestion);
    // Clear chips after selection to maintain a clean UI
    setSuggestions([]);
  };

  const clearKeyword = () => {
    setKeyword('');
    setSuggestions([]);
  };

  const constructDork = () => {
    const parts = [];
    
    // 1. Site Scope
    if (domain) parts.push(`site:${domain}`);

    // 2. Operators + Keyword
    activeOperators.forEach(op => {
        if (keyword) {
            // Intelligent quoting for multi-word terms
            const formattedKeyword = keyword.includes(' ') && !keyword.startsWith('"') 
              ? `"${keyword}"` 
              : keyword;
            parts.push(`${op}${formattedKeyword}`);
        }
    });

    // 3. Raw Keyword (if no operators selected)
    if (activeOperators.length === 0 && keyword) {
        if (keyword.includes(':')) {
             parts.push(keyword);
        } else {
             parts.push(keyword.includes(' ') ? `"${keyword}"` : keyword);
        }
    }

    // 4. Filetype Constraint
    if (selectedFileType) parts.push(`filetype:${selectedFileType}`);

    return parts.join(' ');
  };

  const currentDork = constructDork();

  const handleSearch = () => {
    if (!currentDork) return;
    const url = `https://www.google.com/search?q=${encodeURIComponent(currentDork)}`;
    window.open(url, '_blank');
  };

  const handleCopy = () => {
    if (!currentDork) return;
    navigator.clipboard.writeText(currentDork);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
          <Terminal className="w-7 h-7 text-orange-500" />
          Advanced Query Builder
        </h2>
        <p className="text-gray-400">Layer specific operators and filetypes to uncover targeted data points.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Input Configuration Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Target Scope */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Target Domain</label>
            <input
              type="text"
              placeholder="e.g., gov.uk, target-org.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all placeholder-gray-600 shadow-inner"
            />
          </div>

          {/* Keyword and Suggestions */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex justify-between items-center">
              <span>Primary Search Term</span>
              <span className="text-[10px] text-indigo-400 normal-case font-medium">Tip: Use AI to refine your target</span>
            </label>
            
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="e.g., config, internal, password..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGetSuggestions()}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-5 py-3.5 pr-12 text-white font-medium focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all placeholder-gray-700 shadow-inner"
                />
                {keyword && (
                  <button 
                    onClick={clearKeyword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                    title="Clear input"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={handleGetSuggestions}
                disabled={isSuggesting || !keyword.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-600 text-white px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-indigo-950/20 active:scale-95 group"
                title="Get AI Suggestions"
              >
                {isSuggesting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                )}
                <span className="font-bold text-sm">Suggest</span>
              </button>
            </div>
            
            {/* AI Suggestions Display */}
            {suggestions.length > 0 && (
              <div className="mt-4 p-5 bg-indigo-900/10 border border-indigo-500/20 rounded-2xl animate-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-tighter">AI-Assisted Refinements</span>
                  </div>
                  <button onClick={() => setSuggestions([])} className="text-gray-500 hover:text-gray-300">
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => applySuggestion(s)}
                      className="text-xs font-mono bg-indigo-950/50 hover:bg-indigo-800 border border-indigo-500/30 text-indigo-100 px-4 py-2.5 rounded-full transition-all flex items-center gap-2 group hover:border-indigo-400 active:scale-95"
                    >
                      {s}
                      <Plus className="w-3 h-3 text-indigo-400 group-hover:text-white transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Logic Operators */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Operators</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-3">
              {OPERATORS.map((op) => (
                <div key={op.name} className="relative group">
                  <button
                    onClick={() => toggleOperator(op.name)}
                    className={`w-full flex flex-col items-start p-3.5 rounded-xl border text-left transition-all relative shadow-sm h-full ${
                      activeOperators.includes(op.name)
                        ? 'bg-orange-600/10 border-orange-500 text-orange-500'
                        : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <span className="font-mono font-bold text-sm tracking-tight">{op.name}</span>
                    <span className="text-[10px] mt-1 opacity-60 font-medium uppercase">{op.label}</span>
                    {activeOperators.includes(op.name) && (
                      <div className="absolute top-2 right-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                      </div>
                    )}
                  </button>
                  
                  {/* Hover Description Tooltip Replacement */}
                  <div className="absolute z-20 top-full left-0 mt-1 w-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-gray-800 border border-gray-700 text-[10px] text-gray-300 p-2 rounded-lg shadow-xl backdrop-blur-md">
                      {op.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* File Extensions */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Data Format</label>
            <div className="relative">
              <select
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all appearance-none cursor-pointer shadow-inner"
              >
                <option value="">Search all file formats</option>
                {FILE_TYPES.map(ft => (
                  <option key={ft} value={ft}>.{ft.toUpperCase()} Documents</option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Live Export/Preview Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-gray-900/80 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl shadow-2xl ring-1 ring-white/5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Query Preview</h3>
              <div className="flex gap-2">
                 <button 
                  onClick={handleCopy}
                  title="Copy dork string"
                  className="p-2 text-gray-400 hover:text-white transition-all bg-gray-950 border border-gray-800 rounded-lg hover:border-gray-600 active:scale-90"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="bg-black/80 rounded-2xl p-6 font-mono text-sm text-green-500 break-all min-h-[140px] border border-gray-800 mb-8 shadow-inner flex items-center justify-center">
              {currentDork ? (
                <span className="w-full text-center leading-relaxed">{currentDork}</span>
              ) : (
                <div className="text-gray-600 flex flex-col items-center gap-3">
                  <Search className="w-10 h-10 opacity-10" />
                  <span className="text-[11px] uppercase tracking-widest text-center px-4">Pending construction...</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <button
                onClick={handleSearch}
                disabled={!currentDork}
                className="w-full flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-500 disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed text-white font-black py-4.5 rounded-2xl transition-all shadow-xl shadow-orange-950/20 active:scale-95 text-sm uppercase tracking-widest"
              >
                <Search className="w-5 h-5 stroke-[3px]" />
                Execute Search
              </button>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-orange-500/50" />
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">OSINT Insight</p>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 text-[11px] text-gray-400 leading-normal">
                  <div className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                  <span>Combining multiple operators (e.g., <code>site:</code> + <code>inurl:</code>) exponentially increases precision.</span>
                </li>
                <li className="flex gap-3 text-[11px] text-gray-400 leading-normal">
                  <div className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  <span>Search results are cached. Use the <code>cache:</code> operator for deleted pages.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Simple Down Arrow Icon for Select */
const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
