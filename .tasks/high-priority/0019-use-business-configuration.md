# Intégration Business Configuration sur Page d'Accueil

## Description

Identifier et remplacer toutes les règles métier hardcodées sur la page d'accueil par l'utilisation des constantes centralisées depuis `business-rules.config.ts`. Cette centralisation assure la cohérence des données business et facilite les futures modifications.

## Contexte Business

**Enjeu** : La page d'accueil présente des informations clés (tarifs, zones, services) qui doivent être parfaitement synchronisées avec le système de devis pour éviter les incohérences et maintenir la confiance client.

**Objectifs** :
- Centraliser toutes les constantes business dans un seul fichier
- Éliminer les valeurs hardcodées dispersées
- Faciliter les mises à jour tarifaires futures
- Assurer la cohérence entre page d'accueil et système de devis

## Spécifications Détaillées

### Sprint 1 - Audit des Règles Hardcodées (3 pts)

#### 1.1 Identification des Constantes à Migrer
- **Scanner** la page d'accueil pour identifier :
  - Tarifs affichés (prix de base, suppléments)
  - Zones géographiques listées
  - Types de services présentés
  - Remises et offres promotionnelles
- **Documenter** chaque valeur hardcodée trouvée
- **Mapper** avec les constantes disponibles dans `business-rules.config.ts`

#### 1.2 Analyse des Écarts
- **Vérifier** la cohérence entre page d'accueil et configuration
- **Identifier** les constantes manquantes à ajouter au fichier config
- **Détecter** les potentielles incohérences de données

### Sprint 2 - Implémentation de la Migration (4 pts)

#### 2.1 Mise à Jour du Composable/Import
- **Créer** ou mettre à jour le composable pour importer les constantes
- **Structurer** l'import selon les besoins de la page d'accueil
- **Optimiser** les performances (computed, memoization)

#### 2.2 Remplacement des Valeurs Hardcodées
- **Remplacer** tous les tarifs par les constantes config
- **Migrer** les listes de zones géographiques
- **Actualiser** les descriptions de services
- **Corriger** les offres et remises affichées

#### 2.3 Tests et Validation
- **Vérifier** que l'affichage reste identique
- **Tester** les mises à jour dynamiques
- **Contrôler** la cohérence avec le système de devis

## Règles Métier à Respecter

- Utiliser exclusivement les constantes de `business-rules.config.ts`
- Maintenir la cohérence visuelle et fonctionnelle
- Préserver les performances de la page d'accueil
- Respecter les règles de tarification centralisées

## Acceptance Criteria

### Fonctionnel
- [ ] Aucune valeur business n'est hardcodée sur la page d'accueil
- [ ] Toutes les constantes proviennent de `business-rules.config.ts`
- [ ] L'affichage reste visuellement identique après migration
- [ ] Les mises à jour du fichier config se reflètent automatiquement

### Technique
- [ ] Import propre et optimisé des constantes
- [ ] Aucune régression de performance
- [ ] Code maintenable et documenté
- [ ] Cohérence avec les patterns du projet

### Business
- [ ] Parfaite synchronisation avec le système de devis
- [ ] Facilitation des futures mises à jour tarifaires
- [ ] Élimination des risques d'incohérence

## Risques & Mitigation

### Risques
- **Affichage modifié** → Tests visuels approfondis
- **Performance dégradée** → Optimisation imports et computed
- **Incohérences données** → Validation croisée config/devis

## Priority

**High** - Cohérence business critique

## Sprint Points

**Total** : 7 points
- Sprint 1 (Audit) : 3 pts
- Sprint 2 (Implémentation) : 4 pts

## Dependencies

- Finalisation du fichier `business-rules.config.ts`
- Validation des constantes par le métier
- Tests sur environnement de staging

## Success Metrics

- **Centralisation** : 100% des constantes business externalisées
- **Cohérence** : 0 écart entre page d'accueil et devis
- **Maintenabilité** : 1 seul point de modification des règles
- **Performance** : Maintien des temps de chargement
