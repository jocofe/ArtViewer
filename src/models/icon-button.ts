export interface IconBtnProps {
    onClick: () => void;
    icon: React.ReactNode;
    size?: 'small' | 'medium';
    position?: 'absolute' | 'default';
}