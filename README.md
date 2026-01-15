🚀 Portfolio Hub - Gestión de Perfiles Profesionales
Portfolio Hub es una plataforma web moderna diseñada para que profesionales de diversas áreas (Diseño, Legal, Salud, Ingeniería, etc.) puedan gestionar y desplegar su marca personal de manera eficiente.

El sistema permite a los usuarios registrarse, personalizar su información profesional a través de un Dashboard administrativo y generar un portafolio público dinámico.

✨ Características Principales
🛠️ Panel de Administración (Dashboard)
Un entorno privado completo para gestionar cada sección de tu perfil profesional:

Gestión de Proyectos: Sube y edita tus trabajos destacados con soporte para imágenes y enlaces.

Habilidades Tecnológicas: Organiza tus competencias por categorías personalizadas.

Trayectoria Profesional: Línea de tiempo detallada para Experiencia Laboral y Educación.

Certificaciones: Espacio dedicado para credenciales y logros académicos.

Redes Sociales: Configuración de enlaces externos para contacto directo.

🌐 Vista Pública
Landing Page de Impacto: Interfaz moderna con animaciones de partículas y efectos 3D.

Explorador de Portafolios: Listado dinámico de todos los usuarios registrados en la plataforma.

Perfil Detallado: Vista individual optimizada para mostrar la biografía, proyectos y habilidades del usuario.

🎨 Experiencia de Usuario (UX)
Modo Oscuro/Claro: Implementado con persistencia de estado mediante Zustand.

Diseño Responsivo: Optimizado para dispositivos móviles y escritorio usando Tailwind CSS.

Navegación Fluida: Transiciones suaves y carga diferida (Lazy Loading) para un rendimiento óptimo.

🛠️ Stack Tecnológico
Frontend: React 18 con TypeScript.

Bundler: Vite + SWC (Compilación ultra rápida).

Estado Global: Zustand.

Gestión de Datos: TanStack Query (React Query) v5 para consumo de APIs y caché.

Formularios: React Hook Form + Zod (Validación de esquemas).

Animaciones: Framer Motion y Lucide React para iconografía.

Estilos: Tailwind CSS v3.

🚀 Instalación y Desarrollo
Clonar el repositorio:

Bash

git clone https://github.com/tu-usuario/portfolio-hub.git
Instalar dependencias:

Bash

npm install
Configurar variables de entorno: Crea un archivo .env basado en la configuración del proyecto (URL de la API, etc.).

Iniciar servidor de desarrollo:

Bash

npm run dev
🏗️ Estructura del Proyecto
Plaintext

src/
├── components/     # Componentes UI reutilizables y Layouts
├── hooks/          # Hooks personalizados para lógica de negocio (API, Auth)
├── modules/        # Módulos principales (Admin, Auth, Landing, Portafolio)
├── services/       # Llamadas a servicios de API mediante Axios
├── store/          # Gestión de estado con Zustand
└── types/          # Definiciones de TypeScript y esquemas Zod
