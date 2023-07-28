import { describe, it, expect, afterAll } from 'vitest';
import { renderHook, act, cleanup } from '@testing-library/react';

import useCachedReducer from './useCachedReducer';

const reducer = (state: number, action: { type: string }) => {
    switch (action.type) {
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1;
        default:
            return state;
    }
};

describe('useCachedReducer', () => {
    afterAll(cleanup);

    it('Should receive a reducer and a default state and provide same interface as a regular useReducer', () => {
        const { result } = renderHook(() => useCachedReducer<number>(reducer, 0, 'value'));
        const [, dispatch] = result.current;

        act(() => {
            dispatch({ type: 'increment' });
            dispatch({ type: 'increment' });
        });

        expect(result.current[0]).toBe(2);
    });

    it('Should persist previous state from sessionStorage', () => {
        const { result } = renderHook(() => useCachedReducer<number>(reducer, 0, 'value'));
        const [state] = result.current;

        expect(state).toBe(2);
    });
});
