---
name: remotion
description: 'Crea videos con Remotion. Usa esta skill para comprobar Node.js, instalar los skills oficiales de Remotion, crear o ajustar una escena y generar el render final del video.'
argument-hint: 'instalar Remotion skills, crear video, renderizar escena'
user-invocable: true
disable-model-invocation: false
---

# Remotion

## Cuándo usar esta skill

Usa esta skill cuando quieras:

- crear un proyecto de video con Remotion,
- instalar las herramientas y skills oficiales de Remotion,
- definir escenas, composición y timing,
- renderizar un video desde un proyecto React/TypeScript,
- verificar que la preview y el output final funcionan correctamente.

## Objetivo
genera un guion e
Guiar el flujo para preparar el entorno de Remotion, instalar los skills adecuados y usar ese conocimiento para producir un video con una estructura reproducible.

## Proceso recomendado

1. Verifica que Node.js esté instalado.
2. Instala los skills de Remotion con:
   npx -y skills@latest add remotion-dev/skills -g -y
3. Usa esos skills para crear o modificar la escena del video.
4. Define la composición, el canvas, la duración y los elementos animados.
5. Ejecuta la vista previa local para comprobar visualmente la animación.
6. Ajusta texto, movimiento, timing o diseño hasta que quede correcto.
7. Genera el render final para exportar el video.

## Comandos clave

- node -v
- npm -v
- npx -y skills@latest add remotion-dev/skills -g -y
- node -v && npm -v
- npm install
- npm run dev
- npm run build
- npx remotion render

## Buenas prácticas

- Mantén Node.js actualizado y usa una terminal limpia.
- Instala los skills antes de empezar a diseñar la escena.
- Separa la lógica de composición en componentes reutilizables.
- Valida la preview antes de hacer el render final.
- Revisa el video final para confirmar que no hay errores de timing o escala.

## Criterios de validación

Antes de dar el trabajo por terminado, comprueba:

- que Node.js esté instalado y disponible,
- que los skills de Remotion se hayan instalado correctamente,
- que la composición renderiza sin errores,
- que la vista previa coincide con la intención visual,
- que el output final es un video válido y usable.

## Resultado esperado

Con este flujo, el usuario puede preparar el entorno, instalar la ayuda especializada de Remotion y producir un video desde un proyecto bien estructurado.
