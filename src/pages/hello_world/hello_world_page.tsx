import { useEffect, useState } from 'react';
import { HelloWorldRepository } from '../../repositories/hello_world_repository';


function HelloWorldPage() {
  const [backendMessage, setBackendMessage] = useState('');
  const [backendError, setBackendError] = useState('');
  
  const [repositoryMessage, setRepositoryMessage] = useState('');
  const [repositoryError, setRepositoryError] = useState('');

  const [newMessage, setNewMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  
  useEffect(() => {
    HelloWorldRepository.fetchHelloWorld().then((result) => {
      if (result.success) {
        setBackendMessage(result.data.message);
      } else {
        setBackendError(result.error);
      }
    });

    HelloWorldRepository.fetchHelloWorldRepository().then((result) => {
      if(result.success) {
        setRepositoryMessage(result.data.message);
      } else {
        setRepositoryError(result.error);
      }
    });
  }, []);

  const handleSubmit = async () => {
    const result = await HelloWorldRepository.createHelloWorld(newMessage);
    if (result.success) {
      setSubmitStatus(`✅ Message created: ${result.data.message}`);
    } else {
      setSubmitStatus(`❌ Error: ${result.error}`);
    }
  };

  return (
    <>
      <div>
        <h1>Hello World from Backend:</h1>
        {backendError ? (
          <p style={{ color: 'red' }}>{backendError}</p>
        ) : (
          <p>{backendMessage}</p>
        )}
      </div>
      <div>
        <h1>Hello World from Repository:</h1>
        {repositoryError ? (
          <p style={{ color: 'red' }}>{repositoryError}</p>
        ) : (
          <p>{repositoryMessage}</p>
        )}
      </div>
      <div>
        <h1>Send message to Backend</h1>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
          style={{ marginRight: '1rem' }}
        />
        <button onClick={handleSubmit}>Send</button>

        <p>{submitStatus}</p>
      </div>
    </>
  );
}

export default HelloWorldPage;
