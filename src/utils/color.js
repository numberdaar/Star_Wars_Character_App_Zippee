const COLORS = [
  'bg-rose-200', 'bg-amber-200', 'bg-lime-200', 'bg-sky-200', 'bg-violet-200',
  'bg-teal-200', 'bg-pink-200', 'bg-green-200', 'bg-indigo-200', 'bg-yellow-200'
]

export function speciesColor(name = '') {
  if (!name) return 'bg-gray-200'
  let n = 0
  for (let i = 0; i < name.length; i++) n = (n * 31 + name.charCodeAt(i)) % COLORS.length
  return COLORS[n]
}
