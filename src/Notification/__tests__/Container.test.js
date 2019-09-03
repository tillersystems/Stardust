import React from 'react';

import NotificationContainer from '../Container';

describe('<Container />', () => {
  test('should render without a problem', () => {
    const CustomComponent = () => <div>custom component</div>;
    const spy = jest.fn();
    const { getByText, getByTestId } = render(
      <NotificationContainer
        autoDismiss={false}
        component={CustomComponent}
        autoDismissTimeout={4000}
        pauseOnHover={false}
        onDismiss={spy}
        padding="1rem"
        placement="top-left"
      />,
    );

    const CustomComponentNode = getByText(/custom component/i);
    const ContainetNode = getByTestId('notification-container');

    expect(CustomComponentNode).toBeInTheDocument();
    expect(ContainetNode).toBeInTheDocument();
  });

  test('should call onDismiss callback if ', () => {
    jest.useFakeTimers();
    const CustomComponent = () => <div>custom component</div>;
    const spy = jest.fn();
    render(
      <NotificationContainer
        autoDismiss
        component={CustomComponent}
        autoDismissTimeout={1000}
        pauseOnHover={false}
        onDismiss={spy}
        padding="1rem"
        placement="top-left"
      />,
    );

    expect(spy).not.toHaveBeenCalledTimes(1);

    // Fast forward and exhaust only currently pending timers
    jest.runOnlyPendingTimers();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
