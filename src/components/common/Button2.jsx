import React from "react";
import { Link } from "react-router-dom";

const Button = ({
    children,
    type = 'button',
    variant = 'navForward',
    className = '',
    onClick,
    disabled = false,
    isLoading = false,
    fullWidth = false,
    href = null,
    to = null,
    ...rest
}) => {

    const baseStyles = "rounded-md transition-all duration-200 focus:outline-none font-[inter] cursor-pointer";

    const variantStyles = {
        login: "bg-[#FFE1DE] text-[#EC1119] hover:bg-[#ffd1cc] transition-colors font-bold",
        navForward: "bg-[#EC1119] text-white hover:bg-[#d10f16] transition-colors border border-[#EC1119]",
        navBack: "bg-[#FFE1DE] text-[#EC1119] hover:bg-[#ffd1cc] border border-[#EC1119]",
        newKlage: "bg-[#FFE1DE] text-[#EC1119] text-xl hover:bg-[#ffd1cc] transition-colors font-bold border border-2 border-[#EC1119]",
        download: "bg-[#FFE1DE] text-[#EC1119] hover:bg-[#ffd1cc] transition-colors font-bold"
    };
    
    const variantSizes = {
        login: "w-full max-w-80 py-3 px-6",
        navForward: "w-auto max-w-32 py-2 px-4",
        navBack: "w-auto max-w-32 py-2 px-4",
        newKlage: "w-full max-w-120 py-4 px-8",
        download: "w-full max-w-80 py-4 px-8",
    };

    const variantContent = {
        login: "Log in",
        navForward: "Weiter",
        navBack: "Zurück",
        newKlage: "+ Neue Klage",
        download: "Dokument downloaden",
    };

    const stateStyles = {
        disabled: disabled ? "opacity-50 cursor-not-allowed" : "",
        loading: isLoading ? "relative !text-transparent" : "",
        fullWidth: fullWidth ? "w-full" : "",
    };

    // Loading-Spinner
    const LoadingSpinner = () => (
        <div className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    );

    // Kombiniere alle Styles
    const buttonStyles = `
        ${baseStyles} 
        ${variantStyles[variant]} 
        ${fullWidth ? stateStyles.fullWidth : variantSizes[variant]} 
        ${stateStyles.disabled} 
        ${stateStyles.loading} 
        ${className}
    `;

    // Button-Inhalt - verwendet children, falls vorhanden, sonst den vordefinierten Inhalt
    const buttonContent = children || variantContent[variant];

    // Wenn es ein Link sein soll
    if (href) {
        return (
            <a 
                href={href} 
                className={buttonStyles}
                {...rest}
            >
                {buttonContent}
                {isLoading && <LoadingSpinner />}
            </a>
        );
    }

    // Wenn es ein React Router Link sein soll
    if (to) {
        return (
            <Link 
                to={to} 
                className={buttonStyles}
                {...rest}
            >
                {buttonContent}
                {isLoading && <LoadingSpinner />}
            </Link>
        );
    }

    // Standard-Button
    return (
        <button
            type={type}
            className={buttonStyles}
            disabled={disabled || isLoading}
            onClick={onClick}
            {...rest}
        >
            {buttonContent}
            {isLoading && <LoadingSpinner />}
        </button>
    );
};

export default Button;
