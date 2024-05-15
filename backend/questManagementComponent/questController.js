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
    const statusIndex = 1;
    const quest = await Quest.findByCreator(req.user._id, statusIndex);

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
    const acceptedById = req.params.acceptedById;  // Or extract from req.user if it's the logged-in user
    const statusIndex = 1;

    const quest = await Quest.getQuestByAcceptor(acceptedById, statusIndex);
    if (!quest) {
      return res.status(404).json({ message: "No matching quest found." });
    }
    res.json(quest);
  } catch (error) {
    console.error('Error fetching quest:', error);
    res.status(500).json({ message: 'Error fetching quest' });
  }
};

// Function to update quest's statusIndex and progressIndex
export const updateQuestIndices = async (req, res) => {
  const { questId } = req.params; // Get the quest ID from the URL parameters
  const { statusIndex, progressIndex } = req.body; // Extract statusIndex and progressIndex from the request body

  try {
    // Find the quest by ID and update it
    const quest = await Quest.findById(questId);

    if (!quest) {
      return res.status(404).json({ message: "Quest not found" });
    }

    // Check if the current user is allowed to update this quest
    if (quest.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to update this quest" });
    }

    // Update the quest
    quest.statusIndex = statusIndex;
    quest.progressIndex = progressIndex;

    await quest.save(); // Save the updated quest

    res.json(quest); // Send back the updated quest
  } catch (error) {
    console.error('Failed to update quest:', error);
    res.status(500).json({ message: "An error occurred while updating the quest" });
  }
};