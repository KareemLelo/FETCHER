import Quest from './quest.js';

export const createQuest = async (req, res) => {
  console.log(req.user);  // Check what is being set here
  try {
    if (!req.user) {
      throw new Error('User not authenticated');
    }
    const { itemName, itemCategory, itemPrice, itemQuantity, itemDirection, itemWeight, itemLink, statusIndex, progressIndex} = req.body;
    const newQuest = new Quest({
      itemName,
      itemCategory,
      itemPrice,
      itemQuantity,
      itemDirection,
      itemWeight,
      itemLink,
      statusIndex: statusIndex,
      progressIndex: progressIndex,
      createdBy: req.user._id,
      acceptedBy: null
    });
    const savedQuest = await newQuest.save();
    res.status(201).json(savedQuest);
  } catch (error) {
    console.error('Error creating new quest:', error);
    res.status(500).json({ message: 'Error creating new quest' });
  }
};

export const getAvailableQuests = async (req, res) => {
  try {
    const quests = await Quest.find({ statusIndex: 0 }); // Modify the query as needed
    res.status(200).json(quests);
  } catch (error) {
    console.error('Error fetching quests:', error);
    res.status(500).json({ message: 'Error fetching quests' });
  }
};

export const getQuestByCreator = async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized access: No user ID found." });
  }
  try {
    const quest = await Quest.findByCreator(req.user._id).lean();
    if (!quest) {
      return res.status(404).json({ message: "No quests found for this user." });
    }
    res.status(200).json(quest);
  } catch (error) {
    console.error('Error fetching quests by creator:', error);
    res.status(500).json({ message: 'Error fetching quests' });
  }
};
