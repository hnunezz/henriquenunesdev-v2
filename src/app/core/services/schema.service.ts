import { Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  private meta = inject(Meta);

  addPersonSchema(data: {
    name: string;
    jobTitle: string;
    description: string;
    url: string;
    image?: string;
    sameAs?: string[];
    email?: string;
    address?: {
      addressLocality: string;
      addressCountry: string;
    };
  }): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: data.name,
      jobTitle: data.jobTitle,
      description: data.description,
      url: data.url,
      ...(data.image && { image: data.image }),
      ...(data.sameAs && { sameAs: data.sameAs }),
      ...(data.email && { email: data.email }),
      ...(data.address && {
        address: {
          '@type': 'PostalAddress',
          addressLocality: data.address.addressLocality,
          addressCountry: data.address.addressCountry
        }
      })
    };

    this.addScriptTag(JSON.stringify(schema));
  }

  addArticleSchema(data: {
    headline: string;
    description: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    author: {
      name: string;
      url?: string;
    };
    publisher: {
      name: string;
      logo?: string;
    };
  }): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.headline,
      description: data.description,
      ...(data.image && { image: data.image }),
      datePublished: data.datePublished,
      ...(data.dateModified && { dateModified: data.dateModified }),
      author: {
        '@type': 'Person',
        name: data.author.name,
        ...(data.author.url && { url: data.author.url })
      },
      publisher: {
        '@type': 'Organization',
        name: data.publisher.name,
        ...(data.publisher.logo && {
          logo: {
            '@type': 'ImageObject',
            url: data.publisher.logo
          }
        })
      }
    };

    this.addScriptTag(JSON.stringify(schema));
  }

  addWebSiteSchema(data: {
    name: string;
    url: string;
    description: string;
  }): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: data.name,
      url: data.url,
      description: data.description
    };

    this.addScriptTag(JSON.stringify(schema));
  }

  addProjectSchema(data: {
    name: string;
    description: string;
    url?: string;
    image?: string;
    applicationCategory?: string;
    operatingSystem?: string;
  }): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: data.name,
      description: data.description,
      ...(data.url && { url: data.url }),
      ...(data.image && { image: data.image }),
      ...(data.applicationCategory && { applicationCategory: data.applicationCategory }),
      ...(data.operatingSystem && { operatingSystem: data.operatingSystem })
    };

    this.addScriptTag(JSON.stringify(schema));
  }

  private addScriptTag(json: string): void {
    // Remove existing schema script if any
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = json;
    document.head.appendChild(script);
  }

  clearSchemas(): void {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(script => script.remove());
  }
}

