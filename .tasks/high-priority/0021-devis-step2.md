# Refonte Step 2 - Configuration Fenêtres avec Drawer

## Description

Réviser l'étape 2 du système de devis en supprimant temporairement le système de panier et en implémentant une interface intuitive de gestion des fenêtres avec drawer d'édition et actions inline (modification quantité, suppression).

## Contexte Business

**Enjeu** : L'étape 2 est cruciale dans le parcours de conversion car c'est là que le client configure précisément ses besoins. Une interface claire et ergonomique impacte directement le taux d'abandon du tunnel.

**Objectifs** :
- Simplifier l'expérience utilisateur en supprimant le cart complexe
- Offrir une interface intuitive pour la gestion des fenêtres
- Permettre des modifications rapides (quantité, suppression) sans friction
- Maintenir la fluidité du parcours de devis

## Analyse de l'Existant

### Architecture Actuelle
- **Step 2** : Configuration des fenêtres avec système de panier
- **UX Issue** : Le panier complique l'expérience pour un devis simple
- **Besoin** : Interface plus directe pour la gestion des fenêtres configurées

## Spécifications Détaillées

### Sprint 1 - Suppression du Cart et Refonte UI (6 pts)

#### 1.1 Suppression du Système de Panier
- **Retirer** complètement la logique de cart/panier
- **Simplifier** l'état de gestion des fenêtres configurées
- **Nettoyer** les composants et stores liés au panier
- **Adapter** la logique de pricing sans le layer cart

#### 1.2 Design de la Nouvelle Interface
- **Concevoir** l'affichage en liste des fenêtres configurées
- **Planifier** l'intégration du drawer d'édition
- **Définir** les actions inline (quantité, suppression)
- **Optimiser** pour mobile et desktop

### Sprint 2 - Implémentation Drawer d'Édition (5 pts)

#### 2.1 Création du Drawer Component
- **Développer** le composant drawer réutilisable
- **Intégrer** les animations d'ouverture/fermeture fluides
- **Optimiser** pour tous les breakpoints
- **Assurer** l'accessibilité (focus management, échap key)

#### 2.2 Interface d'Édition dans le Drawer
- **Reproduire** les options de configuration initiales
- **Permettre** la modification complète d'une fenêtre
- **Intégrer** la validation en temps réel
- **Synchroniser** avec le prix total dynamiquement

#### 2.3 Actions de Sauvegarde et Annulation
- **Implémenter** la logique de sauvegarde des modifications
- **Gérer** l'annulation des changements non sauvés
- **Ajouter** les confirmations pour les actions destructives
- **Optimiser** les performances de mise à jour

### Sprint 3 - Actions Inline (4 pts)

#### 3.1 Modification Quantité Inline
- **Créer** des contrôles +/- intuitifs
- **Implémenter** la mise à jour en temps réel du prix
- **Ajouter** la validation des quantités (min/max)
- **Optimiser** l'expérience mobile (touch targets)

#### 3.2 Suppression Inline
- **Ajouter** boutons de suppression discrets mais accessibles
- **Implémenter** confirmation de suppression
- **Gérer** l'état empty quand toutes les fenêtres sont supprimées
- **Animer** la suppression pour un feedback visuel

#### 3.3 Cohérence avec les Règles Métier
- **Intégrer** les constantes de `business-rules.config.ts`
- **Respecter** les règles de tarification centralisées
- **Valider** les minimums de commande
- **Synchroniser** avec le système de pricing global

## Règles Métier à Respecter

- Utiliser les constantes centralisées de `business-rules.config.ts`
- Maintenir la cohérence tarifaire avec les autres étapes
- Respecter les minimums de commande et validation business
- Préserver la fluidité du parcours de conversion

## Acceptance Criteria

### Fonctionnel
- [x] ✅ Le système de panier est complètement supprimé (2025-12-02)
- [x] ✅ Les fenêtres configurées s'affichent en liste claire (2025-12-02)
- [ ] Le drawer permet l'édition complète d'une fenêtre
- [ ] Les modifications de quantité se font en inline avec mise à jour prix
- [x] ✅ La suppression inline fonctionne avec confirmation (2025-12-02)

### UX/UI
- [ ] L'interface est intuitive et ne nécessite pas d'apprentissage
- [ ] Les actions sont visuellement claires (édition, quantité, suppression)
- [ ] Le drawer s'ouvre/ferme fluidement avec bonnes animations
- [ ] L'expérience mobile est optimisée (touch, tailles des boutons)
- [ ] L'accessibilité est respectée (navigation clavier, screen readers)

### Technique
- [ ] Code propre sans résidus du système de panier
- [ ] Performance optimale (pas de re-render inutiles)
- [ ] État de l'application cohérent et prévisible
- [ ] Intégration parfaite avec les autres steps

### Business
- [ ] Respect des règles de pricing centralisées
- [ ] Validation des minimums de commande
- [ ] Synchronisation parfaite avec le calcul final
- [ ] Préservation du taux de conversion du tunnel

## Risques & Mitigation

### Risques UX
- **Interface trop complexe** → Tests utilisateur et itérations
- **Actions pas intuitives** → Design clear et feedback visuel
- **Mobile experience dégradée** → Tests approfondis sur différents devices

### Risques Techniques
- **État incohérent** → Tests unitaires de la logique state
- **Performance dégradée** → Optimisation avec computed et memo
- **Régression pricing** → Tests croisés avec les autres étapes

