import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login';
import Details from './pages/Details';
import Home from './pages/Home';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';
import Magic from './pages/Magic.jsx';
import Settings from './pages/Settings.jsx';  

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/details" element={<Details />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/magic" element={<Magic />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    
  );
}

export default App;


console.log("App component rendered");