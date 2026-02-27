import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layout, Palette, Smartphone, Zap } from "lucide-react";

const services = [
  {
    icon: Layout,
    title: "Web Development",
    description: "Building responsive websites and web apps using modern frameworks like React and TypeScript.",
  },

  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Ensuring every project looks great on all devices, from mobile phones to large desktop screens.",
  },
  {
    icon: Zap,
    title: "Performance Focused",
    description: "Writing optimized code and following best practices for fast, accessible web experiences.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-lg tracking-widest uppercase mb-3">What I Offer</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-12">
            My <span className="gradient-text">services</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 text-center group hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
