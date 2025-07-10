import Group from '../models/Group.js';

export const createGroup = async (req, res) => {
  const { name, members, image } = req.body;
  try {
    const group = new Group({ name, members, image });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create group' });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch groups' });
  }
};
