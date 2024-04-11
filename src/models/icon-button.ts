export interface IconBtnProps {
    onClick: () => void;
    icon: React.ReactNode;
    size?: 'default' | 'medium';
    position?: 'absolute' | 'default';
}