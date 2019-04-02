import React from 'react';

import KpiChart from '..';

describe('<KpiChart />', () => {
  test('should render without a problem', () => {
    const Header = 'My title';
    const Body = 'body';
    const Footer = 'footer';
    const { getByText } = render(
      <KpiChart>
        <KpiChart.Header>{Header}</KpiChart.Header>
        <KpiChart.Body>{Body}</KpiChart.Body>
        <KpiChart.Footer>{Footer}</KpiChart.Footer>
      </KpiChart>,
    );
    const HeaderNode = getByText(Header);
    const BodyNode = getByText(Body);
    const FooterNode = getByText(Footer);

    expect(HeaderNode).toBeInTheDocument();
    expect(BodyNode).toBeInTheDocument();
    expect(FooterNode).toBeInTheDocument();
  });

  test('should render kpi chart with a title', () => {
    const Title = 'My title';
    const { getByText } = render(
      <KpiChart>
        <KpiChart.Header>
          <KpiChart.Title>{Title}</KpiChart.Title>
        </KpiChart.Header>
        <KpiChart.Body>Body</KpiChart.Body>
        <KpiChart.Footer>Footer</KpiChart.Footer>
      </KpiChart>,
    );
    const TitleNode = getByText(Title);
    expect(TitleNode).toBeInTheDocument();
  });

  test('should render kpi chart with compacted design', () => {
    const Title = 'My title';
    const { container, getByText } = render(
      <KpiChart isCompacted>
        <KpiChart.Header>
          <KpiChart.Title isCompacted>{Title}</KpiChart.Title>
        </KpiChart.Header>
        <KpiChart.Body>Body</KpiChart.Body>
        <KpiChart.Footer>Footer</KpiChart.Footer>
      </KpiChart>,
    );
    const TitleNode = getByText(Title);
    expect(TitleNode).toHaveStyleRule('font-size', '1.4rem');
    expect(TitleNode).toHaveStyleRule('padding-bottom', '1.2rem');
    expect(container.firstChild).toHaveStyleRule('padding', '1.2rem 1.6rem');
  });
});
