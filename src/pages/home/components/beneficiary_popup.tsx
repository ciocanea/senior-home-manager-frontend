import styles from "./beneficiary_popup.module.css";
import type { Beneficiary } from "../../../classes/beneficiary";
import { DocumentRepository } from "../../../repositories/document_repository";

function BeneficiaryPopup ({
    beneficiary,
    onClose,
}: {
    beneficiary: Beneficiary,
    onClose: () => void,
}) {

    const generateDocument = (templateName: String, beneficiary: Beneficiary) => {
        DocumentRepository.generate(templateName, beneficiary).then((result) => {
            if (result.success) {
                console.log("Document generated.")
            }
            else {
                console.log("Failed to generate document.")
            }
        })
    }
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
                    <button type="button" onClick={() => generateDocument("testDocument.docx", beneficiary)}>Descarcă</button>
                </div>
            </div>
        </>
    );
}

export default BeneficiaryPopup