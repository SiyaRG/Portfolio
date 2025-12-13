import { motion } from "framer-motion";
type Params = {
  stArr: {
    vals: {
      id: number;
      image: string;
      year: string;
      text: string;
    };
  };
};
const Card = ({ stArr: { vals } }: Params) => {
  const cardChildVariants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 2,
      },
    },
  };
  return (
    <motion.div
      id={`${vals.id}`}
      className="flex flex-col justify-start items-center p-3 text-center"
      style={{
        borderRadius: ".2rem",
        color: "var(--accent)",
        border: "2px solid var(--accent)",
      }}
      variants={cardChildVariants}
    >
      <motion.img
        src={`${import.meta.env.BASE_URL}${vals.image}`}
        className="pb-2"
        style={{
          width: "2.7rem",
          height: "2.7rem",
          zIndex: 99,
        }}
      />
      <motion.h4>{vals.year}</motion.h4>
      <motion.p>{vals.text}</motion.p>
    </motion.div>
  );
};

export default Card;
