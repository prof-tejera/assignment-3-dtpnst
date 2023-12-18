import React from "react";

const Input = ({label, type, inputId, isRequired, onChange, ...props}) => {
    const handleInputChange = (event) => {
        onChange(event);
    }

    const labelStyle = {
        fontSize: "13px",
        paddingRight: "5px",
        fontWeight: "bold",
    };

    const inputStyle = {
        width: "50px",
        backgroundColor: "#dcdedd",
        fontFamily: "'Orbitron', sans-serif",
        color: "#4f635d",
        border: "2px",
        borderStyle: "solid",
        borderColor: "#848a88",
        borderRadius: "5px",
    }

    return (
        <div>
        <label style={labelStyle} htmlFor={inputId} className={isRequired ? "required" : ""}>{label}</label>
        <input style={inputStyle}
            id={inputId}
            type={type}
            required={isRequired}
            onChange={handleInputChange}
            {...props}/>
        </div>
    );
};

export default Input;
