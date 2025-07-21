/* Buttons.jsx */
import React from 'react';

const Button = ({ 
  text, 
  onClick, 
  variant = "primary", 
  className = "", 
  disabled = false,
  type = "button"
}) => {
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    neutral: "bg-gray-400 hover:bg-gray-500 text-white"
  };

  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded transition-colors duration-200 ${styles[variant]} ${disabledStyle} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
