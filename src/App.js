import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [numberType, setNumberType] = useState('p');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const fetchNumbers = () => {
    setError(null);
    axios.get("http://localhost:9876/numbers/${numberType}")
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        setError('Error fetching data');
      });
  };

  return (
    <div className="App">
      <h1>Average Calculator</h1>
      <label htmlFor="numberType">Choose a number type:</label>
      <select 
        id="numberType" 
        value={numberType} 
        onChange={(e) => setNumberType(e.target.value)}
      >
        <option value="p">Prime</option>
        <option value="f">Fibonacci</option>
        <option value="e">Even</option>
        <option value="r">Random</option>
      </select>
      <button onClick={fetchNumbers}>Fetch Numbers</button>
      {error && <p className="error">{error}</p>}
      <div className="response">
        <h2>Response</h2>
        {response ? (
          <pre>{JSON.stringify(response, null, 2)}</pre>
        ) : (
          <p>No data yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;