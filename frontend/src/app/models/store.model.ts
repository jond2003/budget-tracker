import { Observable } from "rxjs";

export interface Store<k> {
  data: Observable<k[]>
  update: boolean;
}
