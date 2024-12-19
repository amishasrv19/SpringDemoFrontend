import React from "react";
import "./Buttons.css";

const Buttons = () => {
    return (
        <div className="button-container">
            <button className="action-button">Upload</button>
            <button className="action-button">Download</button>
            <button className="action-button">Delete</button>
        </div>
    );
};

export default Buttons;
