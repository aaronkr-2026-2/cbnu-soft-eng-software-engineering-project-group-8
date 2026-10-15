import { Routes, Route } from 'react-router-dom'
import Detect from '../frontend/detect.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />

      <Route path="/detect" element={<Detect />} />
    </Routes>
  )
}

export default App