import React, { useRef, useEffect } from "react";

// You can replace these with actual leaf images or SVGs for more realism
const LEAF_COLORS = ["#A0522D", "#8B4513", "#DEB887", "#228B22", "#B22222"];
const LEAF_EMOJIS = ["🍂", "🍁", "🌿", "🍃"];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createLeaf(width, height) {
  return {
    x: randomBetween(0, width),
    y: randomBetween(-height, 0),
    vx: randomBetween(-0.2, 0.2),
    vy: randomBetween(1, 2.5),
    angle: randomBetween(0, 2 * Math.PI),
    angleSpeed: randomBetween(-0.01, 0.01),
    size: randomBetween(18, 32),
    color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
    emoji: LEAF_EMOJIS[Math.floor(Math.random() * LEAF_EMOJIS.length)],
  };
}

const LEAF_COUNT = 24;

export default function LeavesAnimation() {
  const canvasRef = useRef(null);
  const leavesRef = useRef([]);
  const pointerRef = useRef({ x: null, y: null, active: false });

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Initialize leaves
    leavesRef.current = Array.from({ length: LEAF_COUNT }, () =>
      createLeaf(width, height)
    );

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let leaf of leavesRef.current) {
        // Interactive spread effect
        if (pointerRef.current.active && pointerRef.current.x !== null) {
          const dx = leaf.x - pointerRef.current.x;
          const dy = leaf.y - pointerRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            // Apply a repelling force
            const force = (120 - dist) / 120;
            leaf.vx += (dx / dist) * force * 0.7;
            leaf.vy += (dy / dist) * force * 0.7;
          }
        }

        // Gravity and wind
        leaf.vy += 0.01; // gravity
        leaf.vx *= 0.98; // wind friction

        // Update position
        leaf.x += leaf.vx;
        leaf.y += leaf.vy;
        leaf.angle += leaf.angleSpeed;

        // Draw leaf (emoji for simplicity)
        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.angle);
        ctx.font = `${leaf.size}px serif`;
        ctx.globalAlpha = 0.85;
        ctx.fillText(leaf.emoji, 0, 0);
        ctx.restore();

        // Respawn leaf if out of bounds
        if (
          leaf.y > height + 40 ||
          leaf.x < -40 ||
          leaf.x > width + 40
        ) {
          Object.assign(leaf, createLeaf(width, height));
          leaf.y = -40;
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mouse/touch events for interactivity
  useEffect(() => {
    function handlePointerMove(e) {
      pointerRef.current.active = true;
      if (e.touches) {
        pointerRef.current.x = e.touches[0].clientX;
        pointerRef.current.y = e.touches[0].clientY;
      } else {
        pointerRef.current.x = e.clientX;
        pointerRef.current.y = e.clientY;
      }
    }
    function handlePointerLeave() {
      pointerRef.current.active = false;
      pointerRef.current.x = null;
      pointerRef.current.y = null;
    }
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: false });
    window.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("touchend", handlePointerLeave);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("touchend", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
      width={window.innerWidth}
      height={window.innerHeight}
      aria-hidden="true"
    />
  );
}