import React, {useState, useEffect} from 'react';

function App() {
  const [runs, setRuns] = useState([]);
  const [formData, setFormData] = useState ({
    distance_miles: '',
    pace: '',
    run_date: ''
  });

  useEffect(() => {
    fetchRuns();
  }, []);


  const fetchRuns = () => {
    fetch('http://127.0.0.1:8000/api/runs/')
      .then(res => res.json())
      .then(data => setRuns(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/runs/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(() => {
      fetchRuns(); //Refreshes list
      setFormData({ distance_miles: '', pace: '', run_date: ''}); //Resets form
    });
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1>🏃‍♂️ RunTracker V2 (Django)</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="number" step="0.1" placeholder="Miles" value={formData.distance_miles} onChange={e => setFormData({...formData, distance_miles: e.target.value})} required />
        <input type="text" placeholder="Pace (e.g. 8:30)" value={formData.pace} onChange={e => setFormData({...formData, pace: e.target.value})} required />
        <input type="date" value={formData.run_date} onChange={e => setFormData({...formData, run_date: e.target.value})} required />
        <button type="submit" style={{ cursor: 'pointer', background: '#28a745', color: 'white', border: 'none', padding: '10px' }}>Add Run</button>
      </form>

      <hr />
      <h3>Recent Runs</h3>
      <ul>
        {runs.map(run => (
          <li key={run.id} style={{ marginBottom: '10px' }}>
            <b>{run.distance_miles} miles</b> — {run.pace} pace — <i>{run.run_date}</i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
