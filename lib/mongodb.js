import { MongoClient } from 'mongodb'

/**
 * **CONEXIÓN A MONGODB**
 * Este módulo establece y gestiona la conexión a la base de datos MongoDB
 * en localhost. Utiliza un patrón singleton para reutilizar la conexión
 * entre requests en desarrollo y producción.
 */

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lista-tareas'

let cachedClient = null

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient
  }

  try {
    const client = new MongoClient(MONGODB_URI, {
      retryWrites: true,
      w: 'majority',
      maxPoolSize: 10,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })

    await client.connect()
    cachedClient = client
    console.log('✅ Conectado a MongoDB')

    const db = client.db('lista-tareas')
    const collection = db.collection('tareas')
    await collection.createIndex({ nombre: 1 })
    console.log('✅ Índices creados')

    return client
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error)
    throw error
  }
}

export async function getDatabase() {
  const client = await connectToDatabase()
  return client.db('lista-tareas')
}

export async function getTareasCollection() {
  const db = await getDatabase()
  return db.collection('tareas')
}

export async function closeDatabaseConnection() {
  if (cachedClient) {
    await cachedClient.close()
    cachedClient = null
  }
}
