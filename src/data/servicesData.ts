import { Briefcase, Camera, Plane, Users } from 'lucide-react';

import type { PhotographyService } from '@/types';

export const services: readonly PhotographyService[] = [
  {
    id: 'wedding',
    title: 'Wedding Photography',
    description:
      'Full-day documentary coverage from first light to the last dance, with a second shooter and a hand-edited gallery delivered in three weeks.',
    icon: Camera,
    startingPrice: 3200,
    currency: 'USD',
    deliverables: [
      '10 hours of coverage',
      'Second photographer included',
      '600+ edited images',
      'Private online gallery',
    ],
  },
  {
    id: 'portrait',
    title: 'Portrait Sessions',
    description:
      'Studio or location portraits for individuals, families and founders — directed gently, lit precisely, retouched with restraint.',
    icon: Users,
    startingPrice: 450,
    currency: 'USD',
    deliverables: [
      '90-minute session',
      'Wardrobe consultation',
      '25 retouched images',
      'Print-ready files',
    ],
  },
  {
    id: 'commercial',
    title: 'Commercial Photography',
    description:
      'Campaign, product and brand imagery with full pre-production: mood boards, shot lists, casting support and licensed delivery.',
    icon: Briefcase,
    startingPrice: 1800,
    currency: 'USD',
    deliverables: [
      'Half or full-day rates',
      'Art direction included',
      'Commercial usage licence',
      '48-hour selects turnaround',
    ],
  },
  {
    id: 'travel',
    title: 'Travel Photography',
    description:
      'Editorial and tourism assignments worldwide, plus small-group photo expeditions to Iceland, Norway and Patagonia.',
    icon: Plane,
    startingPrice: 2400,
    currency: 'USD',
    deliverables: [
      'Multi-day assignments',
      'Location scouting',
      'Editorial captioning',
      'Expedition workshops',
    ],
  },
];
