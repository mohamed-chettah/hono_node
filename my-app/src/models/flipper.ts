import { Schema, model, Types } from "mongoose";

interface IFlipper {
    nom: string;
    prix: number;
    dateDeSortie: Date;
    note: number;
    image: string;
    stock: number;
    etat: string;
    lienVideo: string;
    description: string;
    marque: Types.ObjectId;
}


const flipperSchema = new Schema<IFlipper>({
    nom: { type: String, required: true, trim: true },
    marque: { type: Schema.Types.ObjectId, required: true, ref: "Marque" },
    prix: { type: Number, required: true },
    dateDeSortie: { type: Date, required: true },
    note: { type: Number, required: true },
    image: { type: String, required: true, trim: true },
    stock: { type: Number, required: true },
    etat: { type: String, required: true, trim: true },
    lienVideo: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
});

const Flipper = model<IFlipper>("Flipper", flipperSchema);
export { Flipper, IFlipper };