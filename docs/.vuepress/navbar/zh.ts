import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
    { 
      text: "面试题", 
      icon: "repo", 
      prefix: "/interview",
      children: [
        { text: "C++语言基础", icon: "note", link: "/cpp-interview.md"},
      ]
    },
  // { text: "案例", icon: "discover", link: "/demo/" },
  // {
  //   text: "指南",
  //   icon: "creative",
  //   prefix: "/guide/",
  //   children: [
  //     {
  //       text: "Bar",
  //       icon: "creative",
  //       prefix: "bar/",
  //       children: ["baz", { text: "...", icon: "more", link: "" }],
  //     },
  //     {
  //       text: "Foo",
  //       icon: "config",
  //       prefix: "foo/",
  //       children: ["ray", { text: "...", icon: "more", link: "" }],
  //     },
  //   ],
  // },
  // {
  //   text: "V2 文档",
  //   icon: "note",
  //   link: "https://vuepress-theme-hope.github.io/v2/zh/",
  // },
]);
