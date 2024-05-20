import mongoose from 'mongoose';

const userBankAccountSchema = new mongoose.Schema({
  cardHolderName: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expDate:{
    expMonth: {
      type: Number,
      required: true
    },
    expYear: {
      type: Number,
      required: true
    }
  },
  cvv: {
    type: String,
    required: true,
  },
  UserId: mongoose.Schema.Types.ObjectId
},{
  collection: 'UserBankAccount'
}
);

const userBankAccountModel = mongoose.model('UserBankAccount', userBankAccountSchema);

class UserBankAccount {
  constructor(data) {
    this.data = data;
  }

  // Create a new bank account
  static async createBankAccount(data) {
    const newBankAccount = new userBankAccountModel(data);
    return await newBankAccount.save();
  }

  // Get bank account details by UserId
  static async getBankAccountByUserId(userId) {
    return await userBankAccountModel.findOne({ UserId: userId });
  }

  // Update bank account details
  static async updateBankAccount(userId, updates) {
    return await userBankAccountModel.findOneAndUpdate(
      { UserId: userId },
      updates,
      { new: true }
    );
  }

  // Delete bank account
  static async deleteBankAccount(userId) {
    return await userBankAccountModel.findOneAndDelete({ UserId: userId });
  }
}

export default UserBankAccount;