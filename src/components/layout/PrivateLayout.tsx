// src/layouts/PrivateLayout.tsx
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function PrivateLayout() {
  return (
    // Este layout tiene un fondo simple de dashboard
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      <main
        className="flex-1 relative py-6 lg:py-8 px-6 lg:px-8 
                       text-gray-900 dark:text-gray-100 
                       h-screen overflow-y-auto"
      >
        <Outlet />
      </main>
    </div>
  );
}
