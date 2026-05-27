import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex items-center gap-2 rounded-full border border-edge bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:-translate-y-0.5"
    >
      {theme === "light" ? <FiMoon /> : <FiSun />} {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default ThemeToggle;
