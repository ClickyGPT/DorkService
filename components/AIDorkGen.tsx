import React, { useState } from 'react';
import { generateDorkFromPrompt } from '../services/geminiService';
import { Sparkles, Loader2, Search, AlertCircle } from 'lucide-react';

export const AIDorkGen: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedDork, setGeneratedDork] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError('');
    setGeneratedDork('');

    try {
      const result = await generateDorkFromPrompt(prompt);
      setGeneratedDork(result);
    } catch (err) {
      setError('Failed to generate dork. Please check your API configuration or try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!generatedDork) return;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(generatedDork)}`, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-900/30 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-3xl font-bold text-white">AI Dork Generator</h2>
        <p className="text-gray-400">Describe what you're looking for, and our AI will build the query.</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 p-1 rounded-xl shadow-2xl">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Find public Jira dashboards related to government websites..."
          className="w-full bg-gray-950 text-white p-6 rounded-lg outline-none min-h-[120px] resize-none text-lg placeholder-gray-600 focus:ring-2 focus:ring-indigo-500/50 transition-all"
        />
        <div className="bg-gray-900 px-4 py-3 flex justify-between items-center rounded-b-lg">
          {/* Updated model label to match gemini-3-flash-preview */}
          <span className="text-xs text-gray-500 font-mono">Powered by Gemini 3 Flash</span>
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-semibold py-2 px-6 rounded-lg transition-all shadow-lg shadow-indigo-900/20"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? 'Generating...' : 'Generate Dork'}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-200">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {generatedDork && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Sparkles className="w-24 h-24 text-white" />
             </div>
             
             <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Generated Query</h3>
             <div className="bg-black/40 rounded-lg p-4 font-mono text-green-400 text-lg break-all border border-gray-700/50 shadow-inner">
               {generatedDork}
             </div>
             
             <div className="mt-6 flex justify-end">
               <button
                 onClick={handleSearch}
                 className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-orange-900/20 transition-all hover:scale-105"
               >
                 <Search className="w-5 h-5" />
                 Open in Google
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};