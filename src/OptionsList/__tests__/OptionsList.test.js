import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';

import OptionsList from '..';

const options = [
  { value: 'velociraptor', label: 'Velociraptor' },
  { value: 't-rex', label: 'Tyrannosaurus rex' },
  { value: 'diplodocus', label: 'Diplodocus' },
  { value: 'brachiosaure', label: 'Brachiosaure' },
  { value: 'triceratops', label: 'Triceratops' },
];

describe('<OptionsList />', () => {
  test('should render without a problem', () => {
    const { getByText } = render(<OptionsList options={options} values={[]} />);

    const trex = getByText(/tyrannosaurus/i);
    expect(trex).toBeInTheDocument();
  });

  test('should display a searchbar', () => {
    const { getByTestId } = render(
      <OptionsList
        options={options}
        searchBarPlaceholder="Are you looking for a dinosaure ?"
        searchMethod={() => options}
        values={[]}
      />,
    );

    const searchBar = getByTestId('input-container');
    expect(searchBar).toBeInTheDocument();
  });

  test('searchMethod should filter options', () => {
    const { getByTestId, queryByText } = render(
      <OptionsList
        options={options}
        searchBarPlaceholder="Are you looking for a dinosaure ?"
        searchMethod={() => options.filter(option => option.label !== 'Triceratops')}
        values={[]}
      />,
    );
    const searchBar = getByTestId('input-container');
    const triceratops = queryByText(/triceratops/i);

    expect(searchBar).toBeInTheDocument();
    expect(triceratops).not.toBeInTheDocument();
  });

  test('should display radio buttons if allowMultiple is false', () => {
    const { container } = render(<OptionsList options={options} values={[]} />);
    const radio = container.querySelector('input[type="radio"]');
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(radio).toBeInTheDocument();
    expect(checkbox).not.toBeInTheDocument();
  });

  test('should display checkboxes if allowMultiple is true', () => {
    const { container } = render(<OptionsList allowMultiple options={options} values={[]} />);
    const radio = container.querySelector('input[type="radio"]');
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(radio).not.toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
  });

  test('should call onChange method on checkbox click', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <OptionsList allowMultiple onChange={onChange} options={options} values={['triceratops']} />,
    );

    act(() => {
      const velociraptor = getByText(/velociraptor/i);
      fireEvent.click(velociraptor);
    });
    expect(onChange.mock.calls[0][0]).toEqual(['triceratops', 'velociraptor']);
  });

  test('should call onChange method on radio click and return last option clicked', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <OptionsList onChange={onChange} options={options} values={['diplodocus']} />,
    );

    act(() => {
      const velociraptor = getByText(/velociraptor/i);
      fireEvent.click(velociraptor);
    });

    act(() => {
      const triceratops = getByText(/triceratops/i);
      fireEvent.click(triceratops);
    });

    expect(onChange.mock.calls[0][0]).toEqual(['velociraptor']);
    expect(onChange.mock.calls[1][0]).toEqual(['triceratops']);
  });

  test('should display custom component when no result', () => {
    const onChange = jest.fn();

    // eslint-disable-next-line react/prop-types
    const NoResult = () => <div>You bred raptors ?</div>;

    const { queryByText } = render(
      <OptionsList
        onChange={onChange}
        options={options}
        values={[]}
        NoResult={NoResult}
        searchMethod={() => []}
      />,
    );

    const noResultMessage = queryByText(/bred raptors/i);
    expect(noResultMessage).toBeInTheDocument();
  });

  test('should display custom component for option', () => {
    const onChange = jest.fn();

    // eslint-disable-next-line react/prop-types
    const Option = ({ label }) => <div>{`custom ${label}`}</div>;

    const { queryByText } = render(
      <OptionsList onChange={onChange} options={options} values={[]} OptionComponent={Option} />,
    );

    const customOption = queryByText(/custom triceratops/i);
    expect(customOption).toBeInTheDocument();
  });
});
