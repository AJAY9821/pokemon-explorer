import React from "react";

interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message = "Something went wrong. Please try again." }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center my-4">
      {message}
    </div>
  );
}
