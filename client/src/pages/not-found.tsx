import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-8xl font-serif font-bold text-gold-gradient mb-4" data-testid="text-404">
          404
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          This page doesn't exist yet.
        </p>
        <Link href="/">
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gold-400 text-navy-500 font-semibold cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            data-testid="button-go-home"
          >
            <ArrowLeft size={18} />
            Go Home
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}
