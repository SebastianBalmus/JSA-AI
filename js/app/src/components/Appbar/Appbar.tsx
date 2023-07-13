import React from 'react';
import Typography from "@mui/joy/Typography";
import './Appbar.css'

const Appbar: React.FC = () => {
  return (
    <header className="appbar">
      <Typography level="h1">
        Handwritten numbers classifier
      </Typography>
    </header>
  )
};

export default Appbar;