import { motion } from "framer-motion";
const HomeImage = () => {
  return (
    <div
      id="siyaDiv"
      style={{ maxWidth: "20vw" }}
      className=" container d-flex flex-column justify-content-center align-items-center col-md m-0"
    >
      <motion.div className="siyaImage">
        <div className="cover"></div>
      </motion.div>
    </div>
  );
};

export default HomeImage;
