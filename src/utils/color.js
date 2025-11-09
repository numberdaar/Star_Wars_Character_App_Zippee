const COLORS = [
  'bg-rose-200', 'bg-amber-200', 'bg-lime-200', 'bg-sky-200', 'bg-violet-200',
  'bg-teal-200', 'bg-pink-200', 'bg-green-200', 'bg-indigo-200', 'bg-yellow-200',
  'bg-orange-200', 'bg-cyan-200', 'bg-fuchsia-200'
]

export function speciesColor(name = '', seed = '') {
  // Combine species + seed (like character name) for more variation
  const key = (name || 'Human') + seed
  let n = 0
  for (let i = 0; i < key.length; i++) {
    n = (n * 31 + key.charCodeAt(i)) % COLORS.length
  }
  return COLORS[n]
}
