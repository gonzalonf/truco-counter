import { Dispatch, Reducer, useEffect, useReducer } from 'react';

type Action = {
    type: string;
    payload: string;
};

const storeKey = 'points';

const useCachedReducer = <T>(
    reducer: Reducer<T[], Action>,
    initialState: T[],
): [T[], Dispatch<Action>] => {
    const [pointsList, dispatch] = useReducer(reducer, initialState, (initial) => {
        const storagePoints = window.sessionStorage.getItem('points');
        const parsedStoragePoints: T[] | null = storagePoints ? JSON.parse(storagePoints) : null;
        return parsedStoragePoints || initial;
    });

    useEffect(() => {
        window.sessionStorage.setItem(storeKey, window.JSON.stringify(pointsList));
    }, [pointsList]);

    return [pointsList, dispatch];
};

export default useCachedReducer;
