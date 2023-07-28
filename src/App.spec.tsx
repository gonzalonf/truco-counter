import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import MyApp from './App';

describe('App', async () => {
    beforeEach(() => {
        render(<MyApp />);
    });

    afterAll(cleanup);

    it('Should increment on click', () => {
        const ourControllerIncrement = screen.getAllByLabelText('Increment points')[0];
        fireEvent.click(ourControllerIncrement);

        const ourControllerDisplay = screen.getAllByLabelText('Displayed points')[0];

        expect(ourControllerDisplay.textContent).toBe('1');

        fireEvent.click(ourControllerIncrement);

        expect(ourControllerDisplay.textContent).toBe('2');
    });
    it('Should decrement on click', () => {
        const ourControllerDecrement = screen.getAllByLabelText('Decrement points')[0];
        fireEvent.click(ourControllerDecrement);

        const ourControllerDisplay = screen.getAllByLabelText('Displayed points')[0];

        expect(ourControllerDisplay.textContent).toBe('1');

        fireEvent.click(ourControllerDecrement);

        expect(ourControllerDisplay.textContent).toBe('0');
    });
});
