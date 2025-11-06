import { MouseEventHandler } from 'react';

const Controls = ({
    count,
    increase,
    decrease,
    ariaLabel,
}: {
    count: number;
    increase: MouseEventHandler<HTMLButtonElement>;
    decrease: MouseEventHandler<HTMLButtonElement>;
    ariaLabel?: string;
}) => {
    return (
        <div className="flex items-center relative" aria-label={ariaLabel}>
            <button
                aria-label="Decrement points"
                className="bg-red-200 font-bold absolute w-8 h-10 flex items-center justify-center"
                style={{ right: '3.25rem' }}
                onClick={decrease}
            >
                <span className="select-none text-black text-xl">-</span>
            </button>
            <div
                aria-label="Displayed points"
                className="flex relative h-16 w-16 rounded-full text-xl font-bold select-none items-center justify-center bg-white p-2 text-black z-10 shadow-lg"
            >
                {count}
            </div>
            <button
                aria-label="Increment points"
                className="bg-green-200 font-bold absolute w-8 h-10 flex items-center justify-center"
                style={{ left: '3.25rem' }}
                onClick={increase}
            >
                <span className="select-none text-black text-xl">+</span>
            </button>
        </div >
    );
};

export default Controls;
