import { ReactNode, useContext, useState } from 'react';
import LanguageContext from '../context/language';

type MyCallback = () => void;

const ConfirmButtonWithModal = ({
    callback,
    children,
}: {
    callback: MyCallback;
    children: ReactNode;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const translations = useContext(LanguageContext);
    const handleConfirm = () => {
        setIsOpen(false);
        callback();
    };
    return (
        <>
            <button onClick={() => setIsOpen(true)}>{children}</button>
            {isOpen && (
                <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-zinc-500/[.6]">
                    <section className="flex h-32 w-52 flex-col items-center justify-center bg-white">
                        <section className="mb-2 select-none text-black">
                            {translations.resetPrompt}
                        </section>
                        <section>
                            <button
                                className="select-none bg-red-200 text-black"
                                onClick={() => setIsOpen(false)}
                            >
                                {translations.no}
                            </button>
                            <button
                                className="ml-2 select-none bg-blue-200 text-black"
                                onClick={handleConfirm}
                            >
                                {translations.yes}
                            </button>
                        </section>
                    </section>
                </div>
            )}
        </>
    );
};

export default ConfirmButtonWithModal;
