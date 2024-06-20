import { Hono } from "hono";
import { Marque } from "../models/marque";
import { isValidObjectId } from "mongoose";

const api = new Hono().basePath("/marques");

api.get("/", async (c) => {
    try {
        const allMarques = await Marque.find({});
        return c.json(allMarques);
    } catch (error) {
        return c.json({ msg: "An error occurred while fetching the marques", error: error.message }, 500);
    }
});

api.get("/:marqueId", async (c) => {
    const _id = c.req.param("marqueId");
    if (isValidObjectId(_id)) {
        try {
            const oneMarque = await Marque.findOne({ _id });
            if (oneMarque) {
                return c.json(oneMarque);
            }
            return c.json({ msg: "Marque not found" }, 404);
        } catch (error) {
            return c.json({ msg: "An error occurred while fetching the marque", error: error.message }, 500);
        }
    }
    return c.json({ msg: "ObjectId malformed" }, 400);
});

api.post("/", async (c) => {
    const body = await c.req.json();
    try {
        const newMarque = new Marque(body);
        const saveMarque = await newMarque.save();
        return c.json(saveMarque, 201);
    } catch (error: any) {
        return c.json({ msg: "An error occurred while saving the marque", error: error._message }, 400);
    }
});

api.put("/:marqueId", async (c) => {
    const _id = c.req.param("marqueId");
    const body = await c.req.json();
    if (!isValidObjectId(_id)) {
        return c.json({ msg: "ObjectId malformed" }, 400);
    }
    const q = { _id };
    const updateQuery = { ...body };
    try {
        const tryToUpdate = await Marque.findOneAndUpdate(q, updateQuery, {
            new: true,
        });
        if (tryToUpdate) {
            return c.json(tryToUpdate, 200);
        }
        return c.json({ msg: "Marque not found" }, 404);
    } catch (error) {
        return c.json({ msg: "An error occurred while updating the marque", error: error.message }, 500);
    }
});

api.patch("/:marqueId", async (c) => {
    const _id = c.req.param("marqueId");
    const body = await c.req.json();
    if (!isValidObjectId(_id)) {
        return c.json({ msg: "ObjectId malformed" }, 400);
    }
    const q = { _id };
    const updateQuery = { $set: { ...body } };
    try {
        const tryToUpdate = await Marque.findOneAndUpdate(q, updateQuery, {
            new: true,
        });
        if (tryToUpdate) {
            return c.json(tryToUpdate, 200);
        }
        return c.json({ msg: "Marque not found" }, 404);
    } catch (error) {
        return c.json({ msg: "An error occurred while updating the marque", error: error.message }, 500);
    }
});

api.delete("/:marqueId", async (c) => {
    const _id = c.req.param("marqueId");
    if (!isValidObjectId(_id)) {
        return c.json({ msg: "ObjectId malformed" }, 400);
    }
    try {
        const tryToDelete = await Marque.deleteOne({ _id });
        const { deletedCount } = tryToDelete;
        if (deletedCount) {
            return c.json({ msg: "DELETE done" });
        }
        return c.json({ msg: "Marque not found" }, 404);
    } catch (error) {
        return c.json({ msg: "An error occurred while deleting the marque", error: error.message }, 500);
    }
});

export default api;
