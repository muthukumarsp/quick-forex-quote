import React from 'react';
// import Provider from 'react-redux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import QuoteResult from './pages/QuoteResult/QuoteResult';
import RequestQuote from './pages/RequestQuote/RequestQuote';
import rootReducer from './reducers/rootreducer';

const store = createStore(
  rootReducer,
  undefined,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

function AppRouter() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/quoteresult" component={QuoteResult} />} />
          <Route path="/" component={RequestQuote} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default AppRouter;
