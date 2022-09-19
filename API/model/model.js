import { CHAIN_ID, BET_CONTRACT_ADDRESS, BET_CONTRACT_ABI } from "../constants";


let model = () => {
    let setup = {}
    setup.chain = CHAIN_ID
    setup.addressOrName = BET_CONTRACT_ADDRESS
    setup.contractInterface = BET_CONTRACT_ABI
    setup.functionName = ''
    setup.args = []

    return setup;
}

export default model