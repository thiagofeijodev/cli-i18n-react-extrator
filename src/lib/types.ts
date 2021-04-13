import { GetTextTranslation } from 'gettext-parser';

export enum Lang {
  EnUs = 'en-us',
  Es = 'es',
}

export type Translation = { 
  [msgId: string]: GetTextTranslation
}

export type PreTerm = { 
  key: string,
  file: string,
  loc: {
    start: {
      line: number,
      column: number
    },
    end: {
      line: number,
      column: number
    }
  }
}

export type ProcessingTermValue = {
  safeString: string,
  varPosition: {
    [key: string]: string
  }
}

export type ProcessingTerm = {
  [msgId: string]: {
    safeString: string,
    varPosition: {
      [key: string]: string
    },
    reference: string,
    translated?: string,
  }
}

export type PoExportTerm = {
  [msgId: string]: {
    msgid: string;
    comments: {
      reference: string;
    };
    msgstr: string[];
  };
}
