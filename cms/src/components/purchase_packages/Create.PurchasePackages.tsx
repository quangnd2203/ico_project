import { Create, SimpleForm, TextInput, required, CreateProps, SelectInput, NumberInput } from 'react-admin';
import { JSX } from 'react/jsx-runtime';

const CreatePurchasePackage = (props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source='name' validate={required()} />
            <NumberInput source='value' min={0.1} />
            <NumberInput source='tokenReceive' min={1} />
            <SelectInput source='type' validate={required()} choices={[
                'USDT',
                'BNB',
            ]} />
        </SimpleForm>
    </Create>
);

export default CreatePurchasePackage;