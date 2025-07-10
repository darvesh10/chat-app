import Message from '../models/Message.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

export const sendMessage = async (req, res) => {
  const { senderId, receiverId, text } = req.body;
  let mediaUrl = '';

  if (req.file) {
    // ✅ Upload image/file to Cloudinary
    const uploaded = await uploadToCloudinary(req.file.path, 'chat_media');
    mediaUrl = uploaded.secure_url;
  }

  const message = new Message({
    sender: senderId,
    receiver: receiverId,
    text,
    media: mediaUrl
  });

  try {
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message' });
  }
};
