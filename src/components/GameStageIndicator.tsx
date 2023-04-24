const GameStageIndicator = ({ points }: { points: number }) =>
    points > 15 ? (
        <div className="bg-yellow-200 text-xl font-bold text-green-700">GOOD 15</div>
    ) : (
        <div className="bg-yellow-200 text-xl font-bold text-red-700">BAD 15</div>
    );
export default GameStageIndicator;
