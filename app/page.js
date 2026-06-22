'use client'

import { useState, useEffect, useCallback } from 'react'
import TareaForm from '@/components/TareaForm'
import TareaLista from '@/components/TareaLista'
import TareaDetalle from '@/components/TareaDetalle'
import styles from './page.module.css'

/**
 * **PÁGINA PRINCIPAL - HOME PAGE**
 * Componente principal que integra el formulario, lista y detalle de tareas.
 * Gestiona toda la lógica del CRUD y el estado de la aplicación.
 */
export default function Home() {
  const [tareas, setTareas] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [tareaActual, setTareaActual] = useState(null)
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null)
  const [resetFormTrigger, setResetFormTrigger] = useState(0)

  /**
   * **FUNCIÓN: CARGAR TAREAS**
   * Obtiene todas las tareas del servidor con búsqueda opcional
   */
  const cargarTareas = useCallback(async (search = '') => {
    setLoading(true)
    setError('')
    try {
      const query = search ? `?search=${encodeURIComponent(search)}` : ''
      const response = await fetch(`/api/tareas${query}`)
      
      if (!response.ok) {
        throw new Error('Error al cargar tareas')
      }
      
      const data = await response.json()
      setTareas(data)
    } catch (err) {
      console.error('❌ Error:', err)
      setError('No se pudieron cargar las tareas. Verifica la conexión a MongoDB.')
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * **HOOK: CARGAR TAREAS AL INICIAR**
   * Se ejecuta cuando el componente se monta
   */
  useEffect(() => {
    cargarTareas()
  }, [cargarTareas])

  /**
   * **FUNCIÓN: CREAR TAREA**
   * Envía una nueva tarea al servidor
   */
  const crearTarea = async (datosForm) => {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const response = await fetch('/api/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosForm)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear tarea')
      }

      setTareas([data, ...tareas])
      setSuccess('✅ Tarea creada exitosamente')
      setTareaActual(null)
      setResetFormTrigger(prev => prev + 1)
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('❌ Error:', err)
      setError(err.message || 'Error al crear la tarea')
    } finally {
      setLoading(false)
    }
  }

  /**
   * **FUNCIÓN: ACTUALIZAR TAREA**
   * Actualiza una tarea existente en el servidor
   */
  const actualizarTarea = async (datosForm) => {
    if (!tareaActual) return

    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const response = await fetch('/api/tareas', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: tareaActual._id,
          ...datosForm
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al actualizar tarea')
      }

      setTareas(tareas.map(t => t._id === tareaActual._id ? data : t))
      setSuccess('✅ Tarea actualizada exitosamente')
      setTareaActual(null)
      setTareaSeleccionada(null)
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('❌ Error:', err)
      setError(err.message || 'Error al actualizar la tarea')
    } finally {
      setLoading(false)
    }
  }

  /**
   * **FUNCIÓN: ELIMINAR TAREA**
   * Elimina una tarea del servidor tras confirmación
   */
  const eliminarTarea = async (id) => {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const response = await fetch('/api/tareas', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al eliminar tarea')
      }

      setTareas(tareas.filter(t => t._id !== id))
      setSuccess('✅ Tarea eliminada exitosamente')
      setTareaSeleccionada(null)
      setTareaActual(null)
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('❌ Error:', err)
      setError(err.message || 'Error al eliminar la tarea')
    } finally {
      setLoading(false)
    }
  }

  /**
   * **FUNCIÓN: MANEJAR SELECCIÓN DE TAREA**
   * Cuando el usuario clickea en una tarea de la lista
   */
  const handleSeleccionarTarea = (tarea) => {
    setTareaSeleccionada(tarea)
    setTareaActual(null)
  }

  /**
   * **FUNCIÓN: MANEJAR BÚSQUEDA**
   * Filtra tareas por nombre
   */
  const handleBusqueda = async (search) => {
    await cargarTareas(search)
  }

  /**
   * **FUNCIÓN: MANEJAR EDICIÓN**
   * Prepara una tarea para ser editada
   */
  const handleEditar = (tarea) => {
    setTareaActual(tarea)
    setTareaSeleccionada(null)
  }

  /**
   * **FUNCIÓN: MANEJAR ENVÍO DE FORMULARIO**
   * Decide si crear o actualizar según el estado
   */
  const handleSubmitForm = (datosForm) => {
    if (tareaActual) {
      actualizarTarea(datosForm)
    } else {
      crearTarea(datosForm)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>✅ Gestor de Tareas</h1>
          <p>Administra tus tareas de forma fácil y eficiente</p>
        </div>

        {error && (
          <div className={styles.alertError}>
            <span>❌</span>
            <div>
              <strong>Error</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className={styles.alertSuccess}>
            <span>✅</span>
            <div>
              <strong>Éxito</strong>
              <p>{success}</p>
            </div>
          </div>
        )}

        <div className={styles.mainGrid}>
          <div className={styles.leftPanel}>
            <TareaForm
              onSubmit={handleSubmitForm}
              tareaActual={tareaActual}
              loading={loading}
              error={error}
              resetTrigger={resetFormTrigger}
            />

            <TareaLista
              tareas={tareas}
              onSelect={handleSeleccionarTarea}
              loading={loading}
              onSearch={handleBusqueda}
            />
          </div>

          <div className={styles.rightPanel}>
            {tareaSeleccionada && (
              <TareaDetalle
                tarea={tareaSeleccionada}
                onEditar={handleEditar}
                onEliminar={eliminarTarea}
                onCerrar={() => setTareaSeleccionada(null)}
                loading={loading}
              />
            )}
            {!tareaSeleccionada && !tareaActual && (
              <div className={styles.emptyPanel}>
                <p>👈 Selecciona una tarea para ver sus detalles</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
