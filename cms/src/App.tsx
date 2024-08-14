
import { Admin, Resource } from 'react-admin';
import { Layout } from './Layout';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import CreateUser from './components/users/Create.Users';
import ListUsers from './components/users/List.Users';
import EditUser from './components/users/Edit.Users';
import ListPurchasePackages from './components/purchase_packages/List.PurchasePackages';
import CreatePurchasePackage from './components/purchase_packages/Create.PurchasePackages';
import EditPurchasePackage from './components/purchase_packages/Edit.PurchasePackages';


export const App = () => (
    <Admin
        layout={Layout}
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
        <Resource name='users' create={CreateUser} list={ListUsers} edit={EditUser}/>
        <Resource name='purchase_packages' list={ListPurchasePackages} create={CreatePurchasePackage} edit={EditPurchasePackage}/>
    </Admin>
);

