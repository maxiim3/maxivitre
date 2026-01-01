# Feature: Contact/Notification après devis

## Description
Système de contact et notification automatique après la soumission d'un devis pour améliorer le suivi client et l'engagement business.

## Objectifs Business
- Améliorer l'engagement client et les taux de conversion
- Automatiser le processus de suivi des devis
- Créer un workflow de communication professionnel
- Faciliter la gestion des relations client

## Fonctionnalités Principales

### 1. Email de Confirmation Client
- **Envoi automatique** après soumission de devis
- **Template professionnel** avec branding MaxiVitre
- **Contenu** : détails complets du devis, tarification, PDF joint
- **Validité** : mention expiration 30 jours (règle business)
- **Contact** : informations et prochaines étapes

### 2. Notifications Business Owner
- **Alert temps réel** par email à contact@maxivitre.fr
- **Contenu** : détails client, résumé devis, urgence
- **Segmentation** : différenciation pro/particulier
- **Dashboard** : interface de gestion des devis

### 3. Système de Suivi Devis
- **Référence unique** pour chaque devis
- **Interface client** : accès via lien sécurisé
- **Statuts** : En attente → Reviewé → Programmé → Terminé
- **Actions** : accepter/décliner/modifier

### 4. Relances Automatisées
- **Planning** : 24h, 7j, 15j configurable
- **Templates différenciés** : pro vs particulier
- **Alertes expiration** : avant limite 30 jours
- **Désabonnement** : mécanisme GDPR compliant

## Architecture Technique

### Fichiers à Créer
- `/server/api/email/` - Routes serveur emails
- `/composables/useEmailService.ts` - Service principal
- `/composables/useQuoteStorage.ts` - Persistance devis
- `/components/NotificationPreferences.vue` - Préférences client
- `/types/notification.types.ts` - Types TypeScript

### Fichiers à Modifier
- `/components/DevisExport.vue` - Intégration emails réels
- `/pages/devis.vue` - Collecte préférences notifications

### Intégration Existante
- **Respect règles** : 30j validité, segmentation client
- **Compatibilité** : wizard 3 étapes, types Windows
- **Theming** : DaisyUI, branding MaxiVitre

## Estimation
**Total : 38 sprint points**
- Sprint 1 : Infrastructure email (8 pts)
- Sprint 2 : Communication client (10 pts)
- Sprint 3 : Notifications business (12 pts)
- Sprint 4 : Intégration finale (8 pts)

## Status
- [ ] En attente

## Priority
Backlog - À prioriser selon roadmap

## Dependencies
- Service email (SMTP ou API)
- Template design système
- Configuration GDPR compliance

## Notes
Fonctionnalité clé pour la conversion et la relation client. Remplace les mailto actuels par un système professionnel complet.