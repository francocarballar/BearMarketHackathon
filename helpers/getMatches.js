import Moralis_v2 from 'moralis'
import Moralis from 'moralis-v1'
import moralisDB from './getMoralisDb'

const allMatches = []


export default async function getMatches () {
  await Moralis_v2.start({
    apiKey: "O3i5jPl78uSeh61yMkj2W4iaTXgZtch2cmiCngwcwTJPbfmgcqnmSiGZvtgOwel7"
  })

  const betsCreated = Moralis.Object.extend('betCreated')
  const query = new Moralis.Query(betsCreated)
  const _betsCreated = await query.find()

  for (let i = 0; i < _betsCreated.length; i++) {
     const object = _betsCreated[i]
     var match = new Object();
     match.gameId = object.get('gameId')
     match.date = object.get('startTime')
     match.homeTeam = object.get('homeTeam')
     match.awayTeam = object.get('awayTeam')
     match.league = object.get('leagueId')
     match.homeOdd = object.get('homeOdd')
     match.awayOdd = object.get('awayOdd')
     match.tiedOdd = object.get('tiedOdd')
     match.gameId = object.get('gameId')
    // console.log(match)
     allMatches.push(match)
    }

 
  return allMatches
}

