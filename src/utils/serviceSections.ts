import type { SectionData } from '@/components/base/ServiceSection.astro';

import servicesData from '@/data/services_sections.yaml';

function transformSectionData(section: any): SectionData {
  return {
    id: section.id,
    title: section.title,
    subtitle: section.subtitle,
    paragraphs: section.paragraphs.map((p: any) => (typeof p === 'string' ? p : p.text)),
    carouselTitle: section.carouselTitle,
    carousel: section.carousel.map((item: any) => ({
      name: item.name,
      imagePath: item.image,
    })),
    advantagesTitle: section.advantagesTitle,
    advantages: section.advantages.map((adv: any) => (typeof adv === 'string' ? { text: adv } : adv)),
    bottomTitle: section.bottomTitle,
    bottomDescription: section.bottomDescription,
    bottomImagePath: section.bottomImage,
  };
}

export function getServiceSections(lang: string): SectionData[] {
  const sections = servicesData[lang]?.sections || [];
  return sections.map((section: any) => transformSectionData(section));
}
