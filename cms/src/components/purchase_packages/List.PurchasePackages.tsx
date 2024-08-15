// UserList.js
import { List, Datagrid, TextField, EditButton, DeleteButton, ListProps } from 'react-admin';
import { JSX } from 'react/jsx-runtime';

const ListPurchasePackages = (props: JSX.IntrinsicAttributes & ListProps<any>) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="value" />
            <TextField source="tokenReceive" />
            <TextField source="bonus" />
            <TextField source="type" />
            <TextField source="createdAt" />
            <TextField source="updatedAt" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default ListPurchasePackages;