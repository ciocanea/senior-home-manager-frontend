export class Guardian {
    public id?: string;
    public nume: string;
    public prenume: string;
    public cnp: string;
    public serieCi: string;
    public numarCi: string;
    public oras: string;
    public judet: string;
    public strada: string;
    public numarAdresa: string;
    public dataEliberareCi: string;
    public sectie: string;
  
    constructor(
      id: string | undefined = undefined,
      nume: string,
      prenume: string,
      cnp: string,
      serieCi: string,
      numarCi: string,
      oras: string,
      judet: string,
      strada: string,
      numarAdresa: string,
      dataEliberareCi: string,
      sectie: string,
    ) {
      this.id = id;
      this.nume = nume;
      this.prenume = prenume;
      this.cnp = cnp;
      this.serieCi = serieCi;
      this.numarCi = numarCi;
      this.oras = oras;
      this.judet = judet;
      this.strada = strada;
      this.numarAdresa = numarAdresa;
      this.dataEliberareCi = dataEliberareCi;
      this.sectie = sectie;
    }
  
    static fromResponse(res: any): Guardian {
      return new Guardian(
        res.nume,
        res.prenume,
        res.cnp,
        res.serieCi,
        res.numarCi,
        res.oras,
        res.judet,
        res.strada,
        res.numarAdresa,
        res.dataEliberareCi,
        res.sectie,
        res.id
      );
    }
  }