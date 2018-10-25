import { PipeTransform, Pipe } from "@angular/core";
import { Marisupilami } from "../UserClass/Marisupilami";

@Pipe({
  name: "amisFilter"
})
export class AmisPipe implements PipeTransform {
  transform(value: Marisupilami[], filterBy: string): Marisupilami[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy
      ? value.filter(
          (user: Marisupilami) =>
            user.username.toLocaleLowerCase().indexOf(filterBy) !== -1
        )
      : value;
  }
}
