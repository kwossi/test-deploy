import React, { useState } from "react";

function App() {
  const [links, setLinks] = useState([]);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target.result;
          const importedLinks = JSON.parse(content);
          if (Array.isArray(importedLinks)) {
            setLinks(importedLinks);
            console.log(`Number of links imported: ${importedLinks.length}`);
          } else {
            alert("Invalid JSON format: must be an array of links.");
          }
        } catch (error) {
          alert("Failed to parse JSON: " + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  // Function to export links as JSON
  const exportLinks = () => {
    const content = JSON.stringify(links, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "links.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Link Manager</h1>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      <button onClick={exportLinks}>Export Links</button>
      <ul>
        {links.map((link, index) => (
          <li key={index}>{link.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
