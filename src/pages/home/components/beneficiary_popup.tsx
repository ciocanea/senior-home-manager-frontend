import styles from "./beneficiary_popup.module.css";
import type { Beneficiary } from "../../../classes/beneficiary";

function BeneficiaryPopup ({
    beneficiary,
    onClose,
}: {
    beneficiary: Beneficiary,
    onClose: () => void,
}) {
    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.popup}>
                    <h2>Detalii Beneficiar</h2>
                    <p>{beneficiary.nume}</p>
                    <p>{beneficiary.prenume}</p>
                    <p>{beneficiary.cnp}</p>
                    <p>{beneficiary.serieCi}</p>
                    <p>{beneficiary.numarCi}</p>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </>
    );
}

export default BeneficiaryPopup