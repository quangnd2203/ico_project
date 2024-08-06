import { Create, SimpleForm, TextInput, required, CreateProps, Edit } from 'react-admin';
import { JSX } from 'react/jsx-runtime';

const EditUser = (props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
        </SimpleForm>
    </Edit>
);

export default EditUser;