import "./App.css";
import { MainCard } from "./components/MainCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Footer } from "./components/Footer.tsx"
import { ContextProvider } from "./context/context.tsx";

const queryClient = new QueryClient();
function App() {
  return (
    <>
     <QueryClientProvider client={queryClient}>
      <ContextProvider>
      <MainCard />
      <Footer />
      </ContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
    </>
  );
}

export default App;
