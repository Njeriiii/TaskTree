// Import React's createContext and useContext functions
import { createContext, useContext } from 'react';

// Import the ApiClient module
import ApiClient from '../ApiClient';

// Create a new context instance
const ApiContext = createContext();

// useApi is a custom hook function for accessing the API context
export function useApi() {
  return useContext(ApiContext);
}

// ApiProvider is a component that wraps its children with the API context
function ApiProvider({ children }) {
  // Initialize a new instance of the ApiClient
  const api = new ApiClient();

  return (
    // Provide the API instance to the context
    <ApiContext.Provider value={api}>
      {/* Render the children components */}
      {children}
    </ApiContext.Provider>
  );
}

export default ApiProvider;
