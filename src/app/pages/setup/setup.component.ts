import { Component } from '@angular/core';

@Component({
  selector: 'app-setup',
  imports: [],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss'
})
export class SetupComponent {
  setupData = [
    {
      id: 1,
      title: 'Workstation',
      items: [
        {
          title: 'MacBook Pro de 14”, M4 Pro, 24 GB de RAM (2024)',
          description: `the best laptop I've ever had, very practical for everyday use and leaves nothing to be
                  desired in terms of performance, apart from the integration with the Apple ecosystem`,
        }
      ]
    },
    {
      id: 2,
      title: 'Development <br/> tools',
      items: [
        {
          title: '',
          description: '',
        }
      ]
    },
    {
      id: 3,
      title: 'Productivity',
      items: [
        {
          title: '',
          description: '',
        }
      ]
    }
  ]
}
