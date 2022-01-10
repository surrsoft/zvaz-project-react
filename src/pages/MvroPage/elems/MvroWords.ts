import { MvroWord } from './MvroWord';
import { MvroEnWordType } from './MvroEnWordType';

export const mvroWords: MvroWord[] = []

mvroWords.push({id: '220110153508',wordBaseForm: 'love', types: [MvroEnWordType.VERB, MvroEnWordType.VERB_REGULAR]} as MvroWord)
mvroWords.push({id: '220110153509',wordBaseForm: 'live', types: [MvroEnWordType.VERB, MvroEnWordType.VERB_REGULAR]} as MvroWord)
mvroWords.push({id: '220110153510',wordBaseForm: 'work', types: [MvroEnWordType.VERB, MvroEnWordType.VERB_REGULAR]} as MvroWord)
mvroWords.push({id: '220110153511',wordBaseForm: 'open', types: [MvroEnWordType.VERB, MvroEnWordType.VERB_REGULAR]} as MvroWord)
mvroWords.push({id: '220110153512',wordBaseForm: 'close', types: [MvroEnWordType.VERB, MvroEnWordType.VERB_REGULAR]} as MvroWord)

mvroWords.push({
  wordBaseForm: 'see',
  wordFormVerbIrregular: 'saw',
  types: [MvroEnWordType.VERB, MvroEnWordType.VERB_IRREGULAR]
} as MvroWord)
mvroWords.push({
  wordBaseForm: 'come',
  wordFormVerbIrregular: 'came',
  types: [MvroEnWordType.VERB, MvroEnWordType.VERB_IRREGULAR]
} as MvroWord)
mvroWords.push({
  wordBaseForm: 'know',
  wordFormVerbIrregular: 'knew',
  types: [MvroEnWordType.VERB, MvroEnWordType.VERB_IRREGULAR]
} as MvroWord)
mvroWords.push({
  wordBaseForm: 'think',
  wordFormVerbIrregular: 'thought',
  types: [MvroEnWordType.VERB, MvroEnWordType.VERB_IRREGULAR]
} as MvroWord)


