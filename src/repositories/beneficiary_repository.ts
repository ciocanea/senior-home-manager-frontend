import { add, deleteBeneficiary, getAll } from "../api/beneficiary_api";
import { Beneficiary } from "../classes/beneficiary";
import type { Result } from "../utils/result";

export const BeneficiaryRepository = {
    async getAll (): Promise<Result<Beneficiary[]>> {
        const result = await getAll();

        if (result.success) {
            return { success: true, data: result.data.map((b) => Beneficiary.fromResponse(b)) }
        }
        else {
            return { success: false, error: result.error }
        }
    },

    async add (beneficiary: Beneficiary): Promise<Result<Beneficiary>> {
        const result = await add(beneficiary);
        
        if (result.success) {
            return { success: true, data: Beneficiary.fromResponse(result.data) }
        }
        else {
            return { success: false, error: result.error };
        }
    },

    async deleteBeneficiary (beneficairyId: string): Promise<Result<void>> {
        return await deleteBeneficiary(beneficairyId);
    }
}