import { useEffect, useState } from "react";
import styles from "./home_page.module.css";
import NewBeneficiaryPopup from "./components/new_beneficiary_popup";
import BeneficiaryList from "./components/beneficiary_list";

import { BeneficiaryRepository } from "../../repositories/beneficiary_repository";
import type { Beneficiary } from "../../classes/beneficiary";
import { DocumentRepository } from "../../repositories/document_repository";
import DocumentList from "./components/document_list";

import { Snackbar } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';

function HomePage () {
    const [showPopup, setShowPopup] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
    const [documents, setDocuments] = useState<string[]>([]);

    const [newDocument, setNewDocument] = useState<File | undefined>(undefined);

    useEffect(() => {
        BeneficiaryRepository.getAll().then((result) => {
            if (result.success) {
                setBeneficiaries(result.data);
            }
        });

        DocumentRepository.getNames().then((result) => {
            if (result.success) {
                setDocuments(result.data);
            }
        });
    }, []);
    
    const handleSubmitBeneficiary = (beneficiary?: Beneficiary) => {
        if (beneficiary) {
            setBeneficiaries(beneficiaries.concat(beneficiary));

            setSnackbarMessage('Beneficiar adăugat.');
            setSnackbarOpen(true);
        }
        else {
            setSnackbarMessage('Beneficiarul nu a putut fi adăugat.');
            setSnackbarOpen(true);
        }
    };

    const handleSubmitDocument = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newDocument) {
            setSnackbarMessage('Selectați un document.');
            setSnackbarOpen(true);
            return;
        }

        if (documents.includes(newDocument.name)) {
            setSnackbarMessage('Documentul selectat există deja.');
            setSnackbarOpen(true);
            return;
        }

        const result = await DocumentRepository.upload(newDocument);

        if (result.success) {
            setDocuments(documents.concat(newDocument.name).sort());
            setNewDocument(undefined);

            setSnackbarMessage('Document încărcat.');
            setSnackbarOpen(true);
        }
        else {
            setSnackbarMessage('Documentul nu a putut fi încărcat.');
            setSnackbarOpen(true);
        }
    }

    const handleDeleteDocument = async (documentName: string) => {
        const result = await DocumentRepository.deleteDocument(documentName);

        if (result.success) {
            setDocuments(documents.filter(doc => doc != documentName));

            setSnackbarMessage('Document șters.');
            setSnackbarOpen(true);
        }
        else {
            setSnackbarMessage('Documentul nu a putut fi șters.');
            setSnackbarOpen(true);
        }
    }

    const handleDeleteBeneficiary = async (beneficiaryId: string) => {
        const result = await BeneficiaryRepository.deleteBeneficiary(beneficiaryId);

        if (result.success) {
            setBeneficiaries(beneficiaries.filter(b => b.id != beneficiaryId));

            setSnackbarMessage('Beneficiar șters.');
            setSnackbarOpen(true);
        }
        else {
            setSnackbarMessage('Beneficiarul nu a putut fi șters.');
            setSnackbarOpen(false);
        }
    }
    
    const handleDocumentChange = (newDocument: File | undefined) => {
        if (newDocument) {
            setNewDocument(newDocument);
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.item}>
                    <h2>Beneficiari</h2>
                    <button onClick={() => setShowPopup(true)}>Adăugați Beneficiar Nou</button>
                    {
                        showPopup && 
                        <NewBeneficiaryPopup 
                        onClose={() => setShowPopup(false)}
                        onSubmitBeneficiary={handleSubmitBeneficiary}
                        />
                    }

                    <BeneficiaryList
                    beneficiaries={beneficiaries}
                    documents={documents}
                    onDeleteBeneficiary={handleDeleteBeneficiary}
                    >
                    </BeneficiaryList>

                    <Snackbar
                    open={snackbarOpen}
                    onClose={() => {setSnackbarOpen(false)}}
                    message={snackbarMessage}
                    autoHideDuration={5000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                    </Snackbar>
                </div>

                <div className={styles.item}>
                    <h2>Documente</h2>
                    <div className={styles.document_upload}>
                        <form onSubmit={handleSubmitDocument}>
                            <label htmlFor="document_input" className={styles.document_input}>
                                { newDocument?.name || 'Selectați un document' }
                            </label>
                            <input 
                            id="document_input" 
                            type="file"
                            accept=".docx"
                            onChange={(e) => handleDocumentChange(e.target.files?.[0])}
                            />
                            
                            <button 
                            type="submit"
                            disabled={ newDocument === undefined }
                            >
                                <FileUploadIcon></FileUploadIcon>
                            </button>
                        </form>
                    </div>

                    <DocumentList
                    documents={documents}
                    onDeleteDocument={handleDeleteDocument}
                    >
                    </DocumentList>
                </div>
            </div>
        </>
    );
}

export default HomePage