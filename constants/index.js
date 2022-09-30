const daiContractAddress = "0x29282139fD1A88ccAED6d3bb7f547192144C0f95"
const superBetContractAddress = "0x0288497267EAb562a1849570291935595DEf71ec"
const gameCreateRequestId = "0x7a29c3073173a85e601535e5c66e4a3012be719a61e4d146d1ec30241349efcbc"
const gameResolveRequestId = "0x27055d93d1ea190ee64eb80706c466bfb96151db8fabb41e6f0418643feba1ef"
const daiAbi = require("./daiAbi.json")
const betContractAbi = require("./betContractAbi.json")

module.exports = {
    daiAbi,
    daiContractAddress,
    betContractAbi,
    superBetContractAddress,
    gameCreateRequestId,
    gameResolveRequestId
}