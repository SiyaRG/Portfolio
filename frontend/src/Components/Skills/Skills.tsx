import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { apiService } from "../../services/api";

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await apiService.getSkillCategories();
        setSkillCategories(data);
      } catch (error) {
        console.error("Failed to load skills:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSkills();
  }, []);

  const skillCategoryVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  };

  const SkillCategory = ({
    title,
    skills,
  }: {
    title: string;
    skills: string[];
  }) => (
    <motion.div
      variants={skillCategoryVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      style={{
        marginBottom: "2rem",
        padding: "1.5rem",
        border: `1px solid var(--accent)`,
        borderRadius: "0.5rem",
        backgroundColor: "rgba(14, 110, 85, 0.05)",
      }}
    >
      <motion.h3
        style={{
          color: "var(--accent)",
          fontSize: "1.5rem",
          marginBottom: "1rem",
          borderBottom: `2px solid var(--accent-secondary)`,
          paddingBottom: "0.5rem",
        }}
      >
        {title}
      </motion.h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            variants={skillItemVariants}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "rgba(14, 110, 85, 0.1)",
              border: `1px solid var(--accent)`,
              borderRadius: "0.25rem",
              color: "aliceblue",
              fontSize: "0.9rem",
              transition: "all 0.3s",
            }}
            whileHover={{
              backgroundColor: "var(--accent)",
              scale: 1.05,
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div
      id="Skills"
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
        Technical Skills
      </motion.h1>

      {loading ? (
        <div style={{ color: "aliceblue" }}>Loading skills...</div>
      ) : (
        <div
          style={{
            maxWidth: "1200px",
            width: "90%",
          }}
        >
          {skillCategories.length === 0 ? (
            <div style={{ color: "aliceblue" }}>No skills found.</div>
          ) : (
            skillCategories.map((category) => (
              <SkillCategory
                key={category.id}
                title={category.display_name}
                skills={category.skills?.map((s: any) => s.name) || []}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Skills;

