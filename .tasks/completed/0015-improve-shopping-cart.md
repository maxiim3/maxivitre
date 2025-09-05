# Improve: ShoppingCart avec Cartes Tailles

## Description
Refactoriser le ShoppingCart pour utiliser des cartes par taille avec exemples textuels.

## Problème Identifié
- ❌ **Liste fenêtres individuelles** au lieu de cartes résumé
- ❌ **Manque exemples textuels** pour tailles (< Xm², X-Xm², > Xm²)
- ❌ **Pas de regroupement** par taille
- ❌ **Interface confuse** avec trop de détails

## Solution à Implémenter

### 1. Cartes Tailles avec Exemples (2 pts)
```
📦 Petites fenêtres        × 3
< 1m² (ex: salle de bain)     45€

📦 Moyennes fenêtres       × 2  
1-2m² (ex: chambre)           38€

📦 Grandes fenêtres        × 1
> 2m² (ex: baie vitrée)       28€
```

### 2. Regroupement Intelligent (1 pt)
- Grouper fenêtres par taille automatiquement
- Calculer quantité totale par groupe
- Prix moyen par groupe

### 3. Exemples Contextuels (1 pt)
- **Petite** : "< 1m² (salle de bain, WC)"  
- **Moyenne** : "1-2m² (chambre, bureau)"
- **Grande** : "> 2m² (salon, baie vitrée)"

## Implémentation
- Modifier `ShoppingCart.vue` : nouveau layout cartes
- Logique regroupement par taille
- Calculs prix moyens par groupe
- Responsive mobile/desktop maintenu

## Implémentation Réalisée

### ✅ COMPLÉTÉ - Interface Individualisée (4 pts)
**Avant** : Regroupement par taille avec multiples boutons confus
```
📦 Petites fenêtres × 3 [edit][edit][edit][remove][remove][remove]
```

**Après** : Interface claire avec une fenêtre = ses boutons
```
🪟 Fenêtre standard (Petite • Ext. • Qty: 2)  [✏️][🗑️]
🚪 Porte-fenêtre (Grande • Ext+Int • Qty: 1)  [✏️][🗑️]  
```

### Améliorations UX Apportées
- ✅ **Boutons toujours visibles** : Plus d'opacity-0
- ✅ **Interface intuitive** : Chaque fenêtre a ses propres boutons
- ✅ **Responsive** : Boutons adaptés mobile/desktop
- ✅ **Feedback visuel** : Bordures + hover states

## Résultat Final
- **Fini** : Interface confuse avec groupement et multiples boutons
- **Nouveau** : Interface claire et directe, une fenêtre = deux boutons

## Sprint Points
4 points total ✅ COMPLÉTÉ

## Priority
Medium - Amélioration UX