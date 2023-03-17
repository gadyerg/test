import {Routes, BrowserRouter, Route} from 'react-router-dom'
import LogIn from './pages/LogIn';
import Home from './pages/Home'
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<LogIn />} />
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
