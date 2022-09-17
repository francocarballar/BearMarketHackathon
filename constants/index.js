const daiContractAddress = "0x29282139fD1A88ccAED6d3bb7f547192144C0f95"
const superBetContractAddress = "0xB4a090fe9c54A7Ee9908Bfd5903b0a4f54689e32"
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