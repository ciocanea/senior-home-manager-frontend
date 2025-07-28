type FormState = {
        beneficiary: {
            nume: string;
            prenume: string;
            dataNasterii: string;
            cnp: string;
            serieCi: string;
            numarCi: string;
            oras: string;
            judet: string;
            strada: string;
            numarAdresa: string;
            bloc: string;
            scara: string;
            etaj: string;
            apartament: string;
            dataEliberareCi: string;
            sectie: string;
        };
        guardian: {
            nume: string;
            prenume: string;
            dataNasterii: string;
            cnp: string;
            serieCi: string;
            numarCi: string;
            oras: string;
            judet: string;
            strada: string;
            numarAdresa: string;
            bloc: string;
            scara: string;
            etaj: string;
            apartament: string;
            dataEliberareCi: string;
            sectie: string;
        };
    };

type Action =
|   { type: 'SET_BENEFICIARY_FIELD', field: keyof FormState['beneficiary'], value: string }
|   { type: 'SET_GUARDIAN_FIELD', field: keyof FormState['guardian'], value: string };

function newBeneficiaryReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'SET_BENEFICIARY_FIELD':
            return {
                ...state,
                beneficiary: {
                    ...state.beneficiary,
                    [action.field]: action.value
                }
            };
        case 'SET_GUARDIAN_FIELD':
            return {
                ...state,
                guardian: {
                    ...state.guardian,
                    [action.field]: action.value
                }
            };
        default:
            return state;
    }
}

export default newBeneficiaryReducer;
    

  