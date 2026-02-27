import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative h-[70vh] lg:h-[85vh] overflow-hidden">
      <img
        src={heroBanner}
        alt="Premium leather goods and accessories on linen"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-foreground/30" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary-foreground/80 font-body text-sm tracking-[0.3em] uppercase mb-4"
        >
          Luxe Edition 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground mb-6 max-w-3xl leading-tight"
        >
          Heritage Inspired Modern Luxury Design
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-primary-foreground/90 font-body text-base md:text-lg mb-8 max-w-xl"
        >
          Curated essentials crafted to endure, inspired by heritage and modern living.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <Link
            to="/shop"
            className="inline-block bg-primary-foreground text-foreground font-body text-sm font-medium tracking-widest uppercase px-10 py-4 hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
