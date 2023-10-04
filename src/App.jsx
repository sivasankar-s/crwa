import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import './index.css';
import { Login } from './pages/Login';
import { HomePage } from './pages/HomePage';
import { CreatePost } from './pages/CreatePost';
import { Register } from './pages/Register';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<HomePage />}/>
        <Route path='/createPost' element={<CreatePost />} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
