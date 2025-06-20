import React from "react";


// Define the props type for the HighlightBox component


const Highlightbox = ({ title, value, Icon }) => {
  return (
    <div className="glassy-card" style={{ width: "220px", padding: "1rem" }}>

      <div>
        <div style={{ fontSize: "18px" }}>{title}</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Icon style={{ fontSize: "30px" }} />
          <p style={{ fontSize: "30px" }}>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Highlightbox;