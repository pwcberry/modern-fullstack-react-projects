import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Blog from "./Blog";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Blog />
    </QueryClientProvider>
  );
}

export default App;
