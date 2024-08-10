import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const FormResponse = Schema(

    {
        responseFormId: { type: Schema.Types.ObjectId, required: true },
        responseFormTitle: { type: String, required: true },
        responseFields: [
            {
                _id: { type: String },
                fieldId: { type: Number, required: true },
                fieldType: { type: String, required: true },
                fieldName: { type: String, required: true },
                fieldLabel: { type: String, required: true },
                fieldPlaceholder: { type: String },
                fieldPosition: { type: Number, required: true },
                fieldValue: { type: String },
            }
        ]
    },
    {
        timestamps: {
            createdAt: 'responseCreated',
            updatedAt: 'responseUpdated'
        }
    }
)
export default mongoose.model('formResponses', FormResponse)