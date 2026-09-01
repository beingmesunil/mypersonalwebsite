import { Award, Camera, Globe, Heart } from 'lucide-react';

import type { Statistic } from '@/types';

export const statistics: readonly Statistic[] = [
  { id: 'projects', label: 'Projects Completed', value: 480, suffix: '+', icon: Camera },
  { id: 'clients', label: 'Happy Clients', value: 310, suffix: '+', icon: Heart },
  { id: 'experience', label: 'Years Experience', value: 13, icon: Award },
  { id: 'countries', label: 'Countries Visited', value: 37, icon: Globe },
];
