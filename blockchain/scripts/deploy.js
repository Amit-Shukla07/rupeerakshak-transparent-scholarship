const hre = require("hardhat");

async function main() {
    const ScholarshipPlatform = await hre.ethers.getContractFactory("ScholarshipPlatform");
    const scholarshipPlatform = await ScholarshipPlatform.deploy();

    await scholarshipPlatform.waitForDeployment();

    console.log(`ScholarshipPlatform deployed to ${scholarshipPlatform.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
