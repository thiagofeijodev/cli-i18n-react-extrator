import { PreTerm, ProcessingTerm, ProcessingTermValue, PoExportTerm } from './types';

class Term {

  terms: ProcessingTerm

  constructor(terms: Array<PreTerm>) {
    this.terms = this.format(terms)
  }

  format(terms: Array<PreTerm>): ProcessingTerm {
    return terms
      .reduce((acc, entry) => ({
        ...acc,
        [entry.key]: {
          ...this.encodeTemplateVars(entry.key),
          reference: `${entry.file}#${entry.loc.start.line}`
        }
      }), {})
  }

  encodeTemplateVars(key: string): ProcessingTermValue {
    const textVars = key.match(/%\{(.+?)\}/gi)
    const defaultValue: ProcessingTermValue = {
      safeString: key,
      varPosition: {},
    }

    if (!textVars) {
      return defaultValue
    }

    return textVars
      .reduce((acc, cur) => {
        const nOccurrences = Object.keys(acc.varPosition).length

        if (acc.varPosition[cur]) {
          return acc
        }

        const abstractString = `00x${nOccurrences}`
        const safeString = acc.safeString.replace(
          new RegExp(cur, 'gi'), abstractString
        )

        return {
          safeString: safeString,
          varPosition: {
            ...acc.varPosition,
            [abstractString]: cur,
          },
        }
      }, defaultValue)
  }

  decodeTemplateVars(text: string, map: {[key: string]: string}): string {
    return Object.entries(map)
      .reduce(
        (acc, [ key, value ]) => acc.replace(new RegExp(key, 'gi'), value),
        text
      )
  }

  toPoFile(): PoExportTerm {
    return Object.entries(this.terms)
      .map(([ key, value ]) => ({
        [key]: {
          msgid: key,
          comments: { reference: value.reference },
          msgstr: value.translated ? [ value.translated ] : []
        }
      }))
      .reduce((acc, cur) => ({
        ...acc,
        ...cur
      }), {})
  }

  toGoogleFormat(): Array<string> {
    return Object.values(this.terms).map(item => item.safeString)
  }

  addTranslates(arrTranslate: Array<string>) {
    if (arrTranslate.length !== Object.keys(this.terms).length) {
      throw 'Different number of translations than expected, see `translator.js`'
    }

    this.terms = Object.keys(this.terms)
      .map((item, i) => {
        const translatedTxt = this.decodeTemplateVars(
          arrTranslate[i],
          this.terms[item].varPosition
        )

        return {
          [item]: {
            ...this.terms[item],
            translated: translatedTxt,
          }
        }
      })
      .reduce((acc, cur) => ({
        ...acc,
        ...cur
      }), {})
  }

}

export default Term
