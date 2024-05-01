import mongoose from 'mongoose';

const questSchema = new mongoose.Schema({
  itemName: String, 
  itemCategory: String, 
  itemQuantity: Number,
  itemDirection: String,
  itemWeight: Number,
  itemPrice: Number,
  itemLink: String,
  status: {
    type: String,
    default: 'available', // or 'accepted', 'completed', etc.
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model and each quest is associated with a user
    required: true
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you use the 'User' model for Fetchers as well
    default: null, // Indicates that the quest is not accepted yet
  },
},
{
  timestamps: true, // Adds createdAt and updatedAt timestamps
  collection: 'BZKQuests'
});

class Quest {
    constructor(data) {
      this.data = data;
    }
  
    async save() {
      const newQuest = new Quest(this.data);
      return newQuest.save();
    }
}

// Convert schema to model
questSchema.loadClass(Quest);
const QuestModel = mongoose.model('Quest', questSchema);

export default QuestModel;