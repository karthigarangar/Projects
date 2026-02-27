import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Rocket, Target } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { icon: Code2, title: "Clean Code", desc: "Writing readable, maintainable code from day one" },
    { icon: Rocket, title: "Fast Learner", desc: "Quickly adapting to new frameworks and technologies" },
    { icon: Target, title: "Detail Oriented", desc: "Pixel-perfect implementation with attention to UX" },
  ];

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-lg tracking-widest uppercase mb-3">About Me</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
            A passionate <span className="gradient-text">developer</span> in the making
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5 text-muted-foreground leading-relaxed"
          >
            <p>
              Hi! I'm Karthiga, a junior frontend developer with a burning passion for building
              beautiful web applications. My journey started with curiosity about how websites
              work, and it quickly turned into a career pursuit I love.
            </p>
            <p>
              I've been learning and building projects using modern technologies like React,
              TypeScript, and Tailwind CSS. Every project teaches me something new, and I
              genuinely enjoy the process of solving problems through code.
            </p>
            <p>
              I'm currently looking for internship or junior developer opportunities where I
              can contribute, grow, and work alongside experienced developers who inspire me
              to become better every day.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="glass-card p-5 flex gap-4 items-start hover:border-primary/30 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
