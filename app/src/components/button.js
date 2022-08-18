import React from 'react';

export const Button = ({type,title,className, ...otherProps}) => {
    return (
        <button
            {...otherProps}
            className={`btn ${type === "primary" ? "primary" : type === "secondary" ? "secondary" : "danger"}`}
            type="submit"
        >
            {title}
        </button>
    );
}