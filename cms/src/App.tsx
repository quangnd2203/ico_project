
import { Admin, Resource } from 'react-admin';
import { Layout } from './Layout';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import CreateUser from './components/users/Create.Users';
import ListUsers from './components/users/List.Users';
import EditUser from './components/users/Edit.Users';


export const App = () => (
    <Admin
        layout={Layout}
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
        <Resource name='users' create={CreateUser} list={ListUsers} edit={EditUser}></Resource>
    </Admin>
);

