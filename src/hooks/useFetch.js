import { useState, useEffect, useRef } from 'react'
import { fetchPeoplePage } from '../api'

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
      const annotated = data.results.map(p => ({ ...p, dateAdded: new Date().toISOString() }))
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
