import { Outlet } from 'react-router-dom';
import './App.css';
import '../src/componets/Event/EventComponent.css'
import '../src/componets/Header/HeaderComponent.css'



function App() {
  return (
    <div className="App">
      <div className='App-Container'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;