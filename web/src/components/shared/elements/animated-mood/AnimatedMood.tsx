import { useCallback, useEffect, useRef, useState } from "react";

// Тип частицы
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  baseOpacity: number;
  angle: number;
  speed: number;
  type: "linear" | "circular" | "sinusoidal";
  radius?: number;
  centerX?: number;
  centerY?: number;
}

// Константы
const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 120;
const MOUSE_INFLUENCE_RADIUS = 150;
const MOUSE_FORCE = 0.02;

// Цвета для темной темы (яркие, насыщенные)
const DARK_COLORS = [
  "rgba(124, 58, 237, 0.9)", // purple
  "rgba(6, 182, 212, 0.9)", // cyan
  "rgba(239, 68, 68, 0.9)", // red
  "rgba(245, 158, 11, 0.9)", // amber
  "rgba(16, 185, 129, 0.9)", // green
  "rgba(59, 130, 246, 0.9)", // blue
];

// Цвета для светлой темы (приглушенные, но яркие)
const LIGHT_COLORS = [
  "rgba(139, 92, 246, 0.7)", // purple
  "rgba(14, 165, 233, 0.7)", // cyan
  "rgba(239, 68, 68, 0.7)", // red
  "rgba(245, 158, 11, 0.7)", // amber
  "rgba(34, 197, 94, 0.7)", // green
  "rgba(59, 130, 246, 0.7)", // blue
];

/**
 * Получает текущую тему из DOM
 */
function getCurrentTheme(): "dark" | "light" {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * Создает новую частицу со случайными параметрами
 */
function createParticle(
  width: number,
  height: number,
  isDark: boolean,
): Particle {
  const type = (["linear", "circular", "sinusoidal"] as const)[
    Math.floor(Math.random() * 3)
  ];
  const speed = 0.3 + Math.random() * 0.5;
  const angle = Math.random() * Math.PI * 2;
  const baseOpacity = isDark
    ? 0.5 + Math.random() * 0.3
    : 0.4 + Math.random() * 0.3;
  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

  if (type === "circular") {
    const radius = 50 + Math.random() * 100;
    const centerX = width * 0.5 + (Math.random() - 0.5) * width * 0.3;
    const centerY = height * 0.5 + (Math.random() - 0.5) * height * 0.3;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      vx: 0,
      vy: 0,
      size: 2 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: baseOpacity,
      baseOpacity,
      angle,
      speed: speed * 0.02,
      type,
      radius,
      centerX,
      centerY,
    };
  }

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: 2 + Math.random() * 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: baseOpacity,
    baseOpacity,
    angle,
    speed,
    type,
  };
}

/**
 * Обновляет позицию частицы
 */
function updateParticle(
  particle: Particle,
  width: number,
  height: number,
  mouseX: number | null,
  mouseY: number | null,
): void {
  // Влияние мыши
  if (mouseX !== null && mouseY !== null) {
    const dx = particle.x - mouseX;
    const dy = particle.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < MOUSE_INFLUENCE_RADIUS) {
      const force =
        (MOUSE_INFLUENCE_RADIUS - distance) / MOUSE_INFLUENCE_RADIUS;
      const angle = Math.atan2(dy, dx);
      particle.vx += Math.cos(angle) * MOUSE_FORCE * force;
      particle.vy += Math.sin(angle) * MOUSE_FORCE * force;
    }
  }

  // Обновление позиции в зависимости от типа движения
  if (
    particle.type === "circular" &&
    particle.radius &&
    particle.centerX !== undefined &&
    particle.centerY !== undefined
  ) {
    particle.angle += particle.speed;
    particle.x = particle.centerX + particle.radius * Math.cos(particle.angle);
    particle.y = particle.centerY + particle.radius * Math.sin(particle.angle);
  } else if (particle.type === "sinusoidal") {
    particle.angle += particle.speed * 0.1;
    particle.x += particle.vx;
    particle.y += particle.vy + Math.sin(particle.angle) * 0.5;
  } else {
    particle.x += particle.vx;
    particle.y += particle.vy;
  }

  // Затухание скорости (трение)
  particle.vx *= 0.98;
  particle.vy *= 0.98;

  // Обработка границ (wrap-around)
  if (particle.x < 0) particle.x = width;
  if (particle.x > width) particle.x = 0;
  if (particle.y < 0) particle.y = height;
  if (particle.y > height) particle.y = 0;

  // Плавное изменение opacity
  particle.opacity =
    particle.baseOpacity + Math.sin(Date.now() * 0.001 + particle.angle) * 0.2;
}

