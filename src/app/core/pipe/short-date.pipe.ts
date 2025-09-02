import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDateIntl',
  standalone: true,
})
export class ShortDateIntlPipe implements PipeTransform {
  transform(value: string | Date): string {
    const date = typeof value === 'string' ? new Date(value) : value;

    const formatter = new Intl.DateTimeFormat('pt-BR', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    // Intl devolve "01 de set. de 2025" → tratamos para "Set 01, 2025"
    const [day, , month, , year] = formatter.formatToParts(date).map(p => p.value);
    return `${month.charAt(0).toUpperCase() + month.slice(1,3)} ${day}, ${year}`;
  }
}
