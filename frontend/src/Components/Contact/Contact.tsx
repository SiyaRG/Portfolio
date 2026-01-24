import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { apiService } from "../../services/api";
import ContactForm from "./ContactForm";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const loadContact = async () => {
      try {
        const data = await apiService.getContactInfo();
        setContactInfo(data);
      } catch (error) {
        console.error("Failed to load contact info:", error);
      } finally {
        setLoading(false);
      }
    };
    loadContact();
  }, []);

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

      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: "1rem 2rem",
            background: "rgba(14, 110, 85, 0.2)",
            border: "2px solid var(--accent)",
            borderRadius: "0.5rem",
            color: "var(--accent)",
            marginBottom: "2rem",
            textAlign: "center",
            maxWidth: "800px",
            width: "90%",
          }}
        >
          ✓ Message sent successfully! I'll get back to you soon.
        </motion.div>
      )}

      {loading ? (
        <div style={{ color: "aliceblue" }}>Loading contact information...</div>
      ) : (
        <>
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
              marginBottom: "3rem",
            }}
          >
            {contactInfo.length === 0 ? (
              <div style={{ color: "aliceblue" }}>No contact information found.</div>
            ) : (
              contactInfo.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.url || contact.link || "#"}
                  target={contact.url?.startsWith("http") ? "_blank" : undefined}
                  rel={contact.url?.startsWith("http") ? "noopener noreferrer" : undefined}
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
                      src={contact.icon.startsWith('http') ? contact.icon : `http://localhost:8000${contact.icon}`}
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
              ))
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ContactForm
              onSuccess={() => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000);
              }}
              onError={(error) => {
                console.error("Contact form error:", error);
              }}
            />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Contact;
