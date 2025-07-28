import styles from "./beneficiary_list.module.css";

import type { Beneficiary } from "../../../classes/beneficiary";
import { useState } from "react";
import BeneficiaryPopup from "./beneficiary_popup";

function BeneficiaryList ({
    beneficiaries,
}: {
    beneficiaries: Beneficiary[]
}) {
    const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);

    return (
        <>
            {
                beneficiaries.map(b => (
                    <div key={b.id}>
                        <div
                         className={styles.item}
                         onClick={() => setSelectedBeneficiary(b)}
                        >
                            <div>
                                Beneficiar: {(b.nume === '' && b.prenume === '') ? 'Beneficiar fără nume' : `${b.nume} ${b.prenume}`}
                            </div>
                            <div>
                                Aparținător: {(b.guardian.nume === '' && b.guardian.prenume === '') ? 'Aparținător fără nume' : `${b.guardian.nume} ${b.guardian.prenume}`}
                            </div>
                        </div>
            
                        {selectedBeneficiary && 
                            <BeneficiaryPopup
                             beneficiary={selectedBeneficiary}
                             onClose={() => setSelectedBeneficiary(null)}
                            />
                        }
                    </div>
                ))
            }

            
        </>
    );
}

export default BeneficiaryList