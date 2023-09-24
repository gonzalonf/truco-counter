import addUs from './assets/swish_1.mp3';
import addThem from './assets/swish_2.mp3';
import subtract from './assets/swish_reverse.mp3';

const audios = {
    us: new Audio(addUs),
    them: new Audio(addThem),
    subtract: new Audio(subtract),
};

const playSound = (sound: 'us' | 'them' | 'subtract' /* volume = 1 */) => {
    const currentSound: HTMLAudioElement = audios[sound];
    currentSound.currentTime = 0;
    // currentSound.volume = 0.5;
    currentSound.play();
};

export type CounterState = {
    us: number;
    them: number;
};

const initialPoints: [CounterState] = [
    {
        us: 0,
        them: 0,
    },
];

export type AppState = {
    points: CounterState[];
    settings: {
        sound: {
            on: boolean;
        };
        // gameSize: 15 | 30;
        // labels: {
        //     us: string;
        //     them: string;
        // };
        // language: string;
    };
};

export const initialData: AppState = {
    points: [
        {
            us: 0,
            them: 0,
        },
    ],
    settings: {
        sound: { on: true },
    },
};

const reducer = (state: AppState, action: { type: string; payload?: string }) => {
    const { points } = state;
    const user: 'us' | 'them' = action.payload === 'us' ? 'us' : 'them';
    const lastPoints: CounterState = window.structuredClone(points[points.length - 1]);
    const currentPointsUser = lastPoints[user];
    const newState = window.structuredClone(state);

    switch (action.type) {
        case 'add':
            lastPoints[user] = currentPointsUser >= 30 ? currentPointsUser : currentPointsUser + 1;
            newState.points = [...points, lastPoints];
            if (state.settings.sound.on) playSound(user);
            return newState;
        case 'subtract':
            lastPoints[user] = currentPointsUser <= 0 ? currentPointsUser : currentPointsUser - 1;
            newState.points = [...points, lastPoints];
            if (state.settings.sound.on) playSound('subtract');
            return newState;
        case 'reset':
            newState.points = initialPoints;
            return newState;
        case 'back':
            newState.points = points.slice(0, -1);
            return newState;
        case 'toggle-sound':
            newState.settings.sound.on = !newState.settings.sound.on;
            return newState;
        default:
            return initialData;
        // settings change / clear all
        // change labels
        // undo
        // redo
    }
};

export default reducer;
