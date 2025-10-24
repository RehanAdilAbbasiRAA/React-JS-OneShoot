import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from "react-router-dom";


// Material UI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme();

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
      <BrowserRouter>
    <CssBaseline />
    <App />
      </BrowserRouter>
  </ThemeProvider>
)
