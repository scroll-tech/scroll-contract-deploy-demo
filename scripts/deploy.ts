import { ethers, run } from "hardhat";

/**
 * The main function deploys a Lock contract with a specified unlock time and locked amount, and then
 * verifies the contract on Scrollscan.
 */
async function main() {
  // Calculate the unlock time as one year from now
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
  const lockedAmount = ethers.utils.parseEther("0.00000001");

  // Deploy the Lock contract
  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(`Lock with 0.00000001 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);

 // Verify the contract on Scrollscan
  try {
    console.log("Starting verification process...");
    await run("verify:verify", {
      address: lock.address,
      constructorArguments: [unlockTime],
    });
    const network = await ethers.provider.getNetwork();
    // Determine the network and construct the Scrollscan URL
    const scrollscanUrl = getScrollscanUrl(network.name);
    console.log(`Contract verified. Check on Scrollscan: ${scrollscanUrl}/address/${lock.address}`);
  }
  catch (error) {
    console.error("Error during verification:", error);
  }

}

/**
 * The function `getScrollscanUrl` returns the corresponding URL based on the given network name.
 * @param {string} networkName - The `networkName` parameter is a string that represents the name of
 * the network. It can have two possible values: "scrollMainnet" or "scrollTestnet".
 * @returns a URL based on the provided network name. If the network name is "scrollMainnet", it
 * returns "https://scrollscan.com". If the network name is "scrollTestnet", it returns
 * "https://sepolia.scrollscan.com". For any other network name, it returns "https://scrollscan.com".
 */
function getScrollscanUrl(networkName: string) {
  switch (networkName) {
    case "scrollMainnet":
      return "https://scrollscan.com";
    case "scrollTestnet":
      return "https://sepolia.scrollscan.com";
    default:
      return "https://scrollscan.com";
  }
}

// Execute the main function and handle any errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});