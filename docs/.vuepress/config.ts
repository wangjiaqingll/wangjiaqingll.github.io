import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "LeBao's Wiki",
      description: "",
    },

    "/en/": {
      lang: "en-US",
      title: "LeBao's Wiki",
      description: "",
    },
  },

  theme,

  shouldPrefetch: false,
});
