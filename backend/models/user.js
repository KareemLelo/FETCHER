// models/User.js
import mongoose from 'mongoose';

// Create a Schema corresponding to the document interface.
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  accCategory: String,
  userName: String,
  password: String, // Remember to hash passwords in a real application
  mobile: String,
},{
  collection: 'BZKUsers'
});

// Create a Model.
const UserModel = mongoose.model('User', userSchema);

// Using a class to encapsulate methods related to the User model.
class User {
  constructor(data) {
    this.data = data;
    this.model = UserModel; // The Mongoose model is now a property of the class.
  }

  async save() {
    // Create a new document in the database from the data provided to the class.
    const newUser = new this.model(this.data);
    return newUser.save();
  }

  // Add more methods as needed for your business logic.
}

export default User;
