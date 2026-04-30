"use client"; 
/**
 * Use client is used to indicate that this component should be rendered on the client side.
 * This is necessary for components that use state, effects, or any browser-specific APIs.
 * the layout component is responsible for rendering the overall structure of the dashboard, including the sidebar and navbar, and it needs to be rendered on the client side to ensure that the interactive elements work correctly.
 * the childern is page.tsx which is the main content of the dashboard, and it also needs to be rendered on the client side to ensure that the weather data is displayed correctly.
 * example : If you have a Sidebar in a layout, it stays exactly where it is while only the "page" content in the middle changes.
 */

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}