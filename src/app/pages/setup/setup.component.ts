import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-setup',
  imports: [TranslateModule],
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
          descriptionKey: 'SETUP.WORKSTATION.ITEM_1.DESCRIPTION',
        },
        {
          title: `Montior AOC 24" 144Hz 1MS FreeSync`,
          descriptionKey: 'SETUP.WORKSTATION.ITEM_2.DESCRIPTION',
        },
        {
          title: 'JBL Tune 130nc TWS',
          descriptionKey: 'SETUP.WORKSTATION.ITEM_3.DESCRIPTION',
        },
        {
          title: 'Logitech Pebble Keys 2 K380s',
          descriptionKey: 'SETUP.WORKSTATION.ITEM_4.DESCRIPTION',
        },
        {
          title: 'Logitech G PRO Wireless',
          descriptionKey: 'SETUP.WORKSTATION.ITEM_5.DESCRIPTION',
        },
        {
          title: 'Fifine AmpliGame A8 Microphone',
          descriptionKey: 'SETUP.WORKSTATION.ITEM_6.DESCRIPTION',
        },
      ],
    },
    {
      id: 2,
      title: 'Development <br/> tools',
      items: [
        {
          title: 'VSCode',
          descriptionKey: 'SETUP.DEV_TOOLS.ITEM_1.DESCRIPTION',
        },
        {
          title: 'Postman',
          descriptionKey: 'SETUP.DEV_TOOLS.ITEM_2.DESCRIPTION',
        },
        {
          title: 'Figma',
          descriptionKey: 'SETUP.DEV_TOOLS.ITEM_3.DESCRIPTION',
        },
        {
          title: 'AI Agents',
          descriptionKey: 'SETUP.DEV_TOOLS.ITEM_4.DESCRIPTION',
        },
      ],
    },
    {
      id: 3,
      title: 'Productivity',
      items: [
        {
          title: 'Notebooks',
          descriptionKey: 'SETUP.PRODUCTIVITY.ITEM_1.DESCRIPTION',
        },
        {
          title: 'Notion',
          descriptionKey: 'SETUP.PRODUCTIVITY.ITEM_2.DESCRIPTION',
        },
        {
          title: 'Apple Focus',
          descriptionKey: 'SETUP.PRODUCTIVITY.ITEM_3.DESCRIPTION',
        },
        {
          title: 'Spotify',
          descriptionKey: 'SETUP.PRODUCTIVITY.ITEM_4.DESCRIPTION',
        },
      ],
    },
  ];

}
