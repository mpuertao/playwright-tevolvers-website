#!/bin/bash

# Script para probar notificaciones de Teams localmente
# Uso: ./test-teams-notification.sh [success|failure]

if [ $# -eq 0 ]; then
    echo "Uso: $0 [success|failure]"
    echo "Ejemplo: $0 success"
    exit 1
fi

if [ -z "$TEAMS_WEBHOOK_URL" ]; then
    echo "Error: La variable TEAMS_WEBHOOK_URL no está configurada"
    echo "Exporta la variable con: export TEAMS_WEBHOOK_URL='tu_webhook_url'"
    exit 1
fi

NOTIFICATION_TYPE=$1
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
COMMIT_SHA=$(git rev-parse HEAD 2>/dev/null || echo "local-test")
BRANCH=$(git branch --show-current 2>/dev/null || echo "local")
USER=$(whoami)

if [ "$NOTIFICATION_TYPE" == "success" ]; then
    THEME_COLOR="28a745"
    STATUS="✅ ALL TESTS PASSED"
    TITLE="✅ T-Evolvers Website Tests - SUCCESS"
    ACTIVITY_TITLE="✅ Website Validation Tests Passed (Local Test)"
    
    curl -H "Content-Type: application/json" -d "{
        \"@type\": \"MessageCard\",
        \"@context\": \"https://schema.org/extensions\",
        \"themeColor\": \"$THEME_COLOR\",
        \"summary\": \"T-Evolvers Website Tests - SUCCESS\",
        \"sections\": [{
            \"activityTitle\": \"$ACTIVITY_TITLE\",
            \"activitySubtitle\": \"Local testing - $BRANCH\",
            \"facts\": [
                {
                    \"name\": \"Test Type:\",
                    \"value\": \"Local Test\"
                },
                {
                    \"name\": \"Branch:\",
                    \"value\": \"$BRANCH\"
                },
                {
                    \"name\": \"Commit:\",
                    \"value\": \"$COMMIT_SHA\"
                },
                {
                    \"name\": \"Tested by:\",
                    \"value\": \"$USER\"
                },
                {
                    \"name\": \"Status:\",
                    \"value\": \"$STATUS\"
                },
                {
                    \"name\": \"Website:\",
                    \"value\": \"www.t-evolvers.com\"
                },
                {
                    \"name\": \"Timestamp:\",
                    \"value\": \"$TIMESTAMP\"
                }
            ]
        }],
        \"potentialAction\": [{
            \"@type\": \"OpenUri\",
            \"name\": \"Check Website\",
            \"targets\": [{
                \"os\": \"default\",
                \"uri\": \"https://www.t-evolvers.com\"
            }]
        }]
    }" $TEAMS_WEBHOOK_URL

elif [ "$NOTIFICATION_TYPE" == "failure" ]; then
    THEME_COLOR="dc3545"
    STATUS="❌ TESTS FAILED"
    TITLE="❌ T-Evolvers Website Tests - FAILED"
    ACTIVITY_TITLE="❌ Website Validation Tests Failed (Local Test)"
    
    curl -H "Content-Type: application/json" -d "{
        \"@type\": \"MessageCard\",
        \"@context\": \"https://schema.org/extensions\",
        \"themeColor\": \"$THEME_COLOR\",
        \"summary\": \"T-Evolvers Website Tests - FAILED\",
        \"sections\": [{
            \"activityTitle\": \"$ACTIVITY_TITLE\",
            \"activitySubtitle\": \"Local testing - $BRANCH\",
            \"facts\": [
                {
                    \"name\": \"Test Type:\",
                    \"value\": \"Local Test\"
                },
                {
                    \"name\": \"Branch:\",
                    \"value\": \"$BRANCH\"
                },
                {
                    \"name\": \"Commit:\",
                    \"value\": \"$COMMIT_SHA\"
                },
                {
                    \"name\": \"Tested by:\",
                    \"value\": \"$USER\"
                },
                {
                    \"name\": \"Status:\",
                    \"value\": \"$STATUS\"
                },
                {
                    \"name\": \"Website:\",
                    \"value\": \"www.t-evolvers.com\"
                },
                {
                    \"name\": \"Timestamp:\",
                    \"value\": \"$TIMESTAMP\"
                }
            ]
        }],
        \"potentialAction\": [{
            \"@type\": \"OpenUri\",
            \"name\": \"Check Website\",
            \"targets\": [{
                \"os\": \"default\",
                \"uri\": \"https://www.t-evolvers.com\"
            }]
        }]
    }" $TEAMS_WEBHOOK_URL

else
    echo "Tipo de notificación no válido. Usa 'success' o 'failure'"
    exit 1
fi

if [ $? -eq 0 ]; then
    echo "✅ Notificación enviada exitosamente a Teams"
else
    echo "❌ Error al enviar la notificación"
    exit 1
fi
