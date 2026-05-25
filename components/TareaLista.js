'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './TareaLista.module.css'

/**
 * **COMPONENTE TAREA LISTA**
 * Lista todas las tareas con filtro de búsqueda.
 * Propiedades:
 * - tareas: array de tareas a mostrar
 * - onSelect: función cuando se selecciona una tarea
 * - loading: indica si se está cargando
 */
export default function TareaLista({ tareas, onSelect, loading, onSearch }) {
  const [search, setSearch] = useState('')
  const searchTimeoutRef = useRef(null)

  const handleSearchChange = (value) => {
    setSearch(value)
    
    // Debounce para no hacer requests con cada tecla
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      onSearch(value)
    }, 300)
  }

  const handleClearSearch = () => {
    setSearch('')
    onSearch('')
  }

  return (
    <div className={styles.container}>
      <h2>📋 Lista de Tareas</h2>

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="🔍 Buscar tarea..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          disabled={loading}
          suppressHydrationWarning
        />
        {search && (
          <button
            type="button"
            onClick={handleClearSearch}
            className={styles.clearBtn}
            disabled={loading}
            title="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      {loading && <div className={styles.loading}>⏳ Cargando tareas...</div>}

      {!loading && tareas.length === 0 && (
        <div className={styles.emptyState}>
          <p>📭 No hay tareas. ¡Crea una nueva!</p>
        </div>
      )}

      {!loading && tareas.length > 0 && (
        <ul className={styles.list}>
          {tareas.map((tarea) => (
            <li
              key={tarea._id}
              className={styles.item}
              onClick={() => onSelect(tarea)}
            >
              <div className={styles.itemContent}>
                <h3>{tarea.nombre}</h3>
                <p>{tarea.descripcion.substring(0, 50)}...</p>
              </div>
              <div className={styles.itemMeta}>
                {tarea.createdAt && (
                  <span className={styles.date}>
                    {new Date(tarea.createdAt).toLocaleDateString('es-ES')}
                  </span>
                )}
              </div>
              <span className={styles.arrow}>→</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
