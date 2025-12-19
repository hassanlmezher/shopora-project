import Store from "../models/Store.js";
export const requestStore = async (req, res) => {
    try {
        const { owner, title, description, phone } = req.body;
        if (!owner || !title?.trim() || !description?.trim() || !phone?.trim()) {
            return res.status(400).json({ message: "Owner, title, description, and phone are required." });
        }
        const store = await Store.create({
            owner,
            title: title.trim(),
            description: description.trim(),
            phone: phone.trim(),
            status: "pending",
        });
        return res.status(201).json(store.toJSON());
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to create store request";
        return res.status(500).json({ message });
    }
};
export const getStores = async (_req, res) => {
    try {
        const stores = await Store.find({ status: "approved" }).populate("owner", "email");
        return res.json(stores.map((store) => store.toJSON()));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to fetch stores";
        return res.status(500).json({ message });
    }
};
export const updateStoreStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!status || !["pending", "approved", "declined"].includes(status)) {
            return res.status(400).json({ message: "A valid status is required." });
        }
        const store = await Store.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }
        return res.json(store.toJSON());
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to update store status";
        return res.status(500).json({ message });
    }
};
