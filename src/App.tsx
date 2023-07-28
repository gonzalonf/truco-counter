import { useContext } from 'react';
import './App.css';

import ConfirmButtonWithModal from './components/ButtonModal';
import Controls from './components/Controls';
import PointsVisualizer from './components/PointsVisualizer';
import GameStageIndicator from './components/GameStageIndicator';

import LanguageContext from './context/language';
import useCachedReducer from './hooks/useCachedReducer';
import reducer, { CounterState, initData } from './app-reducer';

function App() {
    const [pointsList, dispatch] = useCachedReducer<CounterState[]>(reducer, initData, 'points');
    const translations = useContext(LanguageContext);
    const currentPoints = pointsList[pointsList.length - 1];

    return (
        <div className="flex h-screen items-center justify-center bg-emerald-950">
            <main className="relative h-screen max-h-[915px] w-full max-w-md overflow-hidden bg-emerald-600 p-2 lg:max-h-[700px]">
                <h1 className="select-none bg-emerald-950 -tracking-widest text-white shadow-black drop-shadow-md">
                    {translations.title}
                </h1>
                {/* <section className="flex">
                    <div className="select-none">lang: EN</div>
                    <div className="select-none">Game: 15</div>
                    <div className="select-none">🔈🔇</div>
                    <div className="h-1 w-1 cursor-pointer select-none">⚙️</div>
                </section> */}
                <section className="m-auto mt-10 grid max-w-md">
                    <div className="top-left border-b-2 border-r-2 border-white">
                        <div className="card">
                            <h2 className="select-none text-3xl font-bold text-green-100">
                                {translations.us} {/* ✎ ✖ */}
                            </h2>
                        </div>
                    </div>
                    <div className="top-right border-b-2 border-white">
                        <div className="card">
                            <h2 className="select-none text-3xl font-bold text-green-100">
                                {translations.them} {/* ✎ ✖ */}
                            </h2>
                        </div>
                    </div>
                    <div className="bottom-left border-r-2 border-white">
                        <GameStageIndicator points={currentPoints.us} />
                        <span
                            className="cursor-pointer"
                            onClick={() => dispatch({ type: 'add', payload: 'us' })}
                        >
                            <PointsVisualizer count={currentPoints.us} />
                        </span>
                    </div>
                    <div className="bottom-right">
                        <GameStageIndicator points={currentPoints.them} />
                        <span
                            className="cursor-pointer"
                            onClick={() => dispatch({ type: 'add', payload: 'them' })}
                        >
                            <PointsVisualizer count={currentPoints.them} />
                        </span>
                    </div>
                </section>
                {/* <button onClick={() => dispatch({type: 'reset', payload: ''})}>Previous</button> */}
                <section className="absolute bottom-0 left-0 flex w-full flex-wrap justify-center bg-emerald-600 p-4">
                    <div className="flex w-full justify-around pb-2">
                        <Controls
                            aria-label="Our points controller"
                            count={currentPoints.us}
                            increase={() => dispatch({ type: 'add', payload: 'us' })}
                            decrease={() => dispatch({ type: 'subtract', payload: 'us' })}
                        />
                        <Controls
                            aria-label="Their points controller"
                            count={currentPoints.them}
                            increase={() => dispatch({ type: 'add', payload: 'them' })}
                            decrease={() => dispatch({ type: 'subtract', payload: 'them' })}
                        />
                    </div>

                    <ConfirmButtonWithModal
                        callback={() => dispatch({ type: 'reset', payload: '' })}
                    >
                        <span className="select-none">{translations.reset}</span>
                    </ConfirmButtonWithModal>
                </section>
                {/* <button onClick={() => dispatch({type: 'reset', payload: ''})}>Next</button> */}
                {(currentPoints.us >= 30 || currentPoints.them >= 30) && (
                    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-zinc-500/[.6]">
                        <section className="flex h-52 w-52 select-none flex-col items-center justify-center bg-white text-black">
                            🏆{' '}
                            {currentPoints.us >= 30
                                ? translations.youWinMsg
                                : translations.theyWinMsg}
                            <button
                                className="mt-2 select-none bg-red-200 text-black"
                                onClick={() => dispatch({ type: 'back', payload: '' })}
                            >
                                {translations.goBack}
                            </button>
                            <button
                                className="mt-2 select-none bg-blue-200 text-black"
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
