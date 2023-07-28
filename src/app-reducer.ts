export type CounterState = {
    us: number;
    them: number;
};

export const initData: [CounterState] = [
    {
        us: 0,
        them: 0,
    },
];

export type AppState = {
    points: CounterState[];
    settings: {
        gameSize: 15 | 30;
        labels: {
            us: string;
            them: string;
        };
        language: string;
    };
};

const reducer = (state: CounterState[], action: { type: string; payload?: string }) => {
    const user: 'us' | 'them' = action.payload === 'us' ? 'us' : 'them';
    const stateLastCopy: CounterState = window.structuredClone(state[state.length - 1]);
    const currentValue = stateLastCopy[user];

    switch (action.type) {
        case 'add':
            stateLastCopy[user] = currentValue >= 30 ? currentValue : currentValue + 1;
            return [...state, stateLastCopy];
        case 'subtract':
            stateLastCopy[user] = currentValue <= 0 ? currentValue : currentValue - 1;
            return [...state, stateLastCopy];
        case 'reset':
            return initData;
        case 'back':
            return state.slice(0, -1);
        default:
            return state;
        // settings change / clear all
        // change labels
        // undo
        // redo
    }
};

export default reducer;
