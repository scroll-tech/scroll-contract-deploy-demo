# Scroll Contract Deployment Demo

This project demonstrates how to use hardhat, foundry or brownie to deploy a contract in Scroll's rollup network. This project contains a simple contract that will lock a certain amount of Ether in the deployed contract for a specified amount of time.


## Prerequisites

- Network setup: https://guide.scroll.io/user-guide/setup


## Deploy with Hardhat

1. If you haven't already, install [nodejs](https://nodejs.org/en/download/) and [yarn](https://classic.yarnpkg.com/lang/en/docs/install).
2. Run `yarn install` to install dependencies.
3. Create a `.env` file following the example `.env.example` in the root directory. Change `PRIVATE_KEY` to your own account private key in the `.env`.
4. Run `yarn compile` to compile the contract.
5. Run `yarn deploy:scrollTestnet` to deploy the contract on the Scroll Alpha Testnet.
6. Run `yarn test` for hardhat tests.


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
    forge create --rpc-url https://alpha-rpc.scroll.io/l2 \
      --value <lock_amount> \
      --constructor-args <unlock_time> \
      --private-key <your_private_key> \
      --legacy \
      contracts/Lock.sol:Lock
    ```
  - `<lock_amount>` is the amount of `ETH` to be locked in the contract. Try setting this to some small amount, like `0.0000001ether`.
  - `<unlock_time>` is the Unix timestamp after which the funds locked in the contract will become available for withdrawal. Try setting this to some Unix timestamp in the future, like `1696118400` (this Unix timestamp corresponds to October 1, 2023).
  
  For example:
  ```
  forge create --rpc-url https://alpha-rpc.scroll.io/l2 \
    --value 0.00000000002ether \
    --constructor-args 1696118400 \
    --private-key 0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1 \
    --legacy \
    contracts/Lock.sol:Lock
  ```

## Deploy with Brownie

### 1. Install pipx.

```shell
python3 -m pip install --user pipx
python3 -m pipx ensurepath
```

### 2. Install Brownie.

After you close and reopen the terminal, run the following command:

```shell
pipx install eth-brownie
```

or, alternatively, run:

```shell
pip install eth-brownie
```

### 3. Create a New Account.

Create a new Brownie account and add your EVM wallet to it. It will prompt you to enter your EVM wallet's private key and a new password for that specific account.

> **WARNING**
>
> NEVER SHARE YOUR PRIVATE KEY OR YOUR SECRET PHRASE WITH ANYONE.

```shell
# If you choose a different account name than [main-account], you will also need to change the global variable BROWNIE_ACCOUNT_NAME in <./scripts/deploy.py> to the new chosen name.
brownie accounts new main-account
```

If you want to list all created accounts, run the following command:

```shell
brownie accounts list
```

### 4. Add the Scroll Network to Brownie.

To add the Scroll Network to Brownie, run the following command: 

- For testnet:

```
brownie networks add Ethereum "Scroll (Testnet)" id=scrollSepolia host=https://sepolia-rpc.scroll.io/ chainid=534351 explorer=https://sepolia.scrollscan.com/
```

- For mainnet:

```
brownie networks add Ethereum "Scroll (Mainnet)" id=scroll host=https://rpc.scroll.io/ chainid=534352 explorer=https://scrollscan.com/
```

### 5. Prepare the Workspace.

Inside the project workspace root folder, compile the project by running the following command:

```shell	
brownie compile
```

### 6. Deploy the Contract.

After installing Brownie and compiling the project, it is time to run the `deploy.py` Python script that deploys the `Lock.sol` Solidity contract to the blockchain.

- For testnet:

```shell	
brownie run scripts/deploy.py --network scrollSepolia
```

- For mainnet:

```shell	
brownie run scripts/deploy.py --network scroll
```

## Support

Join our Discord: https://scroll.io/
