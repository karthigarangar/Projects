import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "Java", level: 70 },
      { name: "HTML & CSS", level: 85 },
      { name: "JavaScript", level: 75 },
      { name: "React", level: 70 },
      { name: "TypeScript", level: 60 },
      { name: "Tailwind CSS", level: 80 },
      { name: "Ant Design", level: 50 },
      { name: "Material UI", level: 40 },
      
    ],
  },
  {
    title: "Backend & Tools",
    skills: [
      { name: "Node.js", level: 50 },
      { name: "Git & GitHub", level: 70 },
      { name: "REST APIs", level: 60 },
      { name: "SQL Basics", level: 45 },
      { name: "VS Code", level: 90 },
      { name: "Antigravity", level: 80 },
      { name: "Cursor", level: 85 },
    ],
  },
];

const SkillBar = ({ name, level, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-foreground font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "var(--gradient-primary)" }}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding bg-card/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-lg tracking-widest uppercase mb-3">My Skills</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-12">
            Technologies I <span className="gradient-text">work with</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.2 }}
              className="glass-card p-6 sm:p-8 space-y-6"
            >
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.1 + si * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
