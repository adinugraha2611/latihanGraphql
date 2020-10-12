import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Pages from '/pages';
import GlobalStyle from './components/GlobalStyle';

// set uri to link in the .env (localhost:4000/api)
const uri = process.env.API_URI;
// set cache
// apa isinya? dimana disimpannya?
const cache = new InMemoryCache();
// configure apollo client
const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true
});

const App = () => {
  return (
    // semua di wrap dengan ApolloProvider agar semua component/page bisa mengakses data apollo client yang kita tentukan di atas. Di sini, kita akan provide client.
    // konsepnya sama seperti context provider di react
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
