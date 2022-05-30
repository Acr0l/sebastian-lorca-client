import React from "react";
import { Section, SectionTitle } from "../styles.js";
import { Box, Boxes, BoxNum, BoxText } from "./AccomplishmentsStyles";


const data = [
  { number: 20, text: "Open Source Projects"},
  { number: 1000, text: "Students", },
  { number: 1900, text: "Github Followers", },
  { number: 5000, text: "Github Stars", }
];

const Accomplishments = () => (
  <Section id="accomplishments">
    <SectionTitle>Personal Accomplishments</SectionTitle>
    <Boxes>
      {data.map((card, i) => (
        <Box key={i}>
          <BoxNum>{card.number}+</BoxNum>
          <BoxText>{card.text}</BoxText>
        </Box>
      ))}
    </Boxes>
  </Section>
);

export default Accomplishments;
