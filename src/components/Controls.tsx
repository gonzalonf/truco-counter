const Controls = ({
    count,
    increase,
    decrease,
}: {
    count: number;
    increase: Function;
    decrease: Function;
}) => {
    return (
        <div>
            <button className="bg-red-200 font-bold" onClick={decrease}>
                -
            </button>
            <span className="bg-white p-2">{count}</span>
            <button className="bg-green-200 font-bold" onClick={increase}>
                +
            </button>
        </div>
    );
};

export default Controls;
