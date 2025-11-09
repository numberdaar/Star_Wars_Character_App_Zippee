import React from 'react'
import { speciesColor } from '../utils/color'

const imageFor = (id) => `https://picsum.photos/seed/sw-${id}/400/300`

export default function CharacterCard({ person, onOpen }) {
  const speciesName = person._speciesName || 'Human'
  const colorClass = speciesColor(speciesName)
  const id = person.url?.split('/').filter(Boolean).pop() || person.name

  return (
    <div className="rounded-lg shadow-sm overflow-hidden bg-white hover:shadow-md transition cursor-pointer" onClick={() => onOpen(person)}>
      <div className={`p-3 ${colorClass} flex items-center gap-3`}>
        <div className="w-12 h-12 rounded-md overflow-hidden">
          <img src={imageFor(id)} alt={person.name} className="w-full h-full object-cover"/>
        </div>
        <div>
          <div className="font-semibold text-gray-800">{person.name}</div>
          <div className="text-sm text-gray-600">{speciesName}</div>
        </div>
      </div>
      <div className="p-3 text-sm text-gray-600">
        <div>Birth Year: {person.birth_year}</div>
        <div>Height: {person.height} cm</div>
      </div>
    </div>
  )
}
