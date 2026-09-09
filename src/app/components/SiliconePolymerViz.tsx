import { useRef, useEffect } from "react";

interface Chain {
  yFrac: number;
  amp: number;
  freq: number;
  phase: number;
  speed: number;
  lw: number;
  alpha: number;
}

const CHAINS: Chain[] = [
  { yFrac: 0.09, amp: 0.025, freq: 0.9,  phase: 0.0, speed: 0.18, lw: 0.7, alpha: 0.10 },
  { yFrac: 0.20, amp: 0.050, freq: 1.05, phase: 1.3, speed: 0.26, lw: 1.4, alpha: 0.26 },
  { yFrac: 0.32, amp: 0.075, freq: 0.80, phase: 0.6, speed: 0.16, lw: 2.4, alpha: 0.48 },
  { yFrac: 0.45, amp: 0.090, freq: 1.00, phase: 2.0, speed: 0.22, lw: 3.2, alpha: 0.66 },
  { yFrac: 0.57, amp: 0.080, freq: 0.90, phase: 0.4, speed: 0.28, lw: 2.8, alpha: 0.56 },
  { yFrac: 0.69, amp: 0.060, freq: 1.15, phase: 1.7, speed: 0.20, lw: 1.8, alpha: 0.36 },
  { yFrac: 0.80, amp: 0.040, freq: 0.85, phase: 0.8, speed: 0.24, lw: 1.2, alpha: 0.20 },
  { yFrac: 0.91, amp: 0.025, freq: 1.05, phase: 0.2, speed: 0.30, lw: 0.6, alpha: 0.10 },
];

const N = 20;

export function SiliconePolymerViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function chainPts(chain: Chain): [number, number][] {
      const W = canvas.width, H = canvas.height;
      return Array.from({ length: N + 1 }, (_, i) => {
        const fx = i / N;
        return [
          fx * W,
          chain.yFrac * H +
            chain.amp * H * Math.sin(chain.freq * fx * Math.PI * 2 + chain.phase + t * chain.speed),
        ] as [number, number];
      });
    }

    function drawBone(points: [number, number][], lw: number, alpha: number) {
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length - 1; i++) {
        const mx = (points[i][0] + points[i + 1][0]) / 2;
        const my = (points[i][1] + points[i + 1][1]) / 2;
        ctx.quadraticCurveTo(points[i][0], points[i][1], mx, my);
      }
      ctx.lineTo(points[N][0], points[N][1]);
      ctx.strokeStyle = `rgba(27,47,94,${alpha})`;
      ctx.lineWidth = lw;
      ctx.shadowBlur = lw > 2 ? 12 : 5;
      ctx.shadowColor = `rgba(27,47,94,${alpha * 0.55})`;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    function drawAtoms(points: [number, number][], lw: number, alpha: number) {
      for (let i = 1; i < points.length - 1; i++) {
        const [x, y] = points[i];
        const isSi = i % 2 === 1;
        const r = isSi
          ? lw > 2.5 ? 5.5 : lw > 1.5 ? 4.0 : 2.5
          : lw > 2.5 ? 3.5 : lw > 1.5 ? 2.5 : 1.5;
        const baseColor = isSi ? "27,47,94" : "200,16,46";
        const a = Math.min(1, alpha * 2.4);

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor},${a})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${baseColor},${a * 0.4})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function drawCrosslinks(allPts: [number, number][][]) {
      for (let c = 0; c < allPts.length - 1; c++) {
        if (CHAINS[c].alpha < 0.38 || CHAINS[c + 1].alpha < 0.38) continue;
        const upper = allPts[c];
        const lower = allPts[c + 1];
        for (let i = 4; i < N - 2; i += 5) {
          const [x1, y1] = upper[i];
          const [x2, y2] = lower[i];
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = "rgba(200,16,46,0.14)";
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 6]);
          ctx.stroke();
          ctx.setLineDash([]);

          // small dot at crosslink node
          ctx.beginPath();
          ctx.arc(x1, y1, 3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(200,16,46,0.30)";
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x2, y2, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const allPts = CHAINS.map(c => chainPts(c));
      drawCrosslinks(allPts);
      CHAINS.forEach((c, i) => {
        drawBone(allPts[i], c.lw, c.alpha);
        drawAtoms(allPts[i], c.lw, c.alpha);
      });
      t += 0.010;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      className="relative w-full h-full"
      style={{ background: "linear-gradient(140deg, #ffffff 0%, #F3F8FF 55%, #E8F0FF 100%)" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Chemical identity label — top right */}
      <div
        className="absolute top-8 right-8 text-right select-none pointer-events-none"
        style={{ lineHeight: 1.5 }}
      >
        <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.32em", color: "rgba(27,47,94,0.12)" }}>
          POLYDIMETHYLSILOXANE
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 15, letterSpacing: "0.12em", color: "rgba(27,47,94,0.16)", marginTop: 2 }}>
          (CH₃)₂Si–O
        </div>
      </div>

      {/* Atom legend — bottom right */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-2 select-none pointer-events-none">
        <div className="flex items-center gap-2">
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(27,47,94,0.60)" }} />
          <span style={{ fontSize: 11, color: "rgba(27,47,94,0.38)", fontFamily: "monospace", fontWeight: 700 }}>Si</span>
        </div>
        <div className="flex items-center gap-2">
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(200,16,46,0.60)" }} />
          <span style={{ fontSize: 11, color: "rgba(27,47,94,0.38)", fontFamily: "monospace", fontWeight: 700 }}>O</span>
        </div>
        <div style={{ marginTop: 4, width: 28, borderTop: "1px dashed rgba(200,16,46,0.25)" }} />
        <span style={{ fontSize: 9, color: "rgba(27,47,94,0.28)", fontFamily: "monospace", letterSpacing: "0.08em" }}>CROSSLINK</span>
      </div>
    </div>
  );
}
