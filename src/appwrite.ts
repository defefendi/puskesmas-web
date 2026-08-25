import {  Client, Databases, Account, ID , Storage } from 'appwrite';

const client = new Client()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1') // Jalur resmi Appwrite Cloud
    .setProject('69f9bfa500229160605b'); // Project ID

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);
export { ID };

export default client;
