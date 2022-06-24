import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import styles from './styles.module.css'

interface NextAndBackButtonProps {
    setOffset: React.Dispatch<React.SetStateAction<number>>,
    offset: number
}

export function NextAndPreviousButton({ setOffset, offset }: NextAndBackButtonProps) {
    function handleIncreaseOffset() {
        setOffset(offset + 20)
    }

    function handleDecreaseOffset() {
        setOffset(offset - 20)
    }

    if (offset == 0) {
        return (
            <button type="button" className={styles.button} onClick={handleIncreaseOffset}>
                Next
                <FiArrowRight />
            </button>
        )
    } else if (offset == 880) {
        return (
            <button type="button" className={styles.button} onClick={handleDecreaseOffset}>
                <FiArrowLeft />
                Back
            </button>
        )
    } else {
        return (
            <>
                <button type="button" className={styles.button} onClick={handleDecreaseOffset}>
                    <FiArrowLeft />
                    Previous
                </button>

                <button type="button" className={styles.button} onClick={handleIncreaseOffset}>
                    Next
                    <FiArrowRight />
                </button>
            </>
        )
    }

}