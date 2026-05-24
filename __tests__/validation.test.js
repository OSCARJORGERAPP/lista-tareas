/**
 * **TESTS - VALIDACIONES**
 * Pruebas unitarias para las funciones de validación de tareas
 */

import { validations } from '@/lib/validation'

describe('Validations', () => {
  describe('validateNombre', () => {
    it('debe validar un nombre válido', () => {
      const result = validations.validateNombre('Mi Tarea')
      expect(result.isValid).toBe(true)
    })

    it('debe rechazar un nombre vacío', () => {
      const result = validations.validateNombre('')
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('El nombre es requerido')
    })

    it('debe rechazar un nombre con solo espacios', () => {
      const result = validations.validateNombre('   ')
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('El nombre no puede estar vacío')
    })

    it('debe rechazar un nombre que excede 100 caracteres', () => {
      const longName = 'a'.repeat(101)
      const result = validations.validateNombre(longName)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('El nombre no puede exceder 100 caracteres')
    })

    it('debe rechazar un nombre no string', () => {
      const result = validations.validateNombre(123)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('El nombre es requerido')
    })

    it('debe aceptar un nombre con exactamente 100 caracteres', () => {
      const name = 'a'.repeat(100)
      const result = validations.validateNombre(name)
      expect(result.isValid).toBe(true)
    })
  })

  describe('validateDescripcion', () => {
    it('debe validar una descripción válida', () => {
      const result = validations.validateDescripcion('Esta es una descripción válida')
      expect(result.isValid).toBe(true)
    })

    it('debe rechazar una descripción vacía', () => {
      const result = validations.validateDescripcion('')
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('La descripción es requerida')
    })

    it('debe rechazar una descripción con solo espacios', () => {
      const result = validations.validateDescripcion('   ')
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('La descripción no puede estar vacía')
    })

    it('debe rechazar una descripción que excede 500 caracteres', () => {
      const longDesc = 'a'.repeat(501)
      const result = validations.validateDescripcion(longDesc)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('La descripción no puede exceder 500 caracteres')
    })

    it('debe aceptar una descripción con exactamente 500 caracteres', () => {
      const desc = 'a'.repeat(500)
      const result = validations.validateDescripcion(desc)
      expect(result.isValid).toBe(true)
    })
  })

  describe('validateTarea', () => {
    it('debe validar una tarea completa y válida', () => {
      const tarea = {
        nombre: 'Tarea de prueba',
        descripcion: 'Esta es una descripción'
      }
      const result = validations.validateTarea(tarea)
      expect(result.isValid).toBe(true)
    })

    it('debe rechazar una tarea con nombre inválido', () => {
      const tarea = {
        nombre: '',
        descripcion: 'Descripción válida'
      }
      const result = validations.validateTarea(tarea)
      expect(result.isValid).toBe(false)
    })

    it('debe rechazar una tarea con descripción inválida', () => {
      const tarea = {
        nombre: 'Nombre válido',
        descripcion: ''
      }
      const result = validations.validateTarea(tarea)
      expect(result.isValid).toBe(false)
    })
  })

  describe('validateObjectId', () => {
    it('debe validar un ObjectId válido', () => {
      const result = validations.validateObjectId('507f1f77bcf86cd799439011')
      expect(result.isValid).toBe(true)
    })

    it('debe rechazar un ObjectId inválido', () => {
      const result = validations.validateObjectId('invalid')
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('ID inválido')
    })

    it('debe rechazar un ObjectId vacío', () => {
      const result = validations.validateObjectId('')
      expect(result.isValid).toBe(false)
    })

    it('debe rechazar un ObjectId nulo', () => {
      const result = validations.validateObjectId(null)
      expect(result.isValid).toBe(false)
    })
  })
})
