import Language from './language';
import { Lang } from './types';
import { PreTerm } from './types';

class LanguagesIterator {

  languages: Array<Language>

  constructor(defaultLangs: Array<Lang> = [], terms: Array<PreTerm>) {
    this.languages = defaultLangs.map(
      lang => new Language(lang, terms)
    )
  }

  translate() {
    return Promise.all(
      this.languages.map(
        language => language.translate()
      )
    )
  }

  save() {
    return this.languages.map(
      language => language.saveInFile()
    )
  }

}

export default LanguagesIterator
