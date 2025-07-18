import { useEffect, useState } from "react";
import styles from "./home_page.module.css";
import NewBeneficiaryPopup from "./components/new_beneficiary_popup";
import BeneficiaryList from "./components/beneficiary_list";

import { Snackbar } from "@mui/material";
import { BeneficiaryRepository } from "../../repositories/beneficiary_repository";
import type { Beneficiary } from "../../classes/beneficiary";


function HomePage () {
    const [showPopup, setShowPopup] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

    const handleSubmitBeneficiary = (message: string, beneficiary?: Beneficiary) => {
        if (beneficiary) {
            setBeneficiaries(beneficiaries.concat(beneficiary))
        }

        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    useEffect(() => {
        BeneficiaryRepository.getAll().then((result) => {
            if (result.success) {
                setBeneficiaries(result.data);
            } else {
                console.log(result.error);
            }
        });
    }, []);

    return (
        <>
            <button onClick={() => setShowPopup(true)}>Beneficiar Nou</button>
            {
                showPopup && 
                <NewBeneficiaryPopup 
                 onClose={() => setShowPopup(false)}
                 onSubmitBeneficiary={handleSubmitBeneficiary}
                />
            }

            <BeneficiaryList
             beneficiaries={beneficiaries}
            >
            </BeneficiaryList>

            <Snackbar
             open={snackbarOpen}
             onClose={() => {setSnackbarOpen(false)}}
             message={snackbarMessage}
             autoHideDuration={5000}
             anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
            </Snackbar>
        </>
    );
}

export default HomePage