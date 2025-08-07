import axios, { type AxiosResponse } from "axios";

import type { BeneficiaryResponse } from "../utils/responses/beneficiary_response";
import type { Result } from "../utils/result";
import type { Beneficiary } from "../classes/beneficiary";

import { getApiErrorMessage } from "../utils/errorHandler";

const beneficiaryClient = axios.create({
    baseURL: 'http://localhost:8080/beneficiaries',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getAll = async (): Promise<Result<BeneficiaryResponse[]>> => {
    try {
        const response: AxiosResponse<BeneficiaryResponse[]> = await beneficiaryClient.get('');
        return { success: true, data: response.data }
    }
    catch (error) {
        console.error('Error getting beneficiaries:', error);
        const errorMsg = getApiErrorMessage(error);
        return { success: false, error: errorMsg };
    }
}

export const add = async (beneficiary: Beneficiary): Promise<Result<BeneficiaryResponse>> => {
    try {
        const response: AxiosResponse<BeneficiaryResponse> = await beneficiaryClient.post('', beneficiary);
        return { success: true, data: response.data };
    }
    catch (error) {
        console.error('Error adding beneficiary:', error);
        const errorMsg = getApiErrorMessage(error);
        return { success: false, error: errorMsg };
    }
}

export const deleteBeneficiary = async (beneficiaryId: string): Promise<Result<void>> => {
    try {
        await beneficiaryClient.delete(
            `/${beneficiaryId}`,
        );

        return { success: true, data: undefined };
    }
    catch (error) {
        console.error('Failed to delete beneficiary:', error);
        const errorMsg = getApiErrorMessage(error);
        return { success: false, error: errorMsg };
    }
}