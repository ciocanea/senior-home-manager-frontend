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

export const upload = async (newDocument: File): Promise<Result<void>> => {
    try {
        const formData = new FormData();
        formData.append("newDocument", newDocument);

        await documentClient.post(
            'upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        return { success: true, data: undefined };
    } catch (error) {
        console.error('Failed to upload document:', error);
        const errorMsg = getApiErrorMessage(error);
        return { success: false, error: errorMsg };
    }
};

export const deleteDocument = async (documentName: string): Promise<Result<void>> => {
    try {
        await documentClient.delete(
            '',
            {
                params: { documentName: documentName }
            }
        );

        return { success: true, data: undefined };
    }
    catch (error) {
        console.error('Failed to delete document:', error);
        const errorMsg = getApiErrorMessage(error);
        return { success: false, error: errorMsg };
    }
}


export const getNames = async (): Promise<Result<string[]>> => {
    try {
        const response: AxiosResponse<string[]> = await documentClient.get('getNames');
        console.log(response.data);
        return { success: true, data: response.data }
    }
    catch (error) {
        console.error('Failed to get document names:', error);
        const errorMsg = getApiErrorMessage(error);
        return { success: false, error: errorMsg };
    }
}