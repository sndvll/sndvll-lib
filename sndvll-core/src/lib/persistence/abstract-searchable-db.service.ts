import {from} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {SearchUtils} from '../utils/search.utils';
import {AbstractDbService} from './abstract-db.service';

export interface Searchable {
  id: string;
  name: string;
  tags?: string[];
}

export abstract class AbstractSearchableDbService<T extends Searchable> extends AbstractDbService<T> {
  public search(phrase: string, limit: number = 0) {
    return from(this.table.toArray())
      .pipe(
        take(1),
        map(result => {
            const mappedResult = result
              .map(entry => SearchUtils.evaluateSearchable(entry, phrase.toLowerCase()))
              .filter(entry => !!entry.points)
              .sort((a, b) => b.points - a.points)
              .map(({entry}) => entry);
            if (limit) {
              return mappedResult.slice(0, limit);
            }
            return mappedResult;
          }
        )
      )
  }
}
