# La óptica de Roger Bacon

Este proyecto ofrece una **explicación visual** de un concepto de óptica estudiado por **Roger Bacon**: la refracción de la luz al pasar del aire al agua. La misma idea se representa mediante tres tipos de diagrama:

- **SVG:** representación visual directa que puede abrirse en cualquier navegador.
- **Mermaid:** diagrama editable a partir de texto y útil para mostrar la relación entre los elementos de la ilusión.
- **Excalidraw:** versión editable con un estilo sencillo, similar a un dibujo hecho a mano.

El objetivo es comprender cómo la luz cambia de dirección al pasar entre medios de distinta densidad, usando una explicación visual clara y sin elementos innecesarios.

## Reglas del proyecto

- Se deben crear exactamente tres representaciones del concepto: **SVG**, **Excalidraw** y **Mermaid**.
- El SVG debe ser un dibujo vectorial definido con formas, líneas y texto.
- El archivo de Excalidraw debe conservar sus elementos editables.
- Mermaid debe contener el diagrama escrito como código.
- No se deben usar imágenes bitmap, mapas de bits ni capturas de pantalla como sustitutos de los diagramas.
- Los tres formatos deben explicar la misma idea de forma sencilla y visual.

El estilo visual elegido es **brutalista**: formas planas, bordes gruesos, tipografía pesada, contrastes fuertes y una composición directa. No se utilizan sombras, degradados ni adornos que distraigan del fenómeno óptico.

## Paleta de color

| Elemento | Color | Uso |
| --- | --- | --- |
| Marfil / pergamino | `#F4EBD8` | Fondo del aire y referencia a manuscritos antiguos |
| Azul petróleo | `#173B4D` | Títulos, textos y explicaciones |
| Azul medio | `#5B9BB5` | Zona del agua |
| Dorado cálido | `#E6B84A` | Rayo de luz |
| Terracota | `#A65D43` | Flechas, divisiones y líneas |
| Crema | `#FFF9ED` | Cajas de información y fondos claros |

## Contexto histórico

El contenido del diagrama se relaciona con los estudios de óptica de **Roger Bacon (c. 1214-1294)**, fraile y filósofo inglés del siglo XIII. Alrededor de 1266-1267, Bacon escribió *Perspectiva*, una obra dedicada al estudio de la visión, la luz, la reflexión y la refracción.

El diagrama no representa una explicación moderna aislada: forma parte de la tradición de diagramas geométricos que se utilizaban para explicar fenómenos ópticos. Bacon empleaba la geometría y representaciones de rayos de luz para estudiar cómo funciona la visión.

### Historia sencilla

**Antes del siglo XIII**

Los conocimientos sobre óptica procedían de autores griegos y del mundo islámico, especialmente **Ptolomeo** e **Ibn al-Haytham (Alhacén)**.

↓

**1266-1267 - Roger Bacon**

Bacon estudia la luz, la visión, la reflexión y la refracción mediante matemáticas, geometría y diagramas.

↓

**Siglos posteriores**

Sus trabajos fueron conocidos por otros estudiosos europeos y contribuyeron a la tradición que impulsó nuevos desarrollos de la óptica en Europa.

### ¿Qué explica el diagrama?

La idea principal puede resumirse así:

**LUZ → cambia de medio → cambia de dirección**

El rayo pasa del **aire** al **agua**. Como el agua es más densa que el aire, el rayo se refracta y se acerca a la perpendicular de la superficie, llamada **normal**.

## Contenido

Los tres diagramas muestran el mismo fenómeno óptico desde diferentes formatos. Cada representación permite identificar rápidamente:

1. El aire y el agua como medios diferentes.
2. La superficie que separa ambos medios.
3. El rayo de luz antes y después de cambiar de medio.
4. La normal y el cambio de dirección del rayo.

## Estructura del proyecto

```text
.
├── README.md
├── diagrama.svg
├── diagrama.mmd
└── diagrama.excalidraw
```

## Cómo visualizar los diagramas

### SVG

Abre `diagrama.svg` directamente en un navegador web. También puede insertarse en una página HTML o editarse con un editor vectorial.

### Mermaid

El archivo `diagrama.mmd` contiene el código del diagrama. Puede visualizarse en:

- [Mermaid Live Editor](https://mermaid.live/)
- Visual Studio Code, con una extensión compatible con Mermaid.
- Un archivo Markdown que admita bloques Mermaid.

### Excalidraw

Abre `diagrama.excalidraw` en [Excalidraw](https://excalidraw.com/) para visualizarlo o modificarlo.

## Criterios de diseño

- Usar pocos elementos y colores contrastantes.
- Mantener el aire, el agua y los rayos grandes y bien separados.
- Añadir etiquetas cortas únicamente cuando sean necesarias.
- Mantener la misma explicación visual en los tres formatos.
- Mostrar de manera evidente que el rayo se acerca a la normal al entrar en el agua.

## Objetivo

Este proyecto explica visualmente cómo se comporta la luz al cambiar de medio, relacionando el concepto con los estudios de óptica de Roger Bacon. Una misma idea científica se muestra mediante un dibujo vectorial, un diagrama descriptivo y una representación editable.