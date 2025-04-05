import React from "react";
import { MenuButtonItems } from "../molecules/MenuButtonItems";
import { MenuButton } from "../atoms/MenuButton";
import { MenuButtonContextType } from "../../types/MenuButtonTypes";
import { AddTask, ManageAccounts } from "@mui/icons-material";
import { PageNameType } from "../../types/AppTypes";

interface MenuViewProps {
    handlePageFlags: (selectedName: PageNameType) => void
}

/* メニューを描画する Organism コンポーネント */
export const MenuView: React.FC<MenuViewProps> = ({ handlePageFlags }) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const contexts: MenuButtonContextType[] = [
        {label: "Todo", icon: <AddTask />, mappingPage: "todo"},
        {label: "マイページ", icon: <ManageAccounts />, mappingPage: "user"}
    ];

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <MenuButton
                label={"MENU"}
                open={open}
                handleClick={handleClick}
            />
            <MenuButtonItems
                contexts={contexts}
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
                handlePageFlags={handlePageFlags}
            />
        </>
    );
};
