// src/App.tsx
import { useEffect } from "react";
import { useThemeStore } from "./store/themeStore";
import AppRoutes from "./routes/AppRoutes"; // <-- Importamos el componente que acabamos de hacer

function App() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  // AppRoutes ya contiene todo el enrutamiento y layouts
  return <AppRoutes />;
}

export default App;
