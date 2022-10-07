# Scroll Contract Deploy Demo

This project demonstrates how to use hardhat or foundry to deploy a contract in Scroll testnet. This project contains a simple contract which will lock certain amounts of Ether in the deployed contract for 1 year.

## Deploy with hardhat

1. Run `yarn install` to install dependency.
2. Create a file `.env` in the directory, or just copy `.env.example` to `.env`.
3. Change `PRIVATE_KEY` and `SCROLL_TESTNET_URL` to the correct one in file `.env`.
4. Run `yarn compile` to compile the contract.
5. Run `yarn deploy:scrollTestnet` to deploy the contract in Scroll testnet.

## Deploy with foundry

### Installation

```
curl -L https://foundry.paradigm.xyz | bash
```

### Build

```
forge build
```

### Deploy

```
forge create --rpc-url <SCROLL_TESTNET_URL> \
  --value <lock_amount>
  --constructor-args <unlock_time> \
  --interactive \
  --legacy \
  contracts/Lock.sol:Lock
```