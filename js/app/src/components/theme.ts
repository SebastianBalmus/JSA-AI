import {extendTheme, Theme} from "@mui/joy";

const theme: Theme = extendTheme({
  components: {
    JoyTypography: {
      defaultProps: {
        textColor: '#4A4063'
      },
    },
  },
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: {
          50: "#fad9cd",
          100: "#ffbaa1",
          200: "#ffa482",
          300: "#ff8f66",
          400: "#fc7949",
          500: "#FF6B35",
          600: "#e85d2a",
          700: "#cc4c1d",
          800: "#a33912",
          900: "#73260a"
        },
      }
    },
  },
});

export default theme;
