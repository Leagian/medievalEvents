import { useState } from "react";

// MATERIAL
import { Switch } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const theme = useTheme();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Switch
        checked={theme.palette.mode === "dark"}
        onChange={toggleDarkMode}
        color="primary"
      />
    </ThemeProvider>
  );
}

export default DarkModeToggle;
