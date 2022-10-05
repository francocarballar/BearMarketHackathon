import Moralis_v2 from 'moralis'
import Moralis from 'moralis-v1'
import { betContractAbi } from '../constants'
import moralisDB from './getMoralisDb'


const matchesFinished = []


export default async function getMatches () {


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
      matchesFinished.push(match)
     }



  return matchesFinished
}

