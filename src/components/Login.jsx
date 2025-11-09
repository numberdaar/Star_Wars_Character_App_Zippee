import React, { useState } from 'react'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === 'user' && password === '1234') {
      localStorage.setItem('token', 'mock-jwt-token')
      onLogin()
    } else {
      setError('Invalid credentials. Try user / 1234.')
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button type="submit" className="bg-indigo-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  )
}
