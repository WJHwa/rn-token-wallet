import Web3 from 'web3';
import '../../shim';
import data from '../../data.json';

let web3 = new Web3(new Web3.providers.HttpProvider(data.provider));

export default async function getbalance(address, type) {
  let balance;
  switch (type) {
    case 'ether':
      balance = await web3.eth.getBalance(address);
      const etherString = web3.utils.fromWei(balan);
      return etherString;
    case 'ERC':
      const contract = data.contract;
      const ABI = data.ABI;
      const Contracted = new web3.eth.Contract(ABI, contract);
      balance = await Contracted.methods.balanceOf(address).call();
      return balance;

    default:
      return;
  }
}
