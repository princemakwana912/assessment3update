import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, fieldName:string): any[] {
    if (!value) { return []; }

    // return the original array if search text is empty
    if (!filterString) { return value; }

    // convert the searchText to lower case

    // retrun the filtered array
    // return value.filter((values: { [x: string]: string; }) => {
    //   if (values && values[fieldName]) {
    //     return values[fieldName].toLowerCase().includes(filterString.toLowerCase());
    //   }
    //   return false;
    // });

    return value.filter((values: { firstName: string; lastName: string; email: string; }) =>
      values.firstName.toLowerCase().includes(filterString.toLowerCase()) ||
      values.lastName.toLowerCase().includes(filterString.toLowerCase()) ||
      values.email.toLowerCase().includes(filterString.toLowerCase())
      )
  }

}
