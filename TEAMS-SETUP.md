# Configuración de Notificaciones a Microsoft Teams

## 📋 Resumen

Este documento explica cómo configurar las notificaciones automáticas a Microsoft Teams cuando se ejecutan las pruebas de validación del sitio web T-Evolvers en GitHub Actions.

## 🔧 Configuración del Webhook de Teams

### Paso 1: Crear un Webhook en Microsoft Teams

1. **Abrir Microsoft Teams** y navegar al canal donde quieres recibir las notificaciones
2. **Hacer clic en los tres puntos (...)** al lado del nombre del canal
3. **Seleccionar "Connectors"**
4. **Buscar "Incoming Webhook"** y hacer clic en "Configure"
5. **Proporcionar un nombre** para el webhook (ej: "T-Evolvers Tests")
6. **Subir una imagen** (opcional)
7. **Hacer clic en "Create"**
8. **Copiar la URL del webhook** que se genera

### Paso 2: Configurar el Secret en GitHub

1. **Ir al repositorio** en GitHub
2. **Navegar a Settings → Secrets and variables → Actions**
3. **Hacer clic en "New repository secret"**
4. **Nombre del secret**: `TEAMS_WEBHOOK_URL`
5. **Valor**: Pegar la URL del webhook copiada del paso anterior
6. **Hacer clic en "Add secret"**

## 🚀 Funcionamiento del Workflow

### Triggers (Disparadores)

El workflow se ejecuta automáticamente en los siguientes casos:

- **Push** a las ramas `main` o `develop`
- **Pull Request** hacia la rama `main`
- **Programado**: Todos los días a las 9:00 AM UTC (6:00 AM hora de Colombia)
- **Manual**: Se puede ejecutar manualmente desde la interfaz de GitHub Actions

### Notificaciones

#### ✅ Notificación de Éxito
Cuando todas las pruebas pasan, se envía una notificación verde con:
- Estado: ✅ ALL TESTS PASSED
- Información del repositorio, rama y commit
- Usuario que disparó la ejecución
- Enlaces para ver los detalles de la ejecución

#### ❌ Notificación de Fallo
Cuando las pruebas fallan, se envía una notificación roja con:
- Estado: ❌ TESTS FAILED
- Información del repositorio, rama y commit
- Usuario que disparó la ejecución
- Enlaces para ver la ejecución fallida y revisar el sitio web

## 📊 Información Incluida en las Notificaciones

Cada notificación incluye:

- **Repository**: Nombre del repositorio
- **Branch**: Rama donde se ejecutó la prueba
- **Commit**: SHA del commit que disparó la ejecución
- **Triggered by**: Usuario que causó la ejecución
- **Status**: Estado de las pruebas (éxito o fallo)
- **Website**: URL del sitio web probado

## 🔄 Ejecución Manual

Para ejecutar las pruebas manualmente:

1. **Ir a la pestaña "Actions"** en GitHub
2. **Seleccionar "T-Evolvers Website Tests"**
3. **Hacer clic en "Run workflow"**
4. **Seleccionar la rama** y hacer clic en "Run workflow"

## 📁 Artifacts Generados

Cada ejecución genera y guarda:

- **Playwright Report**: Reporte detallado de las pruebas
- **Screenshots**: Capturas de pantalla tomadas durante las pruebas
- **Retention**: Los artifacts se mantienen por 30 días

## 🛠️ Troubleshooting

### Problema: No se reciben notificaciones

**Verificar:**
1. El webhook está correctamente configurado en Teams
2. El secret `TEAMS_WEBHOOK_URL` está configurado en GitHub
3. La URL del webhook es válida y activa

### Problema: Notificaciones se envían pero no se ven

**Verificar:**
1. El canal de Teams tiene permisos para recibir webhooks
2. El usuario tiene permisos para ver el canal
3. Las notificaciones no están silenciadas

### Problema: Tests fallan en GitHub Actions pero pasan localmente

**Posibles causas:**
1. Diferencias en el entorno (versión de Node.js, dependencias)
2. Timeouts más estrictos en CI
3. Configuración de red diferente

## 📝 Personalización

### Modificar la Frecuencia del Cron

Para cambiar cuándo se ejecutan las pruebas automáticas, editar la línea:
```yaml
- cron: '0 9 * * *'  # 9:00 AM UTC diariamente
```

### Cambiar los Navegadores de Prueba

Por defecto se ejecutan en todos los navegadores configurados en `playwright.config.ts`. Para limitarlo a un navegador específico, modificar:
```yaml
run: npx playwright test t-evolvers-validation.spec.ts --project=chromium
```

### Personalizar el Contenido de las Notificaciones

Las notificaciones se pueden personalizar editando los objetos JSON en los pasos de "Notify Teams" del workflow.

## 🎯 Beneficios

- **Monitoreo Continuo**: Detección automática de problemas en el sitio web
- **Notificaciones Inmediatas**: El equipo se entera inmediatamente de cualquier fallo
- **Historial**: GitHub Actions mantiene un historial de todas las ejecuciones
- **Artifacts**: Las capturas de pantalla y reportes se guardan para análisis
- **Programación**: Ejecución automática para monitoreo proactivo




https://tevolversco.webhook.office.com/webhookb2/362897ed-c3dc-46d5-a09e-481cb3a3ee07@96fd4111-f16f-409f-a0db-bc9d57e86d3a/IncomingWebhook/6eb6fdc2adde4a538760f5dfaefa2e4a/5ae2d211-cdb8-4df5-9572-c5fa5615d988/V2xGI_aVLQiPfeyM2MZlgPHbiksXWfxDeFGc2AAnD6aVI1