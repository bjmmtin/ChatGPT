import React from "react";

interface ButtonProps {
  text: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ text, handleClick }) => {
  return (
    <button id="loginButton" onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
