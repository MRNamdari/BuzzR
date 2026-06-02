"use client";
import { createTheme } from "@mui/material/styles";
// import { Roboto } from "next/font/google";
import localFont from "next/font/local";
// const roboto = Roboto({
//   weight: ["300", "400", "500", "700"],
//   subsets: ["latin"],
//   display: "swap",
// });

const JetBrains = localFont({
  display: "swap",
  src: [
    {
      path: "../public/fonts/JetBrainsMono/JetBrainsMono[wght].ttf",
      style: "normal",
    },
    {
      path: "../public/fonts/JetBrainsMono/JetBrainsMono-Italic[wght].ttf",
      style: "italic",
    },
  ],
});

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  palette: { primary: { main: "#000" } },
  cssVariables: true,
  typography: {
    fontFamily: JetBrains.style.fontFamily,
  },
  components: {},
  shape: { borderRadius: 8 },
} as const);

export default theme;
