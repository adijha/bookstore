import React, { useState } from "react";
import homeImage from "../../assets/bookHomImage.jpg";
import "./Home.css";
import HomeCard from "./HomeCard";

const Home = () => {
  return (
    <div className="homeSection ">
      <div className="firstSection grid gridTwoTemplate">
        <div>
          <h1>
            <span>Hello, welcomes here to learn something</span>{" "}
            <span>new everyday!!!</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Praesentium ipsum incidunt provident, sed quis cupiditate
            repellendus ut autem dolorum esse neque hic culpa enim molestiae
            beatae libero excepturi repellat saepe, nobis quas, exercitationem
            quae tempore? Facilis placeat repellat similique hic blanditiis, eum
            saepe possimus fugiat laborum optio sint eaque doloremque!
          </p>
          <button>Get Started</button>
        </div>
        <div>
          <img src={homeImage} alt="" />
        </div>
      </div>

      {/* card components */}
      <HomeCard />
    </div>
  );
};

export default Home;
