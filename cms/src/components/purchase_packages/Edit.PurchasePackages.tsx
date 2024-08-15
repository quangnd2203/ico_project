import { SimpleForm, required, CreateProps, Edit, SelectInput, NumberInput, TextInput } from 'react-admin';
import { JSX } from 'react/jsx-runtime';

const EditPurchasePackage = (props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source='name' validate={required()} />
            <NumberInput source='value' min={0.1} validate={required()} />
            <NumberInput source='tokenReceive' min={1} validate={required()} />
            <NumberInput source='bonus' />
            <SelectInput source='type' validate={required()} choices={[
                'USDT',
                'BNB',
            ]} />
        </SimpleForm>
    </Edit>
);

export default EditPurchasePackage;