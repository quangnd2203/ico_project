import { SimpleForm, required, CreateProps, Edit, SelectInput, NumberInput } from 'react-admin';
import { JSX } from 'react/jsx-runtime';

const EditPurchasePackage = (props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>) => (
    <Edit {...props}>
        <SimpleForm>
            <NumberInput source='value' min={0.1} />
            <NumberInput source='tokenReceive' min={1} />
            <SelectInput source='type' validate={required()} choices={[
                'USDT',
                'BNB',
            ]} />
        </SimpleForm>
    </Edit>
);

export default EditPurchasePackage;