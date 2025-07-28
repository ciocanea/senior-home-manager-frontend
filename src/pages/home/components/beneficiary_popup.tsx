import styles from "./beneficiary_popup.module.css";
import type { Beneficiary } from "../../../classes/beneficiary";
import { DocumentRepository } from "../../../repositories/document_repository";
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';


function BeneficiaryPopup ({
    beneficiary,
    onClose,
}: {
    beneficiary: Beneficiary,
    onClose: () => void,
}) {

    const generateDocument = (templateName: string, beneficiary: Beneficiary) => {
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
                        </div>

                    </div>

                    <div className={styles.documents}>
                        <div className={styles.documents_item}>
                            <div>
                                contract_{beneficiary.nume.toLocaleUpperCase()}_{beneficiary.prenume.split(' ')[0].toLocaleUpperCase()}.docx
                            </div>
                            
                            <button onClick={() => generateDocument("contract.docx", beneficiary)}>
                                <DownloadIcon></DownloadIcon>
                            </button>
                            <button>
                                <VisibilityIcon></VisibilityIcon>
                            </button>
                        </div>

                        <div className={styles.documents_item}>
                            <div>
                                decizie_admitere_{beneficiary.nume.toLocaleUpperCase()}_{beneficiary.prenume.split(' ')[0].toLocaleUpperCase()}.docx
                            </div>

                            <button onClick={() => generateDocument("decizie_admitere.docx", beneficiary)}>
                                <DownloadIcon></DownloadIcon>
                            </button>
                            <button>
                                <VisibilityIcon></VisibilityIcon>
                            </button>
                        </div>

                        <div className={styles.documents_item}>
                            <div>
                                act_aditional_contract_{beneficiary.nume.toLocaleUpperCase()}_{beneficiary.prenume.split(' ')[0].toLocaleUpperCase()}.docx
                            </div>

                            <button onClick={() => generateDocument("act_aditional_contract.docx", beneficiary)}>
                                <DownloadIcon></DownloadIcon>
                            </button>
                            <button>
                                <VisibilityIcon></VisibilityIcon>
                            </button>
                        </div>

                        <div className={styles.documents_item}>
                            <div>
                                angajament_de_plata_{beneficiary.nume.toLocaleUpperCase()}_{beneficiary.prenume.split(' ')[0].toLocaleUpperCase()}.docx
                            </div>

                            <button onClick={() => generateDocument("angajament_de_plata.docx", beneficiary)}>
                                <DownloadIcon></DownloadIcon>
                            </button>
                            <button>
                                <VisibilityIcon></VisibilityIcon>
                            </button>
                        </div>

                        <div className={styles.documents_item}>
                            <div>
                                cerere_admitere_{beneficiary.nume.toLocaleUpperCase()}_{beneficiary.prenume.split(' ')[0].toLocaleUpperCase()}.docx
                            </div>

                            <button onClick={() => generateDocument("cerere_admitere.docx", beneficiary)}>
                                <DownloadIcon></DownloadIcon>
                            </button>
                            <button>
                                <VisibilityIcon></VisibilityIcon>
                            </button>
                        </div>

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