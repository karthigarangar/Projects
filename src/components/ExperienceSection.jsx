import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  {
    year: "2025 - 2026",
    title: "Fullstack Web Development Intern",
    subtitle: "AI Driven Consultancy",
    description: "Developed and maintained full-stack web applications using modern technologies.",
  },
  {
    year: "2021 - 2025",
    title: "Bachelor of Engineering in Electrical & Electronics Engineering",
    subtitle: "Bannari Amman Institute of Technology",
    description: "Built strong problem-solving and analytical skills. Developed a passion for web development and began learning frontend technologies independently.",
  },
  {
    year: "Completed in 2021",
    title: "Higher Secondary Education (12th Grade)",
    subtitle: "Kamarajar Matriculation School",
    description: "",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding bg-card/30" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-lg tracking-widest uppercase mb-3">My Journey</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            I hold a degree in Electrical and Electronics Engineering, where I built strong problem-solving and analytical skills. After graduation, I developed a passion for web development and began learning frontend technologies independently, which led me to pursue a career in frontend development.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-border" />

          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative flex flex-col md:flex-row gap-6 mb-12 ${i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 mt-1.5" />

              {/* Content */}
              <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-10" : "md:pr-10 md:text-right"}`}>
                <span className="text-primary text-sm font-semibold">{item.year}</span>
                <h3 className="font-heading text-lg font-semibold text-foreground mt-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{item.subtitle}</p>
                {item.description && <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
