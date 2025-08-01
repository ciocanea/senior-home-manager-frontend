import styles from './document_list.module.css'

function DocumentList ({
    documents,
    onDeleteDocument
}: {
    documents: string[],
    onDeleteDocument: (documentName: string) => void
}) {
    return (
        <>
            {
                documents.map((document, index) => (
                    <div key={index} className={styles.item}>
                        <div>
                            { document }
                        </div>
                        <button onClick={() => onDeleteDocument(document)}>
                            Delete
                        </button>
                    </div>
                ))
            }

            
        </>
    );
}

export default DocumentList