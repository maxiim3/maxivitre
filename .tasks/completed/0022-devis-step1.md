# Refonte Step 1 - Mise à Jour Zonage et Configuration Business

## Description

Corriger et moderniser l'étape 1 du système de devis en mettant à jour le zonage géographique obsolète et en intégrant toutes les constantes centralisées depuis `business-rules.config.ts`. Aligner parfaitement les sections type client, type service et zones géographiques avec les règles métier actualisées.

## Contexte Business

**Enjeu** : Le Step 1 est la porte d'entrée du tunnel de devis. Des informations obsolètes (zonage, tarifs, services) peuvent générer des attentes incorrectes chez le client et impacter négativement la conversion ou la satisfaction.

**Objectifs** :
- Actualiser le zonage géographique selon la couverture réelle
- Synchroniser les types de clients avec la stratégie business
- Aligner les services proposés avec l'offre actuelle
- Centraliser toutes les constantes dans la configuration unifiée

## Analyse de l'Existant

### Sections à Auditer et Corriger
- **Zonage géographique** : Vérifier la liste des communes et suppléments
- **Types de clients** : Pro/Particulier avec remises associées
- **Types de services** : Offres et pourcentages de réduction
- **Intégration config** : Migration vers `business-rules.config.ts`

### Problèmes Identifiés
- Zonage potentiellement obsolète ou incomplet
- Faute de frappe dans le nom de fichier : `business-rules.comnfig.ts`
- Incohérences possibles entre affichage Step 1 et calculs finaux
- Constantes dispersées au lieu d'être centralisées

## Spécifications Détaillées

### Sprint 1 - Audit et Correction du Zonage (4 pts)

#### 1.1 Audit du Zonage Actuel
- **Comparer** les zones affichées dans Step 1 avec les fichiers `.rules/`
- **Vérifier** la liste des communes par zone de couverture
- **Contrôler** les suppléments tarifaires par zone
- **Identifier** les zones manquantes ou dépréciées

#### 1.2 Mise à Jour du Zonage Géographique
- **Actualiser** la liste des communes selon la couverture réelle
- **Corriger** les suppléments tarifaires par zone
- **Optimiser** l'affichage géographique (ordre, groupement)
- **Valider** la cohérence avec le système de pricing

#### 1.3 Correction du Nom de Fichier
- **Corriger** la faute de frappe : `business-rules.comnfig.ts` → `business-rules.config.ts`
- **Vérifier** tous les imports et références au fichier
- **S'assurer** que les liens fonctionnent correctement

### Sprint 2 - Intégration Configuration Centralisée (5 pts)

#### 2.1 Migration Type Client
- **Remplacer** les constantes hardcodées par celles du config
- **Vérifier** les remises Pro (-15%) et leur application
- **Actualiser** les labels et descriptions clients
- **Synchroniser** avec la stratégie de targeting (focus commerces)

#### 2.2 Migration Type Service
- **Intégrer** les services depuis le fichier config centralisé
- **Corriger** les pourcentages de remise (nouveau client, entretien récent)
- **Actualiser** les descriptions et conditions d'éligibilité
- **Aligner** avec les règles métier définies dans `.rules/`

#### 2.3 Migration Zones Géographiques
- **Consommer** les zones depuis `business-rules.config.ts`
- **Intégrer** les suppléments de zone automatiquement
- **Synchroniser** avec le moteur de calcul de prix
- **Optimiser** l'affichage utilisateur (cartes, listes, sélecteurs)

### Sprint 3 - Tests et Validation (3 pts)

#### 3.1 Tests de Cohérence
- **Vérifier** que Step 1 → Step 2 → Step 3 est cohérent
- **Contrôler** les calculs avec les nouvelles constantes
- **Tester** tous les cas de figure (zones, clients, services)
- **Valider** les minimums de facturation par type client

#### 3.2 Tests Utilisateur
- **Tester** la clarté des options proposées
- **Valider** l'ergonomie des sélecteurs (zones, services)
- **Contrôler** la compréhension des suppléments géographiques
- **Optimiser** l'expérience mobile

## Règles Métier à Respecter

- Consommer exclusivement les constantes de `business-rules.config.ts`
- Respecter fidèlement les règles définies dans `.rules/`
- Maintenir la cohérence tarifaire avec les étapes suivantes
- Préserver la simplicité et clarté pour l'utilisateur final

## Acceptance Criteria

### Fonctionnel
- [ ] Le zonage géographique est parfaitement à jour
- [ ] Toutes les constantes proviennent du fichier de configuration centralisé
- [ ] La faute de frappe `comnfig.ts` est corrigée partout
- [ ] Les types de clients reflètent la stratégie business actuelle
- [ ] Les services proposés correspondent à l'offre réelle

