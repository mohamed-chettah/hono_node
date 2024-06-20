import { Hono } from "hono";
import { Flipper } from "../models/flipper";
import { isValidObjectId } from "mongoose";

const api = new Hono().basePath("/flippers");

api.get("/", async (c) => {
    try {
        const allFlippers = await Flipper.find({});
        return c.json(allFlippers);
    } catch (error: any) {
        return c.json({ msg: "An error occurred while fetching flippers", error: error.message }, 500);
    }
});

api.get("/:flipperId", async (c) => {
    const _id = c.req.param("flipperId");
    if (isValidObjectId(_id)) {
        try {
            const oneFlipper = await Flipper.findOne({ _id }).populate("marque");
            if (oneFlipper) {
                return c.json(oneFlipper);
            }
            return c.json({ msg: "Flipper not found" }, 404);
        } catch (error: any) {
            return c.json({ msg: "An error occurred while fetching the flipper", error: error.message }, 500);
        }
    }
    return c.json({ msg: "ObjectId malformed" }, 400);
});

api.post("/", async (c) => {
    const body = await c.req.json();
    try {
        const newFlipper = new Flipper(body);
        const saveFlipper = await newFlipper.save();
        return c.json(saveFlipper, 201);
    } catch (error: any) {
        return c.json({ msg: "An error occurred while saving the flipper", error: error.message }, 400);
    }
});

api.put("/:flipperId", async (c) => {
    const _id = c.req.param("flipperId");
    const body = await c.req.json();
    if (!isValidObjectId(_id)) {
        return c.json({ msg: "ObjectId malformed" }, 400);
    }
    try {
        const q = { _id };
        const updateQuery = { ...body };
        const tryToUpdate = await Flipper.findOneAndUpdate(q, updateQuery, {
            new: true,
        });
        if (tryToUpdate) {
            return c.json(tryToUpdate, 200);
        }
        return c.json({ msg: "Flipper not found" }, 404);
    } catch (error: any) {
        return c.json({ msg: "An error occurred while updating the flipper", error: error.message }, 500);
    }
});

api.patch("/:flipperId", async (c) => {
    const _id = c.req.param("flipperId");
    const body = await c.req.json();
    if (!isValidObjectId(_id)) {
        return c.json({ msg: "ObjectId malformed" }, 400);
    }
    try {
        const q = { _id };
        const updateQuery = { $set: { ...body } };
        const tryToUpdate = await Flipper.findOneAndUpdate(q, updateQuery, {
            new: true,
        });
        if (tryToUpdate) {
            return c.json(tryToUpdate, 200);
        }
        return c.json({ msg: "Flipper not found" }, 404);
    } catch (error: any) {
        return c.json({ msg: "An error occurred while updating the flipper", error: error.message }, 500);
    }
});

api.delete("/:flipperId", async (c) => {
    const _id = c.req.param("flipperId");
    if (!isValidObjectId(_id)) {
        return c.json({ msg: "ObjectId malformed" }, 400);
    }
    try {
        const tryToDelete = await Flipper.deleteOne({ _id });
        const { deletedCount } = tryToDelete;
        if (deletedCount) {
            return c.json({ msg: "DELETE done" });
        }
        return c.json({ msg: "Flipper not found" }, 404);
    } catch (error: any) {
        return c.json({ msg: "An error occurred while deleting the flipper", error: error.message }, 500);
    }
});

export default api;
