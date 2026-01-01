# Optimization: Hero Image Loading + SEO Schemas ✅

## Description
L'image de la section hero était longue à charger. Optimisé le chargement pour desktop et mobile + ajout des schemas structurés SEO.

## Problème résolu
Image Unsplash trop lourde causant des temps de chargement lents.

## Solutions implémentées
- ✅ **Image Hero optimisée** : NuxtImg avec priority loading, format WebP, 1920x1080
- ✅ **Images services lazy loading** : 3 images optimisées avec responsive sizes  
- ✅ **Image CTA optimisée** : suppression bg-fixed, lazy loading
- ✅ **Formats modernes** : WebP automatique via @nuxt/image
- ✅ **Responsive images** : sizes adaptées selon breakpoints
- ✅ **Priority loading** : image critique préchargée
- ✅ **Schemas SEO** : Organization, LocalBusiness, Services JSON-LD
- ✅ **Meta tags** : title, description, OpenGraph optimisés

## Files impactés
- ✅ `pages/index.vue` - Images optimisées + SEO head
- ✅ `composables/useSchemas.ts` - Schemas structurés centralisés

## Status  
- ✅ **Terminé** - Optimisations d'images et SEO schemas implémentés

## Priority
**Important** - Impact sur l'expérience utilisateur et SEO

## Gains de performance
- **LCP amélioré** : image hero préchargée intelligemment
- **~30% poids réduit** : format WebP vs JPEG
- **Responsive** : images adaptées aux écrans
- **SEO** : rich snippets pour recherche locale Google
- **UX mobile** : chargement non-bloquant

## Notes techniques
- Utilise @nuxt/image pour optimisation automatique
- Schemas compatibles Google Business/Maps  
- Images Unsplash optimisées sans casser le design
- Meta tags optimisés pour partage social