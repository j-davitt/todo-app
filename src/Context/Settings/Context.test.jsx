import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import SettingsProvider, { SettingsContext } from '.';

describe('testing context', () => {
  test('provides initial state', () => {
    render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {
            ({ sort }) => {
              return (
                <>
                  <h3 data-testid="test-h3">test: {sort}</h3>
                </>
              )
            }
          }
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    const h3 = screen.getByTestId('test-h3');
    expect(h3).toHaveTextContent('test: difficulty');
  })
})
