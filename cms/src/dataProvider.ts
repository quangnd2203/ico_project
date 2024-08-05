import { create } from 'domain';
import simpleRestProvider from 'ra-data-simple-rest';
import { DataProvider } from 'react-admin';

const baseDataProvider = simpleRestProvider('http://localhost:3000/api');

export const dataProvider: DataProvider = {
    ...baseDataProvider,
    getList: async (resource, params) => {
        // // const response: any = await baseDataProvider.getList(resource, params);
        // // console.log(params);
        // // if (resource === 'users') {
        // //     response.data = response.data.response;
        // // }
        // // return response;
        // return fetch(`/api/users?${params}`)
        //     .then(response => response.json());
        const request = await fetch(`http://localhost:3000/api/aaa`, { method: 'GET' });
        var response = await request.json();
        return {
            data: response.response,
            total: 123
        };
    },
    create: (userId: String) => {
        return fetch(`/api/users/${userId}`, { method: 'POST' })
            .then(response => response.json());
    },
}