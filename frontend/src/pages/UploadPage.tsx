import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface UploadPageProps {
  setResults: (data: string) => void;
}

const UploadPage: React.FC<UploadPageProps> = ({ setResults }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 50 * 1024 * 1024) {
        setError('File size exceeds 50MB limit.');
        setFile(null);
      } else {
        setFile(selectedFile);
        setError(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    navigate('/results');

    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post('http://localhost:5000/api/analyze-video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResults(response.data.instructions);
    } catch (err) {
      console.error(err);
      setResults('Error: Failed to analyze video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">FixIt Buddy</h1>
        <p className="text-gray-400 mb-8 text-center">Upload a video of your DIY problem and I'll help you fix it!</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-10 flex flex-col items-center justify-center hover:border-blue-500 transition-colors cursor-pointer">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="w-12 h-12 text-blue-400 mb-4" />
            <span className="text-gray-300 font-medium">
              {file ? file.name : 'Select Video File'}
            </span>
            <span className="text-gray-500 text-sm mt-2">MP4, MOV, WEBM (Max 50MB)</span>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!file || loading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all ${
              !file || loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20'
            }`}
          >
            {loading ? 'Analyzing...' : 'Analyze Video'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
