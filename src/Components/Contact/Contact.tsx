import { motion } from "framer-motion";
import linkedIn from "../../../public/icons/linkedin-plain.svg";
import gitHub from "../../../public/icons/github-original.svg";

const Contact = () => {
  const contactInfo = [
    {
      label: "Phone",
      value: "078 881 2948",
      link: "tel:+27788812948",
      icon: null,
    },
    {
      label: "Email",
      value: "siyabongafikcurry30@gmail.com",
      link: "mailto:siyabongafikcurry30@gmail.com",
      icon: null,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/siyabonga",
      link: "https://www.linkedin.com/in/siyabonga-soko-6189a0275?trk=contact-info",
      icon: linkedIn,
    },
    {
      label: "GitHub",
      value: "github.com/SiyaRG",
      link: "https://github.com/SiyaRG",
      icon: gitHub,
    },
  ];

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
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div
      id="Contact"
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
        Get In Touch
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{
          maxWidth: "800px",
          width: "90%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
        }}
      >
        {contactInfo.map((contact, index) => (
          <motion.a
            key={index}
            href={contact.link}
            target={contact.link.startsWith("http") ? "_blank" : undefined}
            rel={contact.link.startsWith("http") ? "noopener noreferrer" : undefined}
            variants={itemVariants}
            style={{
              padding: "2rem",
              border: `2px solid var(--accent)`,
              borderRadius: "0.5rem",
              backgroundColor: "rgba(14, 110, 85, 0.05)",
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "all 0.3s",
              cursor: "pointer",
            }}
            whileHover={{
              backgroundColor: "rgba(14, 110, 85, 0.15)",
              scale: 1.05,
              borderColor: "var(--accent-secondary)",
            }}
          >
            {contact.icon && (
              <motion.img
                src={contact.icon}
                alt={contact.label}
                style={{
                  width: "3rem",
                  height: "3rem",
                  marginBottom: "1rem",
                  backgroundColor: "var(--accent)",
                  borderRadius: "10%",
                  padding: "0.5rem",
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
            )}
            <motion.h3
              style={{
                color: "var(--accent)",
                fontSize: "1.3rem",
                marginBottom: "0.5rem",
                textAlign: "center",
              }}
            >
              {contact.label}
            </motion.h3>
            <motion.p
              style={{
                color: "aliceblue",
                fontSize: "1rem",
                textAlign: "center",
                margin: 0,
              }}
            >
              {contact.value}
            </motion.p>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default Contact;
