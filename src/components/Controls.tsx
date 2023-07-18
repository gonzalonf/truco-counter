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
            <button className="bg-red-200 font-bold" onClick={decrease}>
                -
            </button>
            <div className="flex h-8 w-8 items-center justify-center bg-white p-2">{count}</div>
            <button className="bg-green-200 font-bold" onClick={increase}>
                +
            </button>
        </div>
    );
};

export default Controls;
