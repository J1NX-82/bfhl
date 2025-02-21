import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    document.title = "22BCS16763";
  }, []);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error("Invalid JSON format");
      }

      const res = await axios.post("/bfhl", parsedData);
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON or API Error");
    }
  };

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    setSelectedFilters(
      checked ? [...selectedFilters, value] : selectedFilters.filter((f) => f !== value)
    );
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary">BFHL Challenge</h1>
        <p className="text-muted">Enter your JSON input below and get structured results.</p>
      </div>
      <div className="card shadow-lg p-4">
        <textarea
          rows="5"
          className="form-control mb-3 border-primary"
          placeholder='Enter JSON, e.g. { "data": ["A", "1", "B"] }'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        ></textarea>
        <button className="btn btn-primary w-100 fw-bold" onClick={handleSubmit}>
          Process JSON
        </button>
      </div>

      {response && (
        <div className="mt-4 card shadow-lg p-4">
          <h3 className="text-center text-success fw-bold">Response</h3>
          <div className="d-flex justify-content-center gap-3 mb-3">
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" value="numbers" onChange={handleFilterChange} /> Numbers
            </label>
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" value="alphabets" onChange={handleFilterChange} /> Alphabets
            </label>
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" value="highest_alphabet" onChange={handleFilterChange} /> Highest Alphabet
            </label>
          </div>

          <pre className="bg-light p-4 rounded border border-secondary shadow-sm">
            {JSON.stringify(
              Object.fromEntries(
                Object.entries(response).filter(([key]) =>
                  selectedFilters.length ? selectedFilters.includes(key) : true
                )
              ),
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
};

export default App;