import Vault from './vault.js';

export const createVault = async (req, res) => {
  try {
    const { questId, vaultBalance, commitmentFee, serviceFee } = req.body;
    const newVault = await Vault.create({ questId, vaultBalance, commitmentFee, serviceFee });
    res.status(201).json(newVault);
  } catch (error) {
    console.error('Error creating vault:', error);
    res.status(500).json({ message: 'Error creating vault' });
  }
};

export const getVaultById = async (req, res) => {
  try {
    const vault = await Vault.findById(req.params.id);

    if (!vault) {
      return res.status(404).json({ message: 'Vault not found' });
    }

    res.status(200).json(vault);
  } catch (error) {
    console.error('Error fetching vault:', error);
    res.status(500).json({ message: 'Error fetching vault' });
  }
};

export const updateVault = async (req, res) => {
  try {
    const { vaultBalance, commitmentFee, serviceFee, feesDeducted } = req.body;
    const updatedVault = await Vault.updateById(req.params.id, { vaultBalance, commitmentFee, serviceFee, feesDeducted });

    if (!updatedVault) {
      return res.status(404).json({ message: 'Vault not found' });
    }

    res.status(200).json(updatedVault);
  } catch (error) {
    console.error('Error updating vault:', error);
    res.status(500).json({ message: 'Error updating vault' });
  }
};