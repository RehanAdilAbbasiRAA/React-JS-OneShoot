import React from "react";

const NetworkLoader = ({ fullscreen = true }) => {
  return (
    <div
      className={`${
        fullscreen ? "fixed inset-0" : "relative w-full h-full"
      } z-50 flex items-center justify-center`}
    >
      {/* Blurred background */}
      <div className="absolute inset-0 bg-[var(--color-bg)]/60 backdrop-blur-md" />

      {/* Loader */}
      <div className="relative flex flex-col items-center gap-4">
        <div className="voice-loader">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <p className="text-sm text-[var(--color-text)] opacity-70">
          Server Down Issue ...
        </p>
      </div>
    </div>
  );
};

export default NetworkLoader;
