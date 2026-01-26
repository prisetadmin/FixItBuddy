import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';
import './App.css';

function App() {
  const [results, setResults] = useState<string | null>(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
        <nav className="p-6 border-b border-gray-800">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">F</div>
              <span className="text-xl font-bold tracking-tight">FixIt Buddy</span>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto py-10">
          <Routes>
            <Route path="/" element={<UploadPage setResults={(data) => setResults(data)} />} />
            <Route path="/results" element={<ResultsPage results={results} />} />
          </Routes>
        </main>

        <footer className="py-8 text-center text-gray-500 text-sm">
          &copy; 2026 FixIt Buddy AI. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
