/**
 * **TESTS - COMPONENTES**
 * Pruebas para los componentes React de la aplicación
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import TareaForm from '@/components/TareaForm'

describe('TareaForm Component', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('debe renderizar el formulario correctamente', () => {
    render(<TareaForm onSubmit={mockOnSubmit} loading={false} error="" />)

    expect(screen.getByText('➕ Nueva Tarea')).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre de Tarea *')).toBeInTheDocument()
    expect(screen.getByLabelText('Descripción *')).toBeInTheDocument()
  })

  it('debe mostrar error de validación cuando el nombre está vacío', () => {
    render(<TareaForm onSubmit={mockOnSubmit} loading={false} error="" />)

    const submitButton = screen.getByText('➕ Crear')
    fireEvent.click(submitButton)

    expect(screen.getByText('El nombre es requerido')).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('debe mostrar error de validación cuando la descripción está vacía', () => {
    render(<TareaForm onSubmit={mockOnSubmit} loading={false} error="" />)

    const nombreInput = screen.getByPlaceholderText('Ingresa el nombre de la tarea')

    fireEvent.change(nombreInput, { target: { value: 'Tarea de prueba' } })
    fireEvent.click(screen.getByText('➕ Crear'))

    expect(screen.getByText('La descripción es requerida')).toBeInTheDocument()
  })

  it('debe llamar a onSubmit con datos válidos', () => {
    render(<TareaForm onSubmit={mockOnSubmit} loading={false} error="" />)

    const nombreInput = screen.getByPlaceholderText('Ingresa el nombre de la tarea')
    const descripcionInput = screen.getByPlaceholderText('Ingresa la descripción de la tarea')

    fireEvent.change(nombreInput, { target: { value: 'Mi Tarea' } })
    fireEvent.change(descripcionInput, { target: { value: 'Mi descripción' } })
    fireEvent.click(screen.getByText('➕ Crear'))

    expect(mockOnSubmit).toHaveBeenCalledWith({
      nombre: 'Mi Tarea',
      descripcion: 'Mi descripción'
    })
  })

  it('debe mostrar "Actualizar Tarea" cuando tareaActual está presente', () => {
    const tarea = {
      _id: '123',
      nombre: 'Tarea existente',
      descripcion: 'Descripción existente'
    }

    render(
      <TareaForm
        onSubmit={mockOnSubmit}
        tareaActual={tarea}
        loading={false}
        error=""
      />
    )

    expect(screen.getByText('✏️ Actualizar Tarea')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Tarea existente')).toBeInTheDocument()
  })

  it('debe deshabilitar el botón cuando loading es true', () => {
    render(<TareaForm onSubmit={mockOnSubmit} loading={true} error="" />)

    const submitButton = screen.getByText('⏳ Procesando...')
    expect(submitButton).toBeDisabled()
  })

  it('debe mostrar mensaje de error cuando error prop está presente', () => {
    const errorMsg = 'Error al crear la tarea'
    render(<TareaForm onSubmit={mockOnSubmit} loading={false} error={errorMsg} />)

    expect(screen.getByText(errorMsg)).toBeInTheDocument()
  })

  it('debe mostrar contador de caracteres', () => {
    render(<TareaForm onSubmit={mockOnSubmit} loading={false} error="" />)

    const nombreInput = screen.getByPlaceholderText('Ingresa el nombre de la tarea')
    fireEvent.change(nombreInput, { target: { value: 'Hola' } })

    expect(screen.getByText('4/100')).toBeInTheDocument()
  })
})
