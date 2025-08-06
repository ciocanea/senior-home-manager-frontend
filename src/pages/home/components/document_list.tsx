import styles from '../components_css/document_list.module.css'

import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useState } from 'react';
import DocumentPopup from './document_popup';

function DocumentList ({
    documents,
    onDeleteDocument
}: {
    documents: string[],
    onDeleteDocument: (documentName: string) => void
}) {
    const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

    return (
        <>
            {
                documents.map((documentName, index) => (
                    <div key={index}>
                        <div className={styles.item}>
                            <div>
                                { documentName }
                            </div>
                            <button onClick={() => setSelectedDocument(documentName)}>
                                <ModeEditIcon></ModeEditIcon>
                            </button>
                            <button onClick={() => onDeleteDocument(documentName)}>
                                <DeleteIcon></DeleteIcon>
                            </button>
                        </div>
                    </div>
                ))
            }

            <div>
                {selectedDocument && (
                    <DocumentPopup
                        documentName={selectedDocument}
                        onClose={() => setSelectedDocument(null)}
                    />
                )}
            </div>  
        </>
    );
}

export default DocumentList