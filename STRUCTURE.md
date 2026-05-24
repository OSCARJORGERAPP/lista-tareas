# 🏗️ Estructura de la Aplicación

## 📊 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENTE (React/Next.js)                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  app/page.js (Página Principal - Home Page)         │  │
│  │  ├── TareaForm (Crear/Editar tareas)               │  │
│  │  ├── TareaLista (Listar y buscar tareas)           │  │
│  │  └── TareaDetalle (Ver detalles y menú)            │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↕                                │
│                      Axios Requests                         │
│                            ↕                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │        SERVIDOR (Next.js API Routes)               │  │
│  │  app/api/tareas/route.js (CRUD Operations)         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│              VALIDACIONES Y SERVICIOS                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  lib/validation.js (Validar datos)                  │  │
│  │  lib/mongodb.js (Conexión a BD)                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│          BASE DE DATOS (MongoDB en localhost)               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Colección: tareas                                   │  │
│  │  - _id: ObjectId                                     │  │
│  │  - nombre: String                                    │  │
│  │  - descripcion: String                               │  │
│  │  - createdAt: Date                                   │  │
│  │  - updatedAt: Date                                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Árbol de Directorios

```
lista-tareas/
│
├── app/                                    # Directorio principal de Next.js App Router
│   ├── api/
│   │   └── tareas/
│   │       └── route.js                   # 🔌 **API CRUD COMPLETA** - GET, POST, PUT, DELETE
│   ├── globals.css                        # 🎨 **ESTILOS GLOBALES** - Tema oscuro + variables CSS
│   ├── layout.js                          # 📄 **LAYOUT ROOT** - Estructura HTML base
│   ├── page.js                            # 🏠 **PÁGINA PRINCIPAL** - Componente HOME con estado CRUD
│   └── page.module.css                    # 📐 **ESTILOS PÁGINA** - Grid responsive
│
├── components/                             # Componentes React reutilizables
│   ├── TareaForm.js                       # 📝 **FORMULARIO** - Crear/Editar tareas con validación
│   ├── TareaForm.module.css               # 📐 **ESTILOS FORM** - Diseño responsivo
│   ├── TareaLista.js                      # 📋 **LISTA** - Mostrar tareas filtradas con búsqueda
│   ├── TareaLista.module.css              # 📐 **ESTILOS LISTA** - Lista scrollable
│   ├── TareaDetalle.js                    # 👁️ **DETALLE** - Ver tarea + menú contextual
│   └── TareaDetalle.module.css            # 📐 **ESTILOS DETALLE** - Panel lateral
│
├── lib/                                    # Librerías y servicios
│   ├── mongodb.js                         # 🗄️ **CONEXIÓN MONGODB** - Singleton pattern
│   └── validation.js                      # ✅ **VALIDACIONES** - Reglas de negocio
│
├── __tests__/                             # Suite de pruebas
│   ├── validation.test.js                 # ✔️ **TESTS VALIDACIÓN** - Casos de prueba
│   └── components.test.js                 # ✔️ **TESTS COMPONENTES** - Pruebas React
│
├── public/                                # Archivos estáticos (vacío)
│
├── .env.example                           # 📋 **VARS ENV** - Template de variables
├── .env.local                             # 📋 **VARS ENV LOCAL** - Variables activas
├── .gitignore                             # 🚫 **GIT IGNORE** - Archivos a no versionar
├── .babelrc                               # ⚙️ **CONFIG BABEL** - Transpilación
├── next.config.js                        # ⚙️ **CONFIG NEXT.JS** - Configuración
├── jest.config.js                        # ⚙️ **CONFIG JEST** - Testing
├── jest.setup.js                         # ⚙️ **SETUP JEST** - Inicialización testing
├── package.json                          # 📦 **DEPENDENCIAS** - Librerías y scripts
│
├── README.md                             # 📖 **DOCUMENTACIÓN PRINCIPAL** - Guía completa
├── MONGODB_SETUP.md                      # 🗄️ **SETUP MONGODB** - Instalación y configuración
└── STRUCTURE.md                          # 🏗️ **ESTRUCTURA** - Este archivo
```

## 🔄 Flujo de Datos

### 1. **CREAR TAREA**
```
Usuario llena formulario (TareaForm)
    ↓
Validación local (validation.js)
    ↓
POST /api/tareas { nombre, descripcion }
    ↓
Validación servidor (validation.js)
    ↓
INSERT en MongoDB
    ↓
Respuesta con _id, timestamps
    ↓
Actualizar estado en TareaLista
    ↓
Mostrar mensaje de éxito
```

### 2. **LISTAR TAREAS**
```
Componente monta (useEffect)
    ↓
GET /api/tareas?search=...
    ↓
FIND en MongoDB
    ↓
Respuesta JSON []
    ↓
TareaLista renderiza items
    ↓
Usuario puede hacer click en tarea
```

### 3. **ACTUALIZAR TAREA**
```
Click en "Actualizar" en menú contextual
    ↓
TareaForm se rellena con datos de TareaActual
    ↓
Usuario modifica campos
    ↓
Submit del formulario
    ↓
PUT /api/tareas { id, nombre, descripcion }
    ↓
UPDATEONE en MongoDB
    ↓
Respuesta con documento actualizado
    ↓
Actualizar lista y mostrar éxito
```

### 4. **ELIMINAR TAREA**
```
Click en "Eliminar" en menú contextual
    ↓
Mostrar diálogo de confirmación
    ↓
Si confirma:
    ↓
DELETE /api/tareas { id }
    ↓
DELETEONE en MongoDB
    ↓
Eliminar de TareaLista
    ↓
Mostrar mensaje de éxito
```

## 🧩 Componentes Detallados

