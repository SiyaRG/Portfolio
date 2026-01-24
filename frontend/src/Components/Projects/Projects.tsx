import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { apiService } from "../../services/api";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await apiService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div
      id="Projects"
      style={{
        minHeight: "100vh",
        padding: "3rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          color: "var(--accent)",
          fontSize: "clamp(2rem, 5vw, 2.5rem)",
          marginBottom: "3rem",
          textAlign: "center",
          width: "100%",
        }}
      >
        Key Projects
      </motion.h1>

      {loading ? (
        <div style={{ color: "aliceblue" }}>Loading projects...</div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            maxWidth: "1200px",
            width: "90%",
          }}
        >
          {projects.length === 0 ? (
            <div style={{ color: "aliceblue" }}>No projects found.</div>
          ) : (
            projects.map((project, index) => (
          <motion.div
            key={index}
            variants={projectVariants}
            style={{
              marginBottom: "3rem",
              padding: "2.5rem",
              border: `2px solid var(--accent)`,
              borderRadius: "0.5rem",
              backgroundColor: "rgba(14, 110, 85, 0.05)",
              transition: "all 0.3s",
            }}
            whileHover={{
              backgroundColor: "rgba(14, 110, 85, 0.1)",
              scale: 1.02,
            }}
          >
            <motion.h2
              variants={itemVariants}
              style={{
                color: "var(--accent)",
                fontSize: "1.8rem",
                marginBottom: "1rem",
              }}
            >
              {project.title}
            </motion.h2>

            <motion.div
              variants={itemVariants}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              {(project.technologies || []).map((tech: string, techIndex: number) => (
                <motion.span
                  key={techIndex}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(161, 111, 11, 0.4)",
                    borderColor: "var(--accent-secondary)",
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding: "0.4rem 0.9rem",
                    backgroundColor: "rgba(161, 111, 11, 0.2)",
                    border: `1px solid var(--accent-secondary)`,
                    borderRadius: "0.25rem",
                    color: "var(--accent-secondary)",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            <motion.ul
              variants={projectVariants}
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {(project.achievements || []).map((achievement: any, achIndex: number) => (
                <motion.li
                  key={achIndex}
                  variants={itemVariants}
                  style={{
                    color: "aliceblue",
                    marginBottom: "1rem",
                    paddingLeft: "1.5rem",
                    position: "relative",
                    fontSize: "1rem",
                    lineHeight: "1.6",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      color: "var(--accent)",
                    }}
                  >
                    •
                  </span>
                  {achievement.text || achievement}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
