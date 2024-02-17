import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const oneYearInSeconds = 365n * 24n * 60n * 60n;
  const unlockTime = currentTimestampInSeconds + Number(oneYearInSeconds);

  const lockedAmount = ethers.utils.parseEther("0.00000001");

  try {
    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
    
    await lock.deployed();

    console.log(`Lock with 0.00000001 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
    console.log(`Block explorer URL: https://blockscout.scroll.io/address/${lock.address}`);
  } catch (error) {
    console.error("Error deploying contract:", error);
    process.exitCode = 1;
  }
}

// Use async/await pattern with error handling
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});