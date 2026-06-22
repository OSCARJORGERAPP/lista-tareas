'use client'

import { useState } from 'react'
import styles from './TareaDetalle.module.css'

/**
 * **COMPONENTE TAREA DETALLE**
 * Muestra el detalle de una tarea con menú contextual de acciones.
 * Propiedades:
 * - tarea: tarea seleccionada
 * - onEditar: función para editar
 * - onEliminar: función para eliminar
 * - onCerrar: función para cerrar el panel
 * - loading: indica si se está procesando
 */
export default function TareaDetalle({
  tarea,
  onEditar,
  onEliminar,
  onCerrar,
  loading
}) {
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  if (!tarea) return null

  const handleContextMenuOpen = () => {
    setShowContextMenu(!showContextMenu)
    setShowConfirmDelete(false)
  }

  const handleAccion = (action) => {
    switch (action) {
      case 'leer':
        setShowContextMenu(false)
        break
      case 'actualizar':
        setShowContextMenu(false)
        onEditar(tarea)
        break
      case 'eliminar':
        setShowConfirmDelete(true)
        break
      default:
        break
    }
  }

  const handleConfirmDelete = () => {
    onEliminar(tarea._id)
    setShowConfirmDelete(false)
    setShowContextMenu(false)
  }

  const handleCancelDelete = () => {
    setShowConfirmDelete(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>📖 Detalles de Tarea</h2>
        <button
          className={styles.closeBtn}
          onClick={onCerrar}
          disabled={loading}
          title="Cerrar"
          suppressHydrationWarning
        >
          ✕
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.field}>
          <label>Nombre</label>
          <p className={styles.value}>{tarea.nombre}</p>
        </div>

        <div className={styles.field}>
          <label>Descripción</label>
          <p className={styles.value}>{tarea.descripcion}</p>
        </div>

        {tarea.createdAt && (
          <div className={styles.field}>
            <label>Creada</label>
            <p className={styles.value}>
              {new Date(tarea.createdAt).toLocaleString('es-ES')}
            </p>
          </div>
        )}

        {tarea.updatedAt && (
          <div className={styles.field}>
            <label>Última actualización</label>
            <p className={styles.value}>
              {new Date(tarea.updatedAt).toLocaleString('es-ES')}
            </p>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <div className={styles.menuContainer}>
          <button
            className={styles.menuBtn}
            onClick={handleContextMenuOpen}
            disabled={loading}
            title="Abrir menú de acciones"
            suppressHydrationWarning
          >
            ⋮ Acciones
          </button>

          {showContextMenu && (
            <div className={styles.contextMenu}>
              <button
                onClick={() => handleAccion('leer')}
                className={styles.menuItem}
                disabled={loading}
                suppressHydrationWarning
              >
                👁️ Leer
              </button>
              <button
                onClick={() => handleAccion('actualizar')}
                className={styles.menuItem}
                disabled={loading}
                suppressHydrationWarning
              >
                ✏️ Actualizar
              </button>
              <button
                onClick={() => handleAccion('eliminar')}
                className={`${styles.menuItem} ${styles.delete}`}
                disabled={loading}
                suppressHydrationWarning
              >
                🗑️ Eliminar
              </button>
            </div>
          )}
        </div>
      </div>

      {showConfirmDelete && (
        <div className={styles.confirmDialog}>
          <div className={styles.dialogContent}>
            <h3>⚠️ Confirmar Eliminación</h3>
            <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
            <p className={styles.taskName}>"{tarea.nombre}"</p>
            <div className={styles.dialogButtons}>
              <button
                onClick={handleConfirmDelete}
                className={styles.confirmBtn}
                disabled={loading}
                suppressHydrationWarning
              >
                {loading ? '⏳ Eliminando...' : '✓ Eliminar'}
              </button>
              <button
                onClick={handleCancelDelete}
                className={styles.cancelBtn}
                disabled={loading}
                suppressHydrationWarning
              >
                ✕ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
