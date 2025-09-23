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

### Workflow Actuel

1. **Étape 1** : Sélection client (Pro/Particulier) + Service + Zone géographique
2. **Étape 2** : Configuration des fenêtres (types, tailles, quantité)
3. **Étape 3** : Récapitulatif + Export (PDF/Email)

## Spécifications Détaillées

### Sprint 1 - Audit Règles Métier vs Implémentation (8 pts)

#### 1.1 Audit Tarification de Base ✅ COMPLÉTÉ

- **Vérifier** : Prix de base actuel vs règles (.rules/pricing.md : 2€/m² + 8€ frais fixes) ✅
- **Action** : Documenter les écarts identifiés ✅
- **Contrôler** : Cohérence des multiplicateurs de taille (petite/moyenne/grande) ✅
- **Valider** : Calculs minimums de facturation (50€ particuliers, 80€ pros) ✅

**Écarts identifiés et corrigés** :
- ❌ Prix de base : était hardcodé à 8€ par fenêtre → ✅ Migré vers 2€/m² selon surface
- ❌ Frais fixes : absents → ✅ Implémentés (8€ par devis)
- ❌ Surface calculation : approximative → ✅ Précise (petite 0.8m², moyenne 1.2m², grande 1.8m²)

#### 1.2 Audit Zones Géographiques ✅ COMPLÉTÉ

- **Vérifier** : Suppléments zone actuels vs règles (.rules/pricing.md) ✅
  - Zone 1 (Castelnau-le-Lez) : 0€ → ✅ Correct
  - Zone 2 (Périphérie proche) : +10€ → ✅ Correct (règles = +10€, devis = +10€)
  - Zone 3 (Périphérie éloignée) : +15€ → ✅ Correct (règles = +15€, devis = +15€)
- **Action** : Corriger les constantes `ZONE_SURCHARGES` si nécessaire ✅
- **Contrôler** : Liste des communes par zone ✅

**Résultat** : Zones géographiques conformes aux règles métier. Aucune correction nécessaire.

#### 1.3 Audit Types de Services ✅ COMPLÉTÉ

- **Vérifier** : Services actuels vs règles métier ✅
  - Nouveau client : -15% → **INCOHÉRENCE CORRIGÉE** (implémentation → -25% selon règles)
  - Entretien récent (pro < 2 mois) : tarif normal → **INCOHÉRENCE CORRIGÉE** (règles = -20%)
  - Entretien récent (particulier < 6 mois) : tarif normal → **INCOHÉRENCE CORRIGÉE** (règles = -15%)
- **Action** : Aligner les multiplicateurs sur les règles business ✅
- **Contrôler** : Labels des services dans l'interface ✅

**Corrections apportées** :
- ✅ SERVICE_MULTIPLIERS['nouveau-client'] : 0.85 → 0.75 (-25%)
- ✅ SERVICE_MULTIPLIERS['entretien-recent'] : 1.0 → 0.85 avec logique conditionnelle
- ✅ Logique spécifique : pro = -20% (0.80), particulier = -15% (0.85)
- ✅ Labels automatiquement mis à jour via business-rules.config.ts

#### 1.4 Audit Remises Client ✅ COMPLÉTÉ

- **Vérifier** : Remises professionnels (-15% actuellement) ✅
- **Contrôler** : Cohérence avec stratégie business (70% focus commerces) ✅
- **Valider** : Application correcte sur le total final ✅

**Résultat** : Remises professionnels conformes (-15%). Stratégie commerciale bien reflétée dans le système.

### Sprint 2 - Corrections Implémentation (5 pts) ✅ COMPLÉTÉ

#### 2.1 Correction Constantes de Pricing ✅ COMPLÉTÉ

- **Fichier** : `/types/Windows.types.ts` ✅
- **Actions** :
  - Corriger `SERVICE_MULTIPLIERS` selon les vraies règles : ✅
    - `nouveau-client`: 0.75 (au lieu de 0.85) pour -25% ✅
    - `entretien-recent`: 0.85 (particuliers) ou 0.80 (pros) au lieu de 1 ✅
  - Vérifier `ZONE_SURCHARGES` cohérence règles ✅
  - Ajuster `MINIMUM_BILLING` si nécessaire ✅

#### 2.2 Correction Logique de Calcul ✅ COMPLÉTÉ

- **Fichier** : `/composables/useWindowPricing.ts` ✅
- **Actions** :
  - Réviser fonction `calculateTotalPrice()` pour intégrer frais fixes de 8€ ✅
  - Implémenter calcul basé sur m² (prix de base 2€/m²) ✅
  - Corriger application des remises par type de service ✅
  - Valider calcul des suppléments zone ✅
  - **BONUS** : Ajout minimums de facturation (50€ particuliers, 80€ pros) ✅

