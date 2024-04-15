import React from "react";
import { useParams } from "react-router-dom";
import Notfound from "pages";
const generatePage = (name) => {
  const component = () => require(`./pages/${name.toLowerCase()}`).default;

  try {
    return React.createElement(component());
  } catch (err) {
    return <Notfound />;
  }
};
const Render = () => {
  const { page, slug } = useParams();

  let name = "";

  if (page) {
    name = slug ? `${page}/[slug]` : `${page}`;
  }

  return generatePage(name);
};

export default Render;
