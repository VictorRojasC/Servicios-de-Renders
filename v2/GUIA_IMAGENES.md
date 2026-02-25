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

- **Imagen de Portada (Grilla):** Debe ser la imagen principal que se vea en el scroll de la web.
- **Imágenes de la Retícula (Modal):** Recuerda que el visor usa una retícula de **3x3 (9 imágenes)**.

**Recomendación de Nombres por carpeta:**
- `main.jpg` (La que aparece en la web principal).
- `render-1.jpg`, `render-2.jpg`, ... `render-9.jpg` (Las que aparecen en la retícula 3x3 al hacer clic).

**Dimensiones Sugeridas:**
- **Proporción:** 1:1 (Cuadradas) para que encajen perfecto en la retícula y el visor.
- **Tamaño:** 1080x1080px es ideal.

---

## 🛠️ Cómo actualizar el código una vez cargues las fotos:

Actualmente, el archivo `js/main.js` usa enlaces de internet (Unsplash). Cuando ya tengas tus fotos en las carpetas, deberás cambiar las rutas en la línea 7 de `js/main.js`:

**Ejemplo de cómo cambiarlo:**
```javascript
// Cambiar esto:
images: ["https://images.unsplash.com..."]

// Por esto (ruta local):
images: [
    "img/projects/project-1/main.jpg",
    "img/projects/project-1/render-2.jpg",
    "img/projects/project-1/render-3.jpg"
    // ... así sucesivamente
]
```

---

## ✨ Tips Pro:
1. **Formato:** Usa `.jpg` para fotos con mucha textura o `.webp` si quieres la máxima velocidad de carga.
2. **Nombres:** Evita usar espacios o eñes en los nombres de los archivos (ej: usa `proyecto-interior.jpg` en lugar de `proyecto interior.jpg`).
3. **Optimización:** Es vital que las imágenes no pesen megabytes, o la web se pondrá lenta. Intenta que ninguna pase de 500KB.
