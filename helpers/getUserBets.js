import Moralis from 'moralis-v1'
import moralisDB from './getMoralisDb'

const userBets = []

 export default async function getUserBets (userAddress) {

  const _userBets = Moralis.Object.extend('userBet')
  const query = new Moralis.Query(_userBets)
  const thisUserBets = await query.find("from",userAddress)

    for (let i = 0; i < thisUserBets.length; i++) {
     const object = thisUserBets[i]
     var bet = new Object();
     bet.gameId = object.get('gameId')
     bet.choice = object.get('choice')
     bet.amount = object.get('amount')
     userBets.push(bet)
    }

  return (userBets)
}





// const userWinnerBets = []
// const userLooserBets = []

// export default async function getUserBets (userAddress) {

//   const userBets = Moralis.Object.extend('userBet')
//   const query = new Moralis.Query(userBets)
//   const thisUserBets = await query.find("from",userAddress)

//   for (let i = 0; i < thisUserBets.length; i++) {
//      const object = thisUserBets[i]
//      var bet = new Object();
//      bet.gameId = object.get('gameId')
//      bet.choice = object.get('choice')

//      const matchsResolved = Moralis.Object.extend('matchResolved')
//      const query = new Moralis.Query(matchsResolved)
//      const winner = await query.find("winner",bet.choice)

//      if(winner != undefined ) {
//       userWinnerBets.push(bet)
//       console.log("tiene priemo ",bet.gameId)
//      }
//      else{
//       console.log("no tiene premio ",bet.gameId)
//       userLooserBets.push(bet)
//      }
//     }

//   return (userWinnerBets)
// }

