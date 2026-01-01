# 🚨 HIGH PRIORITY: Mettre à jour les zones géographiques sur pages/index.vue

**Numéro**: 0018
**Type**: chore (correction incohérence)
**Priorité**: Haute
**Sprint Points**: 2 points
**Date de création**: 2025-09-06

## Contexte

Les règles métier dans `.rules/pricing.md` et `.rules/devis-business-rules.md` ont été mises à jour avec une nouvelle répartition géographique plus cohérente. Cependant, la homepage (`pages/index.vue`) affiche encore l'ancienne répartition, créant une incohérence critique entre ce que voient les visiteurs et les règles business réelles.

## Problème Identifié

**Incohérence critique** : Les zones géographiques affichées sur la homepage ne correspondent plus aux règles business mises à jour dans les fichiers `.rules/`.

### État Actuel (pages/index.vue, lignes 190-278)

**Zone 2** (lignes 221-228) :
- Affiche : "Le Crès, Jacou, Clapiers" + "Vendargues, Baillargues"
- Tarif : Frais fixes 8€ + déplacement 10€

**Zone 3** (lignes 236-239) :
- Affiche : "Zone 3 - Montpellier centre/Est"
- Description : "Centre-ville, Ecusson, quartiers Est"
- Tarif : Frais fixes 8€ + déplacement 15€

### État Souhaité (selon .rules/pricing.md)

**Zone 2** :
- Communes : "Le Crès, Jacou, Montpellier Pompignane, Millénaire, Aiguelongue"
- Tarif : Frais fixes 8€ + déplacement 10€

**Zone 3** :
- Communes : "Clapiers, Vendargues, Montpellier Facultés, Antigone, Port-Marianne, Ecusson"
- Tarif : Frais fixes 8€ + déplacement 15€

**Suppression** : Baillargues (commune trop éloignée)

## Tâches à Effectuer

### 1. Mettre à jour Zone 2 (lignes 221-228)

**Remplacer** :
```html
<span>Le Crès, Jacou, Clapiers</span>
```
```html
<span>Vendargues, Baillargues</span>
```

**Par** :
```html
<span>Le Crès, Jacou</span>
```
```html
<span>Montpellier Pompignane, Millénaire, Aiguelongue</span>
```

### 2. Mettre à jour Zone 3 (lignes 236-239)

**Remplacer le titre** :
```html
<h4 class="font-bold text-lg text-accent">Zone 3 - Montpellier centre/Est</h4>
```

**Par** :
```html
<h4 class="font-bold text-lg text-accent">Zone 3 - Secteur étendu</h4>
```

**Remplacer la description** :
```html
<p class="text-sm text-gray-600 mb-2">Centre-ville, Ecusson, quartiers Est</p>
```

**Par** :
```html
<div class="text-sm space-y-1 mb-2">
  <div class="flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>Clapiers, Vendargues</span>
  </div>
  <div class="flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>Montpellier Facultés, Antigone, Port-Marianne, Ecusson</span>
  </div>
</div>
```

## Critères d'Acceptation

- [x] Zone 1 reste inchangée (Castelnau-le-Lez, déplacement OFFERT)
- [x] Zone 2 affiche : "Le Crès, Jacou" + "Montpellier Pompignane, Millénaire, Aiguelongue"
- [x] Zone 3 affiche : "Clapiers, Vendargues" + "Montpellier Facultés, Antigone, Port-Marianne, Ecusson"
- [x] Baillargues est complètement supprimé
- [x] Les tarifs restent inchangés (Zone 2: +10€, Zone 3: +15€)
- [x] Le style CSS reste cohérent avec le design existant
- [x] La carte OpenStreetMap reste centrée sur Castelnau-le-Lez
- [x] Les icons SVG sont maintenus pour les puces des listes

## ✅ TERMINÉ - 2025-09-06

**Modifications appliquées avec succès :**
- Zone 2 : Mise à jour des communes selon nouvelles règles business
- Zone 3 : Restructuration avec titre "Secteur étendu" et nouvelle répartition
- Suppression complète de Baillargues
- Compilation réussie sans erreurs
- Cohérence totale avec les règles dans .rules/pricing.md

## Impact Business

### Justification de la Priorité Haute

1. **Incohérence client** : Les visiteurs voient des informations incorrectes
2. **Crédibilité** : Disparité entre homepage et système de tarification
3. **Conversion** : Risque de confusion lors de la demande de devis

### ROI Attendu

- **Cohérence** : Alignement total entre affichage public et règles business
- **Crédibilité** : Informations fiables pour les prospects
- **Efficacité** : Réduction des questions client sur les zones

## Notes Techniques

- **Fichier cible** : `/pages/index.vue`
- **Section** : "Zones d'Intervention & Tarifs" (lignes 190-278)
- **Framework** : Vue 3 Composition API avec TypeScript
- **Styling** : Tailwind CSS + DaisyUI
- **Type de changement** : HTML statique, pas de logique JavaScript

## Définition de "Terminé"

Cette tâche sera considérée comme terminée quand :
1. Toutes les modifications HTML sont appliquées correctement
2. Le site se compile sans erreur (`npm run build`)
3. L'affichage visuel est cohérent avec le design existant
4. Les nouvelles zones correspondent exactement aux règles dans `.rules/pricing.md`