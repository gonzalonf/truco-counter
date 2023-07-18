import { useContext } from 'react';
import LanguageContext from '../context/language';

const GameStageIndicator = ({ points }: { points: number }) => {
    const translations = useContext(LanguageContext);

    return points > 15 ? (
        <div className="bg-yellow-200 text-xl font-bold text-green-700">{translations.good15}</div>
    ) : (
        <div className="bg-yellow-200 text-xl font-bold text-red-700">{translations.bad15}</div>
    );
};
export default GameStageIndicator;
