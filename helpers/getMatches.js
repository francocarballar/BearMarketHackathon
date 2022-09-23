import Moralis_v2 from 'moralis'
import Moralis from 'moralis-v1'
import { betContractAbi } from '../constants'

const allMatches = []

export default async function getMatches () {
  await Moralis_v2.start({
    apiKey: 'O3i5jPl78uSeh61yMkj2W4iaTXgZtch2cmiCngwcwTJPbfmgcqnmSiGZvtgOwel7'
  })

  const serverUrl = 'https://dcnqrknq91by.usemoralis.com:2053/server'
  const appId = '4uiRUothrilXBqrtJLaCow0Xs9K7GgFWZ6IXbVYg'
  const masterKey = '4uiRUothrilXBqrtJLaCow0Xs9K7GgFWZ6IXbVYg'
  await Moralis.start({ serverUrl, appId, masterKey })

  const RequestIds = Moralis.Object.extend('RequestIds')
  const query = new Moralis.Query(RequestIds)
  const results = await query.find()
  for (let i = 0; i < results.length; i++) {
    const object = results[i]
    const __requestId = object.get('uid')
    const getGameCreateStructLengthOptions = {
      chain: 0x5,
      address: '0xBccA419D284548856927ef789EbE6Fe6bc8de665',
      functionName: 'getGameCreateStructLength',
      abi: betContractAbi,
      params: {
        _requestId: __requestId
      }
    }
    try {
      const getGameCreateStructLength = await Moralis_v2.EvmApi.utils.runContractFunction(
        getGameCreateStructLengthOptions
      )
      const length = getGameCreateStructLength.data
      for (let i = 0; i < length; i++) {
        const getGameCreateOptions = {
          chain: 0x5,
          address: '0xBccA419D284548856927ef789EbE6Fe6bc8de665',
          functionName: 'getGameCreate',
          abi: betContractAbi,
          params: {
            _requestId: __requestId,
            _idx: String(i)
          }
        }
        try {
          const gameCreate = await Moralis_v2.EvmApi.utils.runContractFunction(
            getGameCreateOptions
          )
          if (!allMatches.includes(JSON.stringify(gameCreate.data))) {
            allMatches.push(gameCreate.data)
          }
        } catch (e) {
          console.log('no es un game create')
        }
      }
    } catch (e) {
      console.log('no es un game create, pero puede ser un game resolve')
    }
  }
  return allMatches
}
