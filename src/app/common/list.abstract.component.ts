import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { first, firstValueFrom, Subject } from 'rxjs';
import { ChoiceModalComponent } from './components/choice-modal/choice-modal.component';
import { CrudService, SortOrder } from './crud.service';
import { Base } from './interfaces/base.interface';

export class PaginationConfig<E> {
  skip!: number;
  pageSize!: number;
  sortOrder!: SortOrder;
  sortField!: keyof E;
}

@Component({
  selector: '',
  template: '',
})
export abstract class ListComponent<E extends Base, F = Partial<E>> {
  selectedEntities: E[] | undefined;
  entities: E[] | undefined;
  filter: F | undefined;

  // flags
  loading = false;

  // pagination and filtering
  pageSize = 10;
  page = 0;
  totalRecords = 0;
  sortOrder: SortOrder | undefined;
  sortField: keyof E | undefined;

  unsubscribeAll$!: Subject<void>;

  constructor(
    protected entityService: CrudService<E, F>,
    protected modal: ModalController
  ) {}

  abstract addFilters(filters: F): void;

  private getDefaultPage(): PaginationConfig<E> {
    return <PaginationConfig<E>>{
      skip: 0,
      pageSize: this.pageSize,
      sortOrder: 'ASC',
      sortField: 'id',
    };
  }

  lazyLoad(
    config: PaginationConfig<E> = this.getDefaultPage(),
    filters?: F
  ): void {
    this.loading = true;

    const { pageSize, skip, sortField, sortOrder } = config;

    this.pageSize = pageSize;
    this.page = skip / pageSize;

    this.sortField = sortField;
    this.sortOrder = sortOrder;

    if (filters) {
      this.addFilters(filters);
    }

    this.entityService
      .find(
        this.filter,
        this.page,
        this.pageSize,
        this.sortField,
        this.sortOrder
      )
      .pipe(first())
      .subscribe(({ content, totalElements }) => {
        this.entities = content;
        this.totalRecords = totalElements;
        this.loading = false;
      });
  }

  async delete(entity: E, message: string) {
    const modal = await this.modal.create({
      component: ChoiceModalComponent,
      componentProps: { message },
    });

    modal.present();
    const { data } = await modal.onWillDismiss();

    if (!data) {
      return;
    }

    await firstValueFrom(this.entityService.delete(entity.id));
    const { totalElements, content } = await firstValueFrom(
      this.entityService.find(
        this.filter,
        this.page,
        this.pageSize,
        this.sortField,
        this.sortOrder
      )
    );

    this.totalRecords = totalElements;
    this.entities = content;
  }
}
