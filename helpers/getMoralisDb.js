import Moralis from 'moralis-v1'


const serverUrl = 'https://dcnqrknq91by.usemoralis.com:2053/server'
const appId = '4uiRUothrilXBqrtJLaCow0Xs9K7GgFWZ6IXbVYg'
const masterKey = '4uiRUothrilXBqrtJLaCow0Xs9K7GgFWZ6IXbVYg'


async function getMoralisDb() {

  return( await Moralis.start({ serverUrl, appId, masterKey }))

}

const moralisDB = getMoralisDb()

export default moralisDB;