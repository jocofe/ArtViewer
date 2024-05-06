import { ReactNode } from "react";

export interface FilterTagProps {
    className: string;
    type: string;
    onClick?: () => void;
    children: ReactNode;
}