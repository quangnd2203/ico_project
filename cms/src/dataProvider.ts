import simpleRestProvider from 'ra-data-simple-rest';
import { DataProvider } from 'react-admin';
import axios from 'axios';


const BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const baseDataProvider = simpleRestProvider(BASE_URL);

export const dataProvider: DataProvider = {
    ...baseDataProvider,
    getList: async (resource, params) => {
        const query = {
            keyword: params.filter.q,
            page: params.pagination?.page,
            limit: params.pagination?.perPage,
            sortField: params.sort?.field,
            sortOrder: params.sort?.order 
        };
        const response = await apiClient.get(`/${resource}`, { params: query });
        console.log(response);
        // const response: any = await baseDataProvider.getList(resource, query);
        // response.data = response.data.response;
        return {
            data: response.data.response,
            total: response.headers['content-range'] ? parseInt(response.headers['content-range'].split(' ')[1]) : 0,
        };
    },
    create: (userId: String) => {
        return fetch(`/api/users/${userId}`, { method: 'POST' })
            .then(response => response.json());
    },
}