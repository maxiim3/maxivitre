# Feature: Service d'export de devis

## Description
Créer un service pour exporter les informations client vers un document de devis professionnel.

## Spécifications techniques
- API/Service pour générer des devis PDF
- Template de devis professionnel aux couleurs MaxiVitre
- Export avec informations complètes :
  - Données client
  - Type de prestation (Pro/Particulier)
  - Zone d'intervention
  - Calcul des prix (base + frais + options)
  - Conditions générales

## Solutions possibles
- PDF-lib ou jsPDF côté client
- Service backend avec Puppeteer
- API externe (ex: PDFShift)
- Template HTML → PDF

## Données à inclure
- Contact client
- Adresse intervention
- Type de client (Pro/Particulier)
- Services demandés
- Zone tarifaire
- Prix calculé
- Date validité devis

## Status
- [x] ✅ Complété le 2025-12-02

## Priority
Medium - Nécessaire pour la professionnalisation

## Dependencies
- Page devis fonctionnelle (0001) ✅
- Template design de devis ✅

## Notes
Service essentiel pour la crédibilité et le suivi commercial.

---

## Implémentation

### Solution Retenue
**pdf-lib** - Bibliothèque client-side choisie pour sa sécurité
- ✅ 0 runtime dependencies (aucun risque supply chain)
- ✅ Pure TypeScript
- ✅ 140KB minified
- ✅ Aucun CVE connu
- ✅ Maintenu activement

### Architecture Implémentée

#### 1. Composable PDF Generator
**Fichier**: `/composables/usePdfGenerator.ts` (246 lignes)

**Fonctionnalités**:
- Génération PDF côté client avec pdf-lib
- Layout A4 professionnel (595x842 points)
- Header avec branding MaxiVitre (#12CEF9)
- Tableau détaillé des fenêtres avec pricing
- Conditions générales et validité (30 jours)
- Support multi-pages automatique
- Gestion de l'acompte (30% si >500€)

**Données incluses**:
- ✅ Numéro de devis unique (format: MV-XXXXXXXX)
- ✅ Date et date d'expiration
- ✅ Badge type de client (Pro/Particulier)
- ✅ Coordonnées entreprise (phone, email, location)
- ✅ Détail complet des fenêtres (nom, taille, type nettoyage, quantité, prix)
- ✅ Total TTC avec couleur primaire
- ✅ Conditions de paiement (acompte si applicable)
- ✅ CGV (validité, TVA, paiement)

#### 2. Interface Export
**Fichier**: `/components/DevisExport.vue`

**Fonctions implémentées**:
- `downloadPDF()`: Génération et téléchargement du PDF
  - Création numéro de devis unique
  - Génération via usePdfGenerator
  - Création blob et trigger download
  - Gestion erreurs avec messages user-friendly

- `sendByEmail()`: Export via mailto:
  - Génération et download du PDF d'abord
  - Ouverture client email avec sujet pré-rempli
  - Corps de message avec infos business
  - Fallback si client email non disponible

### Avantages de l'Approche Client-Side

1. **Sécurité**: 0 dependencies, aucune surface d'attaque
2. **Performance**: Pas de round-trip serveur
3. **Simplicité**: Pas d'infrastructure backend nécessaire
4. **Privacy**: Données jamais envoyées à un serveur tiers
5. **Coût**: Aucun coût d'hébergement API

### Qualité du PDF Généré

- Logo et branding cohérents avec le site
- Typography professionnelle (Helvetica)
- Mise en page claire et lisible
- Informations complètes et structurées
- Respect des normes A4 internationales
- Footer avec conditions légales

### Tests de Validation

- [x] PDF contient toutes les fenêtres configurées
- [x] Pricing affiché correctement (avec remises)
- [x] Badge client type visible et correct
- [x] Dates et validité calculées correctement
- [x] Conditions générales présentes
- [x] Téléchargement fonctionne (Chrome/Firefox/Safari)
- [x] Mailto ouvre client email avec destinataire
- [x] Gestion erreurs affiche messages clairs
- [x] Loading states fonctionnent
- [x] Events émis correctement (pdf-downloaded, email-sent)

### Fichiers Modifiés

1. `/composables/usePdfGenerator.ts` (nouveau)
2. `/components/DevisExport.vue` (modifié)
3. `package.json` (ajout pdf-lib@1.17.1)

### Sprint Points

**8 points** (estimation vs réalisé)
- Installation pdf-lib: 0.5 pts
- Création usePdfGenerator: 3 pts
- Mise à jour DevisExport: 2 pts
- Tests et validation: 1.5 pts
- Documentation: 1 pt

### Date de Complétion
2025-12-02