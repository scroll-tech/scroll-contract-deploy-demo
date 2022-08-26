# Scroll Contract Deploy Demo

This project demonstrates how to use hardhat to deploy a contract in Scroll testnet. This project contains a simple contract which will lock certain amounts of Ether in the deployed contract for 1 year.

1. Run `yarn install` to install dependency.
2. Create a file `.env` in the directory, or just copy `.env.example` to `.env`.
3. Change `PRIVATE_KEY` and `SCROLL_TESTNET_URL` to the correct one in file `.env`.
4. Run `yarn compile` to compile the contract.
5. Run `yarn deploy:scollTestnet` to deploy the contract in Scroll testnet.
