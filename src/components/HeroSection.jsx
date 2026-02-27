import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center section-padding overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[120px] animate-float" />
      <div className="absolute bottom-1/3 left-1/6 w-56 h-56 rounded-full bg-primary/5 blur-[100px] animate-float" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary font-medium mb-4 text-lg tracking-widest uppercase"
        >
          Hello !!!
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4"
        >
          I'm KARTHIGA<br className="hidden sm:block" />
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6"
        >
          Front End Developer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-sm sm:text-base text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          I’m a passionate Frontend Developer with a strong foundation in HTML, CSS, and JavaScript. I enjoy building responsive, user-friendly web interfaces and turning design ideas into interactive digital experiences. I’m currently looking for opportunities to grow, contribute, and create meaningful web applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          <a
            href="#projects"
            className="px-7 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all hover:scale-105 duration-200"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-7 py-3 rounded-lg font-medium border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-300"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-5"
        >
          {[
            { icon: Github, href: "https://github.com/karthigarangar", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/karthigarangarajan/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:karthigarangar@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowDown size={20} className="animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
