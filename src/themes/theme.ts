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
      primary: "#6D9886",
      secondary: "#A9BFA4",
      accent: "#F2D096",
      background: "#F4F4F2",
      text: "#333333",
    },
  };

// Extend the default theme
const theme = extendTheme({
  breakpoints,
  colors
  // Add any other custom theme configurations here
});

export default theme;
