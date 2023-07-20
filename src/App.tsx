import { useContext, useReducer } from 'react';
import './App.css';

import ConfirmButtonWithModal from './components/ButtonModal';
import Controls from './components/Controls';
import PointsVisualizer from './components/PointsVisualizer';
import GameStageIndicator from './components/GameStageIndicator';

import LanguageContext from './context/language';


interface CounterState {
    us: number;
    them: number;
}

const initData: CounterState[] = [
    {
        us: 0,
        them: 0,
    },
];

const reducer = (state: CounterState[], action: { type: string; payload: string }) => {
    const user: 'us' | 'them' = action.payload === 'us' ? 'us' : 'them';
    const stateLastCopy = { ...state[state.length - 1] };
    const currentValue = stateLastCopy[user];

    // structuredClone()
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
    }
};

function App() {
    const [pointsList, dispatch] = useReducer(reducer, initData);
    // const [currentIndex, setCurrentIndex] = useState(0);
    const currentPoints = pointsList[pointsList.length - 1];
    const translations = useContext(LanguageContext);

    return (
        <div className="flex h-screen items-center justify-center bg-emerald-950">
            <main className="relative h-screen max-h-[915px] w-full max-w-md overflow-hidden bg-emerald-600 p-2 lg:max-h-[700px]">
                <h1 className="bg-emerald-950 text-white shadow-black drop-shadow-md">
                    {translations.title}
                </h1>

                <section className="m-auto mt-10 grid max-w-md">
                    <div className="top-left border-b-2 border-r-2 border-white">
                        <div className="card">
                            <h2 className="text-3xl font-bold text-green-100">{translations.us}</h2>
                        </div>
                    </div>
                    <div className="top-right border-b-2 border-white">
                        <div className="card">
                            <h2 className="text-3xl font-bold text-green-100">
                                {translations.them}
                            </h2>
                        </div>
                    </div>
                    <div className="bottom-left border-r-2 border-white">
                        <GameStageIndicator points={currentPoints.us} />
                        <PointsVisualizer count={currentPoints.us} />
                    </div>
                    <div className="bottom-right">
                        <GameStageIndicator points={currentPoints.them} />
                        <PointsVisualizer count={currentPoints.them} />
                    </div>
                </section>
                {/* <button onClick={() => dispatch({type: 'reset', payload: ''})}>Previous</button> */}
                <section className="absolute bottom-0 left-0 flex w-full flex-wrap justify-center bg-emerald-600 p-4">
                    <div className="flex w-full justify-around pb-2">
                        <Controls
                            count={currentPoints.us}
                            increase={() => dispatch({ type: 'add', payload: 'us' })}
                            decrease={() => dispatch({ type: 'subtract', payload: 'us' })}
                        />
                        <Controls
                            count={currentPoints.them}
                            increase={() => dispatch({ type: 'add', payload: 'them' })}
                            decrease={() => dispatch({ type: 'subtract', payload: 'them' })}
                        />
                    </div>

                    <ConfirmButtonWithModal
                        callback={() => dispatch({ type: 'reset', payload: '' })}
                    >
                        {translations.reset}
                    </ConfirmButtonWithModal>
                </section>
                {/* <button onClick={() => dispatch({type: 'reset', payload: ''})}>Next</button> */}
                {(currentPoints.us >= 30 || currentPoints.them >= 30) && (
                    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-zinc-500/[.6]">
                        <section className="flex h-52 w-52 flex-col items-center justify-center bg-white text-black">
                            🏆{' '}
                            {currentPoints.us >= 30
                                ? translations.youWinMsg
                                : translations.theyWinMsg}
                            <button
                                className="mt-2 bg-red-200 text-black"
                                onClick={() => dispatch({ type: 'back', payload: '' })}
                            >
                                {translations.goBack}
                            </button>
                            <button
                                className="mt-2 bg-blue-200 text-black"
                                onClick={() => dispatch({ type: 'reset', payload: '' })}
                            >
                                {translations.playAgain}
                            </button>
                        </section>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
