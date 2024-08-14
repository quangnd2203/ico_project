import { model, Schema } from 'mongoose'
import mongooseTransformId from '../database_plugins/mongoose_transform_id.plugins.js';
import PurchasePackage from 'src/domain/entities/purchase_package.js';

const schema = new Schema<PurchasePackage>(
    {
        value: {type: Number, required: true},
        tokenReceive: {type: Number, required: true},
        type: {type: String, required: true, enum: ['USDT', 'BNB']},
    }, 
    {
        timestamps: true,
    }
)

schema.plugin(mongooseTransformId);

export default model<PurchasePackage>('PurchasePackage', schema);