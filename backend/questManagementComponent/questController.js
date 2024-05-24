import Quest from './quest.js';
import User from '../userManagementComponent/user.js';

export const createQuest = async (req, res) => {
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

export const getAllQuestsByCreator = async (req, res) => {
  if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized access: No user ID found." });
  }
  try {
      const quests = await Quest.findAllByCreator(req.user._id);

      if (!quests.length) {
          return res.status(404).json({ message: "No quests found for this user." });
      }
      res.status(200).json(quests);
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
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized access: No user ID found." });
  }
  try {
    const statusIndex = 1;
    const quest = await Quest.findQuestByAcceptor(req.user._id, statusIndex);
    if (!quest) {
      return res.status(404).json({ message: "No matching quest found." });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.flightDetails.alreadyThere) {
        quest.progressIndex = 2;
        await quest.save();
    }
    res.json(quest);
  } catch (error) {
    console.error('Error fetching quest:', error);
    res.status(500).json({ message: 'Error fetching quest' });
  }
};

export const getAllQuestsByAcceptor = async (req, res) => {
  if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized access: No user ID found." });
  }
  try {
      const quests = await Quest.findAllByAcceptor(req.user._id);

      if (!quests.length) {
          return res.status(404).json({ message: "No quests found for this acceptor." });
      }
      res.status(200).json(quests);
  } catch (error) {
      console.error('Error fetching quests by acceptor:', error);
      res.status(500).json({ message: 'Error fetching quests' });
  }
};

export const updateQuestIndices = async (req, res) => {
  const { questId } = req.params;
  const { statusIndex, progressIndex } = req.body;  // Corrected destructuring

  try {
    const quest = await Quest.findById(questId);
    if (!quest) {
      return res.status(404).json({ message: "Quest not found" });
    }

    console.log(`Original indices - statusIndex: ${quest.statusIndex}, progressIndex: ${quest.progressIndex}`);

    // Update the indices
    quest.statusIndex = statusIndex;
    quest.progressIndex = progressIndex;

    const updatedQuest = await quest.save();
    console.log(`Updated indices - statusIndex: ${updatedQuest.statusIndex}, progressIndex: ${updatedQuest.progressIndex}`);

    res.json(updatedQuest);
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
    res.json({message:"Quest canceled successfully",quest});
  } catch (error) {
    console.error('Failed to update quest:', error);
    res.status(500).json({ message: "An error occurred while updating the quest" });
  }
};