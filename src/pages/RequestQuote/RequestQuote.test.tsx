// import dependencies
import React from 'react';
// the component to test
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, cleanup } from '@testing-library/react';
import RequestQuote from './RequestQuote';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers/rootreducer';
import { createStore } from 'redux';

const store = createStore(
  rootReducer,
  undefined,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>
    ),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}

test('test component loading and presense of all input', async () => {
  // Arrange
  const { getByLabelText, getByText } = renderWithRouter(<RequestQuote />);
  // Act
  // Assert
  getByLabelText('First Name *');
  getByLabelText('Last Name *');
  getByLabelText('Email');
  getByText('From Currency');
  getByText('To Currency');
  // debug();
});

test('test input validation error', async () => {
  // Arrange
  const { findAllByText, getByText } = renderWithRouter(<RequestQuote />);
  // Act
  fireEvent(
    getByText('GET QUOTE'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  );
  // Assert
  const ele: any = await findAllByText(/Please enter/);
  expect(ele).toHaveLength(3);
  // debug();
});