### Business
- [ ] Les suppléments de zone sont cohérents avec la couverture réelle
- [ ] Les remises client sont alignées avec la stratégie tarifaire
- [ ] Les services mis en avant favorisent l'acquisition (nouveau client)
- [ ] L'interface guide naturellement vers les options rentables

### Technique
- [ ] Aucune constante hardcodée dans le Step 1
- [ ] Import propre et optimisé du fichier de configuration
- [ ] Parfaite synchronisation avec les autres étapes du devis
- [ ] Code maintenable et respectant les patterns du projet

### UX
- [ ] L'interface reste intuitive et ne surcharge pas l'utilisateur
- [ ] Les informations géographiques sont claires et précises
- [ ] Les options de service sont compréhensibles sans jargon
- [ ] L'expérience mobile est optimisée

## Risques & Mitigation

### Risques Business
- **Zonage incorrect** → Validation croisée avec la couverture opérationnelle
- **Tarifs incohérents** → Tests exhaustifs avec différentes combinaisons
- **Confusion client** → Simplicité des labels et descriptions

### Risques Techniques
- **Imports cassés** → Vérification systématique après correction nom fichier
- **Régression calculs** → Tests de non-régression sur les prix
- **Performance dégradée** → Optimisation des imports et computed properties

### Risques UX
- **Interface complexifiée** → Tests utilisateur et itérations design
- **Options pas claires** → Validation des libellés avec le métier
- **Mobile experience** → Tests sur différents devices et résolutions

## Priority

**High** - Première impression critique du tunnel de devis

## Status

**COMPLETED** ✅ - 07/09/2025

### Résultats Obtenus

- ✅ **Composable useBusinessRules()** créé pour centralisation règles métier
- ✅ **ServiceTypeCard** : Discount -15% → -25% corrigé, styles alignés home page  
- ✅ **ZoneSelector** : Rebuild avec vraies zones service (business-rules.config.ts)
- ✅ **AccessibilitySelector** : Mapping 'etage' → 'echelle' + business rules
- ✅ **ClientTypeSelector** : Descriptions business révisées (focus entreprises/agences)
- ✅ **Nettoyage complet minimums fictifs** (50€/80€) dans tout le système
- ✅ **Suppression Shopping Cart** de la page devis
- ✅ **Architecture**: 100% Single Source of Truth depuis business-rules.config.ts
- ✅ **0 constantes hardcodées** dans Step 1
- ✅ **Cohérence UI/UX** avec page d'accueil (couleurs, badges)

### Impact Business

- **Exactitude tarifaire** : Fin des discordances prix Step 1 vs calculs finaux
- **Zonage réel** : 7 vraies communes de service vs zones fictives  
- **Transparence** : Remises et conditions business clairement affichées
- **Maintienabilité** : Modifications business sans code (just config)

## Sprint Points

**Total** : 12 points
- Sprint 1 (Audit/Correction Zonage) : 4 pts
- Sprint 2 (Intégration Config) : 5 pts
- Sprint 3 (Tests/Validation) : 3 pts

## Dependencies

- Finalisation et validation du fichier `business-rules.config.ts`
- Mise à jour des règles métier dans les fichiers `.rules/`
- Coordination avec les tâches Step 2 et Sidebar pour cohérence UX

## Success Metrics

- **Exactitude** : 100% cohérence avec les règles métier centralisées
- **Couverture** : Zonage parfaitement aligné avec la couverture opérationnelle
- **Simplicité** : 0 confusion utilisateur sur les options proposées
- **Performance** : Maintien des temps de chargement du Step 1

## Notes Techniques

- Maintenir la compatibilité avec le wizard multi-étapes existant
- Préserver les optimisations de performance (lazy loading, computed)
- Respecter les patterns DaisyUI et la cohérence visuelle
- Assurer la réactivité et l'accessibilité de tous les composants

## Validation Géographique

### Zones à Vérifier Prioritairement
- **Zone 1** : Castelnau-le-Lez (siège) - 0€ supplément
- **Zone 2** : Périphérie proche - Vérifier liste communes et supplément
- **Zone 3** : Périphérie éloignée - Valider faisabilité et tarification

### Services à Auditer
- **Nouveau client** : Vérifier le pourcentage de remise réel
- **Entretien récent** : Distinguer Pro (<2 mois) vs Particulier (<6 mois)
- **Nettoyage standard** : Confirmer comme offre de base
