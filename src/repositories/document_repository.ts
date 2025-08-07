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
                    "${data}"
                ];

                const BENEFICIARY_PLACEHOLDERS = [
                    "${nume_BEN} ${prenume_BEN}",
                    "${nume_BEN}",
                    "${prenume_BEN}",
                    "${data_nasterii_BEN}",
                    "${cnp_BEN}",
                    "${serie_ci_BEN}",
                    "${numar_ci_BEN}",
                    "${oras_BEN}",
                    "${judet_BEN}",
                    "${strada_BEN}",
                    "${numar_adresa_BEN}",
                    "${bloc_BEN}",
                    "${scara_BEN}",
                    "${etaj_BEN}",
                    "${apartament_BEN}",
                    "${data_eliberare_ci_BEN}",
                    "${sectie_BEN}",
                ];

                const GUARDIAN_PLACEHOLDERS = [
                    "${nume_APA} ${prenume_APA}",
                    "${nume_APA}",
                    "${prenume_APA}",
                    "${data_nasterii_APA}",
                    "${cnp_APA}",
                    "${serie_ci_APA}",
                    "${numar_ci_APA}",
                    "${oras_APA}",
                    "${judet_APA}",
                    "${strada_APA}",
                    "${numar_adresa_APA}",
                    "${bloc_APA}",
                    "${scara_APA}",
                    "${etaj_APA}",
                    "${apartament_APA}",
                    "${data_eliberare_ci_APA}",
                    "${sectie_APA}",
                ];
                
                const placeholderRegex = /(\${[^}]+}|(?:[.‥…]{3,}))/g;

                const replaced = html.replace(placeholderRegex, (match) => {
                    const miscellaneousOptions = MISCELLANEOUS_PLACEHOLDERS.map((p) => {
                      const selected = p === match ? 'selected' : '';
                      return `<option value="${p}" ${selected}>${p}</option>`;
                    }).join("");
                    const beneficiaryOptions = BENEFICIARY_PLACEHOLDERS.map((p) => {
                      const selected = p === match ? 'selected' : '';
                      return `<option value="${p}" ${selected}>${p}</option>`;
                    }).join("");
                    const guardianOptions = GUARDIAN_PLACEHOLDERS.map((p) => {
                      const selected = p === match ? 'selected' : '';
                      return `<option value="${p}" ${selected}>${p}</option>`;
                    }).join("");
                  
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