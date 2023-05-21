import React from "react";
import { withAuthorization } from "../../Session";
import Search from "./Search";

const Home = () => (
  <div>
    <Search />
  </div>
);

const condition = (authUser) => authUser != null;
export default withAuthorization(condition)(Home);
