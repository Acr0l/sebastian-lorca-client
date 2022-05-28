import React from "react";
import { DiFirebase, DiReact, DiUnitySmall, DiMongodb } from "react-icons/di";
import {
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import {
  List,
  ListContainer,
  ListItem,
  ListParagraph,
  ListTitle,
} from "./TechnologiesStyles";

const Technologies = () => (
  <Section id="tech">
    <SectionDivider />
    <br />
    <SectionTitle main>Technologies</SectionTitle>
    <SectionText>
      I have experience with the following technologies:
    </SectionText>
    <List>
      <ListItem>
        <DiReact size={"3rem"} />
        <ListContainer>
          <ListTitle>Front-End</ListTitle>
          <ListParagraph>
            Experience with <br />
            React.js
          </ListParagraph>
        </ListContainer>
      </ListItem>
    </List>    
    <List>
      <ListItem>
        <DiFirebase size={"3rem"} />
        <ListContainer>
          <ListTitle>Back-End</ListTitle>
          <ListParagraph>
            Experience with <br />
            Node.js and 
            Databases <br />
            <DiMongodb size={"3rem"} />
            (MongoDB)
          </ListParagraph>
        </ListContainer>
      </ListItem>
    </List>
    <List>
      <ListItem>
        <DiUnitySmall size={"3rem"} />
        <ListContainer>
          <ListTitle>Game Design</ListTitle>
          <ListParagraph>
            Experience with <br />
            Unity
          </ListParagraph>
        </ListContainer>
      </ListItem>
    </List>
  </Section>
);

export default Technologies;
