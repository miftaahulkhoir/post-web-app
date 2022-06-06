import React from "react";
import Button from "./childcomponents/Button";
import ListDataHome from "./childcomponents/ListDataHome";

const Home = () => {
  return (
    <div className="w-screen flex flex-col">
      <ListDataHome />
      <Button />
    </div>
  );
};

export default Home;
