import Web3 from "web3";
// import {abi, contract} from '../Utilies/Contract'
let accountAd;

// const tokenContractOf = () => {
//   let newContract = new window.web3.eth.Contract(abi, contract);
//   return newContract;
// };
let accounts;
const getAccounts = async () => {
  const web3 = window.web3;
  try {
    accounts = await web3.eth.getAccounts();
    return accounts;
  } catch (error) {
    console.log("Error while fetching acounts: ", error);
    return null;
  }
};

export const loadAccountAddress = async () => {
  let isConnected = false;
    try {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
           await window.web3.eth.getChainId((err, netId) => {
                // console.log("networkId==>", netId);
                switch (netId.toString()) {
                  case "4":
                    // toast.success("Connected With Binance Main Network")
                    isConnected=true;
                    break;
                  default:
                    isConnected=false;
                }
                
                
              }
             );
             if (isConnected == true) {    
                let accounts = await getAccounts();
                return accounts[0];
                
            }else{
                return "Connect to Rinkeby"
            }
        } 
        else {
            let res= "No Wallet";
            return res;
        //   console.log("No Wallet found!");
        }  
    }catch (error) {
        let res= "No Wallet";

        return res
        // console.log("Error while loding web3", error);
    }
};