import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { apiService } from "../../services/api";
import Card from "./Card.tsx";

const Experience = () => {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [journeyCards, setJourneyCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [expData, cardsData] = await Promise.all([
          apiService.getExperience(),
          apiService.getJourneyCards(),
        ]);
        setExperiences(expData);
        setJourneyCards(cardsData);
      } catch (error) {
        console.error("Failed to load experience:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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
      
      {loading ? (
        <div style={{ color: "aliceblue" }}>Loading experience...</div>
      ) : experiences.length > 0 ? (
        experiences.map((exp) => (
          <motion.div
            key={exp.id}
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
              {exp.title}
            </motion.h2>
            <motion.p
              style={{
                color: "var(--accent-secondary)",
                fontSize: "1.1rem",
                marginBottom: "1.5rem",
              }}
            >
              {exp.start_date} {exp.end_date ? `-- ${exp.end_date}` : exp.is_current ? '-- Present' : ''}
            </motion.p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {exp.items?.map((item: any, index: number) => (
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
                  {item.text || item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))
      ) : (
        <div style={{ color: "aliceblue" }}>No experience entries found.</div>
      )}

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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6"
        style={{ minHeight: "10rem" }}
      >
        {journeyCards.map((card) => (
          <Card key={card.id} stArr={{ vals: { ...card, image: card.image_url || (card.image ? `http://localhost:8000${card.image}` : card.image) } }} />
        ))}
      </motion.div>
    </div>
  );
};

export default Experience;
