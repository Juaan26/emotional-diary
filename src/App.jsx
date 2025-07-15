import { Routes, Route } from 'react-router';
import Home from "./pages/Home"
import { EntryPage } from './pages/EntryPage';
import { entries } from "./assets/entries.json"
function App() {




  return (
    <Routes>
      <Route path="/" element={ <Home entries={ entries } /> } />
      <Route path="/entry/:id" element={ <EntryPage /> } />
    </Routes>
  )
}

export default App
