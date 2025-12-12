import { motion } from "framer-motion";
import Cards from "./Experience.json";
import Card from "./Card.tsx";

const Experience = () => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.5,
      },
    },
  };

  const experienceItems = [
    "Developing comprehensive Learning Management System using Django, Django REST Framework, and React with integrated modules for user management, course delivery, and assessment systems.",
    "Implemented JWT authentication with OTP email verification, role-based access control, and multi-tenant architecture supporting multiple vendors with complete data isolation.",
    "Restructured monolithic API architecture into modular design, organizing code into specialized view and serializer modules, improving maintainability and testability.",
    "Developed RESTful API with automated email system, comprehensive file upload management, and audit trail logging using Django middleware.",
    "Built interactive Hotspot question builder with canvas-based drawing tools for creating clickable areas on images.",
    "Implemented organizational hierarchy management system with multi-level structure, organogram visualization, and user assignment capabilities.",
    "Optimized MySQL database performance through indexing strategies and query optimization, designing database models with complex relationships.",
    "Developed responsive frontend interfaces using Bootstrap, CoreUI, and custom JavaScript components with real-time notifications and dynamic form validation.",
    "Established Git workflows, automated testing suites, and comprehensive API documentation, maintaining high code quality.",
  ];

  return (
    <div
      id="Experience"
      style={{ minHeight: "100vh", padding: "2rem 0" }}
      className="flex flex-col justify-center items-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ 
          color: "var(--accent)", 
          marginBottom: "3rem", 
          fontSize: "clamp(2rem, 5vw, 2.5rem)",
          textAlign: "center",
          width: "100%",
        }}
      >
        Professional Experience
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: "90%",
          width: "1200px",
          marginBottom: "4rem",
          padding: "2rem",
          border: `2px solid var(--accent)`,
          borderRadius: "0.5rem",
        }}
      >
        <motion.h2
          style={{
            color: "var(--accent)",
            fontSize: "1.8rem",
            marginBottom: "0.5rem",
          }}
        >
          Full-Stack Developer (Remote)
        </motion.h2>
        <motion.p
          style={{
            color: "var(--accent-secondary)",
            fontSize: "1.1rem",
            marginBottom: "1.5rem",
          }}
        >
          August 2025--Present
        </motion.p>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {experienceItems.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
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
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ 
          color: "var(--accent)", 
          marginBottom: "2rem", 
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          textAlign: "center",
          width: "100%",
        }}
      >
        Journey Summary
      </motion.h2>
      <motion.div
        id="exGrid"
        variants={cardVariants}
        initial="hidden"
        whileInView="show"
        className="grid grid-cols-4 gap-10 px-6"
        style={{ minHeight: "10rem" }}
      >
        {Cards.map((card) => (
          <Card key={card.id} stArr={{ vals: card }} />
        ))}
      </motion.div>
    </div>
  );
};

export default Experience;
