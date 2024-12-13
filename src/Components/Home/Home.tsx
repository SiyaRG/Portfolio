import HomeInfo from "./HomeInfo";

import { motion } from "framer-motion";

const Home = () => {
  const iconVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: "rgb(51, 144, 231, 0)",
      rotateZ: "0deg",
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: "rgb(51, 144, 231, 1)",
      rotateZ: "360deg",
      scale: [0, 0, 1.05, 0.5, 1],
    },
  };
  const icons = () => {
    const heur = () => {
      let out = [];
      for (let i = 0; i < 10; i++) {
        let s = Math.random();
        out.push(
          s < 0.5
            ? (s * 100).toFixed(2) + "rem"
            : "-" + (s * 100).toFixed(2) + "rem"
        );
      }
      return out;
    };
    return [
      <motion.div
        style={{ minWidth: "2rem", minHeight: "2rem" }}
        initial={{}}
        animate={{
          translateX: [...heur()],
          translateY: [...heur()],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1,
        }}
      >
        <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
          <motion.g
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            fill="var(--accent)"
            style={{ boxShadow: "0 0 .2rem var(--accent)" }}
          >
            <motion.circle
              cx="64"
              cy="64"
              r="11.4"
              initial={{ rotateZ: "0deg", opacity: 0 }}
              animate={{
                rotateZ: "360deg",
                opacity: 1,
                scale: [0, 0, 1.05, 0.5, 1],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1,
              }}
            />
            <motion.path
              d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              transition={{
                default: {
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                },
                fill: {
                  duration: 2,
                  ease: "easeIn",
                  delay: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                },
              }}
            />
          </motion.g>
        </motion.svg>
      </motion.div>,
      <motion.div
        style={{ minWidth: "2rem", minHeight: "2rem" }}
        initial={{}}
        animate={{
          translateX: [...heur()],
          translateY: [...heur()],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          delay: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.3,
        }}
      >
        <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
          <motion.path
            fill="var(--accent)"
            d="M2 1v125h125V1H2zm66.119 106.513c-1.845 3.749-5.367 6.212-9.448 7.401-6.271 1.44-12.269.619-16.731-2.059-2.986-1.832-5.318-4.652-6.901-7.901l9.52-5.83c.083.035.333.487.667 1.071 1.214 2.034 2.261 3.474 4.319 4.485 2.022.69 6.461 1.131 8.175-2.427 1.047-1.81.714-7.628.714-14.065C58.433 78.073 58.48 68 58.48 58h11.709c0 11 .06 21.418 0 32.152.025 6.58.596 12.446-2.07 17.361zm48.574-3.308c-4.07 13.922-26.762 14.374-35.83 5.176-1.916-2.165-3.117-3.296-4.26-5.795 4.819-2.772 4.819-2.772 9.508-5.485 2.547 3.915 4.902 6.068 9.139 6.949 5.748.702 11.531-1.273 10.234-7.378-1.333-4.986-11.77-6.199-18.873-11.531-7.211-4.843-8.901-16.611-2.975-23.335 1.975-2.487 5.343-4.343 8.877-5.235l3.688-.477c7.081-.143 11.507 1.727 14.756 5.355.904.916 1.642 1.904 3.022 4.045-3.772 2.404-3.76 2.381-9.163 5.879-1.154-2.486-3.069-4.046-5.093-4.724-3.142-.952-7.104.083-7.926 3.403-.285 1.023-.226 1.975.227 3.665 1.273 2.903 5.545 4.165 9.377 5.926 11.031 4.474 14.756 9.271 15.672 14.981.882 4.916-.213 8.105-.38 8.581z"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            transition={{
              default: {
                duration: 1.5,
                ease: "easeInOut",
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1,
              },
              fill: {
                duration: 2,
                ease: "easeIn",
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1,
              },
            }}
          />
        </motion.svg>
      </motion.div>,
      <motion.div
        style={{ minWidth: "2rem", minHeight: "2rem" }}
        initial={{}}
        animate={{
          translateX: [...heur()],
          translateY: [...heur()],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          delay: 1.4,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
      >
        <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
          <motion.path
            d="M126.67 98.44c-4.56 1.16-7.38.05-9.91-3.75-5.68-8.51-11.95-16.63-18-24.9-.78-1.07-1.59-2.12-2.6-3.45C89 76 81.85 85.2 75.14 94.77c-2.4 3.42-4.92 4.91-9.4 3.7l26.92-36.13L67.6 29.71c4.31-.84 7.29-.41 9.93 3.45 5.83 8.52 12.26 16.63 18.67 25.21 6.45-8.55 12.8-16.67 18.8-25.11 2.41-3.42 5-4.72 9.33-3.46-3.28 4.35-6.49 8.63-9.72 12.88-4.36 5.73-8.64 11.53-13.16 17.14-1.61 2-1.35 3.3.09 5.19C109.9 76 118.16 87.1 126.67 98.44zM1.33 61.74c.72-3.61 1.2-7.29 2.2-10.83 6-21.43 30.6-30.34 47.5-17.06C60.93 41.64 63.39 52.62 62.9 65H7.1c-.84 22.21 15.15 35.62 35.53 28.78 7.15-2.4 11.36-8 13.47-15 1.07-3.51 2.84-4.06 6.14-3.06-1.69 8.76-5.52 16.08-13.52 20.66-12 6.86-29.13 4.64-38.14-4.89C5.26 85.89 3 78.92 2 71.39c-.15-1.2-.46-2.38-.7-3.57q.03-3.04.03-6.08zm5.87-1.49h50.43c-.33-16.06-10.33-27.47-24-27.57-15-.12-25.78 11.02-26.43 27.57z"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            transition={{
              default: {
                duration: 1.5,
                ease: "easeInOut",
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1,
              },
              fill: {
                duration: 2,
                ease: "easeIn",
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1,
              },
            }}
          />
        </motion.svg>
      </motion.div>,
      <motion.div
        style={{ minWidth: "2rem", minHeight: "2rem" }}
        initial={{}}
        animate={{
          translateX: [
            "0rem",
            "-20rem",
            "33rem",
            "-44rem",
            "-4rem",
            "-12rem",
            "-23rem",
            "0rem",
            "12rem",
            "22rem",
            "-5rem",
          ],
          translateY: [
            "0rem",
            "-17rem",
            "-28rem",
            "13rem",
            "-8rem",
            "30rem",
            "4rem",
            "-16rem",
            "1rem",
            "-22rem",
            "-3rem",
          ],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          delay: 2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.3,
        }}
      >
        <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
          <motion.path
            fill="var(--accent)"
            d="M49.33 62h29.159C86.606 62 93 55.132 93 46.981V19.183c0-7.912-6.632-13.856-14.555-15.176-5.014-.835-10.195-1.215-15.187-1.191-4.99.023-9.612.448-13.805 1.191C37.098 6.188 35 10.758 35 19.183V30h29v4H23.776c-8.484 0-15.914 5.108-18.237 14.811-2.681 11.12-2.8 17.919 0 29.53C7.614 86.983 12.569 93 21.054 93H31V79.952C31 70.315 39.428 62 49.33 62zm-1.838-39.11c-3.026 0-5.478-2.479-5.478-5.545 0-3.079 2.451-5.581 5.478-5.581 3.015 0 5.479 2.502 5.479 5.581-.001 3.066-2.465 5.545-5.479 5.545zm74.789 25.921C120.183 40.363 116.178 34 107.682 34H97v12.981C97 57.031 88.206 65 78.489 65H49.33C41.342 65 35 72.326 35 80.326v27.8c0 7.91 6.745 12.564 14.462 14.834 9.242 2.717 17.994 3.208 29.051 0C85.862 120.831 93 116.549 93 108.126V97H64v-4h43.682c8.484 0 11.647-5.776 14.599-14.66 3.047-9.145 2.916-17.799 0-29.529zm-41.955 55.606c3.027 0 5.479 2.479 5.479 5.547 0 3.076-2.451 5.579-5.479 5.579-3.015 0-5.478-2.502-5.478-5.579 0-3.068 2.463-5.547 5.478-5.547z"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            transition={{
              default: {
                duration: 1.5,
                ease: "easeInOut",
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1,
              },
              fill: {
                duration: 2,
                ease: "easeIn",
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1,
              },
            }}
          />
        </motion.svg>
      </motion.div>,
      <motion.div
        style={{ minWidth: "2rem", minHeight: "2rem" }}
        initial={{}}
        animate={{
          translateX: [
            "0rem",
            "-20rem",
            "33rem",
            "-44rem",
            "-4rem",
            "-12rem",
            "13rem",
            "0rem",
            "-4rem",
            "22rem",
            "-17rem",
          ],
          translateY: [
            "0rem",
            "-17rem",
            "-28rem",
            "13rem",
            "-8rem",
            "25rem",
            "4rem",
            "-16rem",
            "1rem",
            "-12rem",
            "-3rem",
          ],
        }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          delay: 3,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.3,
        }}
      >
        <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
          <motion.path
            fill="var(--accent)"
            d="M9.032 2l10.005 112.093 44.896 12.401 45.02-12.387L118.968 2H9.032zm89.126 26.539l-.627 7.172L97.255 39H44.59l1.257 14h50.156l-.336 3.471-3.233 36.119-.238 2.27L64 102.609v.002l-.034.018-28.177-7.423L33.876 74h13.815l.979 10.919L63.957 89H64v-.546l15.355-3.875L80.959 67H33.261l-3.383-38.117L29.549 25h68.939l-.33 3.539z"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            transition={{
              default: {
                duration: 2,
                ease: "easeInOut",
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.5,
              },
              fill: {
                duration: 1,
                ease: "easeIn",
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1,
              },
            }}
          />
        </motion.svg>
      </motion.div>,
      <motion.div
        style={{ minWidth: "2rem", minHeight: "2rem" }}
        initial={{}}
        animate={{
          translateX: [
            "6rem",
            "-20rem",
            "33rem",
            "-44rem",
            "-4rem",
            "-12rem",
            "-23rem",
            "0rem",
            "12rem",
            "22rem",
            "-5rem",
          ],
          translateY: [
            "0rem",
            "17rem",
            "-20rem",
            "13rem",
            "-8rem",
            "13rem",
            "-18rem",
            "7rem",
            "-13rem",
            "22rem",
            "-3rem",
          ],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          delay: 2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.3,
        }}
      >
        <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
          <motion.path
            fill="var(--accent)"
            d="M124.742 58.378L69.625 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.685 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314a9.66 9.66 0 012.293 9.993L87.42 55.529c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.578 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.779 3.777 3.779 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-4.088-9.905-.311-13.683.934-.933 1.855-1.638 2.855-2.11V47.333c-1-.472-1.92-1.172-2.856-2.111-2.861-2.86-3.396-7.06-1.928-10.576L40.983 20.333 3.229 58.123c-3.175 3.177-3.155 8.325.02 11.5l55.126 55.114c3.173 3.174 8.325 3.174 11.503 0l54.86-54.858c3.175-3.176 3.178-8.327.004-11.501z"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            transition={{
              default: {
                duration: 1.5,
                ease: "easeInOut",
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1,
              },
              fill: {
                duration: 1.5,
                ease: "easeIn",
                delay: 0.4,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.8,
              },
            }}
          />
        </motion.svg>
      </motion.div>,
      <motion.div
        style={{ minWidth: "2rem", minHeight: "2rem" }}
        initial={{}}
        animate={{
          translateX: [
            "6rem",
            "-20rem",
            "33rem",
            "-44rem",
            "-4rem",
            "24rem",
            "-12rem",
            "13rem",
            "-3rem",
            "-17rem",
            "22rem",
            "-17rem",
          ],
          translateY: [
            "12rem",
            "-2rem",
            "-28rem",
            "3rem",
            "-8rem",
            "25rem",
            "4rem",
            "-16rem",
            "1rem",
            "-1rem",
            "-3rem",
          ],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          delay: 2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
      >
        <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
          <motion.path
            fill="var(--accent)"
            d="M82.051 64.29c0-22.998-17.853-30.038-18.223-30.175l-.016-.005a.823.823 0 0 0 .05-.021h.001v-.001h-.001C43.556 27.19 23.193 44.35 23.193 75.34c0 17.054 7.595 37.361 27.7 48.894C22.472 117.917 2 93.607 2 64.097 2 28.275 32.182 2.094 63.873 2.094c2.078 0 37.078 10.935 37.216 51.164.103 30.18-19.207 40.406-32.72 38.443-.009-.004 13.682-7.807 13.682-27.411z"
            clipRule="evenodd"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            transition={{
              default: {
                duration: 5,
                ease: "easeInOut",
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.2,
              },
              fill: {
                duration: 2,
                ease: "easeIn",
                delay: 0.2,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.5,
              },
            }}
          />
        </motion.svg>
      </motion.div>,
    ];
  };
  return (
    <motion.div
      id="Home"
      className="flex flex-col justify-center items-center overflow-hidden"
      initial={{
        boxShadow: "0 0 0 var(--accent) inset",
      }}
      animate={{
        boxShadow: "0 -0.1rem 0rem var(--accent) inset",
      }}
      style={{ opacity: 1, minHeight: "100vh", minWidth: "100vw" }}
      transition={{
        delay: 1,
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.2,
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          minHeight: "100vh",
          width: "95vw",
          zIndex: 0,
        }}
        className="flex flex-col items-center justify-around overflow-hidden"
      >
        {icons().map((x) => {
          return x;
        })}
      </motion.div>

      <HomeInfo />
    </motion.div>
  );
};

export default Home;
