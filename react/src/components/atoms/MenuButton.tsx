import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button } from "@mui/material";

interface MenuButtonProps {
    label: string,
    open: boolean,
    handleClick: (event: React.MouseEvent<HTMLElement>) => void
}

/* メニューボタンを描画する Atom コンポーネント */
export const MenuButton: React.FC<MenuButtonProps> = ({
    label, open, handleClick
}) => {
    return (
        <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
        >
            {label}
        </Button>
    );
}
