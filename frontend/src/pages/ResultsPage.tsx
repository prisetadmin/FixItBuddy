import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ResultsPageProps {
  results: string | null;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ results }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="max-w-3xl w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        {!results ? (
            <div className="flex flex-col items-center justify-center py-[1rem]">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-[1rem]" />
            <h2 className="text-2xl font-semibold text-white">FixIt Buddy is thinking...</h2>
            <p className="text-gray-400 mt-2">Analyzing your video for the best solution.</p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-700">
            <div className="flex items-center justify-center mb-6">
                <CheckCircle2 className="text-orange-500 w-8 h-8" />
                <h2 className="text-2xl font-bold text-orange-500 pl-[10px]">Instructions</h2>
            </div>
            
            <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-li:my-2 prose-strong:text-blue-400 text-left pl-[10px] pr-[10px]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {results}
              </ReactMarkdown>
            </div>

            <button
              onClick={() => navigate('/')}
              className="mt-10 flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              <ArrowLeft size={20} />
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;