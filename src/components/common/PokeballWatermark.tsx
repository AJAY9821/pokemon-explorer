import React from "react";

interface PokeballWatermarkProps {
  className?: string;
  size?: number;
  opacity?: number;
}

export function PokeballWatermark({
  className = "",
  size = 140,
  opacity = 0.15,
}: PokeballWatermarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      style={{ opacity }}
      className={`pointer-events-none select-none ${className}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0ZM50 14C32.1866 14 17.4328 26.9634 14.5428 43H36.3195C38.8354 36.5684 43.8821 32 50 32C56.1179 32 61.1646 36.5684 63.6805 43H85.4572C82.5672 26.9634 67.8134 14 50 14ZM50 86C32.1866 86 17.4328 73.0366 14.5428 57H36.3195C38.8354 63.4316 43.8821 68 50 68C56.1179 68 61.1646 63.4316 63.6805 57H85.4572C82.5672 73.0366 67.8134 86 50 86ZM50 42C45.5817 42 42 45.5817 42 50C42 54.4183 45.5817 58 50 58C54.4183 58 58 54.4183 58 50C58 45.5817 54.4183 42 50 42Z"
      />
    </svg>
  );
}
