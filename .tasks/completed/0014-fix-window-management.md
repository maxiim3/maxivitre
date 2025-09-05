# Fix: Gestion des Fenêtres

## Description
Améliorer la gestion des fenêtres avec boutons supprimer et modification via drawer.

## Problèmes Identifiés
- ❌ **Bouton supprimer** manquant sur chaque fenêtre
- ❌ **Drawer non-modifiable** : impossible d'éditer une fenêtre existante
- ❌ **UX incohérente** : une fois ajoutée, fenêtre non modifiable

## Solutions à Implémenter

### 1. WindowCard - Bouton Supprimer (1 pt)
- Ajouter bouton "🗑️ Supprimer" sur chaque fenêtre listée
- Confirmation avant suppression
- Animation de suppression fluide

### 2. WindowCard - Bouton Modifier (2 pts)  
- Ajouter bouton "✏️ Modifier" sur chaque fenêtre
- Rouvrir WindowDrawer pré-rempli avec les données existantes
- Mode édition vs mode ajout

### 3. WindowDrawer - Mode Édition (2 pts)
- Détecter mode ajout vs édition
- Pré-remplir formulaire si modification
- Bouton "Mettre à jour" au lieu de "Ajouter"
- Gestion index fenêtre à modifier

## Implémentation
- Modifier `WindowCard.vue` : ajouter boutons action
- Modifier `WindowDrawer.vue` : mode édition + pré-remplissage
- Modifier `pages/devis.vue` : gestion état édition

## Implémentation Réalisée

### ✅ COMPLÉTÉ - Boutons Edit/Remove Visibles (1 pt)
- Boutons "✏️ Modifier" et "🗑️ Supprimer" toujours visibles sur chaque fenêtre
- Plus d'opacity-0 : boutons immédiatement accessibles
- Feedback visuel avec bordures et hover states

### ✅ COMPLÉTÉ - Boutons Plus Gros et Accessibles (2 pts)  
- Taille augmentée : p-2 au lieu de p-1
- Icônes text-sm au lieu de text-xs
- Bordures colorées avec hover effects
- Boutons touch-friendly pour mobile

### ✅ COMPLÉTÉ - Mode Édition WindowDrawer (2 pts)
- Architecture déjà fonctionnelle dans pages/devis.vue
- `:editingWindow` pré-remplit correctement tous les champs
- `:isEditing` change le titre et le bouton ("Modifier" vs "Ajouter")
- Cycle complet : edit → pré-remplissage → modification → sauvegarde

## Résultat Final
Interface ShoppingCart complètement refactorisée :
- **Avant** : Boutons groupés invisibles et confus
- **Après** : Une fenêtre = ses propres boutons edit/remove visibles

## Sprint Points
5 points total ✅ COMPLÉTÉ

## Priority
High - Impact UX direct