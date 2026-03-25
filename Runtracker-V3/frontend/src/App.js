import React, { useState, useEffect } from 'react';

function App() {
  const [runs, setRuns] = useState([]);
  const [formData, setFormData] = useState({ distance_miles: '', pace: '', run_date: '' });

  // 1. READ (The 'R' in cRud)
  const fetchRuns = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5001/api/runs');
      const data = await response.json();
      setRuns(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchRuns(); }, []);

  // 2. CREATE (The 'C' in Crud)
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://127.0.0.1:5001/api/runs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setFormData({ distance_miles: '', pace: '', run_date: '' });
    fetchRuns();
  };

  // 3. DELETE (The 'D' in cruD)
  const deleteRun = async (id) => {
    await fetch(`http://127.0.0.1:5001/api/runs/${id}`, {
      method: 'DELETE',
    });
    fetchRuns();
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', maxWidth: '800px', margin: 'auto' }}>
      <h1>🏃‍♂️ RunTracker V3 (SERN Stack)</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
        <input type="number" step="0.1" placeholder="Miles" value={formData.distance_miles} onChange={e => setFormData({...formData, distance_miles: e.target.value})} required />
        <input type="text" placeholder="Pace" value={formData.pace} onChange={e => setFormData({...formData, pace: e.target.value})} required />
        <input type="date" value={formData.run_date} onChange={e => setFormData({...formData, run_date: e.target.value})} required />
        <button type="submit" style={{ background: 'blue', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}>Add Run</button>
      </form>

      <hr />

      <h3>Your Activity</h3>
      {runs.map(run => (
        <div key={run.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ddd' }}>
          <span>{run.distance_miles} miles | {run.pace} pace | {run.run_date.split('T')[0]}</span>
          <button onClick={() => deleteRun(run.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;