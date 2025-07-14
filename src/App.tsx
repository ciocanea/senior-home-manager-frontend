import { useEffect, useState } from 'react';
import './App.css';
import { HelloWorldRepository } from './repositories/hello_world_repository';
import type { HelloWorldResponse } from './utils/hello_world_response';


function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    HelloWorldRepository.fetchHelloWorld().then((result) => {
      if (result.success) {
        setMessage(result.data.message);
      } else {
        setError(result.error);
      }
    });
  }, []);

  return (
    <>
      <div>
        <h1>Hello World from Backend:</h1>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </>
  );
}

export default App;
