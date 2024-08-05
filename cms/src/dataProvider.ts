import { create } from 'domain';
import simpleRestProvider from 'ra-data-simple-rest';

const baseDataProvider = simpleRestProvider('http://localhost:3000/api');

export const dataProvider = {
    ...baseDataProvider,
    create: (userId: String) => {
        return fetch(`/api/users/${userId}`, { method: 'POST' })
            .then(response => response.json());
    },
}