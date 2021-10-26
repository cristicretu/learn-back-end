import "tailwindcss/tailwind.css";
import "styles/globals.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import { ThemeProvider } from "next-themes";

const client = new ApolloClient({
  uri: 'localhost:3000',
  cache: new InMemoryCache()
});



function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
