# 📌 Dashboard COVID-19 - Colombia

Este proyecto es un dashboard interactivo que muestra la distribución de casos de COVID-19 en Colombia mediante un mapa interactivo de Google Maps.

## 🌍 Descripción General

La aplicación permite visualizar los casos confirmados, recuperados y fallecidos en cada departamento de Colombia.

### **🔹 Características Principales**
- Mapa interactivo con polígonos por departamento.
- Visualización de estadísticas generales y filtradas.
- Información detallada al pasar el mouse sobre un departamento.
- Filtros por departamento y estado del paciente.

---

## 🛠 Tecnologías Utilizadas

- **Vue 3** - Framework principal.
- **Vuetify** - Estilización UI.
- **Pinia** - Manejo de estado.
- **Axios** - Consumo de APIs.
- **Google Maps API** - Visualización del mapa.
- **TypeScript** - Tipado fuerte en Vue.

---

## 🚀 Instalación y Ejecución

### **1️⃣ Clonar el Repositorio**
```bash
git clone https://github.com/OscarRoman1230/COVID-19-TRACKER.git
cd COVID-19-TRACKER
```

### **2️⃣ Instalar Dependencias**
```bash
npm install
```

### **3️⃣ Ejecutar el Proyecto**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`

---

## 📊 Uso de la Aplicación

1. **Iniciar Sesión**: Ingresar usuario y contraseña (simulado).
2. **Explorar el Mapa**: Mueve el cursor sobre los departamentos para ver información detallada.
3. **Aplicar Filtros**: Selecciona un departamento o estado para actualizar los datos mostrados.
4. **Cerrar Sesión**: Desde el menú superior.

---

## 📸 Capturas de Pantalla

_Agrega aquí imágenes del dashboard funcionando._

---

## 📂 Estructura del Proyecto
```
📦 src
 ┣ 📂 components  # Componentes reutilizables
 ┃ ┣ 📜 MapView.vue  # Componente del mapa interactivo
 ┃ ┣ 📜 Sidebar.vue  # Menú lateral con filtros y estadísticas
 ┃ ┣ 📜 NavBar.vue  # Barra de navegación superior
 ┣ 📂 views  # Páginas principales
 ┃ ┣ 📜 DashboardView.vue  # Vista principal del dashboard
 ┃ ┣ 📜 LoginView.vue  # Vista de login
 ┣ 📂 store  # Manejo de estado con Pinia
 ┣ 📂 router  # Configuración de rutas
 ┣ 📂 plugins  # Configuración de Google Maps y Vuetify
 ┣ 📜 main.ts  # Archivo de entrada principal
```

---

## 📌 Mejoras Futuras
- 📌 Integración con una API de autenticación real.
- 📌 Gráficos interactivos con estadísticas avanzadas.
- 📌 Exportación de datos a CSV o PDF.

---

## 🧑‍💻 Autor

**Oscar Roman**  
📧 Contacto: oscarbaker1230@hotmail.com  
💼 LinkedIn: https://www.linkedin.com/in/oscar-david-bastidas-roman-84020b188/

¡Gracias por revisar este proyecto! 🚀

