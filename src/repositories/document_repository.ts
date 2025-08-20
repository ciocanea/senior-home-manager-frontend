import mammoth from "mammoth";
import { generate, getNames, upload, deleteDocument, get, edit } from "../api/document_api";
import type { Beneficiary } from "../classes/beneficiary";
import type { DocumentRequestDTO } from "../utils/dtos/documentRequestDTO";
import type { Result } from "../utils/result";
import { getApiErrorMessage } from "../utils/errorHandler";

export const DocumentRepository = {
    async generate (documentName: string, beneficiary: Beneficiary): Promise<Result<void>> {
        const documentRequestDTO: DocumentRequestDTO = { 
            documentName: documentName, 
            beneficiaryId: beneficiary.id! 
        }

        const result = await generate(documentRequestDTO);

        if (result.success) {
            const dataBlob = result.data;
            const documentUrl = URL.createObjectURL(dataBlob);
            const a = document.createElement("a");
            a.href = documentUrl;
            a.download = 
                `${documentName.split('.')[0]}_${beneficiary.nume.toLocaleUpperCase()}_${beneficiary.prenume.split(' ')[0].toLocaleUpperCase()}.docx`;
                
            a.click();
            return { success: true, data: undefined }
        }
        else {
            return result;
        }
    },

    async edit (documentName: string, placeholders: string[]): Promise<Result<void>> {
        return await edit(documentName, placeholders);
    },

    async upload (newDocument: File): Promise<Result<void>> {
        return await upload(newDocument);
    },

    async deleteDocument (documentName: string): Promise<Result<void>> {
        return await deleteDocument(documentName);
    },

    async get (documentName: string): Promise<Result<string>> {
        const result = await get(documentName);

        if (result.success) {
            const arrayBuffer = await result.data.arrayBuffer();

            try {
                const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
                
                let index = 0;
                const MISCELLANEOUS_PLACEHOLDERS = [
                    { value: "${data}", label: "Data" },
                ];


                const BENEFICIARY_PLACEHOLDERS = [
                    { value: "${nume_BEN} ${prenume_BEN}", label: "Nume complet (BEN)" },
                    { value: "${nume_BEN}", label: "Nume (BEN)" },
                    { value: "${prenume_BEN}", label: "Prenume (BEN)" },
                    { value: "${data_nasterii_BEN}", label: "Data nașterii (BEN)" },
                    { value: "${cnp_BEN}", label: "CNP (BEN)" },
                    { value: "${serie_ci_BEN}", label: "Serie CI (BEN)" },
                    { value: "${numar_ci_BEN}", label: "Număr CI (BEN)" },
                    { value: "${data_eliberare_ci_BEN}", label: "Data eliberării CI (BEN)" },
                    { value: "${sectie_BEN}", label: "Secție CI (BEN)" },
                    { value: "${adresa_BEN}", label: "Adresă completă (BEN)" },
                    { value: "${oras_BEN}", label: "Oraș (BEN)" },
                    { value: "${judet_BEN}", label: "Județ/Sector (BEN)" },
                    { value: "${strada_BEN}", label: "Stradă (BEN)" },
                    { value: "${numar_adresa_BEN}", label: "Număr (BEN)" },
                    { value: "${bloc_BEN}", label: "Bloc (BEN)" },
                    { value: "${scara_BEN}", label: "Scară (BEN)" },
                    { value: "${etaj_BEN}", label: "Etaj (BEN)" },
                    { value: "${apartament_BEN}", label: "Apartament (BEN)" },
                  ];
                  
                  const GUARDIAN_PLACEHOLDERS = [
                    { value: "${nume_APA} ${prenume_APA}", label: "Nume complet (APA)" },
                    { value: "${nume_APA}", label: "Nume (APA)" },
                    { value: "${prenume_APA}", label: "Prenume (APA)" },
                    { value: "${data_nasterii_APA}", label: "Data nașterii (APA)" },
                    { value: "${cnp_APA}", label: "CNP (APA)" },
                    { value: "${serie_ci_APA}", label: "Serie CI (APA)" },
                    { value: "${numar_ci_APA}", label: "Număr CI (APA)" },
                    { value: "${data_eliberare_ci_APA}", label: "Data eliberării CI (APA)" },
                    { value: "${sectie_APA}", label: "Secție CI (APA)" },
                    { value: "${adresa_APA}", label: "Adresă completă (APA)" },
                    { value: "${oras_APA}", label: "Oraș (APA)" },
                    { value: "${judet_APA}", label: "Județ/Sector (APA)" },
                    { value: "${strada_APA}", label: "Stradă (APA)" },
                    { value: "${numar_adresa_APA}", label: "Număr (APA)" },
                    { value: "${bloc_APA}", label: "Bloc (APA)" },
                    { value: "${scara_APA}", label: "Scară (APA)" },
                    { value: "${etaj_APA}", label: "Etaj (APA)" },
                    { value: "${apartament_APA}", label: "Apartament (APA)" },
                  ];

                const placeholderRegex = /(\${[^}]+}|\.{4,}|(\.|‥|…){3,}|(‥|…){2,})/g;

                const replaced = html.replace(placeholderRegex, (match) => {
                    const buildOptions = (arr: { value: string; label: string }[]) =>
                      arr
                        .map((p) => {
                          const selected = p.value === match ? "selected" : "";
                          return `<option value="${p.value}" ${selected}>${p.label}</option>`;
                        })
                        .join("");
                  
                    const miscellaneousOptions = buildOptions(MISCELLANEOUS_PLACEHOLDERS);
                    const beneficiaryOptions = buildOptions(BENEFICIARY_PLACEHOLDERS);
                    const guardianOptions = buildOptions(GUARDIAN_PLACEHOLDERS);
                  
                    return `<select data-index="${index++}" class="placeholder-dropdown">
                              <option value="">.........................................</option>
                              <optgroup label="Diverse">
                                ${miscellaneousOptions}
                              </optgroup>
                              <optgroup label="Beneficiar">
                                ${beneficiaryOptions}
                              </optgroup>
                              <optgroup label="Aparținător">
                                ${guardianOptions}
                              </optgroup>
                            </select>`;
                });

                return { success: true, data: replaced}
            } catch (error) {
                const errorMsg = getApiErrorMessage(error);
                return { success: false, error: errorMsg}
            }
        }
        else {
            return result;
        }
    },

    

    async getNames (): Promise<Result<string[]>> {
        return await getNames();
    }
}