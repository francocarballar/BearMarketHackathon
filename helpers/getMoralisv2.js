import Moralis_v2 from 'moralis'

async function getMoralisv2() {
  return( await Moralis_v2.start({
    apiKey: 'O3i5jPl78uSeh61yMkj2W4iaTXgZtch2cmiCngwcwTJPbfmgcqnmSiGZvtgOwel7'
  })
)

}

const moralisV2 = getMoralisv2()

export default moralisV2;