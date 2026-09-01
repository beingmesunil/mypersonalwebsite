import type { Testimonial } from '@/types';

export const testimonials: readonly Testimonial[] = [
  {
    id: 'elena-marsh',
    name: 'Elena Marsh',
    role: 'Bride · Highland Wedding',
    rating: 5,
    quote:
      'We barely noticed a camera all day, and then the gallery arrived and it was the entire wedding — the vows, my father’s face, the rain at 4pm. Aria photographs what actually happened, not what a shot list says should have.',
    avatar: {
      src: 'https://picsum.photos/seed/elena-marsh/400/400',
      localKey: 'elena-marsh-avatar',
      alt: 'Portrait of Elena Marsh',
      width: 400,
      height: 400,
      placeholderColor: '#241d1b',
    },
  },
  {
    id: 'daniel-okafor',
    name: 'Daniel Okafor',
    role: 'Creative Director · Nord Atelier',
    rating: 5,
    quote:
      'We shot a 42-image campaign in two days across three locations and every frame was on brand. The pre-production document alone was worth the fee.',
    avatar: {
      src: 'https://picsum.photos/seed/daniel-okafor/400/400',
      localKey: 'daniel-okafor-avatar',
      alt: 'Portrait of Daniel Okafor',
      width: 400,
      height: 400,
      placeholderColor: '#1c2229',
    },
  },
  {
    id: 'sofia-bergman',
    name: 'Sofia Bergman',
    role: 'Editor · Terrane Magazine',
    rating: 5,
    quote:
      'Aria came back from eleven days in Hornstrandir with a cover, a twelve-page feature and captions we could actually publish. Utterly reliable in conditions that break most people.',
    avatar: {
      src: 'https://picsum.photos/seed/sofia-bergman/400/400',
      localKey: 'sofia-bergman-avatar',
      alt: 'Portrait of Sofia Bergman',
      width: 400,
      height: 400,
      placeholderColor: '#22201a',
    },
  },
  {
    id: 'marco-ferreira',
    name: 'Marco Ferreira',
    role: 'Founder · Kelda Coffee',
    rating: 5,
    quote:
      'Our product photography had been flat for years. One morning in the studio and we finally had images that look like the brand we describe in the deck.',
    avatar: {
      src: 'https://picsum.photos/seed/marco-ferreira/400/400',
      localKey: 'marco-ferreira-avatar',
      alt: 'Portrait of Marco Ferreira',
      width: 400,
      height: 400,
      placeholderColor: '#1e2320',
    },
  },
  {
    id: 'harriet-nolan',
    name: 'Harriet Nolan',
    role: 'Private Client · Family Session',
    rating: 5,
    quote:
      'Three children under seven, an hour of usable light, and somehow every one of us looks like ourselves. These prints are staying on the wall for a very long time.',
    avatar: {
      src: 'https://picsum.photos/seed/harriet-nolan/400/400',
      localKey: 'harriet-nolan-avatar',
      alt: 'Portrait of Harriet Nolan',
      width: 400,
      height: 400,
      placeholderColor: '#231c22',
    },
  },
];
