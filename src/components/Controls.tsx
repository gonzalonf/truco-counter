import { MouseEventHandler } from 'react';

const Controls = ({
    count,
    increase,
    decrease,
}: {
    count: number;
    increase: MouseEventHandler<HTMLButtonElement>;
    decrease: MouseEventHandler<HTMLButtonElement>;
}) => {
    return (
        <div className="flex items-center">
            <button
                aria-label="Decrement points"
                className="bg-red-200 font-bold"
                onClick={decrease}
            >
                <span className="select-none text-black">-</span>
            </button>
            <div
                aria-label="Displayed points"
                className="flex h-8 w-8 select-none items-center justify-center bg-white p-2 text-black"
            >
                {count}
            </div>
            <button
                aria-label="Increment points"
                className="bg-green-200 font-bold"
                onClick={increase}
            >
                <span className="select-none text-black">+</span>
            </button>
        </div>
    );
};

export default Controls;
