import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
    const { 
        children, 
        onClick, 
        type = "button", 
        variant = "primary", 
        fullWidth = false, 
        disabled = false,
        className = "",
        ...rest 
    } = props;

    const baseClasses = "py-3 px-6 rounded-md font-medium transition-colors";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50"
    };

    const classes = `
        ${baseClasses}
        ${variants[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${fullWidth ? "w-full" : ""}
        ${className}
    `;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
            {...rest}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export default Button;
