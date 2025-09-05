# Feature: Page Devis

## Description
Créer une page de devis complète avec calculateur de prix et options personnalisées.

## Analyse de l'Existant
**Version actuelle** : Interface basique avec sélection de fenêtres, configuration (saleté, colle, hauteur, quantité) et calcul total.

**Composants existants** :
- `pages/devis.vue` : Page principale avec liste des fenêtres
- `components/WindowCard.vue` : Configuration détaillée par fenêtre
- `components/WindowDrawer.vue` : Sélection types de fenêtres
- `composables/useWindowPricing.ts` : Logique de calcul
- `types/Windows.types.ts` : Types fenêtres et saleté

## Spécifications Détaillées

### Sprint 1 - Refonte Types & Logique (5 pts)
- **Types étendus** : ClientType, ServiceType, AccessibilityLevel, FrequencyType, GeographicalZone
- **WindowSelection étendu** : serviceType, accessibility, frequency, zone, options (frames, antiLimescale, insideOutside, wasteRemoval)
- **Logique pricing** : multiplicateurs client pro/particulier, calculs par zone, remises fréquence/volume, minimums facturation

### Sprint 2 - Interface Wizard (8 pts)
- **Toggle Pro/Particulier** : Bascule avec tarifs différenciés
- **Wizard multi-étapes** : 
  1. Type client → 2. Services → 3. Configuration fenêtres → 4. Récapitulatif → 5. Export
- **Sélection zone géographique** : Select avec zones et sous-groupes communes
- **Options disponibles** :
  - Option intérieur avec majoration de 180%
  - Nettoyage cadres (+20%)
  - Traitement anti-calcaire (+15%)
  - Évacuation déchets (forfait)

### Sprint 3 - Check-out & Export (3 pts)
- **Récapitulatif détaillé** : Breakdown prix avec tous les facteurs
- **Export PDF** : Génération devis professionnel
- **Input email** : Envoi devis par email
- **Sauvegarde locale** : localStorage pour brouillons

### Sprint 4 - UX/Polish (3 pts)
- **Responsive design** : Mobile-first approach
- **Validations** : Contrôles cohérence + messages d'aide
- **Prévisualisation temps réel** : Mise à jour instantanée prix
- **Tests** : Validation logique pricing

## Règles Métier Définies

### Segmentation Client
- **Particuliers** : Tarifs standards, minimum 50€
- **Professionnels** : Tarifs préférentiels, minimum 80€

### Zones Géographiques  
- **Zone 1** : Montpellier centre (tarif de base)
- **Zone 2** : Périphérie proche (+5€)
- **Zone 3** : Périphérie éloignée (+10€)
- **Hors zone** : Sur devis

### Services & Options
- **Standard** : Nettoyage vitres classiques
- **Autocollants** : Décollement selon superficie
- **Après travaux** : Majorations chantier
- **Entretien** : Abonnements avec remises

## Status
- [x] Analyse existant
- [x] Règles métier définies  
- [ ] Sprint 1 - Types & Logique
- [ ] Sprint 2 - Interface Wizard
- [ ] Sprint 3 - Check-out & Export
- [ ] Sprint 4 - UX/Polish

## Priority
High

## Sprint Points
**Total** : 19 points
- Sprint 1 : 5 pts
- Sprint 2 : 8 pts  
- Sprint 3 : 3 pts
- Sprint 4 : 3 pts

## Notes
Feature principale pour la conversion et génération de leads. Base existante solide à étendre plutôt qu'à refaire.