# 🗄️ Configuración de MongoDB

## Instalación de MongoDB en Windows

### Opción 1: Descargar e Instalar (Recomendado)

1. **Descargar MongoDB Community Edition**
   - Ir a: https://www.mongodb.com/try/download/community
   - Seleccionar versión Windows (msi)
   - Descargar el instalador

2. **Ejecutar el instalador**
   - Hacer doble clic en el archivo `.msi` descargado
   - Seguir los pasos del asistente de instalación
   - Se recomienda instalar MongoDB como servicio (opción por defecto)

3. **Verificar instalación**
   ```powershell
   mongosh --version
   ```

### Opción 2: Usar MongoDB Atlas (Cloud)

Si prefieres usar MongoDB en la nube:

1. **Crear cuenta en Atlas**
   - Ir a: https://www.mongodb.com/cloud/atlas
   - Crear cuenta gratuita
   - Crear un cluster

2. **Obtener connection string**
   - Copiar la cadena de conexión
   - Actualizar `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/lista-tareas
   ```

## Iniciar MongoDB Localmente

### Windows (Servicio)

Si instalaste MongoDB como servicio, debe iniciarse automáticamente:

```powershell
# Verificar estado
Get-Service MongoDB

# Iniciar servicio (si está detenido)
Start-Service MongoDB

# Detener servicio
Stop-Service MongoDB
```

### Windows (Manual)

Si MongoDB no está como servicio:

```powershell
# Navegar a la carpeta de instalación (por defecto)
cd "C:\Program Files\MongoDB\Server\<version>\bin"

# Iniciar MongoDB
mongod
```

## Verificar Conexión

### Usando mongosh

```powershell
mongosh
```

Esto abrirá la shell de MongoDB. Verifica que se conecta a `mongodb://localhost:27017`

### Usando la aplicación

Si MongoDB está ejecutándose correctamente, al iniciar la aplicación verás en la consola:

```
✅ Conectado a MongoDB
```

## Crear Base de Datos

Si es la primera vez que ejecutas la aplicación:

1. **Conectar con mongosh**
   ```powershell
   mongosh
   ```

2. **Crear la base de datos**
   ```javascript
   use lista-tareas
   ```

3. **La colección 'tareas' se crea automáticamente**
   cuando insertes la primera tarea desde la aplicación.

## Verificar Datos en MongoDB

```powershell
mongosh

# Ver bases de datos
show dbs

# Usar la base de datos
use lista-tareas

# Ver colecciones
show collections

# Ver documentos en la colección tareas
db.tareas.find()

# Ver un documento formateado
db.tareas.findOne()
```

## Solución de Problemas

### MongoDB no inicia
- Verificar que no hay otra instancia ejecutándose
- Verificar permisos de carpeta `C:\Program Files\MongoDB`
- Revisar puerto 27017 no esté en uso

### Conexión rechazada
- Verificar que MongoDB esté ejecutándose
- Verificar puerto 27017 está escuchando
- Revisar firewall

### Base de datos vacía
- Normal, se crea con el primer documento
- Crear una tarea desde la aplicación

## Comandos Útiles

```powershell
# Conectar a MongoDB
mongosh

# Ver versión
mongosh --version

# Ver ayuda
mongosh --help

# Importar datos
mongoimport --db lista-tareas --collection tareas --file datos.json

# Exportar datos
mongoexport --db lista-tareas --collection tareas --out datos.json
```

## Backup de Datos

### Exportar
```powershell
mongodump --db lista-tareas --out ./backup
```

### Importar
```powershell
mongorestore --db lista-tareas ./backup/lista-tareas
```

## Notas de Seguridad

- En desarrollo local, no necesitas autenticación
- Para producción, activa autenticación
- Usa contraseñas fuertes
- Mantén MongoDB actualizado
- Realiza backups periódicos
