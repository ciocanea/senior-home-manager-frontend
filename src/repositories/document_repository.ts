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
                const PLACEHOLDER_OPTIONS = [
                    "${data}",
                    "${nume} ${prenume}",
                    "${nume}",
                    "${prenume}",
                    "${data_nasterii}",
                    "${cnp}",
                    "${serie_ci}",
                    "${numar_ci}",
                    "${oras}",
                    "${judet}",
                    "${strada}",
                    "${numar_adresa}",
                    "${bloc}",
                    "${scara}",
                    "${etaj}",
                    "${apartament}",
                    "${data_eliberare_ci}",
                    "${sectie}",
                ];
                
                const placeholderRegex = /(\${[^}]+}|(?:[.‥…]{3,}))/g;

                const replaced = html.replace(placeholderRegex, (match) => {
                    const options = PLACEHOLDER_OPTIONS.map((p) => {
                      const selected = p === match ? 'selected' : '';
                      return `<option value="${p}" ${selected}>${p}</option>`;
                    }).join("");
                  
                    return `<select data-index="${index++}" class="placeholder-dropdown">
                              <option value="">....................................</option>
                              ${options}
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