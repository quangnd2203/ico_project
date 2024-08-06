// UserList.js
import { List, Datagrid, TextField, EditButton, DeleteButton, ListProps } from 'react-admin';
import { JSX } from 'react/jsx-runtime';

const ListUsers = (props: JSX.IntrinsicAttributes & ListProps<any>) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default ListUsers;