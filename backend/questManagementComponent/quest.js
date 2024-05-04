import mongoose from 'mongoose';

const questSchema = new mongoose.Schema({
  itemName: String, 
  itemCategory: String, 
  itemQuantity: Number,
  itemDirection: String,
  itemWeight: Number,
  itemPrice:{
    type: Number,
    required: true,
    min: [10, 'Price must be positive']
  },
  itemLink: String,
  status: {
    type: String,
    default: 'pending', // or 'accepted', 'completed', etc.
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
  collection: 'Quests'
});
const QuestModel = mongoose.model('Quest', questSchema, 'Quests');
class Quest {
    constructor(data) {
      this.data = data;
      this.model = QuestModel;
    }
    
    static async findByName(itemName) {
      let quest = await QuestModel.findOne({ itemName }).lean();// .lean() is optional for performance
      if (!quest) {
        throw new Error(`no quest found with name: ${itemName}`);
      }
      return quest;
    }
    static async find(criteria) {
      return await QuestModel.find(criteria).lean(); // Use lean for performance if you don't need a full Mongoose document
  }
  
    /*async save() {
      const newQuest = new Quest(this.data);
      return newQuest.save();
    }*/
    async save() {
      // Create a new document in the database from the data provided to the class.
      const newQuest = new this.model(this.data);
      return newQuest.save();
    }
}

// Convert schema to model
//questSchema.loadClass(Quest);
//const QuestModel = mongoose.model('Quest', questSchema);

export default Quest;