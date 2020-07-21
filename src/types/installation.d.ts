export interface ButtonsProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    allPages: number;
    disabled: boolean;
}