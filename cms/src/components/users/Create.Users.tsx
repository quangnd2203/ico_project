import { Create, SimpleForm, TextInput, required, CreateProps, useNotify, useRedirect } from 'react-admin';
import { JSX } from 'react/jsx-runtime';

const CreateUser = (props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>) => {
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = () => {
        console.log()
        notify('User created successfully');
        redirect('/users');
    };

    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" validate={required()} />
            </SimpleForm>
        </Create>
    )
};

export default CreateUser;