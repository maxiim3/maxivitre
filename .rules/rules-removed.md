# Éléments Supprimés de business-rules.config.ts

## Date: 2025-09-06
## Contexte: Nettoyage et alignement sur le système business réel MaxiVitre

---

## 🗑️ ÉLÉMENTS SUPPRIMÉS

### 1. Section `accessibility` (MODIFIÉE)

**❌ Ancienne version:**
```typescript
accessibility: {
  rdc: 0,           // Rez-de-chaussée
  etage: 10,        // Étage avec échelle  
  hauteur: 25,      // Grande hauteur
  nacelle: 50       // Nacelle requise
}
```

**✅ Nouvelle version:**
```typescript
accessibility: {
  hauteur_homme: 0, // < 3m (tarif normal)
  echelle: 1.5      // > 3m et < 8m (+150%)
}
```

**Raison:** Simplicité du système réel - pas de nacelle, seulement 2 niveaux d'accessibilité.

---

### 2. Option `zones.hors-zone` (SUPPRIMÉE)

**❌ Supprimé:**
```typescript
zones: {
  zone1: 0,
  zone2: 10,
  zone3: 15,
  'hors-zone': 0  // ← Cette ligne supprimée
}
```

**Raison:** Option hors-zone n'existe pas dans le système réel.

---

### 3. Section `minimums` (SUPPRIMÉE COMPLÈTEMENT)

**❌ Supprimé:**
```typescript
minimums: {
  particulier: 50,     // 50€ minimum
  professionnel: 80    // 80€ minimum  
}
```

**Raison:** Pas de minimums de facturation dans le système actuel.

---

### 4. Section `options` (SUPPRIMÉE COMPLÈTEMENT)

**❌ Supprimé:**
```typescript
options: {
  cleanFrames: 0.20,     // +20% nettoyage cadres
  antiLimescale: 0.15,   // +15% anti-calcaire
  wasteRemoval: 25,      // 25€ forfait évacuation déchets
  insideOutside: 1.8     // +180% système legacy
}
```

**Raison:** Ces options ne sont pas proposées dans le système actuel.

---

### 5. Section `frequency` (SUPPRIMÉE COMPLÈTEMENT)

**❌ Supprimé:**
```typescript
frequency: {
  ponctuel: 0,       // 0% de remise
  mensuel: 0.1,      // -10%
  trimestriel: 0.05, // -5% 
  semestriel: 0.03   // -3%
}
```

**Raison:** Système de remises par fréquence inutile/non utilisé.

---

### 6. Section `offers` (SUPPRIMÉE COMPLÈTEMENT)

**❌ Supprimé:**
```typescript
offers: {
  mutualization: true,           // Remise mutualisation
  mutializationCumulative: true  // Cumulable avec autres remises
}
```

**Raison:** Offres non implémentées et inutiles pour le moment.

---

## 📊 BILAN DU NETTOYAGE

- **Lignes supprimées:** ~38 lignes
- **Fichier avant:** ~118 lignes
- **Fichier après:** ~80 lignes  
- **Réduction:** -32% de code

---

## ✅ ÉLÉMENTS CONSERVÉS (Conformes au système réel)

1. **windowPrices** - Prix par taille (2€, 4€, 6€) ✅
2. **cleaningTypes** - Multiplicateurs intérieur différenciés ✅
3. **discounts** - Système de remises (25%, 20%, 15%) ✅
4. **zones** - Frais déplacement (0€, 10€, 15€) ✅
5. **serviceAreas** - Zones géographiques ✅
6. **business** - Informations entreprise ✅
7. **constraints** - Contraintes système ✅
8. **dirtiness** - Système legacy (compatibilité temporaire) ✅

---

## 🎯 RÉSULTAT

Configuration **business-rules.config.ts** maintenant parfaitement alignée sur le système métier réel MaxiVitre, sans règles inutiles ou incorrectes.