import { useCallback, useEffect, useRef, useState } from "react";

export const useDropdownSettings = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const menuRef = useRef<HTMLUListElement | null>(null);

    const handleClickMenu = useCallback(() => {
        setDropdownOpen(prevState => !prevState)
    }, []);

    useEffect(() => {
        // Check if is clicking outside the dropdown element
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        // Add and event listener when dropdown is open & remove it when is close
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Remove event listener if component is unmounted
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    }, [dropdownOpen]);

    return { handleClickMenu, dropdownOpen, menuRef };
}