import React, { useEffect, useState } from 'react';

function App() {
  const [runs, setRuns] = useState([]);

  // The "useEffect" hook runs as soon as the page loads
  useEffect(() => {
  console.log("1. Component Loaded - Attempting Fetch..."); // Should see this in Console
  
fetch('http://127.0.0.1:5018/api/runs')
    .then(response => {
      console.log("2. Response Received:", response.status); // Should see '200'
      return response.json();
    })
    .then(data => {
      console.log("3. Data Parsed:", data); // Should see your actual runs here
      setRuns(data);
    })
    .catch(error => console.error("4. FETCH FAILED:", error));
}, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🏃‍♂️ Run Tracker</h1>
      <ul>
        {runs.map(run => (
          <li key={run.id}>
            <strong>{run.distanceMiles} miles</strong> - {run.pace} pace ({run.runDate})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;