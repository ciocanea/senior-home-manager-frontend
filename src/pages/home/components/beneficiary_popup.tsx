import styles from "../components_css/beneficiary_popup.module.css";
import type { Beneficiary } from "../../../classes/beneficiary";
import { DocumentRepository } from "../../../repositories/document_repository";
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';


function BeneficiaryPopup ({
    beneficiary,
    documents,
    onClose,
}: {
    beneficiary: Beneficiary,
    documents: string[],
    onClose: () => void,
}) {

    const generateDocument = (documentName: string, beneficiary: Beneficiary) => {
        DocumentRepository.generate(documentName, beneficiary).then((result) => {
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
            <div className={styles.overlay} >
                <div className={styles.popup}>
                    <h2>Detalii Beneficiar</h2>
                    <div className={styles.info}>
                        <div className={styles.info_item}>
                            <h3>Beneficiar</h3>
                            <div>
                                <label>
                                    Nume:
                                </label>
                                <div>{beneficiary.nume}</div>
                            </div>
                            <div>
                                <label>
                                    Prenume:
                                </label>
                                <div>{beneficiary.prenume}</div>
                            </div>
                            <div>
                                <label>
                                    Data Nașterii:
                                </label>
                                <div>{beneficiary.dataNasterii}</div>
                            </div>
                            <div>
                                <label>
                                    CNP:
                                </label>
                                <div>{beneficiary.cnp}</div>
                            </div>
                            <div>
                                <label>
                                    Serie:
                                </label>
                                <div>{beneficiary.serieCi}</div>
                            </div>
                            <div>
                                <label>
                                    Număr:
                                </label>
                                <div>{beneficiary.numarCi}</div>
                            </div>
                            <div>
                                <label>
                                    Dată eliberare:
                                </label>
                                <div>{beneficiary.dataEliberareCi}</div>
                            </div>
                            <div>
                                <label>
                                    Secție:
                                </label>
                                <div>{beneficiary.sectie}</div>
                            </div>
                            <div>
                                <label>
                                    Oraș:
                                </label>
                                <div>{beneficiary.oras}</div>
                            </div>
                            <div>
                                <label>
                                    Județ/Sector:
                                </label>
                                <div>{beneficiary.judet}</div>
                            </div>
                            <div>
                                <label>
                                    Stradă:
                                </label>
                                <div>{beneficiary.strada}</div>
                            </div>
                            <div>
                                <label>
                                    Număr:
                                </label>
                                <div>{beneficiary.numarAdresa}</div>
                            </div>
                            <div>
                                <label>
                                    Bloc:
                                </label>
                                <div>{beneficiary.bloc}</div>
                            </div>
                            <div>
                                <label>
                                    Scară:
                                </label>
                                <div>{beneficiary.scara}</div>
                            </div>
                            <div>
                                <label>
                                    Etaj:
                                </label>
                                <div>{beneficiary.etaj}</div>
                            </div>
                            <div>
                                <label>
                                    Apartament:
                                </label>
                                <div>{beneficiary.apartament}</div>
                            </div>
                        </div>

                        <div className={styles.info_item}>
                            <h3>Aparținător</h3>
                            <div>
                                <label>
                                    Nume:
                                </label>
                                <div>{beneficiary.guardian.nume}</div>
                            </div>
                            <div>
                                <label>
                                    Prenume:
                                </label>
                                <div>{beneficiary.guardian.prenume}</div>
                            </div>
                            <div>
                                <label>
                                    Data Nașterii:
                                </label>
                                <div>{beneficiary.guardian.dataNasterii}</div>
                            </div>
                            <div>
                                <label>
                                    CNP:
                                </label>
                                <div>{beneficiary.guardian.cnp}</div>
                            </div>
                            <div>
                                <label>
                                    Serie:
                                </label>
                                <div>{beneficiary.guardian.serieCi}</div>
                            </div>
                            <div>
                                <label>
                                    Număr:
                                </label>
                                <div>{beneficiary.guardian.numarCi}</div>
                            </div>
                            <div>
                                <label>
                                    Dată eliberare:
                                </label>
                                <div>{beneficiary.guardian.dataEliberareCi}</div>
                            </div>
                            <div>
                                <label>
                                    Secție:
                                </label>
                                <div>{beneficiary.guardian.sectie}</div>
                            </div>
                            <div>
                                <label>
                                    Oraș:
                                </label>
                                <div>{beneficiary.guardian.oras}</div>
                            </div>
                            <div>
                                <label>
                                    Județ/Sector:
                                </label>
                                <div>{beneficiary.guardian.judet}</div>
                            </div>
                            <div>
                                <label>
                                    Stradă:
                                </label>
                                <div>{beneficiary.guardian.strada}</div>
                            </div>
                            <div>
                                <label>
                                    Număr:
                                </label>
                                <div>{beneficiary.guardian.numarAdresa}</div>
                            </div>
                            <div>
                                <label>
                                    Bloc:
                                </label>
                                <div>{beneficiary.guardian.bloc}</div>
                            </div>
                            <div>
                                <label>
                                    Scară:
                                </label>
                                <div>{beneficiary.guardian.scara}</div>
                            </div>
                            <div>
                                <label>
                                    Etaj:
                                </label>
                                <div>{beneficiary.guardian.etaj}</div>
                            </div>
                            <div>
                                <label>
                                    Apartament:
                                </label>
                                <div>{beneficiary.guardian.apartament}</div>
                            </div>
                        </div>

                    </div>

                    <div className={styles.documents}>

                        {
                            documents.map((document, index) => (
                                <div key={index} className={styles.documents_item}>
                                    <div>
                                        {document.split('.')[0]}_{beneficiary.nume.toLocaleUpperCase()}_{beneficiary.prenume.split(' ')[0].toLocaleUpperCase()}.docx
                                    </div>
                                    
                                    <button onClick={() => generateDocument(document, beneficiary)}>
                                        <DownloadIcon></DownloadIcon>
                                    </button>
                                    <button>
                                        <VisibilityIcon></VisibilityIcon>
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                    
                    <div className={styles.buttons}>
                        <button type="button" onClick={onClose}>Înapoi</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BeneficiaryPopup