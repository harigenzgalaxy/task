import { motion } from "framer-motion"

export function FadeInUp({ children, delay = 0, duration = 0.5 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration,
        ease: "easeOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  )
} 