import React from "react";

function Card({
    children,
    className = '',
    padding = 'normal',
    shadow = true,
    maxWidth = null
}) {
    const paddingSizes = {
        none: '',
        small: 'p-3',
        normal: 'p-6',
        large: 'p-8'
    };

    const cardClasses = `
        bg-white 
        rounded-2xl
        ${shadow ? 'shadow-md' : ''} 
        ${paddingSizes[padding]}
        ${maxWidth ? `max-w-${maxWidth} mx-auto` : ''}
        ${className}
    `;

    return (
        <div className={cardClasses}>
            {children}
        </div>
    );
}

export default Card;
