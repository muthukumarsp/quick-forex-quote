// import dependencies
import React from 'react';

// import react-testing methods
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  getByText
} from '@testing-library/react';

// the component to test
import CustomFiled from './CustomField';
// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

const commonProps = {
  field: {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    name: 'test_input_field'
  },
  form: {
    touched: { test_input_field: false },
    errors: {}
  },
  label: 'Testing component'
} as any;

test('loads component and test label text', async () => {
  // Arrange
  const { getByLabelText, getByTestId, container, asFragment, debug } = render(
    <CustomFiled {...commonProps} />
  );
  // Act
  // Assert
  getByLabelText('Testing component');
});

test('Test the initial input value passed', async () => {
  // Arrange
  const updatedProps = {
    ...commonProps
  };
  updatedProps.field.value = 'Jon';
  const { getByDisplayValue, getByLabelText, container, asFragment, debug } = render(
    <CustomFiled {...updatedProps} />
  );

  // Act
  const input = getByLabelText(commonProps.label);
  expect(input.value).toBe(updatedProps.field.value);
});
test('Test the error block', async () => {
  // Arrange
  const updatedProps = {
    ...commonProps,
    ...{
      form: {
        touched: { test_input_field: true },
        errors: {
          test_input_field: 'Field validation error'
        }
      }
    }
  };
  const { getByText, getByLabelText, container, asFragment, debug } = render(
    <CustomFiled {...updatedProps} />
  );
  // Act
  getByText(updatedProps.form.errors.test_input_field);
  // debug();
});
