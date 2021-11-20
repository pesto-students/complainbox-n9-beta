import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MenuItem from '@mui/material/MenuItem';
import { StyledMenu } from "./styles/DashboardStyle";
function StyledMenuHome({ anchorEl, setAnchorEl, open, handleClose }) {

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
            <MenuItem onClick={handleClose} disableRipple>
                <EditIcon />
                Edit
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
                <FileCopyIcon />
                Duplicate
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleClose} disableRipple>
                <ArchiveIcon />
                Archive
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
                <MoreHorizIcon />
                More
            </MenuItem>
        </StyledMenu>
    );
}

export default StyledMenuHome;