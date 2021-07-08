import "../styles/globals.css";
import { FirebaseProvider } from "../firebase/context";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </FirebaseProvider>
  );
}

export default MyApp;
