import type { Beneficiary } from "../../classes/beneficiary";

export interface DocumentRequestDTO {
    templateName: String,
    beneficiary: Beneficiary
}