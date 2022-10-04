import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    // {
    //   icon: "discover",
    //   text: "案例",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    {
      text: "面试题汇总",
      icon: "repo",
      prefix: "interview/",
      children: "structure",
    },
    // "slides",
  ],
});
