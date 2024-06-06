import { useEffect, useState } from "react"

export const useMediaQuery = (query: string) => {
    // State boolean that updates to know if window size matches the query value (boolean)
    // Initialized with current window size when component is mounted
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);
        const listener = () => setMatches(media.matches);

        media.addEventListener('change', listener);

        // Clear after unmounted
        return () => media.removeEventListener('change', listener)
    }, [query]);

    return matches;
}; 