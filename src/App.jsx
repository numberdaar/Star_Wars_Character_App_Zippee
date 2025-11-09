import React, { useState, useMemo } from 'react'
import usePeoplePagination from './hooks/useFetch'
import CharacterCard from './components/CharacterCard'
import CharacterModal from './components/CharacterModal'

export default function App() {
  const { items, load, hasMore, loading, error, page } = usePeoplePagination()
  const [selected, setSelected] = useState(null)

  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    if (!query) return items
    return items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
  }, [items, query])

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50">
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl font-bold">Star Wars Characters</h1>
        <p className="text-sm text-gray-600">Explore characters from the Star Wars universe. Click a card for details.</p>
      </header>

        <main className="max-w-6xl mx-auto">
        <div className="flex gap-3 mb-4 items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded px-3 py-2 w-full md:w-1/3"
            placeholder="Search by name (optional)"
          />
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => (
            <CharacterCard key={p.url} person={p} onOpen={(person) => setSelected(person)} />
          ))}
        </section>

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
      </main>

      {selected && <CharacterModal person={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
