import type { BlogPost } from '@/types';

export const blogPosts: readonly BlogPost[] = [
  {
    id: 'chasing-blue-hour',
    slug: 'chasing-blue-hour-in-the-arctic',
    title: 'Chasing Blue Hour in the Arctic',
    excerpt:
      'Above the Arctic Circle blue hour can last for three hours — or four minutes. Here is how I plan a shoot around light that refuses to behave.',
    publishedAt: '2026-02-18',
    readingTimeMinutes: 7,
    tags: ['Landscape', 'Planning', 'Iceland'],
    cover: {
      src: 'https://picsum.photos/seed/chasing-blue-hour/1600/1067',
      localKey: 'chasing-blue-hour-cover',
      alt: 'Snow-covered coastline photographed during deep blue twilight',
      width: 1600,
      height: 1067,
      placeholderColor: '#151d2a',
    },
    content: [
      'Blue hour in the tropics is a countdown. Above the Arctic Circle it is a negotiation. In late November the sun grazes the horizon for barely four hours, and the twilight that follows can stretch long enough to shoot three separate locations on one battery — or collapse the moment a weather front arrives from the west.',
      'I plan every arctic shoot backwards from the light rather than forwards from the map. The first thing in my notebook is the civil twilight window, then the nautical one, then the locations that can physically be reached inside them. If a location cannot be reached and set up with twenty minutes to spare, it does not go on the list.',
      'Technically, blue hour rewards patience over gear. A tripod, a cable release and exposures between four and thirty seconds will out-perform any high-ISO handheld attempt. I meter for the brightest part of the sky and let the foreground fall where it wants; recovering a shadow is trivial, recovering a blown gradient is not.',
      'The one habit that changed my arctic work: I stay for twenty minutes after I think the light is gone. Roughly a third of my favourite frames were made in that final, apparently unusable window, when the sky turns the deep ink colour that no daylight scene can imitate.',
    ],
  },
  {
    id: 'portrait-single-light',
    slug: 'the-case-for-one-light',
    title: 'The Case for One Light',
    excerpt:
      'Three-light setups look impressive on a behind-the-scenes reel. A single, well-placed source almost always makes the better portrait.',
    publishedAt: '2026-01-09',
    readingTimeMinutes: 6,
    tags: ['Portrait', 'Lighting', 'Studio'],
    cover: {
      src: 'https://picsum.photos/seed/the-case-for-one-light/1600/1067',
      localKey: 'portrait-single-light-cover',
      alt: 'Portrait subject lit by a single soft light source in a dark studio',
      width: 1600,
      height: 1067,
      placeholderColor: '#20191a',
    },
    content: [
      'Every photographer I know went through a phase of adding lights. Key, fill, rim, background, hair — each one solving a problem the previous light created. Then, at some point, most of us start taking them away again.',
      'A single source has a direction, and direction is what makes a face read as a face. Add a second source at similar power and you flatten the very shadow that describes the cheekbone you were trying to shape.',
      'My default is a 1.2m octabox at 45 degrees, feathered so the near edge of the light passes just in front of the subject. The far side of the face falls off naturally; if it falls off too far, I move a white v-flat closer rather than reaching for another head.',
      'Constraints also speed you up. One light means one decision per adjustment, and the person in front of the camera does not have to hold a smile through a nine-minute lighting conversation.',
    ],
  },
  {
    id: 'wildlife-field-kit',
    slug: 'a-wildlife-field-kit-that-survives-winter',
    title: 'A Wildlife Field Kit That Survives Winter',
    excerpt:
      'Nine days in a snow hide teaches you which gear is essential, which is ballast, and which fails at minus eighteen.',
    publishedAt: '2025-12-02',
    readingTimeMinutes: 8,
    tags: ['Wildlife', 'Gear', 'Fieldcraft'],
    cover: {
      src: 'https://picsum.photos/seed/wildlife-field-kit/1600/1067',
      localKey: 'wildlife-field-kit-cover',
      alt: 'Telephoto lens set up on a tripod inside a snow-covered hide',
      width: 1600,
      height: 1067,
      placeholderColor: '#1a1e26',
    },
    content: [
      'The gear that fails first in deep cold is never the camera body. It is the battery, the tripod head grease, and the photographer. In that order, reliably, every winter.',
      'I carry six batteries and keep four of them against my body in an inside pocket. A cold battery reading fifteen percent will often return to sixty after twenty minutes of warmth, so nothing gets discarded in the field.',
      'For fieldcraft, arriving early beats every optical advantage. Being in the hide ninety minutes before first light means the animals settle around you rather than away from you, and the frames that result look calm because the subject actually was.',
      'Finally, keep a written log. Temperature, wind direction, what worked, what the animal did. Two seasons of notes will tell you more about where to sit than any amount of new equipment.',
    ],
  },
  {
    id: 'editing-restraint',
    slug: 'editing-with-restraint',
    title: 'Editing With Restraint',
    excerpt:
      'A colour grade should be invisible at first glance and obvious on the tenth. A workflow for keeping edits honest.',
    publishedAt: '2025-10-21',
    readingTimeMinutes: 5,
    tags: ['Post-production', 'Workflow'],
    cover: {
      src: 'https://picsum.photos/seed/editing-with-restraint/1600/1067',
      localKey: 'editing-restraint-cover',
      alt: 'Colour-graded landscape image displayed on an editing monitor',
      width: 1600,
      height: 1067,
      placeholderColor: '#231f1a',
    },
    content: [
      'The most common editing mistake is not over-saturation. It is editing the same image for too long in one sitting, until your eye recalibrates and the file drifts somewhere you would never have chosen on the first pass.',
      'My rule is twenty minutes per image, maximum, then it goes back into the folder overnight. The following morning, roughly one edit in four gets pulled back toward neutral — and those are almost always the frames clients pick.',
      'I also keep a reference strip of five finished images from the same body of work open beside whatever I am grading. Consistency across a gallery matters more than any single frame being perfect.',
      'Restraint is not the same as flatness. Grade decisively, then walk away long enough to find out whether you meant it.',
    ],
  },
];

/** Finds a post by its URL slug. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