### **🏠 app/page.js (HOME PAGE)**
**Estado:**
- `tareas[]` - Array de todas las tareas
- `loading` - Indicador de carga
- `error` - Mensaje de error
- `success` - Mensaje de éxito
- `tareaActual` - Tarea en edición
- `tareaSeleccionada` - Tarea visualizada

**Funciones principales:**
- `cargarTareas(search)` - Obtiene tareas del servidor
- `crearTarea(datos)` - POST nueva tarea
- `actualizarTarea(datos)` - PUT tarea existente
- `eliminarTarea(id)` - DELETE tarea
- `handleSeleccionarTarea(tarea)` - Click en tarea
- `handleBusqueda(search)` - Filtrar por nombre

### **📝 components/TareaForm.js**
**Props:**
- `onSubmit` - Callback cuando se envía
- `tareaActual` - Tarea a editar (null si crear)
- `loading` - Boolean
- `error` - Mensaje de error

**Validaciones:**
- Nombre: requerido, 1-100 caracteres
- Descripción: requerida, 1-500 caracteres

**Features:**
- Contador de caracteres
- Mostrar estado de carga
- Mostrar errores
- Cancelar edición

### **📋 components/TareaLista.js**
**Props:**
- `tareas[]` - Lista de tareas
- `onSelect` - Callback click
- `loading` - Boolean
- `onSearch` - Callback búsqueda

**Validaciones:**
- Debounce en búsqueda (300ms)

**Features:**
- Búsqueda en tiempo real
- Limpiar búsqueda
- Mostrar fecha
- Scroll infinito

### **👁️ components/TareaDetalle.js**
**Props:**
- `tarea` - Tarea a mostrar
- `onEditar` - Callback edit
- `onEliminar` - Callback delete
- `onCerrar` - Callback close
- `loading` - Boolean

**Menú contextual:**
- 👁️ Leer (solo muestra)
- ✏️ Actualizar (editar)
- 🗑️ Eliminar (con confirmación)

**Confirmación de eliminación:**
- Mostrar nombre de tarea
- Opción para confirmar o cancelar

## 🗄️ Estructura de Datos - MongoDB

### Documento en la colección "tareas"
```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "nombre": "Estudiar Next.js",
  "descripcion": "Aprender routing, API routes y deployment",
  "createdAt": ISODate("2024-01-15T10:30:00Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00Z")
}
```

### Consultas MongoDB principales
```javascript
// Obtener todas las tareas
db.tareas.find({})

// Buscar por nombre (case-insensitive)
db.tareas.find({ nombre: { $regex: "busqueda", $options: "i" } })

// Obtener una tarea por ID
db.tareas.findOne({ _id: ObjectId("...") })

// Actualizar tarea
db.tareas.updateOne({ _id: ObjectId("...") }, { $set: { nombre: "..." } })

// Eliminar tarea
db.tareas.deleteOne({ _id: ObjectId("...") })
```

## 🎨 Paleta de Colores

| Uso | Color | Hex | Variable CSS |
|-----|-------|-----|-------------|
| Primario/Acentos | Cian | #00d4ff | --color-primary |
| Éxito | Verde | #00ff00 | --color-success |
| Peligro/Error | Rojo | #ff0000 | --color-danger |
| Advertencia | Naranja | #ffaa00 | --color-warning |
| Fondo Oscuro | Muy Oscuro | #0f0f1e | --color-bg-dark |
| Fondo Medio | Oscuro | #1a1a2e | --color-bg-medium |
| Fondo Claro | Gris Oscuro | #2d2d44 | --color-bg-light |
| Texto Principal | Blanco | #ffffff | --color-text-primary |
| Texto Secundario | Gris Claro | #aaaaaa | --color-text-secondary |
| Texto Muted | Gris | #666666 | --color-text-muted |

## 📝 Validaciones Implementadas

### Cliente (React)
- Nombre no vacío
- Nombre máximo 100 caracteres
- Descripción no vacía
- Descripción máximo 500 caracteres
- Mostrar contador de caracteres

### Servidor (Node.js/API)
- Validar datos recibidos
- Validar ObjectId de MongoDB
- Validar longitud de campos
- Validar tipos de datos
- Retornar errores descriptivos

## 🧪 Testing

### Validación
- ✔️ Nombre válido
- ✔️ Nombre vacío
- ✔️ Nombre muy largo
- ✔️ Descripción válida
- ✔️ Descripción vacía
- ✔️ Descripción muy larga
- ✔️ ObjectId válido
- ✔️ ObjectId inválido

### Componentes
- ✔️ TareaForm renderiza
- ✔️ Validación local funciona
- ✔️ Envío de formulario
- ✔️ Modo edición
- ✔️ Estados de loading/error
- ✔️ Contador de caracteres

## 🚀 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|------------|
| Dev | `npm run dev` | Inicia servidor desarrollo en :3007 |
| Build | `npm run build` | Compila para producción |
| Start | `npm start` | Inicia servidor producción |
| Test | `npm test` | Ejecuta pruebas una vez |
| Test Watch | `npm run test:watch` | Ejecuta pruebas en modo watch |
| Lint | `npm run lint` | Ejecuta linter |

## 📋 Requisitos Cumplidos

✅ CRUD completo (Crear, Leer, Actualizar, Eliminar)
✅ Almacenamiento en MongoDB local
✅ Aspecto profesional y responsive
✅ Campos nombre y descripción
✅ Listado de tareas
✅ Filtro de búsqueda
✅ Menú contextual (Leer, Actualizar, Eliminar)
✅ Confirmación de eliminación
✅ Edición en formulario
✅ Visualización de detalle
✅ Colores oscuros + caracteres blancos
✅ Next.js
✅ MongoDB driver nativo
✅ Comentarios en mayúscula y negrita
✅ Validaciones cliente y servidor
✅ Testing con Jest
