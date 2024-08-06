import { model, Schema } from 'mongoose'
import User from 'src/domain/entities/user.entities.js'
import mongooseTransformId from '../database_plugins/mongoose_transform_id.plugins.js';

const userSchema = new Schema<User>(
    {
        name: {type: String, required: true},
    }, 
    {
        timestamps: true,
    }
)

userSchema.plugin(mongooseTransformId);

export default model<User>('User', userSchema);