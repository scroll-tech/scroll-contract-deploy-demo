from brownie import accounts, Lock, Wei
import time

BROWNIE_ACCOUNT_NAME = 'main-account'
ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60
TOTAL_LOCKED_AMOUNT_IN_ETHER = '0.00000001'
    
def deploy():

    account = accounts.load(BROWNIE_ACCOUNT_NAME)

    currentTimestampInSeconds = round(time.time())
    unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS
    lockedAmount = Wei(f'{TOTAL_LOCKED_AMOUNT_IN_ETHER} ether')
    
    lock = Lock.deploy(unlockTime, {"from": account, "value": lockedAmount})

    print(f'Lock with {TOTAL_LOCKED_AMOUNT_IN_ETHER} ETH and unlock timestamp {unlockTime} deployed to {lock.address}')

    # Pre-alpha block explorer.
    # print(f'Block explorer URL: https://l2scan.scroll.io/address/{lock.address}')
    # Testnet block explorer.
    # print(f'Block explorer URL: https://sepolia.scrollscan.com/address/{lock.address}')
    # Mainnet block explorer.
    print(f'Block explorer URL: https://blockscout.scroll.io/address/{lock.address}')
    
def main():

    deploy()