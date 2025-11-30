import Notification from "../models/Notification.js";

export const sendNotification = async (req, res) => {
  try {
    const { type, message, targetEmail } = req.body;

    const notif = await Notification.create({
      type,
      message,
      timestamp: Date.now(),
      userEmail: targetEmail,
    });

    return res.json(notif);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const userEmail = req.user;
    const notifs = await Notification.find({ userEmail });
    return res.json(notifs);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
