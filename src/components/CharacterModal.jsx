import React, { useEffect, useState } from 'react'
import { fetchResource } from '../api'
import { format } from 'date-fns'

export default function CharacterModal({ person, onClose }) {
  const [homeworld, setHomeworld] = useState(null)
  const [loading, setLoading] = useState(false)
  const [homeErr, setHomeErr] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setHomeErr(null)
      if (!person?.homeworld) return
      setLoading(true)
      try {
        const hw = await fetchResource(person.homeworld)
        if (mounted) setHomeworld(hw)
      } catch (e) {
        if (mounted) setHomeErr(e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [person])

  if (!person) return null

  const dateAdded = person.dateAdded ? format(new Date(person.dateAdded), 'dd-MM-yyyy') : 'N/A'
  const filmsCount = Array.isArray(person.films) ? person.films.length : 0

  return (
    <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg overflow-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">{person.name}</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-black">Close</button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Height: {(Number(person.height) / 100).toFixed(2)} m</div>
            <div className="text-sm text-gray-600">Mass: {person.mass} kg</div>
            <div className="text-sm text-gray-600">Birth Year: {person.birth_year}</div>
            <div className="text-sm text-gray-600">Films: {filmsCount}</div>
            <div className="text-sm text-gray-600">Date Added: {dateAdded}</div>
          </div>

          <div>
            <h4 className="font-medium">Homeworld</h4>
            {loading && <div className="text-sm text-gray-500">Loading homeworld...</div>}
            {homeErr && <div className="text-sm text-red-500">Failed to load homeworld</div>}
            {homeworld && (
              <div className="text-sm text-gray-700">
                <div>Name: {homeworld.name}</div>
                <div>Terrain: {homeworld.terrain}</div>
                <div>Climate: {homeworld.climate}</div>
                <div>Population: {homeworld.population}</div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
