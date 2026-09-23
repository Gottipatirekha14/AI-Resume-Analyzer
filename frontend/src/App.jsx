import { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import UploadBox from "./components/UploadBox";

function App() {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert("Please upload a resume first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-10">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[700px] text-center">
        <Header />

        <UploadBox setSelectedFile={setSelectedFile} />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className={`mt-6 w-full px-6 py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {analysis && (
          <div className="mt-8 text-left space-y-6">

            {/* ATS Score */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
                ATS Score
              </h2>

              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-5xl font-bold text-blue-600">
                  {analysis.ats_score}
                </span>

                <span className="text-2xl text-gray-500">
                  /100
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-700"
                  style={{ width: `${analysis.ats_score}%` }}
                ></div>
              </div>

              <p className="text-sm text-gray-500 text-center mt-2">
                ATS compatibility score
              </p>
            </div>

            {/* Resume Strengths */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Resume Strengths
              </h2>

              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {analysis.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>

            {/* Missing Skills */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Missing Skills / Keywords
              </h2>

              <div className="flex flex-wrap gap-2">
                {analysis.missing_skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Areas for Improvement
              </h2>

              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {analysis.improvements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </div>

            {/* Overall Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Overall Summary
              </h2>

              <p className="text-gray-700 leading-relaxed">
                {analysis.summary}
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;