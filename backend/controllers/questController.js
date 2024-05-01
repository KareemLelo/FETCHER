import Quest from '../userManagementComponent/quest.js';

export const createQuest = async (req, res) => {
  try {
    const { title, category, price, quantity, direction, weight, link } = req.body;

    const newQuest = new Quest({
      title,
      category,
      price,
      quantity,
      direction,
      weight,
      link,
      createdBy: req.user._id, // Assuming you have user information in the request
    });

    const savedQuest = await newQuest.save();
    res.status(201).json(savedQuest);
  } catch (error) {
    console.error('Error creating new quest:', error);
    res.status(500).json({ message: 'Error creating new quest' });
  }
};
