import { useEffect, useState } from "react";
import styles from "../components_css/document_popup.module.css";
import { DocumentRepository } from "../../../repositories/document_repository";


function DocumentPopup ({
    documentName,
    onClose,
}: {
    documentName: string,
    onClose: () => void,
}) {
    const [documentHtml, setDocumentHtml] = useState('');

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
    
        
        console.log("Placeholder mapping to send:", placeholders);
    
        const result = await DocumentRepository.edit(documentName, placeholders)
    };
    
    

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.popup}>
                    <div
                        dangerouslySetInnerHTML={{ __html: documentHtml }}
                    />

                    <button type="button" onClick={onClose}></button>
                    <button type="button" onClick={handleSave}>
                        Save Template
                    </button>   
                </div>
            </div>
        </>
    );
}

export default DocumentPopup;