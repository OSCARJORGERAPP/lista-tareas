/**
 * **VALIDACIONES**
 * Este módulo contiene todas las funciones de validación para las tareas.
 * Valida nombres, descripciones y otros campos requeridos.
 */

export const validations = {
  /**
   * Valida que el nombre de la tarea no esté vacío y tenga una longitud válida
   */
  validateNombre: (nombre) => {
    if (!nombre || typeof nombre !== 'string') {
      return { isValid: false, error: 'El nombre es requerido' }
    }
    if (nombre.trim().length === 0) {
      return { isValid: false, error: 'El nombre no puede estar vacío' }
    }
    if (nombre.length > 100) {
      return { isValid: false, error: 'El nombre no puede exceder 100 caracteres' }
    }
    return { isValid: true }
  },

  /**
   * Valida que la descripción tenga una longitud válida
   */
  validateDescripcion: (descripcion) => {
    if (!descripcion || typeof descripcion !== 'string') {
      return { isValid: false, error: 'La descripción es requerida' }
    }
    if (descripcion.trim().length === 0) {
      return { isValid: false, error: 'La descripción no puede estar vacía' }
    }
    if (descripcion.length > 500) {
      return { isValid: false, error: 'La descripción no puede exceder 500 caracteres' }
    }
    return { isValid: true }
  },

  /**
   * Valida una tarea completa
   */
  validateTarea: (tarea) => {
    const nombreValidation = validations.validateNombre(tarea.nombre)
    if (!nombreValidation.isValid) {
      return nombreValidation
    }

    const descripcionValidation = validations.validateDescripcion(tarea.descripcion)
    if (!descripcionValidation.isValid) {
      return descripcionValidation
    }

    return { isValid: true }
  },

  /**
   * Valida que el ID sea un ObjectId válido de MongoDB
   */
  validateObjectId: (id) => {
    if (!id || !/^[a-f\d]{24}$/i.test(id)) {
      return { isValid: false, error: 'ID inválido' }
    }
    return { isValid: true }
  },
}
