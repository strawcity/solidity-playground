const main = async () => {
    const [owner, randoPerson] = await hre.ethers.getSigners();
    const playgroundFactory = await hre.ethers.getContractFactory('Playground');
    const playgroundContract = await playgroundFactory.deploy({ value: ethers.utils.parseEther("1") });

    await playgroundContract.deployed();

    console.log("Contract deployed to:", playgroundContract.address);
    // To log the balance of a contract when deploying:
    const contractBalance = await hre.ethers.provider.getBalance(playgroundContract.address)
    console.log('Contract Balance: ', hre.ethers.utils.formatEther(contractBalance));
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await playgroundContract.getTotalWaves();

    let waveTxn = await playgroundContract.wave();
    await waveTxn.wait();

    waveTxn = await playgroundContract.connect(randoPerson).wave()
    await waveTxn.wait()

    waveCount = await playgroundContract.getTotalWaves();
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();