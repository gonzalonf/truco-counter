import styles from './Switch.module.css';

/* 
TODO: 
add testing
check correct a11y and usability (DX) for forms

*/

const Switch = ({
    switchKey,
    label,
    checked,
    onChangeHandler,
}: {
    switchKey?: string;
    label: string;
    checked: boolean;
    onChangeHandler: () => void;
}) => {
    return (
        <label className={styles.switch} role="switch" id={switchKey}>
            {label}
            <input
                className={styles.checkbox}
                type="checkbox"
                checked={checked}
                onChange={onChangeHandler}
            />
            <div className={styles.slider}></div>
        </label>
    );
};

export default Switch;
