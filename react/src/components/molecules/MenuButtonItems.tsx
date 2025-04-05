import React from "react";
import { MenuButtonContextType } from "../../types/MenuButtonTypes";
import { alpha, Menu, MenuProps, styled } from "@mui/material";
import { MenuButtonItem } from "../atoms/MenuButtonItem";
import { PageNameType } from "../../types/AppTypes";

interface MenuButtonItemsProps {
    contexts: MenuButtonContextType[],
    anchorEl: null | HTMLElement,
    open: boolean,
    handleClose: () => void,
    handlePageFlags: (selectedName: PageNameType) => void
}

/* プルダウンメニューを描画する Molecule コンポーネント */
export const MenuButtonItems: React.FC<MenuButtonItemsProps> = ({
    contexts, anchorEl, open, handleClose, handlePageFlags
}) => {
    return (
        <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            {contexts.map((context, index) => (
                <MenuButtonItem
                    key = {index}
                    context={context}
                    handleClose={handleClose}
                    handlePageFlags={handlePageFlags}
                />
            ))}
        </StyledMenu>
    );
}

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: 'rgb(55, 65, 81)',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
        ...theme.applyStyles('dark', {
            color: theme.palette.grey[300],
        }),
    },
}));
