# Dr Bunny

Dr Bunny es una aplicación web diseñada para promover un estilo de vida saludable y organizado. Ofrece funcionalidades para el seguimiento de actividades diarias, registro de estadísticas, estado de ánimo, y localización de lugares cercanos. Este proyecto fue desarrollado como parte de un parcial de Desarrollo Web.

## Índice

1. [Inicio del Proyecto](#inicio-del-proyecto)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Descripción de Funcionalidades](#descripción-de-funcionalidades)
5. [Cómo Usar](#cómo-usar)
6. [Detalles Técnicos](#detalles-técnicos)

---

## Inicio del Proyecto

El proyecto comienza con la página `index.html`, que da la bienvenida al usuario y proporciona acceso al registro o inicio de sesión.

---

## Estructura de Archivos

### Archivos HTML
- **index.html**: Página principal.
- **inicio.html**: Registro de nuevos usuarios.
- **inicioSesion.html**: Página de inicio de sesión.
- **miDia.html**: Página para registrar actividades diarias.
- **actividades.html**: Buscar lugares cercanos para actividades físicas.
- **estadisticas.html**: Visualización de estadísticas del usuario.
- **borradorCache.html**: Herramienta para limpiar almacenamiento local.

### Archivos CSS
- **style.css**: Estilos generales de la aplicación.
- **midia.css**: Estilos específicos de la página "Mi Día".

### Archivos JavaScript
- **scripts.js**: Lógica para el manejo de registro y actualización de datos de usuario.
- **login.js**: Validación y manejo de inicio de sesión.
- **miDia.js**: Registro de actividades diarias.
- **estadisticas.js**: Procesamiento y visualización de estadísticas con gráficos.
- **activities.js**: Integración de mapas para localizar lugares cercanos.

---

## Tecnologías Utilizadas

- **HTML**: Estructuración del contenido.
- **CSS**: Diseño y estilos personalizados.
- **JavaScript**: Interactividad y funcionalidades dinámicas.
- **Bootstrap**: Framework CSS para diseño responsivo.
- **Chart.js**: Generación de gráficos dinámicos.
- **Leaflet.js**: Mapas interactivos.

---

## Descripción de Funcionalidades

1. **Registro e Inicio de Sesión**
   - Registro de usuario en `inicio.html`.
   - Validación en `inicioSesion.html` con datos almacenados en `localStorage`.

2. **Mi Día**
   - Registro de actividades diarias, como alimentación, ejercicio, sueño y estado de ánimo.

3. **Estadísticas**
   - Visualización de gráficos sobre el progreso en ejercicio, alimentación, sueño, y estado de ánimo.

4. **Actividades Cercanas**
   - Buscar gimnasios, parques, o centros de yoga cercanos en `actividades.html` con mapas interactivos.

5. **Borrado de Datos**
   - `borradorCache.html` permite limpiar `localStorage`, `sessionStorage` y cookies locales.

---

## Cómo Usar

1. **Registro e Inicio de Sesión**
   - Abre `index.html` en tu navegador.
   - Regístrate en `inicio.html` o inicia sesión en `inicioSesion.html`.
   - Si no cuentas con un registro, presiona el link que te lleva a registrar. Llena el formulario para poder hacer uso de tus datos en iniciar sesión 

2. **Registro de Actividades**
   - En `miDia.html`, selecciona actividades diarias para registrar.

3. **Estadísticas**
   - Revisa el progreso en `estadisticas.html`.

4. **Buscar Lugares Cercanos**
   - En `actividades.html`, encuentra lugares cercanos basados en tu ubicación.

5. **Borrar Datos**
   - Accede a `borradorCache.html` para limpiar los datos locales si es necesario.

---

## Detalles Técnicos

1. **Almacenamiento Local**
   - Los datos del usuario y actividades se almacenan en `localStorage`.

2. **Gráficos y Mapas**
   - `estadisticas.js` genera gráficos interactivos con Chart.js.
   - `activities.js` utiliza Leaflet.js para mapas dinámicos y búsqueda de lugares.

3. **Manejo de Datos**
   - Los formularios y modales dinámicos en `miDia.js` y `scripts.js` manejan datos en tiempo real.

4. **Borrado de Datos**
   - `borradorCache.html` incluye lógica para limpiar `localStorage`, `sessionStorage` y cookies mediante JavaScript.

---

## Créditos

**Desarrolladores:**
- Laura V. Mossos
- Juan C. Hidalgo
- Mayra S. Delgado

**Créditos de Ilustraciones:**
- [Pikisuperstar en Freepik](https://www.freepik.com/free-vector/ronnie-bunny-family-stickers-set_28889919.htm#from_view=detail_alsolike)

---

¡Disfruta de un estilo de vida saludable con Dr Bunny!
