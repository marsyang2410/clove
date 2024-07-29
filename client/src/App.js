import React from 'react';

function App() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:9000/api/auth/login';
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleLogin}>Login with Spotify</button>
      </header>
    </div>
  );
}

export default App;