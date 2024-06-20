import { Schema, model, Types } from "mongoose";

interface IMarque {
    nom: string;
    guide: string;
    logo: string;
}

const marqueSchema = new Schema<IMarque>({
    nom: { type: String, required: true, trim: true },
    guide: { type: String, required: true, trim: true },
    logo: { type: String, required: true },
});

const Marque = model<IMarque>("Marque", marqueSchema);
export { Marque, IMarque };