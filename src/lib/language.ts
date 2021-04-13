import { po, GetTextTranslations } from 'gettext-parser';
import fs from 'fs';
import Translator from './translator';
import Term from './term';
import { Lang, Translation, PreTerm, PoExportTerm} from './types';

class Language {

  lang: Lang;
  file: GetTextTranslations;
  translation: Translation;
  terms: Term;
  
  constructor(lang: Lang, terms: Array<PreTerm>) {
    this.lang = lang

    var translateFile = fs.readFileSync(`./locales/${this.lang}.po`);
    this.file = po.parse(translateFile)
    this.file.charset = "utf-8";
    this.translation = this.file.translations[''] || {}

    this.terms = this.filterNewTerms(terms)
  }

  isIncluded(key: string) {
    if (this.translation[key]) {
      const { msgstr } = this.translation[key]
      return msgstr.length && msgstr[0] === ''
    }
    return true
  }

  filterNewTerms(terms: Array<PreTerm>) {
    return new Term(
      terms.filter(entry => this.isIncluded(entry.key))
    )
  }

  prepareToSave(translates: PoExportTerm) {
    const language: any = {
      ...this.file,
      ...{
        translations: {
          '': {
            ...this.translation,
            ...translates
          }
        }
      }
    }

    this.file = language
    this.translation = language.translations['']
  }

  async translate() {
    const data: string[] = await Translator(this.terms.toGoogleFormat(), this.lang)

    this.terms.addTranslates(data)
    this.prepareToSave(this.terms.toPoFile())
  }

  saveInFile() {
    fs.writeFileSync(`./locales/${this.lang}.po`, po.compile(this.file));
    return `${this.lang} successfully translated`
  }

}

export default Language
