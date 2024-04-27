import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idade',
  standalone: true
})
export class IdadePipe implements PipeTransform {

  transform(value: string): number {
    let hoje = new Date();
    let dataNascimento = new Date(value);
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    let m = hoje.getMonth() - dataNascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }
    return idade;
  }
}
