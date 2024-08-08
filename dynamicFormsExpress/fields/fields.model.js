import mongoose from "mongoose"

const Schema = mongoose.Schema;
const Fields = Schema(
    {
        fieldFormId: { type: Schema.Types.ObjectId, ref: 'Form', required: true },
        fieldId: { type: Number, required: true },
        fieldType: { type: String, required: true },
        fieldName: { type: String, required: true },
        fieldLabel: { type: String, required: true },
        fieldPlaceholder: { type: String },
        fieldPosition: { type: Number, required: true },
    },
    {
        timestamps: {
            createdAt: 'fieldCreated',
            updatedAt: 'fieldUpdated'
        }
    }
)


export default mongoose.model('fields', Fields);