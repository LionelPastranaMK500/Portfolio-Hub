// src/App.tsx
import { useEffect } from "react";
import { useThemeStore } from "./store/themeStore";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return <AppRoutes />;
}

export default App;
