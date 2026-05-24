'use client'

import { useEffect } from 'react'

/**
 * **PÁGINA DE ERROR**
 * Maneja los errores que ocurren en la aplicación
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Error en la aplicación:', error)
  }, [error])

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>❌ Ha ocurrido un error</h1>
      <p>{error.message || 'Algo salió mal. Por favor, intenta de nuevo.'}</p>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.5rem 1rem',
          marginTop: '1rem',
          backgroundColor: '#00d4ff',
          color: '#000',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        🔄 Reintentar
      </button>
    </main>
  )
}
