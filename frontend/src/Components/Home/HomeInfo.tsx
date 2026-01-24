import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { apiService } from "../../services/api";

const HomeInfo = () => {
  const [profile, setProfile] = useState<any>(null);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileData, linksData] = await Promise.all([
          apiService.getProfile(),
          apiService.getSocialLinks(),
        ]);
        setProfile(profileData);
        setSocialLinks(linksData);
      } catch (error) {
        console.error("Failed to load home data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSocialClick = (url: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };
  const infoVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 2,
        delay: 0,
      },
    },
  };
  const infoChildVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      variants={infoVariants}
      initial="hidden"
      animate="show"
      className="container-fluid flex flex-col justify-center items-center m-3 text-center"
      style={{
        zIndex: 2,
        maxWidth: "800px",
        padding: "2rem",
      }}
    >
      <motion.h2
        variants={{
          hidden: {
            opacity: 0,
          },
          show: {
            opacity: 1,
            transition: {
              duration: 1.5,
              delay: 0.3,
            },
          },
        }}
        style={{
          fontSize: "1.5rem",
          fontWeight: "400",
          color: "rgba(240, 248, 255, 0.8)",
          marginBottom: "1rem",
          letterSpacing: "0.1em",
        }}
      >
        Hello, I'm
      </motion.h2>
      {loading ? (
        <motion.div variants={infoChildVariants}>Loading...</motion.div>
      ) : (
        <>
          <motion.h1 
            variants={infoChildVariants}
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              fontWeight: "700",
              marginBottom: "1rem",
              lineHeight: "1.2",
            }}
          >
            <span className="webDev" style={{ 
              background: `linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {profile?.name || "Siyabonga Soko"}
            </span>
          </motion.h1>
          <motion.h2 
            variants={infoChildVariants}
            style={{
              fontSize: "clamp(1.2rem, 4vw, 2rem)",
              fontWeight: "500",
              color: "aliceblue",
              marginBottom: "2rem",
              letterSpacing: "0.05em",
            }}
          >
            {profile?.title || "Full-Stack Software Developer"}
          </motion.h2>
          <motion.p
            variants={infoChildVariants}
            style={{
              fontSize: "1.1rem",
              color: "rgba(240, 248, 255, 0.7)",
              marginBottom: "3rem",
              maxWidth: "600px",
              lineHeight: "1.6",
            }}
          >
            {profile?.description || "Specialising in Django, React, and modern web technologies"}
          </motion.p>
          <motion.div 
            variants={infoVariants}
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "3rem",
            }}
          >
            {socialLinks.map((link) => (
              <motion.img
                key={link.id}
                variants={infoChildVariants}
                style={{ 
                  cursor: link.url ? "pointer" : "default",
                  width: "3rem",
                  height: "3rem",
                  padding: "0.5rem",
                  backgroundColor: "rgba(14, 110, 85, 0.2)",
                  borderRadius: "50%",
                  border: "2px solid var(--accent)",
                  transition: "all 0.3s",
                }}
                whileHover={link.url ? {
                  scale: 1.1,
                  backgroundColor: "rgba(14, 110, 85, 0.4)",
                  boxShadow: "0 0 1rem var(--accent)",
                } : {}}
                whileTap={link.url ? { scale: 0.95 } : {}}
                src={link.icon ? `http://localhost:8000${link.icon}` : undefined}
                alt={link.label}
                onClick={() => link.url && handleSocialClick(link.url)}
              />
            ))}
          </motion.div>
        </>
      )}
      <motion.div
        variants={infoChildVariants}
        style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.span
          style={{
            color: "var(--accent)",
            fontSize: "0.9rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Scroll to explore
        </motion.span>
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: "var(--accent)" }}
        >
          <motion.path
            d="M7 10L12 15L17 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
};

export default HomeInfo;
