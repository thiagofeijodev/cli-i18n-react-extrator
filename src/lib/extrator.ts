const i18n = require('i18n-extract');
import fs from 'fs';
import { PreTerm } from './types';

const Extrator = (): Array<PreTerm> => {
  const cache = process.argv.indexOf('--cache-terms') > -1
  const cacheFile = fs.existsSync('tems.json')
  if (cache && cacheFile) {
    return JSON.parse(fs.readFileSync('terms.json').toString())
  } 

  const marker = 'translate'
  const files = [
    'src/**/*.jsx', 
    'src/**/*.js', 
    'packages/components/src/**/*.js',
    'packages/services/src/**/*.js',
  ]
  
  const keys = i18n.extractFromFiles(files, { marker })
  const test = i18n.extractFromFiles(files, { marker: 'this.context.translate' })
  
  const terms: Array<PreTerm> = [
    ...keys,
    ...test
  ]

  if (cache) {
    fs.writeFileSync('tems.json', JSON.stringify(terms))
  } 

  return terms
}

export default Extrator
