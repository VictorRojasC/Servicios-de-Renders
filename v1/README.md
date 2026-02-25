# RenderStudio AI - Static Deploy Hub

Esta es la versión simplificada y estática diseñada para desplegarse en **GitHub Pages**.

## 🚀 Despliegue en GitHub Pages
1. Sube el contenido de esta carpeta (`render-static-deploy`) a un nuevo repositorio en tu GitHub.
2. Ve a **Settings > Pages**.
3. Selecciona la rama `main` y guarda.
4. Tu sitio estará vivo en `https://tu-usuario.github.io/tu-repo/`.

## 📊 Configuración de Google Sheets (Base de Datos)
Para que los registros lleguen a Google Sheets, sigue estos pasos:

1. Crea una nueva hoja de cálculo en Google Sheets.
2. Nombra las columnas en la primera fila: `timestamp`, `name`, `email`, `phone`, `campaign`.
3. Ve a **Extensiones > Apps Script**.
4. Borra el código existente y pega este script:

```javascript
var sheetName = 'Hoja 1'
var scriptProp = PropertiesService.getScriptProperties()

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}
```

5. Haz clic en **Ejecutar > initialSetup**. Autoriza los permisos.
6. Haz clic en **Implementar > Nueva implementación**.
7. Selecciona **Tipo: Aplicación web**. En 'Quién tiene acceso', elige **Cualquiera**.
8. Copia la **URL de la aplicación web**.
9. Abre `js/main.js` en esta carpeta y reemplaza `SCRIPT_URL` con tu URL copiada.

## 🔗 Tracking de Campañas
Puedes crear enlaces únicos para cada anuncio:
- `https://tusitio.com/?v=PROMO_INSTA_01`
- `https://tusitio.com/?v=YT_VIDEO_01`

El sistema guardará automáticamente de dónde viene el cliente y lo registrará en tu Google Sheet.
