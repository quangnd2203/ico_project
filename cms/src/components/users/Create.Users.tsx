import { Create, SimpleForm, TextInput, required, CreateProps } from 'react-admin';
import { JSX } from 'react/jsx-runtime';

const CreateUser = (props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
        </SimpleForm>
    </Create>
);

export default CreateUser;