import React from "react";
import {
  AbsoluteFill,
  Audio,
  Composition,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";

const palette = {
  parchment: "#F4EBD8",
  ink: "#173B4D",
  water: "#5B9BB5",
  light: "#E6B84A",
  terracotta: "#A65D43",
  cream: "#FFF9ED",
  waterInk: "#102F3D",
  grass: "#78A94B",
  grassDark: "#426E3B",
  stone: "#9B9B8E",
};

const fps = 30;
const durationInFrames = 206 * fps;

const voiceTracks = [
  { src: "voz-01.mp3", from: 0 },
  { src: "voz-02.mp3", from: 17 * fps },
  { src: "voz-03.mp3", from: 49 * fps },
  { src: "voz-04.mp3", from: 71 * fps },
  { src: "voz-05.mp3", from: 91 * fps },
  { src: "voz-06.mp3", from: 105 * fps },
  { src: "voz-07.mp3", from: 130 * fps },
  { src: "voz-08.mp3", from: 151 * fps },
  { src: "voz-09.mp3", from: 177 * fps },
];

const chapters = [
  {
    start: 0,
    end: 17,
          title: "¿La caña está rota?",
    caption: "Tres objetos del mundo real parecen cambiar de forma bajo el agua.",
    cue: "OBSERVA · PREDICE · DESCUBRE",
    number: "01",
  },
  {
    start: 17,
    end: 49,
    title: "Abre el diario de Bacon",
    caption: "En el siglo XIII, Roger Bacon investigó la luz, la visión y la óptica.",
    cue: "PERSPECTIVA · C. 1267",
    number: "02",
  },
  {
    start: 49,
    end: 71,
    title: "Dos medios, una frontera",
    caption: "La luz viaja por el aire hasta alcanzar la superficie del agua.",
    cue: "AIRE → AGUA",
    number: "03",
  },
  {
    start: 71,
    end: 91,
    title: "Ejemplo 1: la caña",
    caption: "Sumergida, parece quebrarse justo donde el agua la cubre.",
    number: "04",
    cue: "OBJETO BAJO EL AGUA",
  },
  {
    start: 91,
    end: 105,
    title: "Ejemplo 2: la piscina",
    caption: "El fondo parece más cerca de la superficie de lo que está.",
    number: "05",
    cue: "PROFUNDIDAD APARENTE",
  },
  {
    start: 105,
    end: 130,
    title: "Ejemplo 3: el pez",
    caption: "Visto desde el aire, parece estar más arriba de su posición real.",
    number: "06",
    cue: "LA LUZ TAMBIÉN VIAJA AL REVÉS",
  },
  {
    start: 130,
    end: 151,
    title: "Marca la normal",
    caption: "Una línea perpendicular a la superficie nos ayuda a medir el ángulo.",
    cue: "90° CON LA SUPERFICIE",
    number: "07",
  },
  {
    start: 151,
    end: 177,
    title: "La luz cambia de rumbo",
    caption: "En el agua viaja más despacio y el rayo se acerca a la normal.",
    cue: "AIRE → AGUA · θ₂ < θ₁",
    number: "08",
  },
  {
    start: 177,
    end: 206,
    title: "Descifra la refracción",
    caption: "Bacon estudió la óptica; la ley de Snell llegó después.",
    cue: "LUZ → MEDIO → DIRECCIÓN",
    number: "09",
  },
];

const reveal = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const RefractionDiagram: React.FC<{ frame: number }> = ({ frame }) => {
  const surface = 362;
  const hitX = 610;
  const incident = reveal(frame, 1520, 1730);
  const refracted = reveal(frame, 4530, 4740);
  const normal = reveal(frame, 2730, 2870);
  const angles = reveal(frame, 4740, 4890);
  const ripplePhase = frame / 18;
  const ripple = (y: number, offset: number) =>
    Array.from({ length: 25 }, (_, index) => {
      const x = index * 50;
      const wave = Math.sin(index * 0.58 + ripplePhase + offset) * 4;
      return `${index === 0 ? "M" : "L"} ${x} ${y + wave}`;
    }).join(" ");
  const incomingProgress = reveal(frame, 1570, 1720);
  const outgoingProgress = reveal(frame, 4580, 4720);
  const incomingDot = {
    x: 235 + (hitX - 235) * incomingProgress,
    y: 124 + (surface - 124) * incomingProgress,
  };
  const outgoingDot = {
    x: hitX + (754 - hitX) * outgoingProgress,
    y: surface + (650 - surface) * outgoingProgress,
  };

  return (
    <svg
      viewBox="0 0 1200 700"
      role="img"
      aria-label="La luz pasa del aire al agua y se acerca a la normal"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <clipPath id="diagram-clip">
          <rect width="1200" height="700" />
        </clipPath>
        <marker
          id="ray-arrow"
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
        >
          <path d="M 0 0 L 12 6 L 0 12 z" fill={palette.light} />
        </marker>
        <pattern id="voxel-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 H 0 V 48" fill="none" stroke={palette.ink} strokeWidth="2" opacity="0.12" />
        </pattern>
      </defs>
      <g clipPath="url(#diagram-clip)">
        <rect width="1200" height={surface} fill={palette.parchment} />
        <rect y={surface} width="1200" height={700 - surface} fill={palette.water} />
        <rect width="1200" height="700" fill="url(#voxel-grid)" />
        <path d={ripple(448, 0)} fill="none" stroke={palette.cream} strokeWidth="6" strokeDasharray="16 12" opacity="0.48" />
        <path d={ripple(500, 1.7)} fill="none" stroke={palette.cream} strokeWidth="4" strokeDasharray="12 16" opacity="0.3" />
        <path d={ripple(638, 3.2)} fill="none" stroke={palette.cream} strokeWidth="4" strokeDasharray="14 18" opacity="0.24" />
        <rect x="0" y="660" width="1200" height="40" fill={palette.grassDark} />
        <rect x="0" y="648" width="1200" height="18" fill={palette.grass} />
        <rect x="84" y="572" width="56" height="56" fill={palette.waterInk} opacity="0.16" />
        <rect x="140" y="572" width="56" height="56" fill={palette.cream} opacity="0.13" />
        <rect x="196" y="572" width="56" height="56" fill={palette.waterInk} opacity="0.16" />
        <rect x="252" y="572" width="56" height="56" fill={palette.cream} opacity="0.13" />
        <rect x="308" y="572" width="56" height="56" fill={palette.waterInk} opacity="0.16" />
        <rect x="364" y="572" width="56" height="56" fill={palette.cream} opacity="0.13" />
        <text
          x="68"
          y="82"
          fill={palette.ink}
          fontFamily="Arial, sans-serif"
          fontSize="20"
          fontWeight="800"
          letterSpacing="2"
        >
          AIRE · n ≈ 1,00
        </text>
        <text
          x="68"
          y="433"
          fill={palette.waterInk}
          fontFamily="Arial, sans-serif"
          fontSize="20"
          fontWeight="800"
          letterSpacing="3"
        >
          AGUA · n ≈ 1,33
        </text>
      </g>
      <line x1="0" y1={surface} x2="1200" y2={surface} stroke={palette.cream} strokeWidth="5" strokeDasharray="28 10" />
      <line x1="0" y1={surface + 8} x2="1200" y2={surface + 8} stroke={palette.waterInk} strokeWidth="8" />
      <line
        x1={hitX}
        y1="72"
        x2={hitX}
        y2="660"
        stroke={palette.terracotta}
        strokeWidth="4"
        strokeDasharray="13 13"
        opacity={normal}
      />
      <line
        x1="235"
        y1="124"
        x2={hitX}
        y2={surface}
        stroke={palette.light}
        strokeWidth="11"
        strokeLinecap="round"
        strokeDasharray="443"
        strokeDashoffset={443 * (1 - incident)}
        markerEnd={incident > 0.98 ? "url(#ray-arrow)" : undefined}
      />
      <line
        x1={hitX}
        y1={surface}
        x2="754"
        y2="650"
        stroke={palette.light}
        strokeWidth="11"
        strokeLinecap="round"
        strokeDasharray="327"
        strokeDashoffset={327 * (1 - refracted)}
        markerEnd={refracted > 0.98 ? "url(#ray-arrow)" : undefined}
      />
      <path
        d={`M ${hitX} ${surface - 90} A 90 90 0 0 0 ${hitX - 78} ${surface - 45}`}
        fill="none"
        stroke={palette.terracotta}
        strokeWidth="4"
        opacity={angles}
      />
      <path
        d={`M ${hitX} ${surface + 90} A 90 90 0 0 0 ${hitX + 35} ${surface + 83}`}
        fill="none"
        stroke={palette.terracotta}
        strokeWidth="4"
        opacity={angles}
      />
      <circle cx={incomingDot.x} cy={incomingDot.y} r="12" fill={palette.cream} stroke={palette.terracotta} strokeWidth="5" opacity={incident} />
      <circle cx={outgoingDot.x} cy={outgoingDot.y} r="12" fill={palette.cream} stroke={palette.terracotta} strokeWidth="5" opacity={refracted} />
      <circle cx={hitX} cy={surface} r="16" fill={palette.light} stroke={palette.cream} strokeWidth="5" opacity={Math.max(incident, refracted)} />
      <rect x={hitX + 20} y="88" width="144" height="38" fill={palette.cream} stroke={palette.terracotta} strokeWidth="3" opacity={normal} />
      <text
        x={hitX + 92}
        y="113"
        textAnchor="middle"
        fill={palette.terracotta}
        fontFamily="Arial, sans-serif"
        fontSize="16"
        fontWeight="800"
        opacity={normal}
      >
        NORMAL
      </text>
      <text
        x={hitX - 104}
        y={surface - 103}
        fill={palette.ink}
        fontFamily="Georgia, serif"
        fontSize="30"
        fontWeight="700"
        opacity={angles}
      >
        θ₁
      </text>
      <text
        x={hitX + 43}
        y={surface + 111}
        fill={palette.waterInk}
        fontFamily="Georgia, serif"
        fontSize="30"
        fontWeight="700"
        opacity={angles}
      >
        θ₂
      </text>
      <text
        x="848"
        y="570"
        fill={palette.cream}
        fontFamily="Arial, sans-serif"
        fontSize="17"
        fontWeight="800"
        letterSpacing="2"
        opacity={refracted}
      >
        MÁS CERCA DE LA NORMAL
      </text>
      <rect x="850" y="95" width="286" height="78" fill={palette.cream} stroke={palette.ink} strokeWidth="4" opacity={angles} />
      <text
        x="993"
        y="127"
        textAnchor="middle"
        fill={palette.ink}
        fontFamily="Georgia, serif"
        fontSize="21"
        fontWeight="700"
        opacity={angles}
      >
        n₁ sen θ₁ = n₂ sen θ₂
      </text>
      <text
        x="993"
        y="153"
        textAnchor="middle"
        fill={palette.ink}
        fontFamily="Arial, sans-serif"
        fontSize="13"
        fontWeight="700"
        letterSpacing="1"
        opacity={angles}
      >
        LEY DE SNELL
      </text>
    </svg>
  );
};

const HorizontalVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const seconds = frame / fps;
  const chapter = chapters.find((part) => seconds >= part.start && seconds < part.end) ?? chapters[chapters.length - 1];
  const chapterIndex = chapters.indexOf(chapter);
  const chapterProgress = (seconds - chapter.start) / (chapter.end - chapter.start);
  const entrance = reveal(frame, chapter.start * fps, chapter.start * fps + 14);
  const exit = interpolate(frame, [chapter.end * fps - 12, chapter.end * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textOpacity = Math.min(entrance, exit);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.cream,
        color: palette.ink,
        fontFamily: "Arial, sans-serif",
        padding: "54px 88px 42px",
        boxSizing: "border-box",
      }}
    >
      {voiceTracks.map((track) => (
        <Sequence key={track.src} from={track.from}>
          <Audio src={staticFile(track.src)} volume={1} />
        </Sequence>
      ))}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: `4px solid ${palette.ink}`, padding: "12px 16px", backgroundColor: palette.parchment }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ width: 22, height: 22, backgroundColor: palette.grass, border: `4px solid ${palette.ink}`, boxShadow: `6px 6px 0 ${palette.grassDark}` }} />
                <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: 1 }}>MODO AVENTURA · ÓPTICA</span>
        </div>
              <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: 1 }}>DIARIO 04 · ROGER BACON</span>
      </div>

            <div style={{ display: "flex", gap: 42, alignItems: "center", marginTop: 34, height: 720 }}>
        <section style={{ width: 550, flexShrink: 0, alignSelf: "stretch", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ color: palette.grassDark, fontSize: 17, fontWeight: 900, letterSpacing: 1, marginBottom: 22 }}>
            {chapter.number} / 09 · {chapter.cue}
          </div>
                <div
                  style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: 48,
                    lineHeight: 1.08,
                    fontWeight: 900,
                    opacity: textOpacity,
                    transform: `translateY(${(1 - textOpacity) * 18}px)`,
                  }}
                >
            {chapter.title}
          </div>
                <div
                  style={{
                    marginTop: 24,
                    maxWidth: 500,
                    fontSize: 24,
                    lineHeight: 1.35,
                    fontWeight: 700,
                    opacity: textOpacity,
                    transform: `translateY(${(1 - textOpacity) * 18}px)`,
                  }}
                >
            {chapter.caption}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 44 }}>
            {chapters.map((part, index) => (
              <div
                key={part.number}
                style={{
                  height: 8,
                  flex: 1,
                        backgroundColor: index <= chapterIndex ? palette.grass : `${palette.ink}24`,
                  transform: index === chapterIndex ? `scaleY(${1 + chapterProgress * 0.5})` : "none",
                  transformOrigin: "left center",
                }}
              />
            ))}
          </div>
                <div style={{ marginTop: 12, fontSize: 16, fontWeight: 800, letterSpacing: 2 }}>
                  {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(Math.floor(seconds % 60)).padStart(2, "0")} / 03:26
          </div>
        </section>

        <div
          style={{
            flex: 1,
            minWidth: 0,
            height: 700,
                  border: `6px solid ${palette.ink}`,
            backgroundColor: palette.parchment,
            overflow: "hidden",
          }}
        >
          <RefractionDiagram frame={frame} />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 88,
          right: 88,
          bottom: 34,
          paddingTop: 16,
          borderTop: `2px solid ${palette.terracotta}`,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 16,
          fontWeight: 900,
          letterSpacing: 2,
        }}
      >
        <span>LUZ → CAMBIO DE MEDIO → CAMBIO DE DIRECCIÓN</span>
        <span>REFRACCIÓN · AIRE / AGUA</span>
      </div>
    </AbsoluteFill>
  );
};

export const HorizontalVideoRoot: React.FC = () => (
  <Composition
    id="RefraccionRogerBacon"
    component={HorizontalVideo}
    durationInFrames={durationInFrames}
    fps={fps}
    width={1920}
    height={1080}
  />
);
