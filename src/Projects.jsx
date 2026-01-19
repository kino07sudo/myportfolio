
const Projects = ({ darkMode }) => {
  return (
    <section
      id="projects"
      style={{
        backgroundColor: darkMode ? "#111827" : "#f9fafb",
      }}
      className="relative py-24"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            My{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f97316, #f59e0b)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Projects
            </span>
          </h2>

          <p
            className="max-w-xl mx-auto"
            style={{
              color: darkMode ? "#d1d5db" : "#6b7280",
            }}
          >
            A showcase of my work and accomplishments (Currently under development).
          </p>
        </div>

        <div className="">
        </div>
      </div>
    </section>
  );
};

export default Projects;
