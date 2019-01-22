import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { ResponsiveBar } from '@nivo/bar';

import { Button, KpiChart } from '../..';

const data = [
  {
    hours: '3h',
    '25 juil. 2017': 2,
    'old dateColor': 'hsl(205, 23%, 78%)',
    '25 juil. 2018': 8,
    'current dateColor': 'hsl(200, 64%, 62%);',
  },
  {
    hours: '6h',
    '25 juil. 2017': 7,
    'old dateColor': 'hsl(205, 23%, 78%)',
    '25 juil. 2018': 9,
    'current dateColor': 'hsl(200, 64%, 62%)',
  },
  {
    hours: '9h',
    '25 juil. 2017': 23,
    'old dateColor': 'hsl(205, 23%, 78%)',
    '25 juil. 2018': 20,
    'current dateColor': 'hsl(200, 64%, 62%)',
  },
  {
    hours: '12h',
    '25 juil. 2017': 70,
    'old dateColor': 'hsl(205, 23%, 78%)',
    '25 juil. 2018': 83,
    'current dateColor': 'hsl(200, 64%, 62%)',
  },
  {
    hours: '15h',
    '25 juil. 2017': 56,
    'old dateColor': 'hsl(205, 23%, 78%)',
    '25 juil. 2018': 67,
    'current dateColor': 'hsl(200, 64%, 62%)',
  },
  {
    hours: '18h',
    '25 juil. 2017': 20,
    'old dateColor': 'hsl(205, 23%, 78%)',
    '25 juil. 2018': 45,
    'current dateColor': 'hsl(200, 64%, 62%)',
  },
  {
    hours: '21h',
    '25 juil. 2017': 100,
    'old dateColor': 'hsl(205, 23%, 78%)',
    '25 juil. 2018': 80,
    'current dateColor': 'hsl(200, 64%, 62%)',
  },
  {
    hours: '00h',
    '25 juil. 2017': 7,
    'old dateColor': 'hsl(205, 23%, 78%)',
    '25 juil. 2018': 8,
    'current dateColor': 'hsl(200, 64%, 62%)',
  },
];

storiesOf('KpiChart', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const Title = text('Title', "Chiffre d'affaires de la journée", 'Title');
    const label = text('Label', 'Afficher le rapport', 'Label');
    return (
      <KpiChart>
        <KpiChart.Header>
          <KpiChart.Title>{Title}</KpiChart.Title>
        </KpiChart.Header>
        <KpiChart.Body>
          <ResponsiveBar
            data={data}
            keys={['25 juil. 2017', '25 juil. 2018']}
            indexBy="hours"
            margin={{
              top: 50,
              right: 60,
              bottom: 50,
              left: 60,
            }}
            padding={0.3}
            groupMode="grouped"
            colors="nivo"
            borderColor="inherit:darker(1.6)"
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="inherit:darker(1.6)"
            animate
            motionStiffness={90}
            motionDamping={15}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'row',
                translateX: 70,
                translateY: 50,
                itemWidth: 120,
                itemHeight: 15,
                itemsSpacing: 2,
                symbolSize: 20,
              },
            ]}
            theme={{
              tooltip: {
                container: {
                  fontSize: '1.2rem',
                },
              },
            }}
          />
        </KpiChart.Body>
        <KpiChart.Footer>
          <Button ghost>{label}</Button>
        </KpiChart.Footer>
      </KpiChart>
    );
  });
