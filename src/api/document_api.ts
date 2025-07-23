import axios, { type AxiosResponse } from "axios";

import type { Result } from "../utils/result";
import type { DocumentRequestDTO } from "../utils/dtos/documentRequestDTO";

import { getApiErrorMessage } from "../utils/errorHandler";

const documentClient = axios.create({
    baseURL: 'http://localhost:8080/documents',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const generate = async (documentRequestDTO: DocumentRequestDTO): Promise<Result<Blob>> => {
    try {
        console.log(documentRequestDTO.templateName);
        const response: AxiosResponse<Blob> = await documentClient.post(
            'generate', 
            documentRequestDTO,
            { responseType: 'blob' }
        );
        return { success: true, data: response.data }
    }
    catch (error) {
        console.error('Error getting document:', error);
        const errorMsg = getApiErrorMessage(error);
        return { success: false, error: errorMsg };
    }
}