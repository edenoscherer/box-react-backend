import { Document, Schema, model } from 'mongoose';
import { IFileModel } from './File';

export interface IBoxModel extends Document {
    title: string;
    files: IFileModel[];
}

export const BoxSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        files: [{
            type: Schema.Types.ObjectId,
            ref: 'File',
        }],
    },
    {
        timestamps: true,
    },
);

export const Box = model<IBoxModel>('Box', BoxSchema);
