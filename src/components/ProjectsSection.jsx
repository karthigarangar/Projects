import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Weather Dashboard",
    description: "A clean weather app that fetches real-time data from OpenWeatherMap API. Features city search, 5-day forecast, and responsive design.",
    tech: ["React", "Node.js", "Tailwind", "MongoDB", "Python"],
    color: "from-blue-500/20 to-cyan-500/20",
    images: [
      "src/assets/W1.png",
      "src/assets/W2.png",
      "src/assets/W3.png",
      "src/assets/W4.png",
      "src/assets/W5.png",
      "src/assets/W6.png",

    ],
  },
  {
    title: "Students Placement Portal",
    description: "A comprehensive portal for managing student placements, interviews, and company drives. Streamlines the entire recruitment process.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    color: "from-emerald-500/20 to-green-500/20",
    images: [
      "src/assets/PC1.png",
      "src/assets/PC2.png",
      "src/assets/PC3.png",
      "src/assets/PC4.png",
      "src/assets/PC5.png",
      "src/assets/PC6.png",
      "src/assets/PC7.png",
      "src/assets/PC8.png",
      "src/assets/PC9.png",

    ],
  },
  {
    title: "Portfolio Website",
    description: "This very portfolio! A modern, animated single-page application showcasing my work and skills. Built with attention to detail.",
    tech: ["React", "Node.js", "Tailwind", "MongoDB"],
    color: "from-orange-500/20 to-amber-500/20",
    images: [
      "src/assets/P1.png",
      "src/assets/P2.png",
      "src/assets/P3.png",
      "src/assets/P4.png",
      "src/assets/P5.png",
      "src/assets/P6.png",
      "src/assets/P7.png"
    ],
  },
  {
    title: "E-Commerce UI",
    description: "A responsive product listing page with filtering, sorting, and cart functionality. Focused on clean component architecture.",
    tech: ["React", "TypeScript", "Shadcn UI"],
    color: "from-purple-500/20 to-pink-500/20",
    images: 
      [
      "src/assets/E1.png",
      "src/assets/E2.png",
      "src/assets/E3.png",
      "src/assets/E4.png",
      ],
  },
];

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current || !project.images || project.images.length <= 1) return;

    if (isHovered) {
      intervalRef.current = setInterval(() => {
        const el = scrollRef.current;
        if (!el) return;
        const imageWidth = el.offsetWidth;
        const maxScroll = el.scrollWidth - imageWidth;
        if (el.scrollLeft >= maxScroll - 1) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          el.scrollBy({ left: imageWidth, behavior: "smooth" });
        }
      }, 1200);
    } else {
      clearInterval(intervalRef.current);
      // Reset to first image when mouse leaves
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }

    return () => clearInterval(intervalRef.current);
  }, [isHovered, project.images]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group glass-card overflow-hidden hover:border-primary/30 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-48 overflow-hidden relative bg-muted/20">
        {project.images && project.images.length > 0 ? (
          <div
            ref={scrollRef}
            className="flex h-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {project.images.map((img, imgIndex) => (
              <div key={imgIndex} className="min-w-full h-full snap-center flex-shrink-0">
                <img
                  src={img}
                  alt={`${project.title} preview ${imgIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${project.color} flex items-center justify-center`}>
            <ArrowUpRight
              size={48}
              className="text-foreground/20 group-hover:text-foreground/40 group-hover:scale-110 transition-all duration-500"
            />
          </div>
        )}

        {/* Overlay for links */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10 pointer-events-none">
          <a
            href="https://github.com/karthigarangar"
            className="p-2 bg-background rounded-full hover:text-primary transition-colors transform hover:scale-110 pointer-events-auto"
            title="View Code"
          >
            <Github size={20} />
          </a>
          <a
            href="#"
            className="p-2 bg-background rounded-full hover:text-primary transition-colors transform hover:scale-110 pointer-events-auto"
            title="View Live Demo"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-heading text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-lg tracking-widest uppercase mb-3">My Work</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-12">
            Featured <span className="gradient-text">projects</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
