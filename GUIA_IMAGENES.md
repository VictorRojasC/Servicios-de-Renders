# 🖼️ Guía de Organización de Imágenes - RenderStudio AI

Para que tu sitio web se vea profesional y las imágenes carguen correctamente en el nuevo sistema dinámico, sigue este orden y estructura.

## 📁 Estructura de Carpetas

Las carpetas ya han sido creadas en: `render-static-deploy/img/`

```text
img/
├── hero/                # Imágenes del Slider principal (6 total)
└── projects/           # Carpetas para los 20 proyectos
    ├── project-1/      # Imágenes del Proyecto 1
    ├── project-2/      # Imágenes del Proyecto 2
    └── ...
    └── project-20/     # Imágenes del Proyecto 20
```

---

## 🚀 1. Slider Principal (Hero)
**Ubicación:** `img/hero/`
- **Cantidad:** 6 imágenes.
- **Nombres recomendados:** `slide-1.jpg`, `slide-2.jpg`, etc.
- **Dimensiones:** 1920x1080px (Horizontal).
- **Peso ideal:** Menos de 400KB cada una (puedes usar [TinyJPG](https://tinyjpg.com)).

**Orden Sugerido:**
1. `slide-1.jpg`: Arquitectos (Referencia de planos/maquetas).
2. `slide-2.jpg`: Inmobiliarias (Vivienda terminada).
3. `slide-3.jpg`: Constructoras (Obra/Estructura).
4. `slide-4.jpg`: Industrias (Planta industrial).
5. `slide-5.jpg`: Comercios (Local comercial).
6. `slide-6.jpg`: Interiorismo (Render de interior).

---

## 🏗️ 2. Proyectos del Portafolio
**Ubicación:** `img/projects/project-X/`
Cada una de las 20 carpetas (`project-1` a `project-20`) debe contener las imágenes de ese proyecto específico.

- **Imagen de Portada (Grilla):** Debe ser la imagen principal que se vea en el scroll de la web (Nombre sugerido: `main.jpg`).
- **Retícula Multimedia (Modal):** El visor utiliza una retícula de **3x3 (9 espacios)** organizada de la siguiente manera:
    *   **Espacios 1 al 7:** Imágenes estáticas (`render-1.jpg` a `render-7.jpg`).
    *   **Espacio 8 (Video):** Botón automático para activar el visor de video.
    *   **Espacio 9 (360°):** Botón automático para activar el visor interactivo 360°.

### 📹 3. Contenido de Video
- **Formato:** Los videos no se suben a la carpeta del servidor para no ralentizar la web.
- **Método:** Debes subir tu video a **YouTube** o **Vimeo**.
- **En el código:** Solo necesitas copiar el enlace (URL) del video y pegarlo en el campo `videoUrl` dentro de `js/main.js`.

### 🔄 4. Imágenes 360° (Panorámicas)
**Ubicación:** `img/projects/project-X/panorama.jpg`
- **Formato Obligatorio:** `.jpg` (Es el formato con mayor compatibilidad para el visor Pannellum).
- **Proyección:** Debe ser **Equirectangular** (proporción 2:1).
- **Resolución Recomendada:** 
    *   **Óptima:** 4096 x 2048 px (Equilibrio perfecto entre calidad y velocidad).
    *   **Máxima:** 8192 x 4096 px (Solo si el detalle es crítico, puede tardar más en cargar).
- **Nombre sugerido:** `panorama.jpg` dentro de cada carpeta de proyecto.

---

## 🛠️ Cómo actualizar el código una vez cargues las fotos:

Actualmente, el archivo `js/main.js` usa enlaces de prueba. Cuando tengas tus archivos listos, actualiza el objeto de cada proyecto en `js/main.js`:

```javascript
{
    id: 1,
    title: "Nombre del Proyecto",
    category: "arquitectos",
    // Lista de las 7 imágenes para la retícula + la principal
    images: [
        "img/projects/project-1/main.jpg",
        "img/projects/project-1/render-1.jpg",
        "img/projects/project-1/render-2.jpg",
        // ... hasta render-7.jpg
    ],
    videoUrl: "https://www.youtube.com/embed/TU_ID_DE_VIDEO",
    panoramaUrl: "img/projects/project-1/panorama.jpg",
    description: "Descripción detallada del proyecto..."
}
```

---

## ✨ Tips Pro:
1. **Formato:** Usa `.jpg` para todas las imágenes. Para el 360 es **estrictamente necesario** que sea JPG.
2. **Nombres:** Evita usar espacios o eñes en los nombres (usa `render_interior.jpg` en lugar de `render interior.jpg`).
3. **Optimización:** Usa [TinyJPG](https://tinyjpg.com) para reducir el peso de las imágenes sin perder calidad. Intenta que las fotos normales no pasen de 500KB y el panorama no pase de 2MB.
