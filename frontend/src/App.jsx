import { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import UploadBox from "./components/UploadBox";

function App() {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
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

    alert(response.data.message);
  } catch (error) {
    console.error(error);
    alert("Upload failed.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
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
      </div>
    </div>
  );
}

export default App;