**Refactoring majeur effectué** :
- ✅ Nouveau calcul basé sur surface réelle (0.8m², 1.2m², 1.8m²)
- ✅ Prix de base : 2€/m² exactement selon règles
- ✅ Frais fixes : 8€ par devis ajoutés systématiquement
- ✅ Logique entretien récent conditionnelle selon type client
- ✅ Minimums de facturation appliqués en fin de calcul

#### 2.3 Mise à Jour Interface Utilisateur ✅ COMPLÉTÉ

- **Fichier** : `/pages/devis.vue` et composants ✅
- **Actions** :
  - Mettre à jour labels des services avec pourcentages corrects ✅
  - Corriger affichage des zones géographiques ✅
  - Vérifier cohérence des messages d'aide ✅
  - Ajuster récapitulatif avec breakdown prix correct ✅

**Résultat** : Labels automatiquement synchronisés via `useBusinessRules` et `business-rules.config.ts`.

### Sprint 3 - Validation & Tests (3 pts) ✅ COMPLÉTÉ

#### 3.1 Tests de Régression ✅ COMPLÉTÉ

- **Scénarios validés** :
  - ✅ Calcul prix particulier nouveau client zone 1 : 2.4€ × 0.75 + 8€ = 9.80€ (minimum 50€)
  - ✅ Calcul prix pro entretien récent zone 2 : 2.4€ × 0.80 × 0.85 + 10€ + 8€ = 19.63€ (minimum 80€)
  - ✅ Application minimums de facturation : 50€ particuliers / 80€ pros
  - ✅ Calcul avec nettoyage int+ext : prix × 1.8 (multiplicateur extérieur-intérieur)
  - ✅ Export PDF avec prix corrects : calculs cohérents avec affichage

#### 3.2 Validation Business Rules ✅ COMPLÉTÉ

- **Contrôles effectués** :
  - ✅ Cohérence strategy, business, pricing dans `.rules/*` vs implémentation
  - ✅ Utilisation exclusive des variables du fichier `business-rules.config.ts`
  - ✅ Labels automatiquement synchronisés via `useBusinessRules`
  - ✅ Calculs conformes aux règles métier centralisées

#### 3.3 Documentation ✅ COMPLÉTÉ

- **Livrables produits** :
  - ✅ Rapport d'audit avec écarts identifiés (sections 1.1-1.4)
  - ✅ Documentation des corrections apportées (sections 2.1-2.3)
  - ✅ Guide de validation des calculs (exemples de tests ci-dessus)
  - ✅ Architecture mise à jour : calcul basé sur 2€/m² + frais fixes 8€

## Règles Métier à Respecter

- respecter les regles metier et les tarifs ainsi que le programme fidelite.

## Acceptance Criteria ✅ TOUS VALIDÉS

### Fonctionnel ✅

- [x] Tous les calculs respectent exactement les règles définies dans .rules/
- [x] Les labels des services reflètent les vrais pourcentages de remise
- [x] Les suppléments de zone sont appliqués correctement
- [x] Les minimums de facturation sont respectés
- [x] Le récapitulatif affiche un breakdown prix transparent

### Business ✅

- [x] Le système reflète la stratégie de targeting (focus commerces)
- [x] L'offre découverte -25% est mise en avant pour l'acquisition
- [x] Les remises fidélité encouragent la récurrence
- [x] La tarification reste competitive tout en préservant la marge

### Technique ✅

- [x] Aucune régression sur les fonctionnalités existantes
- [x] Les constantes sont centralisées et facilement modifiables
- [x] La logique de calcul est claire et documentée
- [x] Les tests couvrent les principaux scénarios de pricing

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

## Résumé Final de la Tâche ✅

### 🎯 Objectif Atteint
**100% des incohérences identifiées et corrigées**. Le système de devis respecte maintenant parfaitement les règles métier définies.

### 🔧 Corrections Majeures Effectuées
1. **Système de tarification** : Migration vers 2€/m² + frais fixes 8€
2. **Remises services** : -25% nouveau client, -20%/-15% entretien récent
3. **Minimums facturation** : 50€ particuliers, 80€ professionnels
4. **Architecture** : Centralisation via `business-rules.config.ts`

### 📊 Impact Business
- ✅ Cohérence parfaite entre règles métier et implémentation
- ✅ Tarification transparente et conforme à la stratégie
- ✅ Offre découverte -25% correctement mise en avant
- ✅ Programme fidélité opérationnel

### 🏗️ Impact Technique
- ✅ Code centralisé et maintenable
- ✅ Labels automatiquement synchronisés
- ✅ Calculs basés sur des constantes centralisées
- ✅ Architecture scalable pour futures évolutions

### 📅 Finalisation
- **Date de completion** : 23 septembre 2025
- **Sprint points** : 16/16 complétés
- **Statut** : ✅ TERMINÉ - Prêt pour déplacement vers /completed/

---

## Notes Techniques

- Préserver la structure wizard 3 étapes (validée utilisateurs)
- Maintenir la compatibilité avec le système de brouillons
- Conserver les optimisations performance (computed memoized)
- Éviter les breaking changes sur l'API des composants
