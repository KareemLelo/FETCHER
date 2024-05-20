import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

// Define your custom breakpoints
const breakpoints = createBreakpoints({
  sm: '30em', // 480px
  md: '48em', // 768px
  lg: '80em', // 992px
  xl: '80em', // 1280px
  '2xl': '96em', // 1536px
});

const colors = {
    brand: {
      primary: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      hover: "linear-gradient(135deg, #6a11cb 30%, #2575fc 70%)",
      background: "#FFFFFF",
      text: "gray.600",
      highlight: "#9DB4A0", // A lighter shade of primary for highlights or hover states
    alert: "#E57373", // For warnings or errors
    success: "#81C784", // For success messages
    info: "#64B5F6", // For informational messages
    dark: "#2E4053", // A dark shade for text or backgrounds needing contrast
    light: "#FBFBFB", // A very light shade for backgrounds or cards
    },
  };


// Extend the default theme
const theme = extendTheme({
  breakpoints,
  colors,
  
  // Add any other custom theme configurations here
});

export default theme;
