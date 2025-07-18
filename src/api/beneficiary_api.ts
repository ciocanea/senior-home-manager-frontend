import axios, { type AxiosResponse } from "axios";
import type { BeneficiaryResponse } from "../utils/beneficiary_response";
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
        console.log(response);
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