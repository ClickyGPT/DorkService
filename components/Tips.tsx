import React from 'react';
import { Shield, Search, Terminal, AlertTriangle, BookOpen } from 'lucide-react';

export const Tips: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2 mb-10">
        <h2 className="text-3xl font-bold text-white">Google Dorking Guide</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Master the art of advanced search queries to uncover hidden information responsibly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Operators Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4 text-orange-500">
            <Terminal className="w-6 h-6" />
            <h3 className="text-xl font-bold text-white">Core Operators</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-black/30 p-3 rounded-lg border border-gray-800">
              <code className="text-orange-400 font-bold">site:</code>
              <p className="text-gray-400 text-sm mt-1">Limits results to a specific domain or TLD.</p>
              <div className="text-xs text-gray-500 mt-1">Example: <span className="font-mono text-gray-300">site:nasa.gov</span></div>
            </div>
            <div className="bg-black/30 p-3 rounded-lg border border-gray-800">
              <code className="text-orange-400 font-bold">filetype: / ext:</code>
              <p className="text-gray-400 text-sm mt-1">Searches for specific file extensions.</p>
              <div className="text-xs text-gray-500 mt-1">Example: <span className="font-mono text-gray-300">filetype:pdf confidentiality</span></div>
            </div>
            <div className="bg-black/30 p-3 rounded-lg border border-gray-800">
              <code className="text-orange-400 font-bold">intitle:</code>
              <p className="text-gray-400 text-sm mt-1">Finds pages with specific text in the HTML title.</p>
              <div className="text-xs text-gray-500 mt-1">Example: <span className="font-mono text-gray-300">intitle:"index of"</span></div>
            </div>
            <div className="bg-black/30 p-3 rounded-lg border border-gray-800">
              <code className="text-orange-400 font-bold">inurl:</code>
              <p className="text-gray-400 text-sm mt-1">Finds pages with specific text in the URL.</p>
              <div className="text-xs text-gray-500 mt-1">Example: <span className="font-mono text-gray-300">inurl:admin</span></div>
            </div>
          </div>
        </div>

        {/* Responsible Use Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4 text-green-500">
            <Shield className="w-6 h-6" />
            <h3 className="text-xl font-bold text-white">Responsible Use</h3>
          </div>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Google Dorking is a powerful technique used by security researchers, penetration testers, and bug bounty hunters to identify exposed assets and vulnerabilities.
            </p>
            <div className="bg-orange-900/20 border-l-4 border-orange-600 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-orange-500 text-sm uppercase mb-1">Warning</h4>
                  <p className="text-sm text-gray-300">
                    Accessing systems, downloading sensitive data, or exploiting vulnerabilities without explicit permission is <strong className="text-white">illegal</strong>.
                  </p>
                </div>
              </div>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
              <li>Only test domains you own or have permission to audit.</li>
              <li>Report exposed sensitive data to the organization via their Responsible Disclosure program.</li>
              <li>Do not use these queries for malicious purposes or cyberstalking.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Advanced Techniques */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6 text-indigo-400">
          <BookOpen className="w-6 h-6" />
          <h3 className="text-xl font-bold text-white">Advanced Techniques</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
            <h4 className="font-bold text-white mb-2">Logic Operators</h4>
            <p className="text-sm text-gray-400 mb-3">Use <code className="text-orange-400">OR</code>, <code className="text-orange-400">AND</code>, and <code className="text-orange-400">-</code> (minus) to refine results.</p>
            <div className="text-xs bg-gray-900 p-2 rounded text-gray-300 font-mono">
              site:linkedin.com -site:www.linkedin.com
            </div>
          </div>
          <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
            <h4 className="font-bold text-white mb-2">Wildcards</h4>
            <p className="text-sm text-gray-400 mb-3">Use the asterisk <code className="text-orange-400">*</code> as a placeholder for any unknown terms.</p>
            <div className="text-xs bg-gray-900 p-2 rounded text-gray-300 font-mono">
              "password is *" filetype:txt
            </div>
          </div>
          <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
            <h4 className="font-bold text-white mb-2">Grouping</h4>
            <p className="text-sm text-gray-400 mb-3">Use parentheses <code className="text-orange-400">()</code> to group logic for complex queries.</p>
            <div className="text-xs bg-gray-900 p-2 rounded text-gray-300 font-mono">
              site:gov (ext:pdf OR ext:docx)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};