import { useState } from "react";
import styles from "./new_beneficiary_popup.module.css";
import { Beneficiary } from "../../../classes/beneficiary";
import { BeneficiaryRepository } from "../../../repositories/beneficiary_repository";
import { Guardian } from "../../../classes/guardian";

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

    const [oras, setOras] = useState('');
    const [judet, setJudet] = useState('');

    const [strada, setStrada] = useState('');
    const [numarAdresa, setNumarAdresa] = useState('');

    const [dataEliberareCi, setDataEliberareCi] = useState('');
    const [sectie, setSectie] = useState('');


    const [numeGuardian, setNumeGuardian] = useState('');
    const [prenumeGuardian, setPrenumeGuardian] = useState('');

    const [cnpGuardian, setCnpGuardian] = useState('');
    const [serieCiGuardian, setSerieCiGuardian] = useState('');
    const [numarCiGuardian, setNumarCiGuardian] = useState('');

    const [orasGuardian, setOrasGuardian] = useState('');
    const [judetGuardian, setJudetGuardian] = useState('');

    const [stradaGuardian, setStradaGuardian] = useState('');
    const [numarAdresaGuardian, setNumarAdresaGuardian] = useState('');

    const [dataEliberareCiGuardian, setDataEliberareCiGuardian] = useState('');
    const [sectieGuardian, setSectieGuardian] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const guardian = new Guardian(
            undefined,
            numeGuardian,
            prenumeGuardian,
            cnpGuardian,
            serieCiGuardian,
            numarCiGuardian,
            orasGuardian,
            judetGuardian,
            stradaGuardian,
            numarAdresaGuardian,
            dataEliberareCiGuardian,
            sectieGuardian
        );

        const beneficiary = new Beneficiary(
            undefined,
            nume,
            prenume,
            cnp,
            serieCi,
            numarCi,
            oras,
            judet,
            strada,
            numarAdresa,
            dataEliberareCi,
            sectie,
            guardian,
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
                        <div className={styles.info}>
                            <div className={styles.form_section}>
                                <h3>Beneficiar</h3>
                                <div>
                                    <label>Nume</label>
                                    <input 
                                    type="text"
                                    value={nume}
                                    onChange={(e) => {setNume(e.target.value)}} 
                                    placeholder="e.g. Popescu"
                                    />
                                </div>
                                <div>
                                    <label>Prenume</label>
                                    <input
                                    type="text"
                                    value={prenume}
                                    onChange={(e) => {setPrenume(e.target.value)}}
                                    placeholder="e.g. Maria"
                                    />
                                </div>
                                <div>
                                    <label>CNP</label>
                                    <input 
                                    type="text"
                                    value={cnp}
                                    onChange={(e) => {setCnp(e.target.value.replace(/\D/g, ''))}}
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
                                    value={serieCi}
                                    onChange={(e) => {setSerieCi(e.target.value.replace(/[^A-Z]/gi, '').toUpperCase())}}
                                    minLength={2}
                                    maxLength={2}
                                    placeholder="e.g. RK"
                                    />
                                </div>
                                <div>
                                    <label>Număr</label>
                                    <input 
                                    type="text"
                                    value={numarCi}
                                    onChange={(e) => {setNumarCi(e.target.value.replace(/\D/g, ''))}}
                                    minLength={6}
                                    maxLength={6}
                                    placeholder="e.g. 939120"
                                    />
                                </div>
                                <div>
                                    <label>Dată Eliberare</label>
                                    <input 
                                    type="date"
                                    value={dataEliberareCi}
                                    onChange={(e) => {setDataEliberareCi(e.target.value)}}
                                    />
                                </div>
                                <div>
                                    <label>Secție</label>
                                    <input 
                                    type="text"
                                    value={sectie}
                                    onChange={(e) => {setSectie(e.target.value)}}
                                    placeholder="e.g. S.P.C.E.P Sector 1"
                                    />
                                </div>
                                <div>
                                    <label>Oraș</label>
                                    <input 
                                    type="text"
                                    value={oras}
                                    onChange={(e) => {setOras(e.target.value)}}
                                    placeholder="e.g. București"
                                    />
                                </div>
                                <div>
                                    <label>Județ/Sector</label>
                                    <input 
                                    type="text"
                                    value={judet}
                                    onChange={(e) => {setJudet(e.target.value)}}
                                    placeholder="e.g. Sector 3"
                                    />
                                </div>
                                <div>
                                    <label>Stradă</label>
                                    <input 
                                    type="text"
                                    value={strada}
                                    onChange={(e) => {setStrada(e.target.value)}}
                                    placeholder="e.g. Gării"
                                    />
                                </div>
                                <div>
                                    <label>Număr</label>
                                    <input 
                                    type="text"
                                    value={numarAdresa}
                                    onChange={(e) => {setNumarAdresa(e.target.value)}}
                                    placeholder="e.g. 39"
                                    />
                                </div>
                            </div>

                            <div className={styles.form_section}>
                                <h3>Aparținător</h3>
                                <div>
                                    <label>Nume</label>
                                    <input 
                                    type="text"
                                    value={numeGuardian}
                                    onChange={(e) => {setNumeGuardian(e.target.value)}} 
                                    placeholder="e.g. Popescu"
                                    />
                                </div>
                                <div>
                                    <label>Prenume</label>
                                    <input
                                    type="text"
                                    value={prenumeGuardian}
                                    onChange={(e) => {setPrenumeGuardian(e.target.value)}}
                                    placeholder="e.g. Maria"
                                    />
                                </div>
                                <div>
                                    <label>CNP</label>
                                    <input 
                                    type="text"
                                    value={cnpGuardian}
                                    onChange={(e) => {setCnpGuardian(e.target.value.replace(/\D/g, ''))}}
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
                                    value={serieCiGuardian}
                                    onChange={(e) => {setSerieCiGuardian(e.target.value.replace(/[^A-Z]/gi, '').toUpperCase())}}
                                    minLength={2}
                                    maxLength={2}
                                    placeholder="e.g. RK"
                                    />
                                </div>
                                <div>
                                    <label>Număr</label>
                                    <input 
                                    type="text"
                                    value={numarCiGuardian}
                                    onChange={(e) => {setNumarCiGuardian(e.target.value.replace(/\D/g, ''))}}
                                    minLength={6}
                                    maxLength={6}
                                    placeholder="e.g. 939120"
                                    />
                                </div>
                                <div>
                                    <label>Dată Eliberare</label>
                                    <input 
                                    type="date"
                                    value={dataEliberareCiGuardian}
                                    onChange={(e) => {setDataEliberareCiGuardian(e.target.value)}}
                                    />
                                </div>
                                <div>
                                    <label>Secție</label>
                                    <input 
                                    type="text"
                                    value={sectieGuardian}
                                    onChange={(e) => {setSectieGuardian(e.target.value)}}
                                    placeholder="e.g. S.P.C.E.P Sector 1"
                                    />
                                </div>
                                <div>
                                    <label>Oraș</label>
                                    <input 
                                    type="text"
                                    value={orasGuardian}
                                    onChange={(e) => {setOrasGuardian(e.target.value)}}
                                    placeholder="e.g. București"
                                    />
                                </div>
                                <div>
                                    <label>Județ/Sector</label>
                                    <input 
                                    type="text"
                                    value={judetGuardian}
                                    onChange={(e) => {setJudetGuardian(e.target.value)}}
                                    placeholder="e.g. Sector 3"
                                    />
                                </div>
                                <div>
                                    <label>Stradă</label>
                                    <input 
                                    type="text"
                                    value={stradaGuardian}
                                    onChange={(e) => {setStradaGuardian(e.target.value)}}
                                    placeholder="e.g. Gării"
                                    />
                                </div>
                                <div>
                                    <label>Număr</label>
                                    <input 
                                    type="text"
                                    value={numarAdresaGuardian}
                                    onChange={(e) => {setNumarAdresaGuardian(e.target.value)}}
                                    placeholder="e.g. 39"
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