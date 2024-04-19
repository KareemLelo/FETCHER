import mongoose from 'mongoose';

// Create a Schema corresponding to the document interface.
const QuestMakerSchema = new mongoose.Schema({
 // _id: Number,
  firstName: String,
  lastName: String,
  email: String,
  accCategory: String,
  userName: String,
  password: String,
  mobile: String,
},
//{  versionKey:false},
{
  collection: 'BZKUsers'
});

const FetcherSchema = new mongoose.Schema({
  //_id: Number,
  firstName: String,
  lastName: String,
  email: String,
  accCategory: String,
  userName: String,
  password: String,
  mobile: String,
  flightdetails: {
    arrivalDate: Date,
    departureDate: Date,
    flightNumber: String
  }
},
//{  versionKey:false},
{
  collection: 'BZKUsers'
});
// Create a Model.
const QuestMakerModel = mongoose.model('QuestMaker', QuestMakerSchema, 'BZKUsers');
const FetcherModel = mongoose.model('Fetcher', FetcherSchema, 'BZKUsers');

// Using a class to encapsulate methods related to the User model.
class User {
  constructor(data) {
    if (data.accCategory === 'QuestMaker') {
      this.model = QuestMakerModel;
    } else if (data.accCategory === 'Fetcher') {
      this.model = FetcherModel;
    } else {
      throw new Error('Invalid account category!');
    }
    this.data = data;
  }

  async save() {
    // Create a new document in the database from the data provided to the class.
    const newUser = new this.model(this.data);
    return newUser.save();
  }

  static async findByUserName(userName) {
    // Ideally, you should be hashing the password and comparing the hashed password
    let user = await QuestMakerModel.findOne({ userName }).lean();
    if (!user) {
      user = await FetcherModel.findOne({ userName }).lean();// .lean() is optional for performance
    }
    return user;
  }

  // Check if the email or username already exists
  static async userNameOrEmailExists(userName, email) {
    console.log(`Checking if username: ${userName} or email: ${email} exists.`);

    const questMakerExists = await QuestMakerModel.findOne({
      $or: [{ userName }, { email }],
    }).lean();

    const fetcherExists = !questMakerExists && await FetcherModel.findOne({
      $or: [{ userName }, { email }],
    }).lean();

    return !!questMakerExists || !!fetcherExists;// Convert to boolean
  }
}

export default User;