import Quest from './quest.js';

export const createQuest = async (req, res) => {
  console.log(req.user);  // Check what is being set here
  try {
    if (!req.user) {
      throw new Error('User not authenticated');
    }
    const { itemName, itemCategory, itemPrice, itemQuantity, itemDirection, itemWeight, itemLink} = req.body;
    const newQuest = new Quest({
      itemName,
      itemCategory,
      itemPrice,
      itemQuantity,
      itemDirection,
      itemWeight,
      itemLink,
      statusIndex: 0,
      progressIndex: 0,
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
    const quests = await Quest.find({ statusIndex: 0 });
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
    const quest = await Quest.findByCreator(req.user._id);

    if (!quest) {
      return res.status(404).json({ message: "No quests found for this user." });
    }
    res.status(200).json(quest);
  } catch (error) {
    console.error('Error fetching quests by creator:', error);
    res.status(500).json({ message: 'Error fetching quests' });
  }
};

export const getQuestByCreatorTrackOrder = async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized access: No user ID found." });
  }
  try {
    const statusIndex = 1;
    const quest = await Quest.findByCreatorTrackOrder(req.user._id, statusIndex);

    if (!quest) {
      return res.status(404).json({ message: "No quests found for this user." });
    }
    res.status(200).json(quest);
  } catch (error) {
    console.error('Error fetching quests by creator:', error);
    res.status(500).json({ message: 'Error fetching quests' });
  }
};

export const getQuestByAcceptor = async (req, res) => {
  try {
    const acceptedById = req.params.acceptedById;
    const statusIndex = 1;

    const quest = await Quest.findQuestByAcceptor(acceptedById, statusIndex);
    if (!quest) {
      return res.status(404).json({ message: "No matching quest found." });
    }
    res.json(quest);
  } catch (error) {
    console.error('Error fetching quest:', error);
    res.status(500).json({ message: 'Error fetching quest' });
  }
};

export const updateQuestIndices = async (req, res) => {
  const { questId } = req.params;
  const {statusIndex} = req.body.statusIndex;
  const {progressIndex} = req.body.progressIndex;

  try {
    const quest = await Quest.findById(questId);

    if (!quest) {
      return res.status(404).json({ message: "Quest not found" });
    }

    quest.statusIndex = statusIndex;
    quest.progressIndex = progressIndex;

    await quest.save();

    res.json(quest);
  } catch (error) {
    console.error('Failed to update quest:', error);
    res.status(500).json({ message: "An error occurred while updating the quest" });
  }
};

export const updateCanceledBy = async (req, res) => {
  const { questId } = req.params;
  const { canceledBy } = req.body;

  try {
    const quest = await Quest.findById(questId);

    if (!quest) {
      return res.status(404).json({ message: "Quest not found" });
    }
    quest.canceledBy = canceledBy;

    await quest.save();
    res.json(quest);
  } catch (error) {
    console.error('Failed to update quest:', error);
    res.status(500).json({ message: "An error occurred while updating the quest" });
  }
};