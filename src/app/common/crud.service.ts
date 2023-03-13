import { Observable } from 'rxjs';
import { PaginatedResult } from './interfaces/paginates-result.interface';

export type SortOrder = 'asc' | 'desc'

export abstract class CrudService<E, F = Partial<E>> {
  abstract get(id: string): Observable<E>;

  abstract find(
    filter: F | undefined,
    page: number,
    pageSize: number,
    sortField: keyof E | undefined,
    sortOrder: SortOrder | undefined
  ): Observable<PaginatedResult<E>>;

  abstract save(id: string | null, dto: Partial<E>): Observable<E>;

  abstract delete(id: string): Observable<void>;
}