// Import necessary modules
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

// Define the test suite
describe("Lock", function () {
  // Define a fixture to reuse the same setup in every test
  async function deployOneYearLockFixture() {
    // Constants for one year in seconds and one gwei
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    // Locked amount and unlock time calculation
    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Get signers (accounts) from Hardhat Network
    const [owner, otherAccount] = await ethers.getSigners();

    // Deploy Lock contract with calculated unlock time and locked amount
    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    // Return necessary information
    return { lock, unlockTime, lockedAmount, owner, otherAccount };
  }

  // Test suite for contract deployment
  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

      // Verify unlockTime is set correctly
      expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it("Should set the right owner", async function () {
      const { lock, owner } = await loadFixture(deployOneYearLockFixture);

      // Verify owner address is set correctly
      expect(await lock.owner()).to.equal(owner.address);
    });

    it("Should receive and store the funds to lock", async function () {
      const { lock, lockedAmount } = await loadFixture(
        deployOneYearLockFixture
      );

      // Verify locked amount is received and stored correctly
      expect(await ethers.provider.getBalance(lock.address)).to.equal(
        lockedAmount
      );
    });

    it("Should fail if the unlockTime is not in the future", async function () {
      // Get the latest time from Hardhat Network
      const latestTime = await time.latest();
      // Deploy Lock contract with latest time as unlock time (which is not in the future)
      const Lock = await ethers.getContractFactory("Lock");
      // Verify deployment reverts with appropriate error message
      await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
        "Unlock time should be in the future"
      );
    });
  });

  // Test suite for withdrawals
  describe("Withdrawals", function () {
    // Test suite for validation checks
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { lock } = await loadFixture(deployOneYearLockFixture);

        // Verify withdrawal reverts with appropriate error message if called too soon
        await expect(lock.withdraw()).to.be.revertedWith(
          "You can't withdraw yet"
        );
      });

      it("Should revert with the right error if called from another account", async function () {
        const { lock, unlockTime, otherAccount } = await loadFixture(
          deployOneYearLockFixture
        );

        // Increase time to unlock time
        await time.increaseTo(unlockTime);

        // Verify withdrawal reverts with appropriate error message if called from another account
        await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
          "You aren't the owner"
        );
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { lock, unlockTime } = await loadFixture(
          deployOneYearLockFixture
        );

        // Increase time to unlock time
        await time.increaseTo(unlockTime);

        // Verify owner can withdraw without failure
        await expect(lock.withdraw()).not.to.be.reverted;
      });
    });

    // Test suite for events
    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { lock, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );

        // Increase time to unlock time
        await time.increaseTo(unlockTime);

        // Verify Withdrawal event is emitted with correct arguments
        await expect(lock.withdraw())
          .to.emit(lock, "Withdrawal")
          .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
      });
    });

    // Test suite for transfers
    describe("Transfers", function () {
      it("Should transfer the funds to the owner", async function () {
        const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
          deployOneYearLockFixture
        );

        // Increase time to unlock time
        await time.increaseTo(unlockTime);

        // Verify funds are transferred from lock contract to owner
        await expect(lock.withdraw()).to.changeEtherBalances(
          [owner, lock],
          [lockedAmount, -lockedAmount]
        );
      });
    });
  });
});
