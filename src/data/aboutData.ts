import type { ImageAsset } from '@/types';

/** Long-form biography shown in the About section, one entry per paragraph. */
export const aboutStory: readonly string[] = [
  'I bought my first camera to avoid writing a dissertation and never really went back. Thirteen years later I have photographed weddings in three languages, tracked arctic foxes across Hornstrandir in February, and made portraits of people who insisted, right up until the shutter fired, that they were not photogenic.',
  'My work sits where landscape and portraiture overlap: images of people in places, shot with available light wherever it is possible and shaped carefully when it is not. I travel light, I plan obsessively, and I would rather wait two hours for the right light than manufacture it in post.',
  'The studio is based in Reykjavík, but roughly half of each year is spent on assignment — editorial commissions, brand campaigns, and small expedition workshops for photographers who want to learn in genuinely difficult conditions.',
];

export const aboutMission =
  'To make photographs that still hold up in twenty years — honest, quietly composed, and worth printing large.';

export const aboutPortrait: ImageAsset = {
  src: 'https://picsum.photos/seed/aria-lindqvist-portrait/1200/1500',
  localKey: 'about-portrait',
  alt: 'Aria Lindqvist holding a camera on a windswept coastline',
  width: 1200,
  height: 1500,
  placeholderColor: '#1f2229',
};

/** Career highlights displayed beside the biography. */
export const aboutHighlights: readonly string[] = [
  'Sony World Photography Awards — Landscape shortlist, 2024',
  'Terrane Magazine — Photographer of the Year, 2023',
  'Published in National Geographic Traveller, Kinfolk and Monocle',
  'Lead instructor, Arctic Light Expedition since 2019',
];
