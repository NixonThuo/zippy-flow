import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import Workflow from "./components/Workflow";

function App() {

  return (
    <ChakraProvider value={defaultSystem}>
      <Workflow />
    </ChakraProvider>
  );
}

export default App;