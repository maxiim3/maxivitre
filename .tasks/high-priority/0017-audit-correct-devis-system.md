# Audit et Correction du Système Devis MaxiVitre

## Description

Audit complet du système de devis actuel pour identifier et corriger les incohérences entre les règles métier définies (.rules/) et l'implémentation. Ce tunnel de vente critique doit refléter fidèlement la stratégie tarifaire et les règles business pour maximiser la conversion.

## Contexte Business

**Enjeu critique** : Le système de devis est le principal générateur de leads qualifiés. Toute incohérence dans les règles de pricing ou le workflow peut impacter directement le CA et la satisfaction client.

**Objectifs** :

- Garantir la cohérence entre règles métier (.rules/) et implémentation
- Optimiser le taux de conversion du tunnel de vente
- Assurer la fiabilité des calculs de prix
- Améliorer l'expérience utilisateur du workflow

## Analyse de l'Existant

### Architecture Actuelle

- **Page principale** : `/pages/devis.vue` (wizard 3 étapes)
- **Logique pricing** : `/composables/useWindowPricing.ts`
- **Types & constantes** : `/types/Windows.types.ts`
- **Règles métier** : `.rules/devis-business-rules.md`, `.rules/pricing.md`, `.rules/business-model.md`

### Workflow Actuel

1. **Étape 1** : Sélection client (Pro/Particulier) + Service + Zone géographique
2. **Étape 2** : Configuration des fenêtres (types, tailles, quantité)
3. **Étape 3** : Récapitulatif + Export (PDF/Email)

## Spécifications Détaillées

### Sprint 1 - Audit Règles Métier vs Implémentation (8 pts)

#### 1.1 Audit Tarification de Base

- **Vérifier** : Prix de base actuel vs règles (.rules/pricing.md : 2€/m² + 8€ frais fixes)
- **Action** : Documenter les écarts identifiés
- **Contrôler** : Cohérence des multiplicateurs de taille (petite/moyenne/grande)
- **Valider** : Calculs minimums de facturation (50€ particuliers, 80€ pros)

#### 1.2 Audit Zones Géographiques

- **Vérifier** : Suppléments zone actuels vs règles (.rules/pricing.md)
  - Zone 1 (Castelnau-le-Lez) : 0€ → Correct
  - Zone 2 (Périphérie proche) : +10€ → **INCOHÉRENCE** (règles = +10€, devis = +10€) ✓
  - Zone 3 (Périphérie éloignée) : +15€ → **INCOHÉRENCE** (règles = +15€, devis = +15€) ✓
- **Action** : Corriger les constantes `ZONE_SURCHARGES` si nécessaire
- **Contrôler** : Liste des communes par zone

#### 1.3 Audit Types de Services

- **Vérifier** : Services actuels vs règles métier
  - Nouveau client : -15% → **INCOHÉRENCE** (implémentation = -15%, règles = -25%)
  - Entretien récent (pro < 2 mois) : tarif normal → **INCOHÉRENCE** (règles = -20%)
  - Entretien récent (particulier < 6 mois) : tarif normal → **INCOHÉRENCE** (règles = -15%)
- **Action** : Aligner les multiplicateurs sur les règles business
- **Contrôler** : Labels des services dans l'interface

#### 1.4 Audit Remises Client

- **Vérifier** : Remises professionnels (-15% actuellement)
- **Contrôler** : Cohérence avec stratégie business (70% focus commerces)
- **Valider** : Application correcte sur le total final

### Sprint 2 - Corrections Implémentation (5 pts)

#### 2.1 Correction Constantes de Pricing

- **Fichier** : `/types/Windows.types.ts`
- **Actions** :
  - Corriger `SERVICE_MULTIPLIERS` selon les vraies règles :
    - `nouveau-client`: 0.75 (au lieu de 0.85) pour -25%
    - `entretien-recent`: 0.85 (particuliers) ou 0.80 (pros) au lieu de 1
  - Vérifier `ZONE_SURCHARGES` cohérence règles
  - Ajuster `MINIMUM_BILLING` si nécessaire

