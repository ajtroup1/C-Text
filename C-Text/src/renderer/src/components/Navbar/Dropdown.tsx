import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';

function DropdownMenu() {
  const dropdownModes = [
    {
      "mode": "file",
      "options": [
        "Open Folder",
        "Open File",
      ]
    }
  ]
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Option 1</MenuItem>
        <MenuItem onClick={handleClose}>Option 2</MenuItem>
      </Menu>
    </div>
  );
}

export default DropdownMenu;
