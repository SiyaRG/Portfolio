import { motion } from "framer-motion";

type Params = {
  params: {
    scrollProgress: any;
  };
};

const About = ({ params: { scrollProgress } }: Params) => {
  const highlights = [
    "Django & React Expertise",
    "Database Optimization",
    "RESTful API Development",
    "Multi-tenant Architecture",
  ];

  return (
    <motion.div
      id="About"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div
        style={{
          maxWidth: "1400px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* Image Section */}
        <motion.div
          id="imgDiv"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <motion.div
            style={{
              position: "relative",
              width: "clamp(250px, 35vw, 500px)",
              height: "clamp(250px, 35vw, 500px)",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                inset: "-20px",
                borderRadius: "50%",
                border: "3px solid var(--accent)",
                opacity: 0.3,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.img
              src="/images/siya(no-back)-2.png"
              alt="Siya Photo"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid var(--accent)",
                position: "relative",
                zIndex: 2,
                boxShadow: "0 10px 40px rgba(14, 110, 85, 0.3)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 50px rgba(14, 110, 85, 0.5)",
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          id="aboutInfo"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <motion.div>
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: "700",
                color: "var(--accent)",
                marginBottom: "1rem",
                position: "relative",
                display: "inline-block",
              }}
            >
              About Me
              <motion.span
                style={{
                  position: "absolute",
                  bottom: "-10px",
                  left: 0,
                  width: "60px",
                  height: "4px",
                  backgroundColor: "var(--accent-secondary)",
                  borderRadius: "2px",
                }}
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </motion.h2>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              lineHeight: "1.8",
              color: "rgba(240, 248, 255, 0.9)",
              textAlign: "left",
              marginBottom: "1rem",
            }}
          >
            Full-Stack Software Developer with extensive experience in web application development, specializing in <strong style={{ color: "var(--accent)" }}>Django, React, Python, JavaScript</strong>, and database solutions.
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              lineHeight: "1.8",
              color: "rgba(240, 248, 255, 0.9)",
              textAlign: "left",
            }}
          >
            Currently developing a comprehensive <strong style={{ color: "var(--accent-secondary)" }}>Learning Management System</strong> with integrated modules, assessment systems, and RESTful APIs. Skilled in database optimization, API development, multi-tenant architecture, and Agile methodologies with a proven track record of delivering quality solutions on schedule.
          </motion.p>

          {/* Highlights */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  x: 5,
                }}
                style={{
                  padding: "1rem 1.5rem",
                  backgroundColor: "rgba(14, 110, 85, 0.1)",
                  border: "1px solid var(--accent)",
                  borderRadius: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  transition: "all 0.3s",
                }}
              >
                <motion.span
                  style={{
                    color: "var(--accent-secondary)",
                    fontSize: "1.2rem",
                  }}
                >
                  ✓
                </motion.span>
                <span
                  style={{
                    color: "aliceblue",
                    fontSize: "0.95rem",
                    fontWeight: "500",
                  }}
                >
                  {highlight}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
