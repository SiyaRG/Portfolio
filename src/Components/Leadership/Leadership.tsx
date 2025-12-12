import { motion } from "framer-motion";

const Leadership = () => {
  const leadershipData = {
    title: "Technical Leadership & Mentoring",
    period: "2024--Present",
    achievements: [
      "Mentored junior developers in full-stack development, JavaScript, Python, and Django, achieving high project completion rates.",
      "Collaborated with cross-functional teams in Agile/Scrum environments, delivering applications on schedule.",
      "Established coding standards, code review processes, and documentation practices, improving code quality and reducing bug reports.",
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div
      id="Leadership"
      style={{
        minHeight: "100vh",
        padding: "3rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
        Leadership & Achievements
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{
          maxWidth: "1000px",
          width: "90%",
          padding: "2.5rem",
          border: `2px solid var(--accent)`,
          borderRadius: "0.5rem",
          backgroundColor: "rgba(14, 110, 85, 0.05)",
        }}
      >
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          <motion.h2
            style={{
              color: "var(--accent)",
              fontSize: "1.8rem",
              margin: 0,
            }}
          >
            {leadershipData.title}
          </motion.h2>
          <motion.span
            style={{
              color: "var(--accent-secondary)",
              fontSize: "1.1rem",
              fontWeight: "600",
            }}
          >
            {leadershipData.period}
          </motion.span>
        </motion.div>

        <motion.ul
          variants={containerVariants}
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {leadershipData.achievements.map((achievement, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              style={{
                color: "aliceblue",
                marginBottom: "1.5rem",
                paddingLeft: "2rem",
                position: "relative",
                fontSize: "1.1rem",
                lineHeight: "1.8",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  color: "var(--accent-secondary)",
                  fontSize: "1.5rem",
                }}
              >
                ✓
              </span>
              {achievement}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default Leadership;

