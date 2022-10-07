# Scroll Contract Deployment Demo

This project demonstrates how to use hardhat or foundry to deploy a contract in Scroll testnet. This project contains a simple contract which will lock certain amounts of Ether in the deployed contract for 1 year.

## Deploy with Hardhat

1. Run `yarn install` to install dependency.
2. Create a `.env` file following the example `.env.example` in the root directory. Change `PRIVATE_KEY` to your own account private key in the `.env`.
3. Run `yarn compile` to compile the contract.
4. Run `yarn deploy:scrollTestnet` to deploy the contract in Scroll testnet.

## Deploy with Foundry

1. Install Foundry.
    ```shell
    curl -L https://foundry.paradigm.xyz | bash
    foundryup
    ```
2. Build the project.
    ```
    forge build
    ```
3. Deploy the contract.
    ```
    forge create --rpc-url https://prealpha.scroll.io/l2 \
      --value <lock_amount> \
      --constructor-args <unlock_time> \
      --private-key <your_private_key> \
      --legacy \
      contracts/Lock.sol:Lock
    ```
