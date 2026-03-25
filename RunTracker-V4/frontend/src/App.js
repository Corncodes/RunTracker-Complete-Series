import React, { useState, useEffect } from 'react';

function App() {
  const [runs, setRuns] = useState([]);
  const [formData, setFormData] = useState({ distance_miles: '', pace: '', run_date: '' });
  const API_URL = 'http://localhost:5002/api/runs';

  const fetchRuns = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setRuns(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchRuns(); }, []);

  // 🎯 The 'Create' Bullet
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setFormData({ distance_miles: '', pace: '', run_date: '' }); // Clear form
    fetchRuns(); // Refresh list
  };

  const deleteRun = async (id) => {
    await fetch(`${API_URL}/delete/${id}`);
    fetchRuns(); // Refresh the list
  };

  const editRun = async (id) => {
    const newMiles = prompt("Enter new mileage:");
    if (!newMiles) return;

    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ distance_miles: newMiles }),
    });
    fetchRuns();
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: 'auto' }}>
      <h1>🏃‍♂️ RunTracker V4 (MERN)</h1>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', marginBottom: '30px' }}>
        <input type="number" step="0.1" placeholder="Miles" value={formData.distance_miles}
          onChange={e => setFormData({ ...formData, distance_miles: e.target.value })} required />
        <input type="text" placeholder="Pace" value={formData.pace}
          onChange={e => setFormData({ ...formData, pace: e.target.value })} required />
        <input type="date" value={formData.run_date}
          onChange={e => setFormData({ ...formData, run_date: e.target.value })} required />
        <button type="submit" style={{ background: '#00ed64', color: '#001e2b', fontWeight: 'bold', padding: '10px' }}>Add Run</button>
      </form>

      <h3>History</h3>
      {runs.map(run => (
        <div key={run._id} style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
          {run.distance_miles} miles | {run.pace} | {new Date(run.run_date).toLocaleDateString()}
          <button onClick={() => deleteRun(run._id)} style={{ color: 'red', marginLeft: '10px' }}>
            Trash
          </button>
          <button onClick={() => editRun(run._id)} style={{ color: 'blue', marginLeft: '10px' }}>
            Edit
          </button>
        </div>


      ))}
    </div>
  );
}

export default App;