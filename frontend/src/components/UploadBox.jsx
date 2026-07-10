import { useState } from "react";

function UploadBox({ setSelectedFile }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      event.target.value = "";
      setFile(null);
      setSelectedFile(null);
      return;
    }

    // Update both local state and App state
    setFile(selectedFile);
    setSelectedFile(selectedFile);
  };

  return (
    <div className="mt-8">
      <div className="border-2 border-dashed border-blue-400 rounded-xl p-10 bg-blue-50 hover:bg-blue-100 transition">
        <p className="text-gray-700 text-lg font-medium">
          📄 Upload your Resume
        </p>

        <p className="text-gray-500 text-sm mt-2">
          Drag & drop your PDF here or click below
        </p>

        <label className="inline-block mt-6 cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Browse Files

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {file && (
          <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-green-700 font-semibold">
              ✅ Resume uploaded successfully!
            </p>

            <p className="text-gray-700 mt-1 text-sm">
              {file.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadBox;