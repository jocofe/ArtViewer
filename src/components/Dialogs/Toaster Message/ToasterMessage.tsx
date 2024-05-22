import React, { useEffect } from "react";

interface ToasterProps {
    message: string;
    onClose: () => void;
    time?: number;
}

export const Toaster: React.FC<ToasterProps> = ({ message, time = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, time);
        return () => clearTimeout(timer);
    }, [time, onClose]);

    return( 
    <div className={`toaster-wrapper ${message ? 'show' : ''}`}>
        {message}
    </div>
    )
}