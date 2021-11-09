import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../styles/calendar.css";
import { SessionProvider } from "next-auth/react";
import Auth from "../components/Auth";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export default App;
