import mongoose from 'mongoose';

const creditCardSchema = new mongoose.Schema({
  cardHolderName: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true,
    // Store only the last four digits
  },
  expiryMonth: {
    type: String,
    required: true
  },
  expiryYear: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true,
    // Do not store CVV
  },
  // Additional fields if necessary
});

const CreditCard = mongoose.model('CreditCard', creditCardSchema);

export default CreditCard;