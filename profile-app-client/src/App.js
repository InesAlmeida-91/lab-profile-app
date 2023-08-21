import './App.css';
import HomePage from './pages/HomePage';
import Signup from './pages/SingupPage';
import Login from './pages/LoginPage';
import { Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />     
        <Route path="/login" element={<Login />} />    
      </Routes>
    </div>
  );
}

export default App;
