import { motion } from "framer-motion";

const Skills = () => {
  const skillsData = {
    languages: ["Python", "JavaScript/TypeScript", "SQL", "HTML5", "CSS3", "C#", "Java"],
    frameworks: [
      "Django 4.2.20",
      "Django REST Framework 3.15.2",
      "React",
      "Next.js",
      "Bootstrap 5.3.3",
      "CoreUI 5.4.3",
      "Material UI",
      "Node.js",
      "Express.js",
      "ASP.NET Core",
      "django-ckeditor",
      "django-cors-headers",
      "django-extensions",
    ],
    databases: ["MySQL", "PostgreSQL", "MS SQL Server", "MongoDB", "Redis"],
    authSecurity: [
      "JWT (djangorestframework-simplejwt)",
      "OAuth2",
      "OTP",
      "RBAC",
      "reCAPTCHA",
      "CORS",
      "CSRF Protection",
      "Token Blacklisting",
    ],
    devops: ["Git Workflows", "Linux", "Nginx", "CI/CD Pipelines", "WhiteNoise", "Waitress"],
    testing: [
      "Unit Testing",
      "Integration Testing",
      "Postman",
      "API Testing",
      "Code Review",
      "Django Test Framework",
    ],
    tools: ["Git", "VS Code", "PyCharm", "Postman", "JIRA"],
    architecture: [
      "RESTful APIs",
      "MVC",
      "Multi-tenant",
      "Event-driven",
      "Microservices",
      "Modular Architecture",
    ],
    methodologies: [
      "Agile/Scrum",
      "TDD",
      "Code Review",
      "Documentation",
      "Version Control",
      "API Documentation",
    ],
  };

  const skillCategoryVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  };

  const SkillCategory = ({
    title,
    skills,
  }: {
    title: string;
    skills: string[];
  }) => (
    <motion.div
      variants={skillCategoryVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      style={{
        marginBottom: "2rem",
        padding: "1.5rem",
        border: `1px solid var(--accent)`,
        borderRadius: "0.5rem",
        backgroundColor: "rgba(14, 110, 85, 0.05)",
      }}
    >
      <motion.h3
        style={{
          color: "var(--accent)",
          fontSize: "1.5rem",
          marginBottom: "1rem",
          borderBottom: `2px solid var(--accent-secondary)`,
          paddingBottom: "0.5rem",
        }}
      >
        {title}
      </motion.h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            variants={skillItemVariants}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "rgba(14, 110, 85, 0.1)",
              border: `1px solid var(--accent)`,
              borderRadius: "0.25rem",
              color: "aliceblue",
              fontSize: "0.9rem",
              transition: "all 0.3s",
            }}
            whileHover={{
              backgroundColor: "var(--accent)",
              scale: 1.05,
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div
      id="Skills"
      style={{
        minHeight: "100vh",
        padding: "3rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
        Technical Skills
      </motion.h1>

      <div
        style={{
          maxWidth: "1200px",
          width: "90%",
        }}
      >
        <SkillCategory title="Languages" skills={skillsData.languages} />
        <SkillCategory
          title="Frameworks & Libraries"
          skills={skillsData.frameworks}
        />
        <SkillCategory title="Databases" skills={skillsData.databases} />
        <SkillCategory
          title="Authentication & Security"
          skills={skillsData.authSecurity}
        />
        <SkillCategory title="DevOps & Tools" skills={skillsData.devops} />
        <SkillCategory
          title="Testing & Quality"
          skills={skillsData.testing}
        />
        <SkillCategory title="Development Tools" skills={skillsData.tools} />
        <SkillCategory
          title="Architecture Patterns"
          skills={skillsData.architecture}
        />
        <SkillCategory
          title="Methodologies"
          skills={skillsData.methodologies}
        />
      </div>
    </div>
  );
};

export default Skills;

