import "../styles/globals.css";
import { FirebaseProvider } from "../firebase/context";

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <Component {...pageProps} />
    </FirebaseProvider>
  );
}

export default MyApp;
