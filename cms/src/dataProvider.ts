import simpleRestProvider from 'ra-data-simple-rest';
import { DataProvider } from 'react-admin';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const baseDataProvider = simpleRestProvider(import.meta.env.VITE_BASE_URL!);

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
        return {
            data: response.data.response.data,
            total: response.data.response.total,
        };
    },
    getOne: async (resource, params) => {
        const response = await apiClient.get(`/${resource}/${params.id}`);
        return { data: response.data.response };
    },
    create: async (resource, params) => {
        const response = await apiClient.post(`/${resource}`, params.data);
        history.back();
        return { data: response.data.response };
    },
    update: async (resource, params) => {
        const response = await apiClient.put(`/${resource}/${params.id}`, params.data);
        return { data: response.data.response };
    },
}
