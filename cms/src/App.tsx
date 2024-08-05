
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser, Create } from 'react-admin';
import { Layout } from './Layout';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';


export const App = () => (
    <Admin
        layout={Layout}
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
        <Resource name='users' list={ListGuesser}></Resource>
    </Admin>
);