### Risques Business
- **Abandon tunnel** → Monitoring analytics avant/après
- **Calculs incorrects** → Validation exhaustive des règles métier
- **Perte de features** → Documentation des changements

## Priority

**High** - Étape critique du tunnel de conversion

## Sprint Points

**Total** : 15 points
- Sprint 1 (Suppression Cart/Refonte) : 6 pts
- Sprint 2 (Drawer d'Édition) : 5 pts
- Sprint 3 (Actions Inline) : 4 pts

## Dependencies

- Finalisation de la tâche 0020 (Sidebar) pour cohérence UI
- Validation des règles métier dans `business-rules.config.ts`
- Coordination avec Step 1 et Step 3 pour la continuité UX

## Success Metrics

- **Simplicité** : Réduction du nombre d'interactions nécessaires
- **Performance** : Temps de configuration < 2 minutes
- **Conversion** : Maintien ou amélioration du taux de passage Step 2→3
- **Satisfaction** : Feedback utilisateur positif sur la nouvelle UX

## Notes Techniques

- Préserver les optimisations de performance existantes
- Maintenir la compatibilité avec le système de sauvegarde brouillon
- Respecter les patterns de composants DaisyUI du projet
- Assurer la cohérence avec l'écosystème Nuxt 3 / Vue 3

## Wireframes & Spécifications UI

### Liste des Fenêtres Configurées
```
┌─────────────────────────────────────────┐
│ 🪟 Fenêtre Standard - Salon            │
│ Dimensions: Moyenne (1,2m x 1,5m)      │
│ Quantité: [−] 2 [+]    Prix: 45€  [🗑️] │
│                            [✏️ Éditer] │
├─────────────────────────────────────────┤
│ 🪟 Baie Vitrée - Terrasse              │
│ Dimensions: Grande (2m x 2,5m)         │
│ Quantité: [−] 1 [+]    Prix: 38€  [🗑️] │
│                            [✏️ Éditer] │
└─────────────────────────────────────────┘
```

### Drawer d'Édition
```
Drawer ouvert sur la droite avec:
- Formulaire complet de configuration
- Actions Sauvegarder / Annuler
- Fermeture par X ou échap
- Responsive mobile (fullscreen)
```

---

## Implémentation Partielle (2025-12-02)

### Phase 1 Complétée : Affichage Liste des Fenêtres ✅

**Fichier modifié** : `/pages/devis.vue` (lignes 37-101)

#### Fonctionnalités Implémentées

1. **Liste Interactive des Fenêtres**
   - Affichage en carte pour chaque fenêtre configurée
   - Icône emoji du type de fenêtre
   - Nom et détails (quantité, taille, type de nettoyage)
   - Prix unitaire calculé et affiché
   - Compteur total de fenêtres en en-tête

2. **Suppression avec Confirmation**
   - Bouton poubelle visible au survol
   - Modal de confirmation avant suppression
   - Messages clairs ("Êtes-vous sûr ?")
   - Actions "Annuler" et "Supprimer" dans le modal
   - État de confirmation géré via `deleteConfirmIndex`

3. **Design et UX**
   - Cards avec hover state (bg-gray-100)
   - Bouton suppression en rouge (text-error)
   - Icône SVG de poubelle accessible
   - aria-label pour accessibilité
   - Layout responsive avec Flexbox

#### Code Clé

```typescript
// État pour la confirmation de suppression
const deleteConfirmIndex = ref<number | null>(null)

// Fonctions de gestion
const confirmDelete = (index: number) => {
  deleteConfirmIndex.value = index
}

const cancelDelete = () => {
  deleteConfirmIndex.value = null
}

const executeDelete = () => {
  if (deleteConfirmIndex.value !== null) {
    removeWindow(deleteConfirmIndex.value)
    deleteConfirmIndex.value = null
  }
}
```

#### Pricing Integration
- Utilisation de `useWindowPricing().calculateTotalPrice()`
- Prix calculés en temps réel avec toutes les règles métier
- Display formaté avec symbole € (ex: "45.00€")
- Labels lisibles via `getSizeLabel()` et `getCleaningTypeLabel()`

### Phase 2 Restante : Drawer d'Édition ⏳

**À implémenter** :
- [ ] Composant drawer d'édition réutilisable
- [ ] Pré-remplissage des valeurs lors de l'édition
- [ ] Sauvegarde des modifications
- [ ] Animation d'ouverture/fermeture
- [ ] Gestion du focus et de l'accessibilité

### Phase 3 Restante : Modification Quantité Inline ⏳

**À implémenter** :
- [ ] Contrôles +/- pour ajuster la quantité
- [ ] Mise à jour en temps réel du prix
- [ ] Validation min/max
- [ ] Optimisation mobile (touch targets)

### Impact Business

**Ce qui fonctionne maintenant** :
- ✅ Client voit clairement les fenêtres configurées
- ✅ Client peut supprimer facilement une fenêtre
- ✅ Prix mis à jour automatiquement après suppression
- ✅ Interface claire et professionnelle
- ✅ Pas de confusion possible (confirmation avant suppression)

**À améliorer avec les phases suivantes** :
- Édition rapide sans avoir à supprimer/recréer
- Ajustement quantité sans re-configuration complète
- Expérience plus fluide pour modifications mineures
