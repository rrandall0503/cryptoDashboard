import './App.css';
import Dashboard from './Dashboard';

function App() {
  return (
      <div id='main'>
        <h1 id='mainTitle'>CryptoDASH</h1>
        <div className='dashboard'>
          <Dashboard />
        </div>
        <div className='dashboard'>
          <Dashboard />
        </div>
        <div className='dashboard'>
          <Dashboard />
        </div>
      </div>
  );
}

export default App;
