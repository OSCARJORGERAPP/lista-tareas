'use client'

import { useState, useEffect } from 'react'
import styles from './TareaForm.module.css'

/**
 * **COMPONENTE TAREA FORM**
 * Formulario para crear y actualizar tareas.
 * Propiedades:
 * - onSubmit: función que se ejecuta al enviar el formulario
 * - tareaActual: tarea a editar (si existe)
 * - loading: indica si se está procesando
 * - error: mensaje de error
 */
export default function TareaForm({ onSubmit, tareaActual, loading, error, resetTrigger }) {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    if (tareaActual) {
      setNombre(tareaActual.nombre)
      setDescripcion(tareaActual.descripcion)
    } else {
      setNombre('')
      setDescripcion('')
    }
    setValidationError('')
  }, [tareaActual, resetTrigger])

  const handleSubmit = (e) => {
    e.preventDefault()
    setValidationError('')

    // Validaciones locales
    if (!nombre.trim()) {
      setValidationError('El nombre es requerido')
      return
    }
    if (nombre.length > 100) {
      setValidationError('El nombre no puede exceder 100 caracteres')
      return
    }
    if (!descripcion.trim()) {
      setValidationError('La descripción es requerida')
      return
    }
    if (descripcion.length > 500) {
      setValidationError('La descripción no puede exceder 500 caracteres')
      return
    }

    onSubmit({ nombre, descripcion })
  }

  const handleReset = () => {
    setNombre('')
    setDescripcion('')
    setValidationError('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{tareaActual ? '✏️ Actualizar Tarea' : '➕ Nueva Tarea'}</h2>

      {(error || validationError) && (
        <div className={styles.errorMessage}>
          {error || validationError}
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="nombre">Nombre de Tarea *</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingresa el nombre de la tarea"
          maxLength="100"
          disabled={loading}
        />
        <span className={styles.charCount}>{nombre.length}/100</span>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="descripcion">Descripción *</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ingresa la descripción de la tarea"
          maxLength="500"
          rows="4"
          disabled={loading}
        />
        <span className={styles.charCount}>{descripcion.length}/500</span>
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="submit"
          disabled={loading}
          className={styles.submitBtn}
        >
          {loading ? '⏳ Procesando...' : (tareaActual ? '💾 Actualizar' : '➕ Crear')}
        </button>
        {tareaActual && (
          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className={styles.resetBtn}
          >
            ❌ Cancelar Edición
          </button>
        )}
        {!tareaActual && (nombre || descripcion) && (
          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className={styles.resetBtn}
          >
            ❌ Limpiar
          </button>
        )}
      </div>
    </form>
  )
}
