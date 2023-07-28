import { describe, expect, it } from 'vitest';

import reducer from './app-reducer';

describe('App reducer', async () => {
    it('Should add new state object with added value assigned to payload when action type is "add"', () => {
        const initData = [{ us: 0, them: 0 }];

        let result = reducer(initData, { type: 'add', payload: 'us' });

        expect(result.at(-1)).toEqual({ us: 1, them: 0 });

        result = reducer(result, { type: 'add', payload: 'us' });

        expect(result.at(-1)).toEqual({ us: 2, them: 0 });

        result = reducer(result, { type: 'add', payload: 'them' });

        expect(result.at(-1)).toEqual({ us: 2, them: 1 });
        expect(result.length).toBe(4);
    });

    it('Should subtract new state object with added value assigned to payload when action type is "subtract"', () => {
        const initData = [{ us: 5, them: 2 }];

        let result = reducer(initData, { type: 'subtract', payload: 'us' });

        expect(result.at(-1)).toEqual({ us: 4, them: 2 });

        result = reducer(result, { type: 'subtract', payload: 'us' });

        expect(result.at(-1)).toEqual({ us: 3, them: 2 });

        result = reducer(result, { type: 'subtract', payload: 'them' });

        expect(result.at(-1)).toEqual({ us: 3, them: 1 });
        expect(result.length).toBe(4);
    });

    it('Should always set 0 to minimun value possible when subtracting from it"', () => {
        const initData = [{ us: 1, them: 0 }];

        let result = reducer(initData, { type: 'subtract', payload: 'us' });

        expect(result.at(-1)).toEqual({ us: 0, them: 0 });

        result = reducer(result, { type: 'subtract', payload: 'us' });

        expect(result.at(-1)).toEqual({ us: 0, them: 0 });

        result = reducer(result, { type: 'subtract', payload: 'them' });

        expect(result.at(-1)).toEqual({ us: 0, them: 0 });
        expect(result.length).toBe(4);
    });

    it('Should always set 30 to maximum value possible when adding"', () => {
        const initData = [{ us: 29, them: 30 }];

        let result = reducer(initData, { type: 'add', payload: 'us' });

        expect(result.at(-1)).toEqual({ us: 30, them: 30 });

        result = reducer(result, { type: 'add', payload: 'us' });

        expect(result.at(-1)).toEqual({ us: 30, them: 30 });

        result = reducer(result, { type: 'add', payload: 'them' });

        expect(result.at(-1)).toEqual({ us: 30, them: 30 });
        expect(result.length).toBe(4);
    });
});
