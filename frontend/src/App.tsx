import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';
import logo from './assets/logo.png';
import './App.css';

function App() {
  const [results, setResults] = useState<string | null>(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
        <nav className="p-4 md:p-6 ">
          <div className="max-w-6xl mx-auto flex items-center justify-center md:justify-between">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full">
              <img src={logo} alt="FixIt Buddy Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
              <span className="text-xl md:text-4xl font-extrabold tracking-tight text-white text-center md:text-left break-words max-w-full"> </span>
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
          <p>&copy; 2026 FixIt Buddy AI. All rights reserved.</p>
          <p className="mt-2">
            Made with <a href="https://www.priset.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">priset.ai</a>
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
