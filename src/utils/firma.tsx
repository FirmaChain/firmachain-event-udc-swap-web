import { FirmaSDK, FirmaUtil } from "@firmachain/firma-js";
import { NETWORK_CONFIG } from "../config";
import { convertNumber } from "./common";

const NETWORK = process.env.REACT_APP_CHAIN_NETWORK;
const SDK = new FirmaSDK(NETWORK_CONFIG[`${NETWORK}`])

export const getBalanceFromAddrress = async (address: string) => {
    try {
        let balance = await SDK.Bank.getBalance(address);
        return convertNumber(balance);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getTokenBalanceFromDenom = async (address: string, denom: string) => {
    try {
        let balance = 0;
        let allList = await SDK.Bank.getTokenBalanceList(address);
        
        allList
            .filter((token) => token.denom === denom)
            .map((value) => {
                return (balance += convertNumber(value.amount));
            });

        return balance;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const convertFCTStringFromUFCT = (amount: number) => {
    try {
        let balance = FirmaUtil.getFCTStringFromUFCT(amount);
        return balance;
    } catch (error) {
        console.log(error);
        return '0';
    }
}