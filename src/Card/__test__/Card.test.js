import React from 'react';

import Card from '..';

describe('Card', () => {
  test('should render without a problem', () => {
    const { container } = render(<Card />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should have a body content', () => {
    const bodyText = 'Hey, this is my content!';

    const { getByText } = render(
      <Card>
        <Card.Body>{bodyText}</Card.Body>
      </Card>,
    );

    const bodyNode = getByText(bodyText);

    expect(bodyNode).toBeInTheDocument();
  });

  test('should have a header content', () => {
    const headerText = 'Header';

    const { getByText } = render(
      <Card>
        <Card.Header>{headerText}</Card.Header>
        <Card.Body>Hey, this is my content!</Card.Body>
      </Card>,
    );

    const headerNode = getByText(headerText);

    expect(headerNode).toBeInTheDocument();
  });

  test('should have a footer content', () => {
    const footerText = 'Footer';

    const { getByText } = render(
      <Card>
        <Card.Header>Header</Card.Header>
        <Card.Body>Hey, this is my content!</Card.Body>
        <Card.Footer>{footerText}</Card.Footer>
      </Card>,
    );

    const footerNode = getByText(footerText);

    expect(footerNode).toBeInTheDocument();
  });

  test('should have a small header', () => {
    const headerText = 'Header';

    const { getByText } = render(
      <Card>
        <Card.Header small>{headerText}</Card.Header>
        <Card.Body>Hey, this is my content!</Card.Body>
      </Card>,
    );

    const headerNode = getByText(headerText);

    expect(headerNode).toHaveStyleRule('padding', '0 2rem');
  });
});
