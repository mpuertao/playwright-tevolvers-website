# Prueba de Validación de T-Evolvers Website

## 📋 Resumen de la Prueba

Este proyecto contiene pruebas automatizadas de Playwright para validar el sitio web de T-Evolvers (www.t-evolvers.com).

## ✅ Validaciones Realizadas

### Prueba Principal: "should load T-Evolvers website, accept cookies and validate page rendering"

1. **Navegación**: Acceso exitoso a https://www.t-evolvers.com
2. **Título de página**: Verificación del título "T-Evolvers"
3. **Cookies**: Aceptación automática del diálogo de cookies
4. **Encabezado principal**: Validación del heading "Transformación y Evolución"
5. **Navegación**: Verificación de todos los enlaces del menú principal:
   - Home
   - Servicios
   - Clientes
   - Quienes Somos
   - Empleos
   - Contáctenos
6. **Contenido clave**: Validación de secciones importantes:
   - "Implementamos las mejores prácticas"
   - Información de la empresa (Misión, Valores, Visión)
7. **Formulario de contacto**: Verificación de todos los campos:
   - Nombre y Apellidos
   - WhatsApp
   - Correo Electrónico
   - Empresa
   - Ciudad
   - Temas de Interés
   - Mensaje
   - Botón "Enviar PQRS"
8. **Footer**: Validación de:
   - Enlaces de redes sociales (LinkedIn, Instagram, Facebook, YouTube)
   - Secciones de Servicios, Links y Contacto
   - Información de contacto (Medellín, Colombia, email)
   - Copyright

### Prueba Secundaria: "should verify basic interactivity and form elements"

1. **Navegación y cookies**: Acceso y aceptación de cookies
2. **Interactividad**: Verificación de navegación por secciones
3. **Accesibilidad**: Validación de elementos principales

## 🖼️ Capturas de Pantalla

Las pruebas generan automáticamente capturas de pantalla para documentación en:
- `tests/screenshots/t-evolvers-validation.png`

## 🚀 Ejecución de las Pruebas

```bash
# Ejecutar todas las pruebas
npx playwright test t-evolvers-validation.spec.ts

# Ejecutar solo en Chromium
npx playwright test t-evolvers-validation.spec.ts --project=chromium

# Ejecutar con interfaz visual
npx playwright test t-evolvers-validation.spec.ts --headed

# Ver reporte
npx playwright show-report
```

## 📊 Resultados

✅ **Estado**: TODAS LAS PRUEBAS PASARON
✅ **Navegadores**: Chromium (principales validaciones)
✅ **Cookies**: Aceptadas automáticamente
✅ **Renderizado**: Página carga correctamente
✅ **Elementos**: Todos los componentes principales están presentes y visibles

## 🔧 Configuración MCP

El proyecto utiliza el servidor MCP de Playwright configurado en:
- **Global**: `~/.vscode/settings.json`
- **Local**: `.vscode/settings.json`

```json
{
  "mcp": {
    "servers": {
      "playwright": {
        "command": "npx",
        "args": ["@playwright/mcp@latest"]
      }
    }
  }
}
```

## 🔔 Notificaciones a Microsoft Teams

### GitHub Actions con Notificaciones Automáticas

El proyecto incluye un workflow de GitHub Actions que:

- ✅ **Ejecuta las pruebas automáticamente** en push/PR
- ⏰ **Monitoreo programado** (diario a las 9:00 AM UTC)
- 📢 **Notifica a Teams** el resultado (éxito/fallo)
- 📊 **Guarda reportes y capturas** como artifacts
- 🔄 **Permite ejecución manual**

### Configuración Requerida

1. **Webhook de Teams**: Configurar un Incoming Webhook en el canal deseado
2. **Secret en GitHub**: Agregar `TEAMS_WEBHOOK_URL` en los secrets del repositorio

Ver [TEAMS-SETUP.md](./TEAMS-SETUP.md) para instrucciones detalladas.

### Triggers del Workflow

- Push a ramas `main` o `develop`
- Pull Request hacia `main`
- Programado: Diariamente a las 9:00 AM UTC
- Manual desde GitHub Actions

## 📝 Notas Técnicas

- Las pruebas utilizan selectores específicos para evitar ambigüedades
- Se implementaron esperas para elementos dinámicos
- Los selectores se enfocan en elementos únicos del DOM
- Se valida tanto la funcionalidad como la accesibilidad básica

## 🎯 Conclusión

La página web de T-Evolvers se renderiza correctamente y todos los elementos principales funcionan como se espera. Las pruebas automatizadas proporcionan una validación completa de la funcionalidad del sitio web.
