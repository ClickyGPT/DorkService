import React, { useState } from 'react';
import { Search, Terminal, Database, Shield, BookOpen } from 'lucide-react';
import { DorkBuilder } from './components/DorkBuilder';
import { PrebuiltDorks } from './components/PrebuiltDorks';
import { Tips } from './components/Tips';
import { ChatBot } from './components/ChatBot';

enum Tab {
  PREBUILT = 'PREBUILT',
  BUILDER = 'BUILDER',
  TIPS = 'TIPS'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.PREBUILT);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-orange-600 p-1.5 rounded-lg">
                <Search className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Dork<span className="text-orange-500">Search</span>
              </span>
            </div>
            <div className="hidden md:block">
              <span className="text-xs font-mono text-gray-500 border border-gray-800 px-2 py-1 rounded bg-gray-900">
                AI Powered OSINT
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="py-12 px-4 text-center bg-gradient-to-b from-gray-900 to-gray-950 border-b border-gray-800">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          Google Hacking Database
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
          Advanced search queries for security researchers, OSINT investigators, and bug bounty hunters.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 max-w-sm mx-auto bg-gray-900 p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab(Tab.PREBUILT)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              activeTab === Tab.PREBUILT
                ? 'bg-gray-800 text-orange-500 shadow-sm ring-1 ring-gray-700'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }`}
          >
            <Database className="w-4 h-4" />
            Database
          </button>
          <button
            onClick={() => setActiveTab(Tab.BUILDER)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              activeTab === Tab.BUILDER
                ? 'bg-gray-800 text-orange-500 shadow-sm ring-1 ring-gray-700'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Builder
          </button>
           <button
            onClick={() => setActiveTab(Tab.TIPS)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              activeTab === Tab.TIPS
                ? 'bg-gray-800 text-orange-500 shadow-sm ring-1 ring-gray-700'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Tips
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="min-h-[400px]">
          {activeTab === Tab.PREBUILT && <PrebuiltDorks />}
          {activeTab === Tab.BUILDER && <DorkBuilder />}
          {activeTab === Tab.TIPS && <Tips />}
        </div>
      </main>

      {/* Chat Bot Layer */}
      <ChatBot />

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Shield className="w-5 h-5" />
            <span className="text-sm">For educational and security research purposes only.</span>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} DorkSearch MVP. Powered by Gemini.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
