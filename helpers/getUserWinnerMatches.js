import Moralis_v2 from 'moralis'
import Moralis from 'moralis-v1'
import { betContractAbi } from '../constants'

const userWinnerMatches = []


const serverUrl = 'https://dcnqrknq91by.usemoralis.com:2053/server'
const appId = '4uiRUothrilXBqrtJLaCow0Xs9K7GgFWZ6IXbVYg'
const masterKey = '4uiRUothrilXBqrtJLaCow0Xs9K7GgFWZ6IXbVYg'

export default async function getUserWinnerMatches (userAddress) {

  await Moralis.start({ serverUrl, appId, masterKey })

  const userBets = Moralis.Object.extend('userBet')
  const query = new Moralis.Query(userBets)
  const thisUserBets = await query.find("from",userAddress)

  for (let i = 0; i < thisUserBets.length; i++) {
     const object = thisUserBets[i]
     var bet = new Object();
     bet.gameId = object.get('gameId')
     bet.choice = object.get('choice')

     const matchsResolved = Moralis.Object.extend('matchResolved')
     const query = new Moralis.Query(matchsResolved)
     const winner = await query.find("winner",bet.choice)

     if(winner != undefined ) {
      userWinnerMatches.push(bet.gameId)
     }
    }

  return {userWinnerMatches}
}

