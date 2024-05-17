import mongoose from 'mongoose';

const VaultSchema = new mongoose.Schema({
  questId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quest', required: true },
  vaultBalance: Number,
  commitmentFee: Number,
  serviceFee: Number,
  feesDeducted: { type: Boolean, default: false }
}, {
  collection: 'Vaults',
  timestamps: true
});

const VaultModel = mongoose.model('Vault', VaultSchema);

class Vault {
    constructor(data) {
      this.data = data;
    }
  
    static async create(data) {
      const vault = new VaultModel(data);
      return vault.save();
    }
  
    static async findById(id) {
      return VaultModel.findById(id).lean();
    }
  
    static async updateById(id, updates) {
      return VaultModel.findByIdAndUpdate(id, updates, { new: true });
    }
  
    static async deleteById(id) {
      return VaultModel.findByIdAndDelete(id);
    }
  
    static async find(criteria) {
      return VaultModel.find(criteria).lean();
    }
  }
export default Vault;
