const main = async () => {
    const [deployer] = await hre.ethers.getSigners();

    console.log('Deploying contracts with account: ', deployer.address);

    // To log the balance of a contract when deploying:
    const balance = await hre.ethers.provider.getBalance(deployer.address)
    console.log('Account balance: ', hre.ethers.utils.formatEther(balance));

    // getContractFactory gets the name of the file in the contracts folder
    const PlaygroundContract = await hre.ethers.getContractFactory('Playground');
    const portal = await PlaygroundContract.deploy({ value: ethers.utils.parseEther("1") });

    console.log('Playground address: ', portal.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runMain();