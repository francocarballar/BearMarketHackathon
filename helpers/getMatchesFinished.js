import Moralis_v2 from 'moralis'
import Moralis from 'moralis-v1'
import { betContractAbi } from '../constants'

const allMatches = []
const matchesFinished = []

const serverUrl = 'https://dcnqrknq91by.usemoralis.com:2053/server'
const appId = '4uiRUothrilXBqrtJLaCow0Xs9K7GgFWZ6IXbVYg'
const masterKey = '4uiRUothrilXBqrtJLaCow0Xs9K7GgFWZ6IXbVYg'

export default async function getMatches () {
  await Moralis_v2.start({
    apiKey: 'O3i5jPl78uSeh61yMkj2W4iaTXgZtch2cmiCngwcwTJPbfmgcqnmSiGZvtgOwel7'
  })

  await Moralis.start({ serverUrl, appId, masterKey })


    const matchesResolved = Moralis.Object.extend('matchResolved')
    const queryMatchesResolved = new Moralis.Query(matchesResolved)
    const _queryMatchesResolved = await queryMatchesResolved.find()
    for (let i = 0; i < _queryMatchesResolved.length; i++) {
      const object = _queryMatchesResolved[i]
      var match = new Object();
      match.gameId = object.get('gameId')
      match.homeScore= object.get('homeScore')
      match.awayScore= object.get('awayScore')
      match.status = object.get('status')
      match.winner = object.get('winner')
      // console.log(match)
      matchesFinished.push(match)
     }



  return matchesFinished
}

