import { Routes, Route } from 'react-router'
import Home from "./pages/Home"
import { EntryPage } from './pages/EntryPage'
import { entries as entriesData } from "./assets/entries.json"
import { useState } from "react"
function App() {
  const [entries, setEntries] = useState(entriesData)

  const updateEntry = (id, updatedData) => {
    setEntries(prevEntries => {
      return prevEntries.map(entry => {
        return entry.id === id ? {
          ...entry, ...updatedData
        } : entry

      }
      )
    })
  }


  return (
    <Routes>
      <Route path="/" element={ <Home entries={ entries } /> } />
      <Route path="/entry/:id" element={ <EntryPage entries={ entries } updateEntry={ updateEntry } /> } />
    </Routes>
  )
}

export default App
