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
- [ ] En attente

## Priority
Medium - Nécessaire pour la professionnalisation

## Dependencies
- Page devis fonctionnelle (0001)
- Template design de devis

## Notes
Service essentiel pour la crédibilité et le suivi commercial.