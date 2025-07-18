import type { BeneficiaryResponse } from "../utils/beneficiary_response";

export class Beneficiary {
    public id?: string;
    public nume: string;
    public prenume: string;
    public cnp: string;
    public serieCi: string;
    public numarCi: string;
  
    constructor (
      nume: string,
      prenume: string,
      cnp: string,
      serieCi: string,
      numarCi: string,
      id?: string,
    ) {
      this.id = id;
      this.nume = nume;
      this.prenume = prenume;
      this.cnp = cnp;
      this.serieCi = serieCi;
      this.numarCi = numarCi;
    }

    static fromResponse (res: BeneficiaryResponse): Beneficiary {
        return new Beneficiary(res.nume, res.prenume, res.cnp, res.serieCi, res.numarCi, res.id);
    }
}