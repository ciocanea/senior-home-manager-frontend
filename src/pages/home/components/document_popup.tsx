import { useEffect, useState } from "react";
import styles from "../components_css/document_popup.module.css";
import { DocumentRepository } from "../../../repositories/document_repository";
import { Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';



function DocumentPopup ({
    documentName,
    onClose,
}: {
    documentName: string,
    onClose: () => void,
}) {
    const [documentHtml, setDocumentHtml] = useState('');

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        DocumentRepository.get(documentName).then((result) => {
            if (result.success) {
                setDocumentHtml(result.data);
            }
        });
    }, []);
      
    const handleSave = async () => {
        const dropdowns = document.querySelectorAll(".placeholder-dropdown");
        const placeholders = Array.from(dropdowns).map((el) => {
            const select = el as HTMLSelectElement;
            return select.value ? select.value : "";
        });
    
        const result = await DocumentRepository.edit(documentName, placeholders)

        if (result.success) {
            onClose();

            setSnackbarMessage('Modificări salvate.');
            setSnackbarOpen(true);
        }
        else {
            setSnackbarMessage('Modificările nu au putut fi salvate.');
            setSnackbarOpen(true);
        }
    };
    
    return (
        <>
            <div 
            className={styles.overlay} 
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            >
                <div className={styles.popup}>
                    <div className={styles.header}>
                        <div className={styles.left}></div>
                        <div className={styles.center}>
                            <h2>{documentName}</h2>
                        </div>
                        <div className={styles.right}>
                            <button onClick={onClose}>
                                <CloseIcon fontSize="large"></CloseIcon>
                            </button>
                        </div>
                    </div>

                    <div className={styles.document}
                        dangerouslySetInnerHTML={{ __html: documentHtml }}
                    />

                    <div className={styles.buttons}>
                        <button type="button" onClick={handleSave}>Salvați</button>   
                    </div>

                        
                </div>
                <Snackbar
                open={snackbarOpen}
                onClose={() => {setSnackbarOpen(false)}}
                message={snackbarMessage}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                </Snackbar>
            </div>
        </>
    );
}

export default DocumentPopup;