import ApolloClient from 'apollo-client'
import {InMemoryCache, HttpLink} from "apollo-client-preset"
import { url_prefix } from "./utils"


const API = url_prefix + '/graphql';

const cache = new InMemoryCache({
	dataIdFromObject: (item) => item.id
});

const link = new HttpLink({
	uri: API,
	credentials: "same-origin"
});

const client = new ApolloClient({
	link: link,
	cache: cache
});

export default client
