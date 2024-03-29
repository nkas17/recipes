/* eslint-disable import/no-extraneous-dependencies */
// @ts-nocheck
import * as React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import configureStore from '../store/configureStore';

function render(
  // Render with redux. Redefining render of @testing-library/react
  ui,
  { initialState, store = configureStore(initialState), ...renderOptions } = {},
) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return (
      <HashRouter>
        <Provider store={store}>{children}</Provider>
      </HashRouter>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';

export { render };
