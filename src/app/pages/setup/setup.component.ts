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
          description: `The best laptop I've ever had, very practical for everyday use and leaves nothing to be
                  desired in terms of performance, apart from the integration with the Apple ecosystem`,
        },
        {
          title: `Montior AOC 24" 144Hz 1MS FreeSync`,
          description: `Monitor very prepared for games and this does not change the day-to-day experience at all, in fact, it is even cool to have all the settings... I just don't use it`,
        },
        {
          title: 'JBL Tune 130nc TWS',
          description: `Very practical headphones for everyday use, extraordinary sound quality and noise suppression`,
        },
        {
          title: 'Logitech Pebble Keys 2 K380s',
          description: `Simple, ergonomic and very cheap keyboard for the Apple ecosystem`,
        },
        {
          title: 'Logitech G PRO Wireless',
          description: `Gaming mouse used when I decide to play something`,
        },
        {
          title: 'Fifine AmpliGame A8 Microphone',
          description: `Best value desktop microphone I've ever seen, fantastic sound quality`,
        },
      ]
    },
    {
      id: 2,
      title: 'Development <br/> tools',
      items: [
        {
          title: 'VSCode',
          description: `Best IDE I've ever used, lots of extensions and I use it for all languages`,
        },
        {
          title: 'Postman',
          description: 'Best tool to handle Restful API',
        },
        {
          title: 'Figma',
          description: 'Figma is the tool I use to prototype and get some ideas off the ground',
        },
        {
          title: 'AI Agents',
          description: 'Set of AI agents that help me with various daily tasks',
        },
      ]
    },
    {
      id: 3,
      title: 'Productivity',
      items: [
        {
          title: 'Notebooks',
          description: 'As a good technology enthusiast, I really enjoy taking notes in notebooks that I always carry with me.',
        },
        {
          title: 'Notion',
          description: 'My whole life is organized in Notion, with several sections, pages and triggers, from financial to notes and Todo Lists',
        },
        {
          title: 'Apple Focus',
          description: 'Apple Focus activated has many powers when the biggest focus of distraction in everyday life is our notifications',
        },
        {
          title: 'Spotify',
          description: `I can't program without music and it helps me a lot to focus on tasks`,
        },
      ]
    }
  ]
}
