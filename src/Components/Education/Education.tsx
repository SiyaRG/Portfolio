import { motion } from "framer-motion";

const Education = () => {
  const educationData = [
    {
      degree: "BSc Information Technology",
      period: "2022--Present",
      institution: "North-West University (NWU)",
      location: "Potchefstroom, South Africa",
      note: "1 module remaining to complete",
    },
    {
      degree: "Occupational Certificate: Software Development",
      period: "2024--2025",
      institution: "ZTQ Solutions",
      location: "Centurion, South Africa",
      note: null,
    },
    {
      degree: "National Senior Certificate - IT",
      period: "2016--2020",
      institution: "Hoerskool Generaal Hertzog",
      location: "Emalahleni, South Africa",
      note: null,
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
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
      id="Education"
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
        Education
      </motion.h1>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{
          maxWidth: "1000px",
          width: "90%",
        }}
      >
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            style={{
              marginBottom: "2rem",
              padding: "2rem",
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                marginBottom: "0.5rem",
              }}
            >
              <motion.h2
                style={{
                  color: "var(--accent)",
                  fontSize: "1.8rem",
                  margin: 0,
                  marginBottom: "0.5rem",
                }}
              >
                {edu.degree}
              </motion.h2>
              <motion.span
                style={{
                  color: "var(--accent-secondary)",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                }}
              >
                {edu.period}
              </motion.span>
            </div>
            <motion.p
              style={{
                color: "aliceblue",
                fontSize: "1.2rem",
                margin: "0.5rem 0",
                fontWeight: "500",
              }}
            >
              {edu.institution}
            </motion.p>
            <motion.p
              style={{
                color: "rgba(240, 248, 255, 0.7)",
                fontSize: "1rem",
                margin: "0.25rem 0",
              }}
            >
              {edu.location}
            </motion.p>
            {edu.note && (
              <motion.p
                style={{
                  color: "var(--accent-secondary)",
                  fontSize: "0.95rem",
                  fontStyle: "italic",
                  marginTop: "0.5rem",
                }}
              >
                {edu.note}
              </motion.p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Education;

