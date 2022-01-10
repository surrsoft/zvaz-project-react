import { MvroWord } from './MvroWord';
import { MvroEnWordType } from './MvroEnWordType';
import { MvroWordRus } from './MvroWordRus';
import { NxcaEnSklon } from '../../NxcaPage/elems/NxcaEnSklon';

export const mvroWords: MvroWord[] = []

mvroWords.push({
  id: '220110153508', wordBaseForm: 'love', types: [MvroEnWordType.VERB, MvroEnWordType.VERB_REGULAR],
  wordRus: {wordPart: 'люб', enSklon: NxcaEnSklon.S1} as MvroWordRus
} as MvroWord)
mvroWords.push({
  id: '220110153509', wordBaseForm: 'live', types: [MvroEnWordType.VERB, MvroEnWordType.VERB_REGULAR],
  wordRus: {wordPart: 'ж', enSklon: NxcaEnSklon.S7} as MvroWordRus
} as MvroWord)
mvroWords.push({
  id: '220110153510', wordBaseForm: 'work', types: [MvroEnWordType.VERB, MvroEnWordType.VERB_REGULAR],
  wordRus: {wordPart: 'работ', enSklon: NxcaEnSklon.S4} as MvroWordRus
} as MvroWord)
mvroWords.push({
  id: '220110153511', wordBaseForm: 'open', types: [MvroEnWordType.VERB, MvroEnWordType.VERB_REGULAR],
  wordRus: {wordPart: 'открыв', enSklon: NxcaEnSklon.S4} as MvroWordRus
} as MvroWord)
mvroWords.push({
  id: '220110153512', wordBaseForm: 'close', types: [MvroEnWordType.VERB, MvroEnWordType.VERB_REGULAR],
  wordRus: {wordPart: 'закрыв', enSklon: NxcaEnSklon.S4} as MvroWordRus
} as MvroWord)
mvroWords.push({
  id: '220110190629', wordBaseForm: 'like', types: [MvroEnWordType.VERB, MvroEnWordType.VERB_REGULAR],
  wordRus: {wordPart: 'нрав', enSklon: NxcaEnSklon.S8} as MvroWordRus
} as MvroWord)
mvroWords.push({
  id: '220110190630', wordBaseForm: 'start', types: [MvroEnWordType.VERB, MvroEnWordType.VERB_REGULAR],
  wordRus: {wordPart: 'начин', enSklon: NxcaEnSklon.S4} as MvroWordRus
} as MvroWord)
mvroWords.push({
  id: '220110190631', wordBaseForm: 'finish', types: [MvroEnWordType.VERB, MvroEnWordType.VERB_REGULAR],
  wordRus: {wordPart: 'заканчив', enSklon: NxcaEnSklon.S4} as MvroWordRus
} as MvroWord)

mvroWords.push({
  id: '22011017103601',
  wordBaseForm: 'see',
  wordFormVerbIrregular: 'saw',
  types: [MvroEnWordType.VERB, MvroEnWordType.VERB_IRREGULAR],
  wordRus: {wordPart: 'ви', enSklon: NxcaEnSklon.S5} as MvroWordRus
} as MvroWord)
mvroWords.push({
  id: '22011017103602',
  wordBaseForm: 'come',
  wordFormVerbIrregular: 'came',
  types: [MvroEnWordType.VERB, MvroEnWordType.VERB_IRREGULAR],
  wordRus: {wordPart: 'прихо', enSklon: NxcaEnSklon.S6} as MvroWordRus
} as MvroWord)
mvroWords.push({
  id: '22011017103603',
  wordBaseForm: 'know',
  wordFormVerbIrregular: 'knew',
  types: [MvroEnWordType.VERB, MvroEnWordType.VERB_IRREGULAR],
  wordRus: {wordPart: 'зн', enSklon: NxcaEnSklon.S4} as MvroWordRus
} as MvroWord)
mvroWords.push({
  id: '22011017103604',
  wordBaseForm: 'think',
  wordFormVerbIrregular: 'thought',
  types: [MvroEnWordType.VERB, MvroEnWordType.VERB_IRREGULAR],
  wordRus: {wordPart: 'дум', enSklon: NxcaEnSklon.S4} as MvroWordRus
} as MvroWord)
mvroWords.push({
  id: '22011017103605',
  wordBaseForm: 'go',
  wordFormVerbIrregular: 'went',
  types: [MvroEnWordType.VERB, MvroEnWordType.VERB_IRREGULAR],
  wordRus: {wordPart: 'ид', enSklon: NxcaEnSklon.S9_GO} as MvroWordRus
} as MvroWord)
mvroWords.push({
  id: '22011017103606',
  wordBaseForm: 'draw',
  wordFormVerbIrregular: 'drew',
  types: [MvroEnWordType.VERB, MvroEnWordType.VERB_IRREGULAR],
  wordRus: {wordPart: 'рис', enSklon: NxcaEnSklon.S10} as MvroWordRus
} as MvroWord)
mvroWords.push({
  id: '22011017103607',
  wordBaseForm: 'feel',
  wordFormVerbIrregular: 'felt',
  types: [MvroEnWordType.VERB, MvroEnWordType.VERB_IRREGULAR],
  wordRus: {wordPart: 'чувств', enSklon: NxcaEnSklon.S10} as MvroWordRus
} as MvroWord)
mvroWords.push({
  id: '22011017103608',
  wordBaseForm: 'freeze',
  wordFormVerbIrregular: 'froze',
  types: [MvroEnWordType.VERB, MvroEnWordType.VERB_IRREGULAR],
  wordRus: {wordPart: 'замерз', enSklon: NxcaEnSklon.S4} as MvroWordRus
} as MvroWord)


