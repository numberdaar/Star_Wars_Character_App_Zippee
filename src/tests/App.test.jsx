import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import App from '../App'
import * as api from '../api'
import React from 'react'
import '@testing-library/jest-dom'

const mockPeople = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      birth_year: '19BBY',
      url: 'https://swapi.dev/api/people/1/',
      films: [],
      homeworld: 'https://swapi.dev/api/planets/1/'
    }
  ]
}

const mockHomeworld = {
  name: 'Tatooine',
  terrain: 'desert',
  climate: 'arid',
  population: '200000'
}

vi.spyOn(api, 'fetchPeoplePage').mockImplementation(async () => mockPeople)
vi.spyOn(api, 'fetchResource').mockImplementation(async (url) => {
  if (url.includes('planets')) return mockHomeworld
  return {}
})

test('opens modal on card click and displays homeworld', async () => {
  render(<App />)
  await waitFor(() => screen.getByText('Luke Skywalker'))
  const card = screen.getByText('Luke Skywalker')
  fireEvent.click(card)
  await waitFor(() => screen.getByText('Luke Skywalker'))
  expect(screen.getByText(/Homeworld/i)).toBeInTheDocument()
  await waitFor(() => screen.getByText(/Tatooine/))
  expect(screen.getByText('Tatooine')).toBeInTheDocument()
})
