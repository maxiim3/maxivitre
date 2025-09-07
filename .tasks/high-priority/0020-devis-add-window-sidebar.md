# Refonte Sidebar Ajout de Fenêtres - Système Devis

## Description

Réviser et moderniser la sidebar d'ajout de fenêtres du système de devis en intégrant les règles métier centralisées depuis `business-rules.config.ts` et `.rules/`. Nettoyer les sections obsolètes et mettre à jour les options pour refléter l'offre actuelle.

## Contexte Business

**Enjeu** : La sidebar de configuration des fenêtres est un élément critique du tunnel de vente. Des options obsolètes ou des incohérences avec les règles tarifaires peuvent nuire à l'expérience utilisateur et impacter la conversion.

**Objectifs** :
- Synchroniser parfaitement avec les règles métier centralisées
- Éliminer les options dépréciées ou non pertinentes
- Améliorer l'expérience utilisateur du configurateur
- Assurer la cohérence avec la stratégie business actuelle

## Analyse de l'Existant

### Sections Actuelles à Auditer
- **Types de fenêtres** : Vérifier l'alignement avec l'offre réelle
- **Dimensions/Tailles** : Contrôler les catégories et multiplicateurs
- **Options additionnelles** : Identifier les services obsolètes
- **Modificateurs de prix** : Valider la cohérence tarifaire

## Spécifications Détaillées

### Sprint 1 - Audit et Nettoyage (4 pts)

#### 1.1 Audit des Sections Existantes
- **Scanner** toutes les sections de la sidebar actuelle
- **Identifier** les options dépréciées ou non utilisées
- **Documenter** les écarts avec `business-rules.config.ts`
- **Lister** les incohérences avec les fichiers `.rules/`

#### 1.2 Nettoyage des Options Obsolètes
- **Supprimer** les types de fenêtres non proposés
- **Éliminer** les options de service dépréciées
- **Nettoyer** les modificateurs de prix incorrects
- **Simplifier** les sections trop complexes

### Sprint 2 - Intégration Configuration Centralisée (5 pts)

#### 2.1 Migration vers les Constantes
- **Remplacer** tous les types de fenêtres par les constantes config
- **Migrer** les catégories de taille et leurs multiplicateurs
- **Intégrer** les règles de tarification centralisées
- **Synchroniser** avec les zones géographiques du config

#### 2.2 Mise à Jour de l'Interface
- **Actualiser** les labels selon la terminologie business
- **Corriger** les descriptions des options
- **Améliorer** l'ordre de présentation des choix
- **Optimiser** l'ergonomie de sélection

#### 2.3 Validation des Calculs
- **Vérifier** que tous les prix se calculent correctement
- **Tester** les combinaisons d'options
- **Contrôler** l'application des règles de tarification
- **Valider** les minimums de facturation

### Sprint 3 - Amélioration UX (3 pts)

#### 3.1 Optimisation de l'Expérience
- **Simplifier** le parcours de configuration
- **Ajouter** des tooltips explicatifs si nécessaire
- **Améliorer** le feedback visuel des sélections
- **Optimiser** les performances de la sidebar

#### 3.2 Tests Utilisateur
- **Tester** le flow complet d'ajout de fenêtres
- **Valider** la clarté des options proposées
- **Contrôler** la cohérence avec le récapitulatif final

## Règles Métier à Respecter

- Consommer exclusivement les constantes de `business-rules.config.ts`
- Respecter les règles définies dans les fichiers `.rules/`
- Maintenir la cohérence avec le système de pricing global
- Préserver la simplicité d'utilisation pour l'utilisateur final

## Acceptance Criteria

### Fonctionnel
- [ ] Toutes les options proviennent des constantes centralisées
- [ ] Aucune option dépréciée n'est présente
- [ ] Les calculs de prix sont parfaitement alignés
- [ ] L'expérience utilisateur est fluide et intuitive

### Business
- [ ] Parfaite cohérence avec l'offre de service réelle
- [ ] Respect de la stratégie tarifaire centralisée
- [ ] Élimination des sources de confusion client
- [ ] Optimisation du parcours de conversion

### Technique
- [ ] Code propre et maintenable
- [ ] Import optimisé des constantes
- [ ] Aucune régression de performance
- [ ] Respect des patterns du projet

## Risques & Mitigation

### Risques Business
- **Options manquantes** → Validation croisée avec l'offre réelle
- **Tarifs incorrects** → Tests exhaustifs des calculs
- **UX dégradée** → Tests utilisateur avant déploiement

### Risques Techniques
- **Régression fonctionnelle** → Tests de non-régression complets
- **Performance impactée** → Optimisation des imports et computed
- **Incohérences config** → Validation avec les règles centralisées

## Priority

**High** - Composant critique du tunnel de vente

## Sprint Points

**Total** : 12 points
- Sprint 1 (Audit/Nettoyage) : 4 pts
- Sprint 2 (Intégration Config) : 5 pts
- Sprint 3 (Amélioration UX) : 3 pts

## Dependencies

- Finalisation des constantes dans `business-rules.config.ts`
- Validation des règles métier dans `.rules/`
- Coordination avec les tâches de refonte Step 1 et Step 2

## Success Metrics

- **Cohérence** : 100% alignement avec les règles centralisées
- **Simplicité** : 0 option obsolète ou dépréciée
- **Performance** : Maintien des temps de réponse
- **UX** : Amélioration de la fluidité de configuration

## Notes Techniques

- Maintenir la compatibilité avec les autres étapes du wizard
- Préserver les optimisations de performance existantes
- Respecter les patterns de composants du projet
- Assurer la réactivité mobile de la sidebar
