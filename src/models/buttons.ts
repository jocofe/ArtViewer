export interface ButtonProps {
    label: string;
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    type?: 'primary' | 'sub_primary' |'secondary' | 'default';
    onClick: () => void;
}

