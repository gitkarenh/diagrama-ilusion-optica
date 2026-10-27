import React from "react";
import {
  AbsoluteFill,
  Audio,
  Composition,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const colors = {
  parchment: "#17122F",
  darkBlue: "#F4F0FF",
  waterBlue: "#112F5B",
  gold: "#FFE85A",
  terracotta: "#FF3DC8",
  cream: "#0B0820",
  cyan: "#00F5FF",
  panel: "#15102B",
};

const fps = 30;
const durationInFrames = 44 * fps;

const beats = [
  {
    start: 0,
    end: 8,
    title: "¿Qué crees que pasará?",
    caption: "Mira el rayo al llegar al agua.",
    prompt: "PAUSA Y ADIVINA",
  },
  {
    start: 8,
    end: 19,
    title: "¡Cambia de dirección!",
    caption: "A este cambio lo llamamos refracción.",
    prompt: "AIRE  →  AGUA",
  },
  {
    start: 19,
    end: 29,
    title: "Conoce la normal",
    caption: "Es una línea imaginaria perpendicular a la superficie.",
    prompt: "UNA GUÍA IMAGINARIA",
  },
  {
    start: 29,
    end: 38,
    title: "¿Hacia dónde se desvía?",
    caption: "Al entrar en el agua, el rayo se acerca a la normal.",
    prompt: "¡SIGUE EL RAYO!",
  },
  {
    start: 38,
    end: 44,
    title: "¡Eso es la refracción!",
    caption: "Cambia de medio y cambia de dirección.",
    prompt: "LUZ  →  CAMBIO  →  DIRECCIÓN",
  },
];

const clampFade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const RefractionDiagram: React.FC<{ frame: number }> = ({ frame }) => {
  const incident = clampFade(frame, 12, 170);
  const refracted = clampFade(frame, 240, 445);
  const normal = clampFade(frame, 510, 565);
  const explanation = clampFade(frame, 855, 910);
  const incomingLength = 460;
  const outgoingLength = 425;
  const photonIn = clampFade(frame, 35, 165);
  const photonOut = clampFade(frame, 250, 425);
  const photonX = 110 + (450 - 110) * photonIn;
  const photonY = 220 + (422 - 220) * photonIn;
  const waterPhotonX = 450 + (590 - 450) * photonOut;
  const waterPhotonY = 422 + (825 - 422) * photonOut;
  const ripplePhase = frame / 14;
  const makeRipple = (y: number, offset: number) =>
    Array.from({ length: 19 }, (_, index) => {
      const x = index * 50;
      const wave = Math.sin(index * 0.66 + ripplePhase + offset) * 7;
      return `${index === 0 ? "M" : "L"} ${x} ${y + wave}`;
    }).join(" ");

  return (
    <svg
      viewBox="0 0 900 920"
      role="img"
      aria-label="Rayo de luz que cambia de dirección al pasar del aire al agua"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <clipPath id="diagram-clip">
          <rect x="4" y="4" width="892" height="912" rx="38" />
        </clipPath>
        <filter id="neon-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g clipPath="url(#diagram-clip)">
        <rect x="4" y="4" width="892" height="418" fill={colors.parchment} />
        <rect x="4" y="422" width="892" height="494" fill={colors.waterBlue} />
        <path d={makeRipple(535, 0)} fill="none" stroke={colors.cyan} strokeWidth="4" opacity="0.25" />
        <path d={makeRipple(565, 1.5)} fill="none" stroke={colors.cyan} strokeWidth="3" opacity="0.18" />
        <path d={makeRipple(858, 3)} fill="none" stroke={colors.cyan} strokeWidth="3" opacity="0.14" />
      </g>
      <line
        x1="4"
        y1="422"
        x2="896"
        y2="422"
        stroke={colors.cyan}
        strokeWidth="10"
        strokeLinecap="round"
        filter="url(#neon-glow)"
      />
      <line
        x1="110"
        y1="220"
        x2="450"
        y2="422"
        stroke={colors.gold}
        strokeWidth="15"
        strokeDasharray={incomingLength}
        strokeDashoffset={incomingLength * (1 - incident)}
        strokeLinecap="round"
        filter="url(#neon-glow)"
      />
      <line
        x1="450"
        y1="422"
        x2="590"
        y2="825"
        stroke={colors.gold}
        strokeWidth="15"
        strokeDasharray={outgoingLength}
        strokeDashoffset={outgoingLength * (1 - refracted)}
        strokeLinecap="round"
        filter="url(#neon-glow)"
      />
      <line
        x1="450"
        y1="115"
        x2="450"
        y2="865"
        stroke={colors.terracotta}
        strokeWidth="7"
        strokeDasharray="18 14"
        strokeLinecap="round"
        opacity={Math.max(0.3, normal)}
      />
      <circle
        cx={photonX}
        cy={photonY}
        r="13"
        fill={colors.cream}
        stroke={colors.cyan}
        strokeWidth="7"
        opacity={incident}
        filter="url(#neon-glow)"
      />
      <circle
        cx={waterPhotonX}
        cy={waterPhotonY}
        r="13"
        fill={colors.cream}
        stroke={colors.gold}
        strokeWidth="7"
        opacity={refracted}
        filter="url(#neon-glow)"
      />
      <polygon
        points="450,422 411,429 442,459"
        fill={colors.gold}
        opacity={incident}
        filter="url(#neon-glow)"
      />
      <polygon
        points="590,825 550,798 593,782"
        fill={colors.gold}
        opacity={refracted}
        filter="url(#neon-glow)"
      />
      <circle
        cx="450"
        cy="422"
        r="26"
        fill={colors.panel}
        stroke={colors.terracotta}
        strokeWidth="8"
        opacity={refracted}
        filter="url(#neon-glow)"
      />
      <circle
        cx="450"
        cy="422"
        r="11"
        fill={colors.gold}
        opacity={refracted}
        filter="url(#neon-glow)"
      />
      <rect
        x="54"
        y="48"
        width="166"
        height="82"
        rx="28"
        fill={colors.panel}
        stroke={colors.cyan}
        strokeWidth="4"
      />
      <text
        x="137"
        y="103"
        textAnchor="middle"
        fill={colors.cyan}
        fontFamily="Arial, sans-serif"
        fontSize="38"
        fontWeight="900"
        letterSpacing="4"
      >
        AIRE
      </text>
      <rect
        x="54"
        y="470"
        width="178"
        height="82"
        rx="28"
        fill={colors.panel}
        stroke={colors.cyan}
        strokeWidth="4"
      />
      <text
        x="143"
        y="525"
        textAnchor="middle"
        fill={colors.cyan}
        fontFamily="Arial, sans-serif"
        fontSize="38"
        fontWeight="900"
        letterSpacing="4"
      >
        AGUA
      </text>
      <rect
        x="482"
        y="145"
        width="210"
        height="64"
        rx="23"
        fill={colors.panel}
        stroke={colors.terracotta}
        strokeWidth="4"
        opacity={normal}
      />
      <text
        x="587"
        y="187"
        textAnchor="middle"
        fill={colors.terracotta}
        fontFamily="Arial, sans-serif"
        fontSize="27"
        fontWeight="900"
        opacity={normal}
      >
        NORMAL
      </text>
      <text
        x="84"
        y="375"
        fill={colors.cyan}
        fontFamily="Arial, sans-serif"
        fontSize="24"
        fontWeight="900"
        opacity={incident}
      >
        RAYO DE LUZ
      </text>
      <rect
        x="567"
        y="635"
        width="250"
        height="101"
        rx="24"
        fill={colors.panel}
        stroke={colors.gold}
        strokeWidth="4"
        opacity={explanation}
      />
      <text
        x="692"
        y="678"
        textAnchor="middle"
        fill={colors.gold}
        fontFamily="Arial, sans-serif"
        fontSize="23"
        fontWeight="900"
        opacity={explanation}
      >
        <tspan x="692" dy="0">
          SE ACERCA
        </tspan>
        <tspan x="692" dy="31">
          A LA NORMAL
        </tspan>
      </text>
      <text
        x="570"
        y="510"
        fill={colors.cyan}
        fontFamily="Arial, sans-serif"
        fontSize="20"
        fontWeight="900"
        opacity={refracted}
        paintOrder="stroke"
      >
        CAMBIA DE MEDIO
      </text>
    </svg>
  );
};

const Video: React.FC = () => {
  const frame = useCurrentFrame();
  const seconds = frame / fps;
  const beat =
    beats.find((part) => seconds >= part.start && seconds < part.end) ??
    beats[beats.length - 1];
  const beatIndex = beats.indexOf(beat);
  const start = beat.start * fps;
  const end = beat.end * fps;
  const progress = (seconds - beat.start) / (beat.end - beat.start);
  const fade = Math.min(
    clampFade(frame, start, start + 12),
    interpolate(frame, [end - 10, end], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const pulse = 1 + Math.sin(frame / 9) * 0.035;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.cream,
        color: colors.darkBlue,
        fontFamily: "Arial, sans-serif",
        padding: "58px 66px 46px",
        boxSizing: "border-box",
      }}
    >
      <Audio src={staticFile("voz.ogg")} />

      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <div
          style={{
            backgroundColor: colors.gold,
            border: `4px solid ${colors.cyan}`,
            padding: "13px 20px",
            fontSize: 24,
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: 3,
            color: colors.cream,
            boxShadow: `0 0 20px ${colors.gold}`,
          }}
        >
          LUZ
        </div>
        <div
          style={{
            fontSize: 46,
            lineHeight: 1.03,
            fontWeight: 900,
            color: colors.darkBlue,
          }}
        >
          ¿Por qué cambia
          <br />
          el rayo?
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 27,
          marginBottom: 24,
        }}
      >
        {beats.map((part, index) => (
          <div
            key={part.title}
            style={{
              height: 10,
              flex: 1,
              backgroundColor:
                index <= beatIndex ? colors.cyan : colors.panel,
              border: `1px solid ${colors.darkBlue}`,
              borderRadius: 8,
              opacity: index === beatIndex ? 0.55 + progress * 0.45 : 0.7,
              boxShadow:
                index === beatIndex ? `0 0 14px ${colors.cyan}` : "none",
            }}
          />
        ))}
      </div>

      <div
        style={{
          width: "100%",
          height: 970,
          border: `3px solid ${colors.cyan}`,
          borderRadius: 42,
          overflow: "hidden",
          backgroundColor: colors.parchment,
          boxSizing: "border-box",
          boxShadow: `0 0 24px ${colors.cyan}55, 0 10px 0 ${colors.terracotta}`,
        }}
      >
        <RefractionDiagram frame={frame} />
      </div>

      <div
        style={{
          marginTop: 29,
          height: 318,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          opacity: fade,
          transform: `translateY(${(1 - fade) * 24}px) scale(${0.98 + fade * 0.02})`,
          transformOrigin: "left center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 12,
          }}
        >
          {beatIndex === 0 && (
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: colors.cyan,
                transform: `scale(${pulse})`,
                boxShadow: `0 0 18px ${colors.cyan}`,
              }}
            />
          )}
          <div
            style={{
              fontSize: 23,
              fontWeight: 900,
              letterSpacing: 3,
              color: colors.cyan,
            }}
          >
            {beat.prompt}
          </div>
        </div>
        <div
          style={{
            fontSize: 43,
            lineHeight: 1.08,
            fontWeight: 900,
            marginBottom: 12,
            textShadow: `0 0 18px ${colors.cyan}55`,
          }}
        >
          {beat.title}
        </div>
        <div style={{ fontSize: 27, lineHeight: 1.22, fontWeight: 700 }}>
          {beat.caption}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 66,
          right: 66,
          bottom: 43,
          height: 53,
          borderTop: `2px solid ${colors.terracotta}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontSize: 19,
          fontWeight: 900,
          letterSpacing: 2,
          color: colors.cyan,
        }}
      >
        <span>ROGER BACON</span>
        <span>REFRACCIÓN · AIRE → AGUA</span>
      </div>
    </AbsoluteFill>
  );
};

export const VideoRoot: React.FC = () => (
  <Composition
    id="RefraccionRogerBacon"
    component={Video}
    durationInFrames={durationInFrames}
    fps={fps}
    width={1080}
    height={1920}
  />
);
