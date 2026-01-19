
const Footer = ({ darkMode }) => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-6 text-center"
      style={{
        backgroundColor: darkMode ? "#0f172a" : "#f1f5f9",
        color: darkMode ? "#9ca3af" : "#475569",
      }}
    >
      <p className="text-sm">
        © {year} <span className="font-medium">Jeremiah Kein Verano</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
