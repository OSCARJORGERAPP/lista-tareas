import { NextResponse } from 'next/server'
import { getTareasCollection } from '@/lib/mongodb'
import { validations } from '@/lib/validation'
import { ObjectId } from 'mongodb'

/**
 * **API GET /api/tareas**
 * Obtiene todas las tareas con soporte para filtrado por nombre.
 * Query params: search (opcional)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    const collection = await getTareasCollection()

    let query = {}
    if (search) {
      query = {
        nombre: { $regex: search, $options: 'i' }
      }
    }

    const tareas = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(tareas, { status: 200 })
  } catch (error) {
    console.error('❌ Error en GET /api/tareas:', error)
    return NextResponse.json(
      { error: 'Error al obtener tareas' },
      { status: 500 }
    )
  }
}

/**
 * **API POST /api/tareas**
 * Crea una nueva tarea con validaciones.
 * Body: { nombre, descripcion }
 */
export async function POST(request) {
  try {
    const body = await request.json()
    const { nombre, descripcion } = body

    // Validar datos
    const validation = validations.validateTarea({
      nombre,
      descripcion
    })

    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const collection = await getTareasCollection()

    const nuevaTarea = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const resultado = await collection.insertOne(nuevaTarea)

    return NextResponse.json(
      {
        _id: resultado.insertedId,
        ...nuevaTarea
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('❌ Error en POST /api/tareas:', error)
    return NextResponse.json(
      { error: 'Error al crear tarea' },
      { status: 500 }
    )
  }
}

/**
 * **API PUT /api/tareas**
 * Actualiza una tarea existente.
 * Body: { id, nombre, descripcion }
 */
export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, nombre, descripcion } = body

    // Validar ID
    const idValidation = validations.validateObjectId(id)
    if (!idValidation.isValid) {
      return NextResponse.json(
        { error: idValidation.error },
        { status: 400 }
      )
    }

    // Validar datos
    const validation = validations.validateTarea({
      nombre,
      descripcion
    })

    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const collection = await getTareasCollection()
    const objectId = new ObjectId(id)

    const resultado = await collection.findOneAndUpdate(
      { _id: objectId },
      {
        $set: {
          nombre: nombre.trim(),
          descripcion: descripcion.trim(),
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    )

    if (!resultado.value) {
      const tareaActualizada = await collection.findOne({ _id: objectId })
      if (!tareaActualizada) {
        return NextResponse.json(
          { error: 'Tarea no encontrada' },
          { status: 404 }
        )
      }
      return NextResponse.json(tareaActualizada, { status: 200 })
    }

    return NextResponse.json(resultado.value, { status: 200 })
  } catch (error) {
    console.error('❌ Error en PUT /api/tareas:', error)
    return NextResponse.json(
      { error: 'Error al actualizar tarea' },
      { status: 500 }
    )
  }
}

/**
 * **API DELETE /api/tareas**
 * Elimina una tarea por su ID.
 * Body: { id }
 */
export async function DELETE(request) {
  try {
    const body = await request.json()
    const { id } = body

    // Validar ID
    const idValidation = validations.validateObjectId(id)
    if (!idValidation.isValid) {
      return NextResponse.json(
        { error: idValidation.error },
        { status: 400 }
      )
    }

    const collection = await getTareasCollection()

    const resultado = await collection.deleteOne({
      _id: new ObjectId(id)
    })

    if (resultado.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Tarea no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Tarea eliminada correctamente' },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ Error en DELETE /api/tareas:', error)
    return NextResponse.json(
      { error: 'Error al eliminar tarea' },
      { status: 500 }
    )
  }
}
