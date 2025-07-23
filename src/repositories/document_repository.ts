import { generate } from "../api/document_api";
import type { Beneficiary } from "../classes/beneficiary";
import type { DocumentRequestDTO } from "../utils/dtos/documentRequestDTO";
import type { Result } from "../utils/result";

export const DocumentRepository = {
    async generate (templateName: String, beneficiary: Beneficiary): Promise<Result<void>> {
        const documentRequestDTO: DocumentRequestDTO = { 
            templateName: templateName, 
            beneficiary: beneficiary 
        }

        const result = await generate(documentRequestDTO);

        if (result.success) {
            const dataBlob = result.data;
            const documentUrl = URL.createObjectURL(dataBlob);
            const a = document.createElement("a");
            a.href = documentUrl;
            a.download = `${templateName}_${beneficiary.nume.toLocaleUpperCase()}.docx`;
            a.click();
            return { success: true, data: undefined }
        }
        else {
            return { success: false, error: result.error }
        }
    }
}