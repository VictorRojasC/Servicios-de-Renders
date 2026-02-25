/**
 * RENDERSTUDIO AI - GOOGLE APPS SCRIPT (v2 ROBUSTA)
 * ID de tu hoja: 1crzqusF4gsX459UKy6sxpapTeuHXBeTweSjd6OloLIU
 */

function doPost(e) {
    try {
        // Abrir por ID para evitar errores de vinculación
        var doc = SpreadsheetApp.openById("1crzqusF4gsX459UKy6sxpapTeuHXBeTweSjd6OloLIU");
        var sheet = doc.getSheetByName("Proyectos");

        if (!sheet) {
            return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": "Hoja 'Proyectos' no encontrada" }))
                .setMimeType(ContentService.MimeType.JSON);
        }

        var p = e.parameter;

        // Limpiar y mapear datos
        var nombre = p.name || "N/A";
        var telefono = p.phone || "N/A";
        var correo = p.email || "N/A";

        // Incluir el proyecto en el mensaje si existe
        var proyecto = p.project ? "[" + p.project + "] " : "";
        var mensaje = proyecto + (p.message || "Sin mensaje");

        // Registrar en el orden pedido: NOMBRE | NUMERO TELEFONICO | CORREO ELECTRONICO | MENSAJE
        sheet.appendRow([nombre, telefono, correo, mensaje]);

        return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Configura la hoja con tus encabezados exactos
function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheets()[0];
    sheet.setName("Proyectos");
    sheet.clear();
    // Columnas solicitadas: NOMBRE | NUMERO TELEFONICO | CORREO ELECTRONICO | MENSAJE
    sheet.appendRow(["NOMBRE", "NUMERO TELEFONICO", "CORREO ELECTRONICO", "MENSAJE"]);

    sheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#000000").setFontColor("#ffffff");
}
