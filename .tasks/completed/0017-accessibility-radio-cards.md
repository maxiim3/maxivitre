# Fix: Accessibilité en Radio Cards avec Hint

## Description
Convertir la sélection accessibilité de select en radio cards avec texte d'aide.

## Problème Identifié
- ❌ **Select dropdown** au lieu de radio cards visuels
- ❌ **Hint text manquant** : pas de clarification (pas nacelle/suspendu)
- ❌ **UX incohérente** : autres sélections sont en radio cards
- ❌ **Accessibilité** : moins intuitif qu'un choix visuel

## Solution à Implémenter

### 1. Radio Cards Layout (2 pts)
```
⚪ Accès facile (rez-de-chaussée, balcon)
   Tarif standard

⚪ Accès difficile (étage élevé, échelle nécessaire)  
   Majoration +50%

💡 Note: Nous n'utilisons pas de nacelle ou équipement suspendu
```

### 2. Cards Design (1 pt)
- Cards avec border et hover effects
- Icônes : 🏠 facile, ⛰️ difficile
- Description tarifaire sous chaque option
- Hint text en bas avec icône info

### 3. Integration Responsive (1 pt)
- Cards stack sur mobile
- Side-by-side sur desktop
- Texte hint adaptatif selon taille écran

## Implémentation
- Modifier `pages/devis.vue` : remplacer select par radio cards
- Styling cohérent avec autres cards du wizard
- Tests sur différents breakpoints

## Sprint Points
4 points total

## Priority
Medium - Cohérence UX