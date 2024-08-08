import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var Form = Schema({
    formTitle: {
        type: String
    }
},
    {
        timestamps: {
            createdAt: 'formCreated',
            updatedAt: 'formUpdated'
        }
    }
)

export default mongoose.model('forms', Form)