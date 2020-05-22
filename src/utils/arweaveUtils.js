import Arweave from "arweave/web";
import { notification } from "antd";

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

const arweave = Arweave.init({
  host: "arweave.net",
  protocol: "https",
  timeout: 20000,
  logging: false,
});

const createTransaction = async (
  arReceiverAddress,
  arValue,
  walletData,
) => {
  let transaction = await arweave.createTransaction(
    {
      target: arReceiverAddress,
      quantity: arweave.ar.arToWinston(arValue),
    },
    walletData
  );
  return transaction;
};

const signAndDeployTransaction = async (transaction, walletData) => {
  await arweave.transactions.sign(transaction, walletData);
  const response = await arweave.transactions.post(transaction);
  return response;
};

const getAddressAndBalance = async (walletData) => {
  const address = await arweave.wallets.jwkToAddress(walletData);
  const rawBalance = await arweave.wallets.getBalance(address);
  const balance = await arweave.ar.winstonToAr(rawBalance);
  return { address, balance };
};

export {
  createTransaction,
  signAndDeployTransaction,
  getAddressAndBalance,
  openNotificationWithIcon,
};
