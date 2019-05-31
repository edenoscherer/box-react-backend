import { Document, Schema, model } from 'mongoose';

export interface IFileModel extends Document {
    title: string;
    path: string;
}

export const FileSchema = new Schema<IFileModel>(
    {
        title: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    },
);

function VirtualUrl(this: IFileModel): string {
    const url = process.env.URL || 'http://localhost:3333';
    return `${url}/files/${encodeURIComponent(this.path)}`;
}

FileSchema.virtual('url').get(VirtualUrl);
export const File = model<IFileModel>('File', FileSchema);
