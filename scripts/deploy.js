// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require('fs');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Votingomni = await hre.ethers.getContractFactory("VotingFactory");
  const votingomni = await Votingomni.deploy();

  await votingomni.deployed();

  console.log("Greeter deployed to:", votingomni.address);


  let baseTokenURI = "https://gateway.pinata.cloud/ipfs/QmSWFAGXjoQt65U42qqkPntPa7Z5Pmw5p7LA8UbCBLxg4h/";


  const MintNFT1155 = await hre.ethers.getContractFactory("MintNFT");
  const mintnft1155 = await MintNFT1155.deploy(baseTokenURI);
  await mintnft1155.deployed();
  console.log("erc1155 deployed to:", mintnft1155.address);



  let config  = `
  module.exports = {
    votingomniAddress: "${votingomni.address}",
    mintnft1155Address: "${mintnft1155.address}"
  }`

  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
