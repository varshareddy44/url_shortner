import {
  Button,
  Center,
  Container,
  Text,
  Title,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsLoggedIn } from "../../redux/slices/User";
import { IconLink } from "@tabler/icons-react";
import React from "react";

const Home = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const navigate = useNavigate();

  // More visible bow tile (whiter, with subtle stroke)
  // IMPORTANT: We'll render this *above* the gradient by ordering in backgroundImage.
  const bowPattern =
    "url(\"data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 120 120'>\
  <defs>\
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>\
      <stop offset='0%' stop-color='%23ffffff' stop-opacity='0.55'/>\
      <stop offset='100%' stop-color='%23ffffff' stop-opacity='0.28'/>\
    </linearGradient>\
  </defs>\
  <g fill='url(%23g)' stroke='%23ffffff' stroke-opacity='0.35' stroke-width='1.2'>\
    <path d='M40,60 C20,40 20,20 40,30 C55,37 63,45 60,60 C63,75 55,83 40,90 C20,100 20,80 40,60 Z'/>\
    <path d='M80,60 C100,40 100,20 80,30 C65,37 57,45 60,60 C57,75 65,83 80,90 C100,100 100,80 80,60 Z'/>\
    <circle cx='60' cy='60' r='9'/>\
    <path d='M54,70 L49,103 L58,86 L66,103 L61,70 Z'/>\
  </g>\
</svg>\")";

  // Re-usable SVG bow for large floating decorations
  const BigBow = ({ size = 180 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      style={{ display: "block" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.55)" />
        </linearGradient>
      </defs>
      <g fill="url(#gb)" stroke="rgba(255,255,255,0.65)" strokeWidth="2">
        <path d="M40,60 C20,40 20,20 40,30 C55,37 63,45 60,60 C63,75 55,83 40,90 C20,100 20,80 40,60 Z" />
        <path d="M80,60 C100,40 100,20 80,30 C65,37 57,45 60,60 C57,75 65,83 80,90 C100,100 100,80 80,60 Z" />
        <circle cx="60" cy="60" r="10" />
        <path d="M54,70 L49,103 L58,86 L66,103 L61,70 Z" />
      </g>
    </svg>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        // Put PATTERN FIRST so it sits on top of the gradient
        backgroundImage: `
          ${bowPattern},
          linear-gradient(135deg, #d9afd9 0%, #97d9e1 100%)
        `,
        backgroundSize: "180px 180px, cover",
        backgroundAttachment: "fixed, fixed",
        backgroundBlendMode: "normal, normal",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* large floating bows */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {[
          { top: "12%", left: "14%", size: 210, dur: 18, delay: 0, rot: 6 },
          { top: "78%", left: "22%", size: 170, dur: 16, delay: 2, rot: -8 },
          { top: "24%", left: "84%", size: 200, dur: 20, delay: 1, rot: -5 },
          { top: "72%", left: "82%", size: 160, dur: 17, delay: 3, rot: 7 },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: b.top,
              left: b.left,
              transform: `translate(-50%, -50%) rotate(${b.rot}deg)`,
              opacity: 0.28,
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.15))",
              animation: `float${i % 2 ? "B" : "A"} ${b.dur}s ease-in-out ${b.delay}s infinite`,
              willChange: "transform, opacity",
            }}
          >
            <BigBow size={b.size} />
          </div>
        ))}
      </div>

      {/* soft glow accents */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.45), rgba(255,255,255,0) 60%)",
            top: -140,
            left: -120,
            filter: "blur(10px)",
            animation: "glowA 14s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 560,
            height: 560,
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.32), rgba(255,255,255,0) 60%)",
            bottom: -160,
            right: -140,
            filter: "blur(12px)",
            animation: "glowB 18s ease-in-out infinite",
          }}
        />
      </div>

      <Container size="sm" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            backdropFilter: "blur(18px)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.12))",
            border: "1px solid rgba(255,255,255,0.34)",
            borderRadius: 28,
            padding: "3rem 2rem",
            boxShadow: "0 10px 50px rgba(0, 0, 0, 0.25)",
            textAlign: "center",
          }}
        >
          <Center>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                display: "grid",
                placeItems: "center",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.08))",
                border: "1px solid rgba(255,255,255,0.38)",
                boxShadow:
                  "inset 0 0 0 1px rgba(255,255,255,0.12), 0 8px 24px rgba(0,0,0,0.25)",
              }}
            >
              <IconLink size={40} color="#ffffff" />
            </div>
          </Center>

          <Title
            order={1}
            style={{
              color: "white",
              fontWeight: 800,
              fontSize: "3rem",
              marginTop: "1.2rem",
              letterSpacing: "0.02em",
              textShadow: "0 2px 18px rgba(0,0,0,0.18)",
            }}
          >
            URL SHORTENER
          </Title>

          <Text
            size="lg"
            style={{
              color: "rgba(255,255,255,0.9)",
              marginTop: "0.8rem",
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            Create sleek short links with custom aliases, titles, and expiry.
            Fast, simple, and beautiful.
          </Text>

          <Button
            size="md"
            radius="xl"
            variant="gradient"
            gradient={{ from: "grape", to: "indigo", deg: 135 }}
            style={{
              paddingInline: "1.6rem",
              boxShadow:
                "0 10px 25px rgba(79, 70, 229, 0.35), inset 0 0 0 1px rgba(255,255,255,0.25)",
            }}
            onClick={() =>
              isLoggedIn ? navigate("/url/shortener") : navigate("/login")
            }
          >
            Get Started
          </Button>

          <Text size="sm" style={{ color: "rgba(255,255,255,0.75)", marginTop: "1rem" }}>
            No account yet? You’ll be prompted to sign in.
          </Text>
        </div>
      </Container>

      {/* keyframes */}
      <style>{`
        @keyframes glowA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.05); }
        }
        @keyframes glowB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-18px, 22px) scale(1.06); }
        }
        @keyframes floatA {
          0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 0.26; }
          50% { transform: translate(-50%, -46%) rotate(6deg); opacity: 0.38; }
          100% { transform: translate(-50%, -50%) rotate(0deg); opacity: 0.26; }
        }
        @keyframes floatB {
          0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 0.26; }
          50% { transform: translate(-50%, -54%) rotate(-6deg); opacity: 0.38; }
          100% { transform: translate(-50%, -50%) rotate(0deg); opacity: 0.26; }
        }
        @media (max-width: 480px) {
          h1 { font-size: 2.2rem !important; }
        }
        /* Accessibility: reduce animations if user prefers */
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Home;
