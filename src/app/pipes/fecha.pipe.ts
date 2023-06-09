import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha',
})
export class FechaPipe implements PipeTransform {
  transform(value: number): string {
    return value + ':00';
  }
}
