# Reglas del proyecto

## Objetivo

Este proyecto debe ofrecer una **explicación visual sencilla** de un concepto de óptica relacionado con los estudios de **Roger Bacon**: la refracción de la luz al pasar del aire al agua.

La idea principal es:

**LUZ -> cambia de medio -> cambia de dirección**

El diagrama debe mostrar que, al pasar del aire a un medio más denso como el agua, el rayo se refracta y se acerca a la perpendicular de la superficie, llamada **normal**.

## Contexto histórico

- Roger Bacon (c. 1214-1294) fue un fraile y filósofo inglés del siglo XIII.
- Estudió matemáticas, ciencia y especialmente óptica.
- Sus temas de estudio incluyeron la visión, la luz, las lentes, la reflexión y la refracción.
- Alrededor de 1266-1267 escribió *Perspectiva*, dedicada al estudio de estos fenómenos.
- Sus trabajos pertenecen a la tradición de diagramas geométricos utilizados para explicar los rayos de luz.
- La tradición óptica anterior incluye a autores como Ptolomeo e Ibn al-Haytham (Alhacén).

El contexto histórico debe apoyar la explicación visual, no sustituirla ni convertir el proyecto en una investigación extensa.

## Formatos obligatorios

Se deben mantener exactamente tres representaciones del mismo concepto:

1. `diagrama.svg`: dibujo vectorial compuesto por formas, líneas y texto.
2. `diagrama.mmd`: diagrama Mermaid escrito como código editable.
3. `diagrama.excalidraw`: archivo Excalidraw con elementos editables.

Los tres formatos deben explicar la misma idea y utilizar una composición equivalente. No se deben crear versiones bitmap, mapas de bits ni capturas de pantalla como sustitutos de los diagramas.

## Explicación visual

Cada representación debe permitir identificar rápidamente:

- El aire y el agua como medios diferentes.
- La superficie que separa ambos medios.
- El rayo de luz antes y después de cambiar de medio.
- La normal.
- El cambio de dirección del rayo.

Usar pocos elementos, etiquetas cortas, formas grandes y suficiente separación. La explicación debe entenderse visualmente antes de leer cualquier texto adicional.

## Estilo visual

El estilo debe ser **brutalista**:

- Usar formas planas, bordes gruesos y líneas rectas.
- Usar tipografía pesada, legible y directa.
- Mantener alto contraste y una composición simple.
- Evitar sombras, degradados, efectos 3D y adornos innecesarios.
- Evitar tarjetas decorativas o composiciones recargadas.
- Mantener el mismo lenguaje visual en SVG, Mermaid y Excalidraw.

## Paleta de color

Usar estos colores de forma consistente:

| Elemento | Color | Función |
| --- | --- | --- |
| Marfil / pergamino | `#F4EBD8` | Fondo del aire y referencia a manuscritos antiguos |
| Azul petróleo | `#173B4D` | Títulos, textos y explicaciones |
| Azul medio | `#5B9BB5` | Identifica rápidamente el agua |
| Dorado cálido | `#E6B84A` | Destaca el rayo de luz |
| Terracota | `#A65D43` | Flechas, divisiones, normal y detalles |
| Crema | `#FFF9ED` | Cajas de información y fondos claros |

No introducir otra paleta sin una razón clara. Los colores deben conservar su función en los tres formatos.

## Criterios de calidad

- Priorizar la claridad visual sobre la cantidad de información.
- No cambiar el concepto científico entre formatos.
- Mantener la refracción aire-agua como el ejemplo principal.
- Comprobar que los textos no se superpongan con las líneas o los rayos.
- Conservar los elementos editables en Mermaid y Excalidraw.
- Validar los archivos después de modificarlos.
