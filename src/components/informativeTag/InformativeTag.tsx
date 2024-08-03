import React from "react";
import "./InformativeTag.css"; // Import the CSS file for styling

interface InformativeTagProps {
  icon: string; // URL or path to the logo image
  text: string; // Text to display in the tag
}

const InformativeTag: React.FC<InformativeTagProps> = ({ icon, text }) => {
  return (
    <div className="tag">
      <img src={icon} alt="logo" className="tag-logo" />
      <span className="tag-text">{text}</span>
    </div>
  );
};

export default InformativeTag;
