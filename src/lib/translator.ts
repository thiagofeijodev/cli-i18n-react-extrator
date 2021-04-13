import { v2 } from '@google-cloud/translate';
import { Lang } from './types';

const translate = new v2.Translate({
  projectId: process.env.PROJECT,
  key: process.env.GOOGLE_API_KEY
});

const Translator = async (texts: Array<string>, lang: Lang): Promise<string[]> => {
  const target = lang.substring(0, 2)
  const nBatch = 100
  const totalRows = texts.length
  const batch = Math.ceil(totalRows / nBatch)
  const requests = []
  let startArr = 0
  let endArr = nBatch

  for (let i = 0; i < batch; i++) {
    requests.push(
      translate
        .translate(texts.slice(startArr, endArr), target)
        .then(t => t[0])
    )

    let untilEnd = (totalRows - endArr)
    startArr = startArr+nBatch
    endArr = (untilEnd > nBatch)  
      ? endArr + nBatch
      : endArr + untilEnd
  }

  return Promise
    .all(requests)
    .then(response => response.flat())
}

export default Translator
