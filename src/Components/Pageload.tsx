import { motion } from "framer-motion";
const Pageload = () => {
  return (
    <motion.div className="flex flex-col items-center justify-center w-screen h-screen">
      <motion.img
        style={{ width: "30vw", height: "30vw" }}
        src={`${import.meta.env.BASE_URL}SiyaRG.png`}
        initial={{ scale: 1, opacity: 0.2 }}
        animate={{
          scale: 0.9,
          opacity: 0.1,
          transition: {
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      />
    </motion.div>
  );
};

export default Pageload;
