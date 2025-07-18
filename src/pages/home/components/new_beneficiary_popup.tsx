import { useState } from "react";
import styles from "./new_beneficiary_popup.module.css";
import { Beneficiary } from "../../../classes/beneficiary";
import { BeneficiaryRepository } from "../../../repositories/beneficiary_repository";

function NewBeneficiaryPopup ({
    onClose,
    onSubmitBeneficiary
}: {
    onClose: () => void,
    onSubmitBeneficiary: (message: string, beneficiary?: Beneficiary) => void
}) {
    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');

    const [cnp, setCnp] = useState('');
    const [serieCi, setSerieCi] = useState('');
    const [numarCi, setNumarCi] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const beneficiary = new Beneficiary(
            nume,
            prenume,
            cnp,
            serieCi,
            numarCi,
        );

        const result = await BeneficiaryRepository.add(beneficiary);

        if (result.success) {
            onSubmitBeneficiary('Beneficiar adăugat.', result.data);
            onClose();
        } 
        else {
            onSubmitBeneficiary('S-a produs o eroare. Vă rugăm să încercați mai târziu.');
        }
    }

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.popup}>
                    <h2>Detalii Beneficiar Nou</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nume:</label>
                            <input 
                             type="text"
                             value={nume}
                             onChange={(e) => {setNume(e.target.value)}}
                             required 
                            />
                        </div>
                        <div>
                            <label>Prenume:</label>
                            <input
                             type="text"
                             value={prenume}
                             onChange={(e) => {setPrenume(e.target.value)}}
                             required
                            />
                        </div>
                        <div>
                            <label>CNP:</label>
                            <input 
                             type="text"
                             value={cnp}
                             onChange={(e) => {setCnp(e.target.value.replace(/\D/g, ''))}}
                             minLength={13}
                             maxLength={13}
                             pattern="[0-9]*"
                             required
                            />
                        </div>
                        <div>
                            <label>Serie:</label>
                            <input 
                             type="text"
                             value={serieCi}
                             onChange={(e) => {setSerieCi(e.target.value.replace(/[^A-Z]/gi, '').toUpperCase())}}
                             minLength={2}
                             maxLength={2}
                             required
                            />
                        </div>
                        <div>
                            <label>Numar:</label>
                            <input 
                             type="text"
                             value={numarCi}
                             onChange={(e) => {setNumarCi(e.target.value.replace(/\D/g, ''))}}
                             minLength={6}
                             maxLength={6}
                             required
                            />
                        </div>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewBeneficiaryPopup