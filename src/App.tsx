import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Pageload from "./Components/Pageload.tsx";

import "./Portfolio.css";

import About from "./Components/About/About.tsx";
import Experience from "./Components/Experience/Experience.tsx";
import Projects from "./Components/Projects/Projects.tsx";
import Skills from "./Components/Skills/Skills.tsx";
import Education from "./Components/Education/Education.tsx";
import Leadership from "./Components/Leadership/Leadership.tsx";
import Contact from "./Components/Contact/Contact.tsx";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, Suspense } from "react";

const Home = React.lazy(() => import("./Components/Home/Home.tsx"));
const App = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref });

  const background = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgb(0,0,0)",
      "rgb(14, 30, 20)",
      "rgb(0,0,0)",
      "rgb(20, 15, 10)",
      "rgb(0,0,0)",
    ]
  );
  return (
    <>
      <motion.div
        ref={ref}
        id="main"
        style={{
          background: background,
          scrollBehavior: "smooth",
          overflowX: "hidden",
          overflowY: "auto",
          height: "100vh",
          width: "100vw",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          position: "relative",
        }}
      >
        <Suspense fallback={<Pageload />}>
          <Home />
        </Suspense>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Leadership />
        <Contact />
      </motion.div>
    </>
  );
};

export default App;
