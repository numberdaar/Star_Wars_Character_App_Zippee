import axios from 'axios'

const SWAPI_BASE = 'https://swapi.dev/api'

export async function fetchPeoplePage(page = 1) {
  const res = await axios.get(`${SWAPI_BASE}/people/?page=${page}`)
  return res.data
}

export async function fetchResource(url) {
  if (!url) return null
  const res = await axios.get(url)
  return res.data
}
