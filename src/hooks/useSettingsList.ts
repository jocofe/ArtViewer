import { useMemo } from "react";
import { useLocation } from "react-router-dom";

// Set selected link based on actual ubication
export const useSelectedLink = () => {
    const location = useLocation();

    const selectedLink = useMemo(() => location.pathname.split('/').pop(), [location.pathname]);
    return { selectedLink };
};

