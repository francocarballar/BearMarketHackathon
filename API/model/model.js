
let model = () => {
    let setup = {}
    setup.chain = CHAIN_ID
    setup.addressOrName = BET_CONTRACT_ADDRESS
    setup.contractInterface = BET_CONTRACT_ABI
    setup.functionName = ''
    setup.args = []

    return setup;
}

module.exports = model