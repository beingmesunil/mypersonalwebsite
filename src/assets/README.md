# Local assets

Import photographs, logos and fonts from this folder when you want them bundled
and hashed by Vite:

```ts
import portrait from '@/assets/portrait.jpg';
```

`src/utils/image.ts` passes non-CDN sources through untouched, so a local import
can be dropped straight into an `ImageAsset` in `src/data/` — remember to keep
the real `width` and `height` so the layout still reserves the right space.
