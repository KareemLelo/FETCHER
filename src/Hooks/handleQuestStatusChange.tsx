/* import { useContent } from "./ContentContext";
import { useOrderStatus } from "./OrderStatusContext";
import { updateQuest } from "../Services/Api";

const useHandleQuestStatusChange = () => {
  const {
    statusIndex,
    progressIndex,
    canceledBy,
    balanceF,
    balanceQM,
    vaultBalance,
    commFee,
    servFee,
    feesDeducted,
    setBalanceF,
    setBalanceQM,
    setVaultBalance,
    setSystemBalance,
    setStatusIndex,
    setProgressIndex,
    setFeesDeducted,
    calculateFees,
  } = useOrderStatus();
  const { accountType } = useContent();

  const handleQuestStatusChange = async (
    quantity: number,
    weight: number,
    price: number
  ) => {
    await calculateFees(quantity, weight, price);

    switch (true) {
      case statusIndex === 1 && progressIndex === 0 && !feesDeducted:
        setBalanceF(balanceF - commFee);
        setBalanceQM(balanceQM - servFee);
        setVaultBalance(vaultBalance + commFee + servFee);
        setFeesDeducted(true);
        await updateFeesDeducted(true);
        break;

      case statusIndex === 3 && progressIndex === 5:
        setVaultBalance(vaultBalance - price - servFee - commFee);
        setBalanceF(balanceF + price + commFee + 0.5 * servFee);
        setSystemBalance(
          (prevSystemBalance) => prevSystemBalance + 0.5 * servFee
        );
        break;

      case statusIndex === 2 && canceledBy !== null:
        handleCancelCases();
        break;

      default:
        break;
    }
  };

  const handleCancelCases = () => {
    switch (true) {
      //Red Anyone Cancel
      case progressIndex === 0 &&
        (canceledBy === "QuestMaker" || canceledBy === "Fetcher"):
        setVaultBalance(vaultBalance - (commFee + servFee));
        setBalanceF(balanceF + commFee);
        setBalanceQM(balanceQM + servFee);
        break;

      //Orange QuetMaker Cancel
      case progressIndex === 1 && canceledBy === "QuestMaker":
        setVaultBalance(vaultBalance - commFee - servFee);
        setBalanceF(balanceF + commFee + 0.25 * servFee);
        setSystemBalance(
          (prevSystemBalance: number) => prevSystemBalance + 0.75 * servFee
        );
        break;

      //Orange Fetcher Cancel
      case progressIndex === 1 && canceledBy === "Fetcher":
        setVaultBalance(vaultBalance - commFee - servFee);
        setBalanceQM(balanceQM + servFee);
        setSystemBalance(
          (prevSystemBalance: number) => prevSystemBalance + commFee
        );
        break;

      //Yellow Disagree
      case progressIndex === 2 && canceledBy === "QuestMaker":
        setVaultBalance(vaultBalance - commFee - servFee);
        setBalanceF(balanceF + commFee + 0.5 * servFee);
        setSystemBalance(
          (prevSystemBalance: number) => prevSystemBalance + 0.5 * servFee
        );
        break;

      //Blue Fetcer Cancel
      case progressIndex === 4 && canceledBy === "Fetcher":
        setVaultBalance(vaultBalance - (price + commFee + servFee));
        setBalanceQM(balanceQM + price + servFee);
        setSystemBalance(
          (prevSystemBalance: number) => prevSystemBalance + commFee
        );
        break;

      default:
        break;
    }

    // Save updated values to the database
    updateQuest({
      vaultBalance,
      balanceQM,
      balanceF,
      TotalProfit,
    });
  };

  return { handleQuestStatusChange };
};

export default useHandleQuestStatusChange;
 */
