import { useReducer } from "react";
import styles from "./new_beneficiary_popup.module.css";
import { Beneficiary } from "../../../classes/beneficiary";
import { BeneficiaryRepository } from "../../../repositories/beneficiary_repository";
import { Guardian } from "../../../classes/guardian";
import newBeneficiaryReducer from "../../../reducers/new_beneficiary_reducer";

const initialState = {
    beneficiary: {
        nume: '',
        prenume: '',
        dataNasterii: '',
        cnp: '',
        serieCi: '',
        numarCi: '',
        oras: '',
        judet: '',
        strada: '',
        numarAdresa: '',
        bloc: '',
        scara: '',
        etaj: '',
        apartament: '',
        dataEliberareCi: '',
        sectie: '',
    },
    guardian: {
        nume: '',
        prenume: '',
        dataNasterii: '',
        cnp: '',
        serieCi: '',
        numarCi: '',
        oras: '',
        judet: '',
        strada: '',
        numarAdresa: '',
        bloc: '',
        scara: '',
        etaj: '',
        apartament: '',
        dataEliberareCi: '',
        sectie: '',
    }
};

function NewBeneficiaryPopup ({
    onClose,
    onSubmitBeneficiary
}: {
    onClose: () => void,
    onSubmitBeneficiary: (beneficiary?: Beneficiary) => void
}) {
    const [state, dispatch] = useReducer(newBeneficiaryReducer, initialState);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const guardian = new Guardian(
            undefined,
            state.guardian.nume,
            state.guardian.prenume,
            state.guardian.dataNasterii,
            state.guardian.cnp,
            state.guardian.serieCi,
            state.guardian.numarCi,
            state.guardian.oras,
            state.guardian.judet,
            state.guardian.strada,
            state.guardian.numarAdresa,
            state.guardian.bloc,
            state.guardian.scara,
            state.guardian.etaj,
            state.guardian.apartament,
            state.guardian.dataEliberareCi,
            state.guardian.sectie
          );
          
          const beneficiary = new Beneficiary(
            undefined,
            state.beneficiary.nume,
            state.beneficiary.prenume,
            state.beneficiary.dataNasterii,
            state.beneficiary.cnp,
            state.beneficiary.serieCi,
            state.beneficiary.numarCi,
            state.beneficiary.oras,
            state.beneficiary.judet,
            state.beneficiary.strada,
            state.beneficiary.numarAdresa,
            state.beneficiary.bloc,
            state.beneficiary.scara,
            state.beneficiary.etaj,
            state.beneficiary.apartament,
            state.beneficiary.dataEliberareCi,
            state.beneficiary.sectie,
            guardian
          );
          

        const result = await BeneficiaryRepository.add(beneficiary);

        if (result.success) {
            onSubmitBeneficiary(result.data);
            onClose();
        } 
    }

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.popup}>
                    <h2>Detalii Beneficiar Nou</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.info}>
                            <div className={styles.form_section}>
                                <h3>Beneficiar</h3>
                                <div>
                                    <label>Nume</label>
                                    <input 
                                    type="text"
                                    value={state.beneficiary.nume}
                                    onChange={(e) => {dispatch({ type: 'SET_BENEFICIARY_FIELD', field: 'nume', value: e.target.value })}} 
                                    placeholder="e.g. Popescu"
                                    />
                                </div>
                                <div>
                                    <label>Prenume</label>
                                    <input
                                    type="text"
                                    value={state.beneficiary.prenume}
                                    onChange={(e) => {dispatch({ type: 'SET_BENEFICIARY_FIELD', field: 'prenume', value: e.target.value })}}
                                    placeholder="e.g. Maria"
                                    />
                                </div>
                                <div>
                                    <label>CNP</label>
                                    <input 
                                    type="text"
                                    value={state.beneficiary.cnp}
                                    onChange={(e) => {dispatch({ type: 'SET_BENEFICIARY_FIELD', field: 'cnp', value: e.target.value.replace(/\D/g, '') })}}
                                    minLength={13}
                                    maxLength={13}
                                    pattern="[0-9]*"
                                    placeholder="e.g. 2401229928347"
                                    />
                                </div>
                                <div>
                                    <label>Serie</label>
                                    <input 
                                    type="text"
                                    value={state.beneficiary.serieCi}
                                    onChange={(e) => {dispatch({ type: 'SET_BENEFICIARY_FIELD', field: 'serieCi', value: e.target.value.replace(/[^A-Z]/gi, '').toUpperCase() })}}
                                    minLength={2}
                                    maxLength={2}
                                    placeholder="e.g. RK"
                                    />
                                </div>
                                <div>
                                    <label>Număr</label>
                                    <input 
                                    type="text"
                                    value={state.beneficiary.numarCi}
                                    onChange={(e) => {dispatch({ type: 'SET_BENEFICIARY_FIELD', field: 'numarCi', value: e.target.value.replace(/\D/g, '') })}}
                                    minLength={6}
                                    maxLength={6}
                                    placeholder="e.g. 939120"
                                    />
                                </div>
                                <div>
                                    <label>Dată Eliberare</label>
                                    <input 
                                    type="date"
                                    value={state.beneficiary.dataEliberareCi}
                                    onChange={(e) => {dispatch({ type: 'SET_BENEFICIARY_FIELD', field: 'dataEliberareCi', value: e.target.value })}}
                                    />
                                </div>
                                <div>
                                    <label>Secție</label>
                                    <input 
                                    type="text"
                                    value={state.beneficiary.sectie}
                                    onChange={(e) => {dispatch({ type: 'SET_BENEFICIARY_FIELD', field: 'sectie', value: e.target.value })}}
                                    placeholder="e.g. S.P.C.E.P Sector 1"
                                    />
                                </div>
                                <div>
                                    <label>Oraș</label>
                                    <input 
                                    type="text"
                                    value={state.beneficiary.oras}
                                    onChange={(e) => {dispatch({ type: 'SET_BENEFICIARY_FIELD', field: 'oras', value: e.target.value })}}
                                    placeholder="e.g. București"
                                    />
                                </div>
                                <div>
                                    <label>Județ/Sector</label>
                                    <input 
                                    type="text"
                                    value={state.beneficiary.judet}
                                    onChange={(e) => {dispatch({ type: 'SET_BENEFICIARY_FIELD', field: 'judet', value: e.target.value })}}
                                    placeholder="e.g. Sector 3"
                                    />
                                </div>
                                <div>
                                    <label>Stradă</label>
                                    <input 
                                    type="text"
                                    value={state.beneficiary.strada}
                                    onChange={(e) => {dispatch({ type: 'SET_BENEFICIARY_FIELD', field: 'strada', value: e.target.value })}}
                                    placeholder="e.g. Gării"
                                    />
                                </div>
                                <div>
                                    <label>Număr</label>
                                    <input 
                                    type="text"
                                    value={state.beneficiary.numarAdresa}
                                    onChange={(e) => {dispatch({ type: 'SET_BENEFICIARY_FIELD', field: 'numarAdresa', value: e.target.value })}}
                                    placeholder="e.g. 39"
                                    />
                                </div>
                                <div>
                                    <label>Data Nașterii</label>
                                    <input 
                                    type="date"
                                    value={state.beneficiary.dataNasterii}
                                    onChange={(e) => {dispatch({ type: 'SET_BENEFICIARY_FIELD', field: 'dataNasterii', value: e.target.value })}}
                                    />
                                </div>
                                <div>
                                    <label>Bloc</label>
                                    <input 
                                    type="text"
                                    value={state.beneficiary.bloc}
                                    onChange={(e) => {dispatch({ type: 'SET_BENEFICIARY_FIELD', field: 'bloc', value: e.target.value })}}
                                    placeholder="e.g. 1"
                                    />
                                </div>
                                <div>
                                    <label>Scară</label>
                                    <input 
                                    type="text"
                                    value={state.beneficiary.scara}
                                    onChange={(e) => {dispatch({ type: 'SET_BENEFICIARY_FIELD', field: 'scara', value: e.target.value })}}
                                    placeholder="e.g. 2"
                                    />
                                </div>
                                <div>
                                    <label>Etaj</label>
                                    <input 
                                    type="number"
                                    value={state.beneficiary.etaj}
                                    onChange={(e) => {dispatch({ type: 'SET_BENEFICIARY_FIELD', field: 'etaj', value: e.target.value })}}
                                    min={1}
                                    placeholder="e.g. 3"
                                    />
                                </div>
                                <div>
                                    <label>Apartament</label>
                                    <input 
                                    type="text"
                                    value={state.beneficiary.apartament}
                                    onChange={(e) => {dispatch({ type: 'SET_BENEFICIARY_FIELD', field: 'apartament', value: e.target.value })}}
                                    placeholder="e.g. 4"
                                    />
                                </div>
                            </div>

                            <div className={styles.form_section}>
                                <h3>Beneficiar</h3>
                                <div>
                                    <label>Nume</label>
                                    <input 
                                    type="text"
                                    value={state.guardian.nume}
                                    onChange={(e) => {dispatch({ type: 'SET_GUARDIAN_FIELD', field: 'nume', value: e.target.value })}} 
                                    placeholder="e.g. Popescu"
                                    />
                                </div>
                                <div>
                                    <label>Prenume</label>
                                    <input
                                    type="text"
                                    value={state.guardian.prenume}
                                    onChange={(e) => {dispatch({ type: 'SET_GUARDIAN_FIELD', field: 'prenume', value: e.target.value })}}
                                    placeholder="e.g. Maria"
                                    />
                                </div>
                                <div>
                                    <label>CNP</label>
                                    <input 
                                    type="text"
                                    value={state.guardian.cnp}
                                    onChange={(e) => {dispatch({ type: 'SET_GUARDIAN_FIELD', field: 'cnp', value: e.target.value.replace(/\D/g, '') })}}
                                    minLength={13}
                                    maxLength={13}
                                    pattern="[0-9]*"
                                    placeholder="e.g. 2401229928347"
                                    />
                                </div>
                                <div>
                                    <label>Serie</label>
                                    <input 
                                    type="text"
                                    value={state.guardian.serieCi}
                                    onChange={(e) => {dispatch({ type: 'SET_GUARDIAN_FIELD', field: 'serieCi', value: e.target.value.replace(/[^A-Z]/gi, '').toUpperCase() })}}
                                    minLength={2}
                                    maxLength={2}
                                    placeholder="e.g. RK"
                                    />
                                </div>
                                <div>
                                    <label>Număr</label>
                                    <input 
                                    type="text"
                                    value={state.guardian.numarCi}
                                    onChange={(e) => {dispatch({ type: 'SET_GUARDIAN_FIELD', field: 'numarCi', value: e.target.value.replace(/\D/g, '') })}}
                                    minLength={6}
                                    maxLength={6}
                                    placeholder="e.g. 939120"
                                    />
                                </div>
                                <div>
                                    <label>Dată Eliberare</label>
                                    <input 
                                    type="date"
                                    value={state.guardian.dataEliberareCi}
                                    onChange={(e) => {dispatch({ type: 'SET_GUARDIAN_FIELD', field: 'dataEliberareCi', value: e.target.value })}}
                                    />
                                </div>
                                <div>
                                    <label>Secție</label>
                                    <input 
                                    type="text"
                                    value={state.guardian.sectie}
                                    onChange={(e) => {dispatch({ type: 'SET_GUARDIAN_FIELD', field: 'sectie', value: e.target.value })}}
                                    placeholder="e.g. S.P.C.E.P Sector 1"
                                    />
                                </div>
                                <div>
                                    <label>Oraș</label>
                                    <input 
                                    type="text"
                                    value={state.guardian.oras}
                                    onChange={(e) => {dispatch({ type: 'SET_GUARDIAN_FIELD', field: 'oras', value: e.target.value })}}
                                    placeholder="e.g. București"
                                    />
                                </div>
                                <div>
                                    <label>Județ/Sector</label>
                                    <input 
                                    type="text"
                                    value={state.guardian.judet}
                                    onChange={(e) => {dispatch({ type: 'SET_GUARDIAN_FIELD', field: 'judet', value: e.target.value })}}
                                    placeholder="e.g. Sector 3"
                                    />
                                </div>
                                <div>
                                    <label>Stradă</label>
                                    <input 
                                    type="text"
                                    value={state.guardian.strada}
                                    onChange={(e) => {dispatch({ type: 'SET_GUARDIAN_FIELD', field: 'strada', value: e.target.value })}}
                                    placeholder="e.g. Gării"
                                    />
                                </div>
                                <div>
                                    <label>Număr</label>
                                    <input 
                                    type="text"
                                    value={state.guardian.numarAdresa}
                                    onChange={(e) => {dispatch({ type: 'SET_GUARDIAN_FIELD', field: 'numarAdresa', value: e.target.value })}}
                                    placeholder="e.g. 39"
                                    />
                                </div>
                                <div>
                                    <label>Data Nașterii</label>
                                    <input 
                                    type="date"
                                    value={state.guardian.dataNasterii}
                                    onChange={(e) => {dispatch({ type: 'SET_GUARDIAN_FIELD', field: 'dataNasterii', value: e.target.value })}}
                                    />
                                </div>
                                <div>
                                    <label>Bloc</label>
                                    <input 
                                    type="text"
                                    value={state.guardian.bloc}
                                    onChange={(e) => {dispatch({ type: 'SET_GUARDIAN_FIELD', field: 'bloc', value: e.target.value })}}
                                    placeholder="e.g. 1"
                                    />
                                </div>
                                <div>
                                    <label>Scară</label>
                                    <input 
                                    type="text"
                                    value={state.guardian.scara}
                                    onChange={(e) => {dispatch({ type: 'SET_GUARDIAN_FIELD', field: 'scara', value: e.target.value })}}
                                    placeholder="e.g. 2"
                                    />
                                </div>
                                <div>
                                    <label>Etaj</label>
                                    <input 
                                    type="number"
                                    value={state.guardian.etaj}
                                    onChange={(e) => {dispatch({ type: 'SET_GUARDIAN_FIELD', field: 'etaj', value: e.target.value })}}
                                    min={1}
                                    placeholder="e.g. 3"
                                    />
                                </div>
                                <div>
                                    <label>Apartament</label>
                                    <input 
                                    type="text"
                                    value={state.guardian.apartament}
                                    onChange={(e) => {dispatch({ type: 'SET_GUARDIAN_FIELD', field: 'apartament', value: e.target.value })}}
                                    placeholder="e.g. 4"
                                    />
                                </div>
                            </div>
                        </div>    
                        <div className={styles.buttons}>
                            <button type="button" onClick={onClose}>Înapoi</button>
                            <button type="submit">Adaugă</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewBeneficiaryPopup