import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { formatedError } from './utils/errorHandler.jsx'
import toast from 'react-hot-toast';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
      cacheTime: 1000 * 60 * 60, // Data stays in cache for 1 hour
      retry: (failureCount, error) => {
        const status = error?.response?.status;

        // If it's a 4xx error (user/client error), do NOT retry
        if (status >= 400 && status < 500) {
          return failureCount < 1; // retry only once OR return false for zero retries
        }

        // Retry up to 3 times for server errors (5xx)
        return failureCount < 3;
      },
      onError: (error) => {
        console.log("Global Query Error:", error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
  },
    mutations: {
      onError: (error) => {
        console.log("Global Mutation Error:", error);
        toast.error(formatedError(error));
      }
    }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
