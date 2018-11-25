import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import TabSwitcher from '..';
import Tab from '../Tab';
import TabPanel from '../TabPanel';
import TabList from '../TabList';
import TabPanels from '../TabPanels';

/* eslint-disable react/no-unescaped-entities */

storiesOf('TabSwitcher', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const noBorder = boolean('Without Border', false, 'State');
    const noBackground = boolean('Without Background', false, 'State');

    return (
      <div style={{ textAlign: 'left' }}>
        <TabSwitcher defaultActiveTabId="alfa">
          <TabList>
            <Tab id="alfa">Alfa</Tab>
            <Tab id="bravo">Bravo</Tab>
            <Tab id="charlie">Charlie</Tab>
            <Tab id="delta">Delta</Tab>
            <Tab id="echo">Echo</Tab>
          </TabList>

          <TabPanels noBorder={noBorder} noBackground={noBackground}>
            <TabPanel whenActive="alfa">
              <div>
                <h2>Alfa Tab</h2>
                My money's in that office, right? If she start giving me some bullshit about it
                ain't there, and we got to go someplace else and get it, I'm gonna shoot you in the
                head then and there. Then I'm gonna shoot that bitch in the kneecaps, find out where
                my goddamn money is. She gonna tell me too. Hey, look at me when I'm talking to you,
                motherfucker. You listen: we go in there, and that nigga Winston or anybody else is
                in there, you the first motherfucker to get shot. You understand?
              </div>
            </TabPanel>
            <TabPanel whenActive="bravo">
              <div>
                <h2>Bravo Tab</h2>
                Now that we know who you are, I know who I am. I'm not a mistake! It all makes
                sense! In a comic, you know how you can tell who the arch-villain's going to be?
                He's the exact opposite of the hero. And most times they're friends, like you and
                me! I should've known way back when... You know why, David? Because of the kids.
                They called me Mr Glass.
              </div>
            </TabPanel>
            <TabPanel whenActive="charlie">
              <div>
                <h2>Charlie Tab</h2>
                Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is
                advertised as the most popular gun in American crime. Do you believe that shit? It
                actually says that in the little book that comes with it: the most popular gun in
                American crime. Like they're actually proud of that shit.
              </div>
            </TabPanel>
            <TabPanel whenActive="delta">
              <div>
                <h2>Delta Tab</h2>
                Now that we know who you are, I know who I am. I'm not a mistake! It all makes
                sense! In a comic, you know how you can tell who the arch-villain's going to be?
                He's the exact opposite of the hero. And most times they're friends, like you and
                me! I should've known way back when... You know why, David? Because of the kids.
                They called me Mr Glass.
              </div>
            </TabPanel>
            <TabPanel whenActive="echo">
              <div>
                <h2>Echo Tab</h2>
                Well, the way they make shows is, they make one show. That show's called a pilot.
                Then they show that show to the people who make shows, and on the strength of that
                one show they decide if they're going to make more shows. Some pilots get picked and
                become television programs. Some don't, become nothing. She starred in one of the
                ones that became nothing.
              </div>
            </TabPanel>
          </TabPanels>
        </TabSwitcher>
      </div>
    );
  });
