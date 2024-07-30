import { model, Schema, Types } from 'mongoose'
import User from 'src/domain/entities/user.entities.js'

const userSchema = new Schema<User>(
    {
        name: {type: String, required: true},
    }, 
    {
        timestamps: true
    }
)

export default model<User>('User', userSchema);