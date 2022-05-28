import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = (props) => (
  <Section row nopadding>
    <LeftSection>
      <SectionTitle main center>
        Hello There! <br />
        I'm Sebastian Lorca
      </SectionTitle>
      <SectionText>
      I enjoy reading fiction novels (The Name of The Wind is a treasured novel for me), playing the guitar, listening to music, and watching series. Being surrounded by information and technology is what led me to pursue a path towards Computer Science, and I have been developing multiple projects to impact the community through them.
      </SectionText>
      <Button onClick={ () => window.location = 'https://kimmweb.herokuapp.com'}>Learn More</Button>
    </LeftSection>
  </Section>
);

export default Hero;