import { motion, useScroll, useTransform } from "framer-motion";

const shapes = [
  { src: "/images/3d-sphere.png", size: "w-32 md:w-44", top: "10%", left: "5%", delay: 0, speed: 0.15 },
  { src: "/images/3d-torus.png", size: "w-28 md:w-36", top: "60%", right: "3%", delay: 1.5, speed: -0.1 },
  { src: "/images/3d-cube.png", size: "w-20 md:w-28", top: "35%", right: "10%", delay: 0.8, speed: 0.2 },
  { src: "/images/3d-cone.png", size: "w-24 md:w-32", bottom: "15%", left: "8%", delay: 2, speed: -0.15 },
  { src: "/images/3d-helix.png", size: "w-20 md:w-24", top: "75%", left: "45%", delay: 1, speed: 0.12 },
];

export default function Floating3D() {
  const { scrollY } = useScroll();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {shapes.map((shape, i) => (
        <Floating3DItem key={i} shape={shape} scrollY={scrollY} />
      ))}
    </div>
  );
}

function Floating3DItem({ shape, scrollY }: { shape: typeof shapes[0]; scrollY: any }) {
  const y = useTransform(scrollY, [0, 3000], [0, shape.speed * 800]);

  return (
    <motion.div
      className={`absolute ${shape.size} opacity-40 md:opacity-50`}
      style={{
        top: shape.top,
        left: (shape as any).left,
        right: (shape as any).right,
        bottom: (shape as any).bottom,
        y,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 0.4, scale: 1 }}
      transition={{ duration: 1.5, delay: shape.delay, ease: "easeOut" }}
    >
      <motion.img
        src={shape.src}
        alt=""
        className="w-full h-full object-contain drop-shadow-2xl"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, -3, 0],
        }}
        transition={{
          duration: 8 + shape.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
