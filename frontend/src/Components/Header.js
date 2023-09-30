import React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Box className="header">
      <Link to="/about" className="link-button">
        <Typography variant="h6">About</Typography>
      </Link>
      <Link to="/profile" className="link-button">
        <Typography variant="h6">Profile</Typography>
      </Link>
      <Link to="/add_task" className="link-button">
        <Typography variant="h6">Add Task</Typography>
      </Link>
    </Box>
  );
}
