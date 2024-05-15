import mongoose from 'mongoose';

const questSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemCategory: String,
  itemQuantity: Number,
  itemDirection: String,
  itemWeight: Number,
  itemPrice:
  {
    type: Number,
    required: true,
    min: [10, 'Price must be positive']
  },
  itemLink: String,
  statusIndex: Number,
  progressIndex: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuestMakers',  // Assuming you have a User model and each quest is associated with a user
    required: true
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fetchers',  // Assuming you use the 'User' model for Fetchers as well
    default: null  
  },
  agreeStatusF:{
    type: Boolean,
    default: true
  },
  agreeStatusQ: {
    type: Boolean,
    default: true
  },
  canceledBy: {
    type : String,
    default: null
  }
}, {
  timestamps: true,
  collection: 'Quests'
});

const QuestModel = mongoose.model('Quest', questSchema, 'Quests');
class Quest {
    constructor(data) {
      this.data = data;
      this.model = QuestModel;
    }
    
    static async findByCreator(creatorId) {
      return await QuestModel.findOne({ createdBy: creatorId, statusIndex: 0 });
    }
    static async findByCreatorTrackOrder(creatorId, statusIndex) {
      return await QuestModel.findOne({ createdBy: creatorId, statusIndex: statusIndex });
    }

    static async findById(id) {
      return await QuestModel.findById(id);
    }
    
    static async findByName(itemName) {
      let quest = await QuestModel.findOne({ itemName });
      if (!quest) {
        throw new Error(`no quest found with name: ${itemName}`);
      }
      return quest;
    }
    static async find(criteria) {
      return await QuestModel.find(criteria); // Use lean for performance if you don't need a full Mongoose document
    }
    static async findQuestByAcceptor(acceptedById, statusIndex) {
      return await QuestModel.findOne({
        acceptedBy: mongoose.Types.ObjectId(acceptedById),
        statusIndex: statusIndex
      }).lean();
    }  
  
    async save() {
      // Create a new document in the database from the data provided to the class.
      const newQuest = new this.model(this.data);
      return newQuest.save();
    }
    //hi bana
}

export default Quest;