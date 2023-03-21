import { Subject } from "rxjs"

export abstract class AsyncComponent {

    unsubscribe$!: Subject<null>;

    ionViewWillEnter() {
        this.unsubscribe$ = new Subject<null>();
    }
}