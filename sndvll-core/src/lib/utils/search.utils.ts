import {Searchable} from '../persistence';

export class SearchUtils {

  public static evaluateString(value: string, phrase: string): number {
    let points = 0;
    if (value.toLowerCase() === phrase) {
      points += 3;
    }
    if (value.toLowerCase().startsWith(phrase)) {
      points += 2;
    }
    if (value.toLowerCase().includes(phrase)) {
      points += 1;
    }
    if (!value.toLowerCase().includes(phrase)) {
      points -= 1;
    }
    if(points > 0) {
      return points;
    }
    return 0;
  }

  public static evaluateStringArray(values: string[] | undefined, phrase: string): number {
    let points = 0;
    if (values && values.length > 0) {
      for (let value of values) {
        points += this.evaluateString(value, phrase);
      }
    }
    return points;
  }

  public static evaluateSearchable(entry: Searchable, phrase: string): {entry: Searchable, points: number} {
    return {
      entry,
      points: SearchUtils.evaluateString(entry.name, phrase) + SearchUtils.evaluateStringArray(entry.tags, phrase)
    };
  }

  public static search(values: Searchable[], phrase: string): Searchable[] {
    return values
      .map(entry => this.evaluateSearchable(entry, phrase.toLowerCase()))
      .filter(entry => !!entry.points)
      .sort((a, b) => b.points - a.points)
      .map(({entry}) => entry);
  }
}
