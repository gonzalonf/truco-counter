import { Dispatch, Reducer, useEffect, useReducer } from 'react';

type Action = {
    type: string;
    payload?: string;
};

/**
 * useCachedReducer - regular reducer with Storage persistence
*/

let storage = window.sessionStorage;

const useCachedReducer = <T>(
    reducer: Reducer<T, Action>,
    initialState: T,
    storeKey: string,
    localStorage?: boolean,
): [T, Dispatch<Action>] => {
    if (localStorage) storage = window.localStorage;

    const [pointsList, dispatch] = useReducer(reducer, initialState, (initial) => {
        const storagePoints = storage.getItem(storeKey);
        const parsedStoragePoints: T | null = storagePoints ? JSON.parse(storagePoints) : null;
        return parsedStoragePoints || initial;
    });

    useEffect(() => {
        storage.setItem(storeKey, window.JSON.stringify(pointsList));
    }, [pointsList, storeKey]);

    return [pointsList, dispatch];
};

export default useCachedReducer;
