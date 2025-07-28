import type { Guardian } from "../../classes/guardian";

export interface BeneficiaryResponse {
    id: string;
    
    nume: string;
    prenume: string;
    dataNasterii: string;

    cnp: string;
    serieCi: string;
    numarCi: string;

    oras: string;
    judet: string;

    strada: string;
    numarAdresa: string;
    bloc: string;
    scara: string;
    etaj: string;
    apartament: string;

    dataEliberareCi: string;
    sectie: string;

    guardian: Guardian;
}