import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private meta = inject(Meta);
  private title = inject(Title);

  private readonly defaultTitle = 'Henrique Nunes - Software Engineer & Front-end Developer';
  private readonly defaultDescription = 'Software Engineer especializado em Front-end, trabalhando com Angular e tecnologias modernas. Portfólio, projetos e artigos sobre desenvolvimento web.';
  private readonly defaultImage = 'https://henriquenunes.com/assets/img/2BE6DDB9-305C-40EF-8DF8-9543316D09CB.JPG';
  private readonly siteUrl = 'https://henriquenunes.com';

  updateSEO(data: SEOData): void {
    const title = data.title ? `${data.title} | Henrique Nunes` : this.defaultTitle;
    const description = data.description || this.defaultDescription;
    const image = data.image || this.defaultImage;
    const url = data.url ? `${this.siteUrl}${data.url}` : this.siteUrl;
    const type = data.type || 'website';

    // Title
    this.title.setTitle(title);

    // Basic Meta Tags
    this.meta.updateTag({ name: 'description', content: description });
    if (data.keywords) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords });
    }
    if (data.author) {
      this.meta.updateTag({ name: 'author', content: data.author });
    }

    // Open Graph Tags
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:site_name', content: 'Henrique Nunes' });

    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    // Article specific tags
    if (type === 'article') {
      if (data.publishedTime) {
        this.meta.updateTag({ property: 'article:published_time', content: data.publishedTime });
      }
      if (data.modifiedTime) {
        this.meta.updateTag({ property: 'article:modified_time', content: data.modifiedTime });
      }
      if (data.author) {
        this.meta.updateTag({ property: 'article:author', content: data.author });
      }
    }

    // Canonical URL
    this.updateCanonicalUrl(url);
  }

  private updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
    
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    
    link.setAttribute('href', url);
  }

  resetSEO(): void {
    this.updateSEO({
      title: this.defaultTitle,
      description: this.defaultDescription,
      image: this.defaultImage,
      url: this.siteUrl
    });
  }
}

