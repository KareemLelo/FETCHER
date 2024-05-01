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

export const acceptQuest = async (req, res) => {
  try {
    const quest = await Quest.findById(req.params._id);

    if (!quest) {
      return res.status(404).json({ message: "Quest not found" });
    }

    if (quest.status !== 'available') {
      return res.status(400).json({ message: "Quest is no longer available" });
    }

    quest.status = 'accepted';
    quest.acceptedBy = req.user._id; // The ID from the JWT payload
    await quest.save();

    res.status(200).json({ message: "Quest accepted successfully", quest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error accepting quest" });
  }
};
