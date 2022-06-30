const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Kanessa", function () {
  let kanessa;

  this.beforeEach(async function () {
    const Kanessa = await ethers.getContractFactory("Kanessa");
    kanessa = await Kanessa.deploy();

    await kanessa.deployed();
  });

  it("NFT is minted successfully", async function () {
    const recipient = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";

    let balance = await kanessa.balanceOf(recipient);
    expect(balance).to.equal(0);

    const count = await kanessa.price();
    console.log(count);

    console.log(ethers.utils.parseEther("0.05"));

    const tx = await kanessa.payToMint(recipient, 1, {
      value: ethers.utils.parseEther("0.05"),
    });

    await tx.wait();

    expect(await kanessa.balanceOf(recipient)).to.equal(1);

    // console.log(await kanessa.tokenURI(0));
  });
});
