import React, { memo, useEffect } from "react";
import { getTodos } from "../utils/api";

const Home = memo(() => {
  useEffect(() => {
    getTodos().then((res) => {
      console.log(res);
    });
  }, []);

  return <div>Home Page</div>;
});

export default Home;
