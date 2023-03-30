import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import LoginProvider, { LoginContext } from '.';

describe('testing context', () => {
  test('provides initial state', () => {
    render(
      <LoginProvider>
        <LoginContext.Consumer>
          {
            ({ loggedIn }) => {
              return (
                <>
                  <h3 data-testid="test-h3">test: {loggedIn.toString()}</h3>
                </>
              )
            }
          }
        </LoginContext.Consumer>
      </LoginProvider>
    );

    const h3 = screen.getByTestId('test-h3');
    expect(h3).toHaveTextContent('test: false');
    // expect(loggedIn).toBe(false);
  })
})
