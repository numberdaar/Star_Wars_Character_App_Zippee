import React, { useState, useMemo } from 'react'
import usePeoplePagination from './hooks/useFetch'
import CharacterCard from './components/CharacterCard'
import CharacterModal from './components/CharacterModal'
import Login from './components/Login'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { items, load, hasMore, loading, error, page } = usePeoplePagination()
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query) return items
    return items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
  }, [items, query])

  if (!isAuthenticated) return <Login onLogin={() => setIsAuthenticated(true)} />

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50">
      <header className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-center">
  <div>
    <h1 className="text-2xl font-bold">Star Wars Characters</h1>
    <p className="text-sm text-gray-600">Explore characters from the Star Wars universe.</p>
  </div>
  <button
    onClick={() => setIsAuthenticated(false)}
    className="bg-red-500 text-white px-4 py-2 rounded mt-3 md:mt-0"
  >
    Logout
  </button>
</header>

<main className="max-w-6xl mx-auto">
  <div className="flex gap-3 mb-4 items-center">
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="border rounded px-3 py-2 w-full md:w-1/3"
      placeholder="Search by name"
    />
  </div>

  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {filtered.length > 0 ? (
      filtered.map(p => (
        <CharacterCard key={p.url} person={p} onOpen={(person) => setSelected(person)} />
      ))
    ) : (
      <p className="text-center text-gray-500 text-lg col-span-full mt-10 font-semibold animate-pulse">
        No Characters found
      </p>
    )}
  </section>

  {/* Only show Load More button when characters exist */}
  {filtered.length > 0 && (
    <div className="mt-6 flex justify-center items-center gap-4">
      {error && <div className="text-red-600">Failed to load characters.</div>}
      <button
        onClick={() => load(page)}
        disabled={!hasMore || loading}
        className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-60"
      >
        {loading ? <span className="spinner inline-block mr-2"></span> : null}
        {loading ? 'Loading...' : hasMore ? 'Load More' : 'No more'}
      </button>
    </div>
  )}
</main>



      {selected && <CharacterModal person={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}