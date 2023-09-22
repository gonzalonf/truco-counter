import addUs from './assets/swish_1.mp3';
import addThem from './assets/swish_2.mp3';
import subtract from './assets/swish_reverse.mp3';

const playSound = (sound: 'us' | 'them' | 'subtract') => {
    switch (sound) {
        case 'us':
            new Audio(addUs).play();
            break;
        case 'them':
            new Audio(addThem).play();
            break;
        case 'subtract':
            new Audio(subtract).play();
            break;
        default:
            break;
    }
};

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
            playSound(user);
            return [...state, stateLastCopy];
        case 'subtract':
            stateLastCopy[user] = currentValue <= 0 ? currentValue : currentValue - 1;
            playSound('subtract');
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
