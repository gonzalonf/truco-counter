import { Dispatch, Reducer, useEffect, useReducer } from 'react';

type Action = {
    type: string;
    payload?: string;
};

/**
 * useCachedReducer - regular reducer with sessionStorage persistence
 */
const useCachedReducer = <T>(
    reducer: Reducer<T, Action>,
    initialState: T,
    storeKey: string,
): [T, Dispatch<Action>] => {
    const [pointsList, dispatch] = useReducer(reducer, initialState, (initial) => {
        const storagePoints = window.sessionStorage.getItem(storeKey);
        const parsedStoragePoints: T | null = storagePoints ? JSON.parse(storagePoints) : null;
        return parsedStoragePoints || initial;
    });

    useEffect(() => {
        window.sessionStorage.setItem(storeKey, window.JSON.stringify(pointsList));
    }, [pointsList, storeKey]);

    return [pointsList, dispatch];
};

export default useCachedReducer;
