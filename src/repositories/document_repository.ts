import { generate, getNames, upload, deleteDocument } from "../api/document_api";
import type { Beneficiary } from "../classes/beneficiary";
import type { DocumentRequestDTO } from "../utils/dtos/documentRequestDTO";
import type { Result } from "../utils/result";

export const DocumentRepository = {
    async generate (templateName: string, beneficiary: Beneficiary): Promise<Result<void>> {
        const documentRequestDTO: DocumentRequestDTO = { 
            templateName: templateName, 
            beneficiaryId: beneficiary.id! 
        }

        const result = await generate(documentRequestDTO);

        if (result.success) {
            const dataBlob = result.data;
            const documentUrl = URL.createObjectURL(dataBlob);
            const a = document.createElement("a");
            a.href = documentUrl;
            a.download = 
                `${templateName.split('.')[0]}_${beneficiary.nume.toLocaleUpperCase()}_${beneficiary.prenume.split(' ')[0].toLocaleUpperCase()}.docx`;
                
            a.click();
            return { success: true, data: undefined }
        }
        else {
            return { success: false, error: result.error }
        }
    },

    async upload (newDocument: File): Promise<Result<void>> {
        return await upload(newDocument);
    },

    async deleteDocument (documentName: string): Promise<Result<void>> {
        return await deleteDocument(documentName);
    },

    async getNames (): Promise<Result<string[]>> {
        return await getNames();
    }
}