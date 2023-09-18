import React from "react";
import ReactDOM from "react-dom/client";

const Comment = ({ author, body, postedAt }) => {
  return React.createElement("div", {
    className: "comment",
    children: [
      React.createElement("hr"),
      React.createElement(
        "div",
        { className: "image" },
        React.createElement("img", {
          src: "https://i.postimg.cc/Y0RcrdHp/no-user-image.gif",
        })
      ),
      React.createElement("div", {
        className: "header",
        children: [
          React.createElement("h3", { className: "author" }, author),
          React.createElement("span", null, postedAt),
        ],
      }),
      React.createElement("p", null, body),
    ],
  });
};

const Popover = ({ children }) => {
  return children;
};

const App = () => {
  return React.createElement("div", {
    className: "comments",
    children: [
      React.createElement(
        Popover,
        null,
        React.createElement("h2", null, "My cool Popover")
      ),
      React.createElement("h2", null, "Comments(2)"),
      React.createElement(Comment, {
        author: "Srdjan",
        postedAt: "2 minutes ago",
        body: "My Comment",
      }),
      React.createElement(Comment, {
        author: "Max",
        postedAt: "5 minutes ago",
        body: "Max's Comment",
      }),
      React.createElement(Comment, {
        author: "Nick",
        postedAt: "15 minutes ago",
        body: "Nick's Comment",
      }),
      React.createElement(
        Popover,
        null,
        React.createElement("h2", null, "My even cooler Popover")
      ),
    ],
  });
};

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(App());
