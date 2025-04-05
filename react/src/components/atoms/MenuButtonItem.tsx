import React from "react";
import { MenuItem } from "@mui/material";
import { MenuButtonContextType } from "../../types/MenuButtonTypes";
import { PageNameType } from "../../types/AppTypes";

interface MenuButtonItemProps {
    context: MenuButtonContextType,
    handleClose: () => void,
    handlePageFlags: (selectedName: PageNameType) => void
}

/* プルダウンメニューを描画する Atom コンポーネント */
export const MenuButtonItem: React.FC<MenuButtonItemProps> = ({
    context, handleClose, handlePageFlags
}) => {
    return (
        <MenuItem
            onClick={() => {handleClose(); handlePageFlags(context.mappingPage);}}
            disableRipple
        >
            {context.icon}
            {context.label}
        </MenuItem>
    );
}
