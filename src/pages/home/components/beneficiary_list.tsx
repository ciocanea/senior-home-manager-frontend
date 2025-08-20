import styles from "../components_css/beneficiary_list.module.css";

import type { Beneficiary } from "../../../classes/beneficiary";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import BeneficiaryPopup from "./beneficiary_popup";

function BeneficiaryList ({
    beneficiaries,
    documents,
    onDeleteBeneficiary
}: {
    beneficiaries: Beneficiary[],
    documents: string[],
    onDeleteBeneficiary: (documentName: string) => void

}) {
    const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);

    return (
        <>
            {
                beneficiaries.map(b => (
                    // <div key={b.id}>
                    //     <div
                    //      className={styles.item}
                    //      onClick={() => setSelectedBeneficiary(b)}
                    //     >
                    //         <div>
                    //             Beneficiar: {(b.nume === '' && b.prenume === '') ? 'Beneficiar fără nume' : `${b.nume} ${b.prenume}`}
                    //         </div>
                    //         <div>
                    //             Aparținător: {(b.guardian.nume === '' && b.guardian.prenume === '') ? 'Aparținător fără nume' : `${b.guardian.nume} ${b.guardian.prenume}`}
                    //         </div>

                    //     </div>
            
                    //     <button onClick={() => onDeleteBeneficiary(b.id!)}>
                    //         <DeleteIcon></DeleteIcon>
                    //     </button>
                    // </div>

                    <div
                    key={b.id}
                    className={styles.item}
                    onClick={() => setSelectedBeneficiary(b)}
                    >
                        <div className={styles.names}>
                            <div>
                                Beneficiar: {(b.nume === '' && b.prenume === '')
                                ? 'Beneficiar fără nume'
                                : `${b.nume} ${b.prenume}`}
                            </div>
                            <div>
                                Aparținător: {(b.guardian.nume === '' && b.guardian.prenume === '')
                                ? 'Aparținător fără nume'
                                : `${b.guardian.nume} ${b.guardian.prenume}`}
                            </div>
                        </div>

                        <button
                        onClick={(e) => {
                            e.stopPropagation(); // prevent triggering item onClick
                            onDeleteBeneficiary(b.id!);
                        }}
                        >
                            <DeleteIcon />
                        </button>
                    </div>

                ))
            }

            <div>
                {selectedBeneficiary && 
                    <BeneficiaryPopup
                    beneficiary={selectedBeneficiary}
                    documents={documents}
                    onClose={() => setSelectedBeneficiary(null)}
                    />
                }
            </div>
            
        </>
    );
}

export default BeneficiaryList