#### 2.2 Correction Logique de Calcul

- **Fichier** : `/composables/useWindowPricing.ts`
- **Actions** :
  - Réviser fonction `calculateTotalPrice()` pour intégrer frais fixes de 8€
  - Implémenter calcul basé sur m² (prix de base 2€/m²)
  - Corriger application des remises par type de service
  - Valider calcul des suppléments zone

#### 2.3 Mise à Jour Interface Utilisateur

- **Fichier** : `/pages/devis.vue` et composants
- **Actions** :
  - Mettre à jour labels des services avec pourcentages corrects
  - Corriger affichage des zones géographiques
  - Vérifier cohérence des messages d'aide
  - Ajuster récapitulatif avec breakdown prix correct

### Sprint 3 - Validation & Tests (3 pts)

#### 3.1 Tests de Régression

- **Scénarios à valider** :
  - Calcul prix particulier nouveau client zone 1
  - Calcul prix pro entretien récent zone 2
  - Application minimums de facturation
  - Calcul avec options additionnelles
  - Export PDF avec prix corrects

#### 3.2 Validation Business Rules

- **Contrôles** :
  - coherence strategy, business, pricing dans `.rules/*`
  - utilise les variables du fichier `business-rules.config.ts`

#### 3.3 Documentation

- **Livrables** :
  - Rapport d'audit avec écarts identifiés
  - Documentation des corrections apportées
  - Guide de validation des calculs

## Règles Métier à Respecter

- respecter les regles metier et les tarifs ainsi que le programme fidelite.

## Acceptance Criteria

### Fonctionnel

- [ ] Tous les calculs respectent exactement les règles définies dans .rules/
- [ ] Les labels des services reflètent les vrais pourcentages de remise
- [ ] Les suppléments de zone sont appliqués correctement
- [ ] Les minimums de facturation sont respectés
- [ ] Le récapitulatif affiche un breakdown prix transparent

### Business

- [ ] Le système reflète la stratégie de targeting (focus commerces)
- [ ] L'offre découverte -25% est mise en avant pour l'acquisition
- [ ] Les remises fidélité encouragent la récurrence
- [ ] La tarification reste competitive tout en préservant la marge

### Technique

- [ ] Aucune régression sur les fonctionnalités existantes
- [ ] Les constantes sont centralisées et facilement modifiables
- [ ] La logique de calcul est claire et documentée
- [ ] Les tests couvrent les principaux scénarios de pricing

## Risques & Mitigation

### Risques Business

- **Changement de prix** → Communication transparente des corrections
- **Impact conversion** → Monitoring KPIs avant/après
- **Confusion client** → Validation exhaustive avant déploiement

### Risques Techniques

- **Régression fonctionnelle** → Tests approfondis workflow complet
- **Calculs incorrects** → Validation croisée manuelle/automatisée
- **UX dégradée** → Préservation de l'expérience utilisateur

## Priority

**Critical** - Le système de devis est le cœur de la génération de leads

## Sprint Points

**Total** : 16 points

- Sprint 1 (Audit) : 8 pts - Identification exhaustive des écarts
- Sprint 2 (Corrections) : 5 pts - Implémentation des corrections
- Sprint 3 (Validation) : 3 pts - Tests et documentation

## Dependencies

- Accès aux règles métier finalisées (.rules/)
- Validation business des corrections par le propriétaire
- Tests sur environnement de staging avant production

## Success Metrics

- **Cohérence** : 100% alignement règles/implémentation
- **Fonctionnel** : 0 régression sur workflow existant
- **Business** : Calculs prix conformes stratégie tarifaire
- **UX** : Maintien de la fluidité du tunnel de conversion

## Notes Techniques

- Préserver la structure wizard 3 étapes (validée utilisateurs)
- Maintenir la compatibilité avec le système de brouillons
- Conserver les optimisations performance (computed memoized)
- Éviter les breaking changes sur l'API des composants
