import {Statistics} from "../types/types.ts";

function buildProbabilityTable(probabilities?: Array<number>): Array<Statistics> {
  return '0123456789'.split('').reduce((accumulator: Array<Statistics>, current: string, index: number) => {
    accumulator.push(
      {
        prediction: Number(current),
        probability: probabilities ? probabilities[index] : 0,
      }
    );

    return accumulator;
  }, [])
}

export default buildProbabilityTable;
