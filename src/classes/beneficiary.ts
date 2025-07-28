import type { BeneficiaryResponse } from "../utils/responses/beneficiary_response";
import type { Guardian } from "./guardian";

export class Beneficiary {
    public id?: string;
    public nume: string;
    public prenume: string;
    public dataNasterii: string;
    public cnp: string;
    public serieCi: string;
    public numarCi: string;
    public oras: string;
    public judet: string;
    public strada: string;
    public numarAdresa: string;
    public bloc: string;
    public scara: string;
    public etaj: string;
    public apartament: string;
    public dataEliberareCi: string;
    public sectie: string;
    public guardian: Guardian;
  
    constructor (
      id: string | undefined = undefined,
      nume: string,
      prenume: string,
      dataNasterii: string,
      cnp: string,
      serieCi: string,
      numarCi: string,
      oras: string,
      judet: string,
      strada: string,
      numarAdresa: string,
      bloc: string,
      scara: string,
      etaj: string,
      apartament: string,
      dataEliberareCi: string,
      sectie: string,
      guardian: Guardian,
    ) {
      this.id = id;
      this.nume = nume;
      this.prenume = prenume;
      this.dataNasterii = dataNasterii;
      this.cnp = cnp;
      this.serieCi = serieCi;
      this.numarCi = numarCi;
      this.oras = oras;
      this.judet = judet;
      this.strada = strada;
      this.numarAdresa = numarAdresa;
      this.bloc = bloc;
      this.scara = scara;
      this.etaj = etaj;
      this.apartament = apartament;
      this.dataEliberareCi = dataEliberareCi;
      this.sectie = sectie;
      this.guardian = guardian;
    }

    static fromResponse (res: BeneficiaryResponse): Beneficiary {
      return new Beneficiary(
        res.id,
        res.nume, 
        res.prenume,
        res.dataNasterii,
        res.cnp, 
        res.serieCi, 
        res.numarCi, 
        res.oras,
        res.judet,
        res.strada,
        res.numarAdresa,
        res.bloc,
        res.scara,
        res.etaj,
        res.apartament,
        res.dataEliberareCi,
        res.sectie,
        res.guardian
      );
    }
}