/**
 * Рисует частицу на canvas
 */
function drawParticle(ctx: CanvasRenderingContext2D, particle: Particle): void {
  ctx.save();
  ctx.globalAlpha = particle.opacity;

  // Создание градиента для свечения
  const gradient = ctx.createRadialGradient(
    particle.x,
    particle.y,
    0,
    particle.x,
    particle.y,
    particle.size * 3,
  );
  gradient.addColorStop(0, particle.color);
  gradient.addColorStop(1, "transparent");

  ctx.fillStyle = gradient;
  ctx.shadowBlur = 15;
  ctx.shadowColor = particle.color;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/**
 * Рисует соединительные линии между близкими частицами
 */
function drawConnections(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  isDark: boolean,
): void {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < CONNECTION_DISTANCE) {
        const opacity =
          (1 - distance / CONNECTION_DISTANCE) * (isDark ? 0.25 : 0.15);
        ctx.strokeStyle = isDark
          ? `rgba(255, 255, 255, ${opacity})`
          : `rgba(0, 0, 0, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

export default function AnimatedMood() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });
  const [isDark, setIsDark] = useState<boolean>(
    () => getCurrentTheme() === "dark",
  );

  // Отслеживание изменения темы
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newIsDark = getCurrentTheme() === "dark";
      if (newIsDark !== isDark) {
        setIsDark(newIsDark);
        // Пересоздаем частицы с новыми цветами
        const canvas = canvasRef.current;
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
            createParticle(rect.width, rect.height, newIsDark),
          );
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [isDark]);

  // Инициализация частиц
  const initParticles = useCallback(
    (width: number, height: number): void => {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(width, height, isDark),
      );
    },
    [isDark],
  );

  // Настройка canvas
  const setupCanvas = useCallback((canvas: HTMLCanvasElement): void => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
  }, []);

  // Анимационный цикл
  const animate = useCallback((): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Очистка canvas
    ctx.clearRect(0, 0, width, height);

    // Обновление и отрисовка частиц
    particlesRef.current.forEach((particle) => {
      updateParticle(
        particle,
        width,
        height,
        mouseRef.current.x,
        mouseRef.current.y,
      );
      drawParticle(ctx, particle);
    });

    // Отрисовка соединений
    drawConnections(ctx, particlesRef.current, isDark);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isDark]);

  // Обработчик движения мыши
  const handleMouseMove = useCallback((e: MouseEvent): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseLeave = useCallback((): void => {
    mouseRef.current = { x: null, y: null };
  }, []);

  // Обработчик touch для мобильных устройств
  const handleTouchMove = useCallback((e: TouchEvent): void => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
  }, []);

  const handleTouchEnd = useCallback((): void => {
    mouseRef.current = { x: null, y: null };
  }, []);

  // Инициализация компонента
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setupCanvas(canvas);
    const rect = canvas.getBoundingClientRect();
    initParticles(rect.width, rect.height);

    // Обработка изменения размера окна
    const handleResize = (): void => {
      setupCanvas(canvas);
      const newRect = canvas.getBoundingClientRect();
      initParticles(newRect.width, newRect.height);
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);

    // Запуск анимации
    animationFrameRef.current = requestAnimationFrame(animate);

    // Очистка
    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    setupCanvas,
    initParticles,
    animate,
    handleMouseMove,
    handleMouseLeave,
    handleTouchMove,
    handleTouchEnd,
  ]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{
          willChange: "transform",
        }}
      />
    </div>
  );
}
