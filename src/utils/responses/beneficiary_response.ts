import type { Guardian } from "../../classes/guardian";

export interface BeneficiaryResponse {
    id: string;
    
    nume: string;
    prenume: string;

    cnp: string;
    serieCi: string;
    numarCi: string;

    oras: string;
    judet: string;

    strada: string;
    numarAdresa: string;

    dataEliberareCi: string;
    sectie: string;

    guardian: Guardian;
}