import React, { useState } from 'react';
import { PREBUILT_CATEGORIES } from '../constants';
import { Search, ChevronRight, Folder, FileWarning, AlertTriangle, DoorOpen, Sparkles, Loader2, Copy, Check, ExternalLink, BrainCircuit } from 'lucide-react';
import { generateDorkFromPrompt } from '../services/geminiService';

const iconMap: Record<string, React.ReactNode> = {
  'FolderOpen': <Folder className="w-5 h-5" />,
  'FileWarning': <FileWarning className="w-5 h-5" />,
  'AlertTriangle': <AlertTriangle className="w-5 h-5" />,
  'DoorOpen': <DoorOpen className="w-5 h-5" />
};

export const PrebuiltDorks: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(PREBUILT_CATEGORIES[0].id);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedDork, setGeneratedDork] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [useThinking, setUseThinking] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedCategory = PREBUILT_CATEGORIES.find(c => c.id === activeCategory);

  const handleDorkSearch = (query: string) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    setGeneratedDork('');
    try {
      const result = await generateDorkFromPrompt(aiPrompt, useThinking);
      setGeneratedDork(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Integrated AI Generator Section */}
      <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600/20 p-2 rounded-lg">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <h2 className="text-xl font-bold text-white">AI Dork Generator</h2>
            </div>
            
            {/* Thinking Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-950 p-1 rounded-lg border border-gray-800">
               <button
                 onClick={() => setUseThinking(false)}
                 className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${!useThinking ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
               >
                 Flash
               </button>
               <button
                 onClick={() => setUseThinking(true)}
                 className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${useThinking ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
               >
                 <BrainCircuit className="w-3 h-3" />
                 Deep Research
               </button>
            </div>
          </div>
          
          <p className="text-gray-400 mb-6 text-sm md:text-base">
            {useThinking 
              ? "Deep Research mode uses Gemini 3 Pro with extended thinking for complex OSINT scenarios."
              : "Describe what you're looking for, and our AI will build the query fast."}
          </p>

          <div className="relative group">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAiGenerate()}
              placeholder="e.g., Find public Jira dashboards related to government websites..."
              className="w-full bg-gray-950 border border-gray-800 rounded-xl py-4 pl-6 pr-32 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
            />
            <button
              onClick={handleAiGenerate}
              disabled={isGenerating || !aiPrompt.trim()}
              className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-600 text-white font-semibold px-6 rounded-lg transition-all flex items-center gap-2"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Generate
            </button>
          </div>

          {generatedDork && (
            <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="bg-black/40 border border-gray-700 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <code className="text-green-400 font-mono text-sm break-all flex-grow">
                  {generatedDork}
                </code>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleCopy(generatedDork)}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleDorkSearch(generatedDork)}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Database Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Category Sidebar */}
        <div className="md:col-span-1 space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Library Categories</h3>
          {PREBUILT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                activeCategory === cat.id
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20'
                  : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {iconMap[cat.icon]}
                <span className="font-medium">{cat.title}</span>
              </div>
              {activeCategory === cat.id && <ChevronRight className="w-4 h-4" />}
            </button>
          ))}
        </div>

        {/* Dork List */}
        <div className="md:col-span-3">
          {selectedCategory && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-800 bg-gray-800/30">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedCategory.title}</h2>
                <p className="text-gray-400">{selectedCategory.description}</p>
              </div>
              
              <div className="divide-y divide-gray-800">
                {selectedCategory.dorks.map((dork, idx) => (
                  <div key={idx} className="p-6 hover:bg-gray-800/50 transition-colors group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-2 flex-grow">
                        <h4 className="text-lg font-medium text-orange-500 group-hover:text-orange-400 transition-colors">
                          {dork.title}
                        </h4>
                        <code className="block bg-black/30 p-2 rounded text-sm font-mono text-gray-300 border border-gray-800 group-hover:border-gray-700 transition-colors">
                          {dork.query}
                        </code>
                        <p className="text-sm text-gray-500">{dork.description}</p>
                      </div>
                      <button
                        onClick={() => handleDorkSearch(dork.query)}
                        className="flex-shrink-0 flex items-center justify-center gap-2 bg-gray-800 hover:bg-orange-600 hover:text-white text-gray-300 px-4 py-2 rounded-lg border border-gray-700 hover:border-orange-500 transition-all font-medium text-sm whitespace-nowrap"
                      >
                        <Search className="w-4 h-4" />
                        Search
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
