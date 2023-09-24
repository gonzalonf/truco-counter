import { ReactNode, useContext, useState } from 'react';
import LanguageContext from '../context/language';

const ButtonModalCustom = ({
    children,
    buttonContent,
}: {
    children: ReactNode;
    buttonContent: ReactNode;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const translations = useContext(LanguageContext);

    return (
        <>
            <button className="noStyleButton" onClick={() => setIsOpen(true)}>
                {buttonContent}
            </button>
            {isOpen && (
                <div className="fixed left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center bg-zinc-500/[.6]">
                    <article className="flex h-32 w-52 flex-col items-center justify-center bg-white">
                        <section className="flex w-full justify-end">
                            <button className="noStyleButton" onClick={() => setIsOpen(false)}>
                                {translations.close}
                            </button>
                        </section>
                        <section className="flex h-32 w-52 flex-col items-center justify-center">
                            {children}
                        </section>
                    </article>
                </div>
            )}
        </>
    );
};

export default ButtonModalCustom;
