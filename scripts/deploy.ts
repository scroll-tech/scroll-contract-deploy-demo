import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = ethers.utils.parseEther("0.00000001");

  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(`Lock with 0.00000001 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
  // console.log(`Block explorer URL: https://l2scan.scroll.io/address/${lock.address}`); Uncomment here to use the pre-alpha
  // console.log(`Block explorer URL: https://blockscout.scroll.io/address/${lock.address}`); Uncomment here to use the alpha
  console.log(`Block explorer URL: https://sepolia.scrollscan.com/address/${lock.address}`); // Sepolia block explorer
  // console.log(`Block explorer URL: https://scrollscan.com//address/${lock.address}`); // Mainnet block explorer
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
