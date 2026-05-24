import './globals.css'

export const metadata = {
  title: 'Gestor de Tareas',
  description: 'CRUD profesional para gestionar tu lista de tareas con MongoDB y Next.js',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

/**
 * **LAYOUT ROOT**
 * Define la estructura HTML principal de toda la aplicación.
 * Aquí se incluyen los estilos globales y la estructura base.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#00d4ff" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
