import React from "react";
import Accomplishments from "./Accomplishments/Accomplishments.js";
import BackgroundAnimation from "./BackgroundAnimation/BackgroundAnimation.js";
import Hero from "./Hero/Hero.js";
import Layout from "./Layout/Layout.js";
import Projects from "./Projects/Projects.js";
import { Section } from "./styles.js";
import Technologies from "./Technologies/Technologies.js";
import Timeline from "./TimeLine/Timeline.js";

const Portfolio = () => {
  return (
    <Layout>
      <Section grid>
        <Hero />
        <BackgroundAnimation />
      </Section>
      <Projects />
      <Technologies />
      <Timeline />
      <Accomplishments />
    </Layout>
  );
};

export default Portfolio;
