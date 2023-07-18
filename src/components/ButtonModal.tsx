import { ReactNode, useState } from 'react';

type MyCallback = () => void;

const ConfirmButtonWithModal = ({
    callback,
    children,
}: {
    callback: MyCallback;
    children: ReactNode;
}) => {
    const [isOpen, setIsOpen] = useState(false);
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
                        <section className="mb-2">Are you sure?</section>
                        <section>
                            <button className="bg-red-200" onClick={() => setIsOpen(false)}>
                                No
                            </button>
                            <button className="ml-2 bg-blue-200" onClick={handleConfirm}>
                                Yes
                            </button>
                        </section>
                    </section>
                </div>
            )}
        </>
    );
};

export default ConfirmButtonWithModal;
