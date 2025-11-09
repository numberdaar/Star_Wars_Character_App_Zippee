import { useState, useEffect, useRef } from 'react'
import { fetchPeoplePage, fetchResource } from '../api'

export default function usePeoplePagination() {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const initializedRef = useRef(false)

  const load = async (nextPage = page) => {
    if (loading) return
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPeoplePage(nextPage)

      // 🧠 Fetch species names for all people
      const annotated = await Promise.all(
        data.results.map(async (p) => {
          let speciesName = 'Human' // default
          if (p.species?.length > 0) {
            try {
              const speciesData = await fetchResource(p.species[0])
              speciesName = speciesData.name || 'Unknown'
            } catch {
              speciesName = 'Unknown'
            }
          }
          return { ...p, _speciesName: speciesName, dateAdded: new Date().toISOString() }
        })
      )

      setItems(prev => [...prev, ...annotated])
      setHasMore(Boolean(data.next))
      if (data.next) setPage(nextPage + 1)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true
      load(1)
    }
  }, [])

  return { items, load, hasMore, loading, error, page }
}
