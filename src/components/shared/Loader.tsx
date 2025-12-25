// src/components/common/Loader.tsx
import { createPortal } from "react-dom";
import "../../styles/Loader.css";

export const Loader = () => {
  return createPortal(
    <div className="loader-overlay">
      <div className="loader-wrapper">
        <span className="loader-letter letter1">L</span>
        <span className="loader-letter letter2">o</span>
        <span className="loader-letter letter3">a</span>
        <span className="loader-letter letter4">d</span>
        <span className="loader-letter letter5">i</span>
        <span className="loader-letter letter6">n</span>
        <span className="loader-letter letter7">g</span>
        <span className="loader-letter letter8">.</span>
        <span className="loader-letter letter9">.</span>
        <span className="loader-letter letter10">.</span>
      </div>
    </div>,
    document.body
  );
};
