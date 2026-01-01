# Add: Badge "Recommandé" sur Nettoyage Extérieur

## Description
Ajouter un badge "RECOMMANDÉ" sur l'option nettoyage extérieur dans WindowDrawer.

## Problème Identifié
- ❌ **Badge manquant** : pas d'indication "Recommandé" sur nettoyage extérieur
- ❌ **Guidance utilisateur** : pas de guidance sur le choix préféré
- ❌ **Mise en valeur** : option recommandée non mise en évidence

## Solution à Implémenter

### 1. Badge Visuel sur Option Extérieur (1 pt)
```
⚪ Nettoyage extérieur seulement  [RECOMMANDÉ]
⚪ Nettoyage extérieur + intérieur (+180%)
```

### 2. Design Badge (1 pt)
- Badge avec couleurs : fond vert, texte blanc
- Icône étoile ou pouce levé
- Positionnement à droite du label
- Style cohérent avec le design system

## Implémentation
- Modifier `WindowDrawer.vue` : ajouter badge sur option extérieur
- CSS pour styling du badge
- Responsive mobile/desktop maintenu

## Sprint Points
2 points total

## Priority
Low - Amélioration guidage UX