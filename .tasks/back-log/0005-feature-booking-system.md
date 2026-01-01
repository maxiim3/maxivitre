# Feature: Système de réservation

## Description
Repenser les boutons d'action des cartes d'offres et implémenter un système de réservation complet.

## Problème actuel
Les boutons des cartes d'offres mènent tous vers `/devis` mais le parcours utilisateur n'est pas clair pour "comment réserver".

## Solutions à explorer
- Intégrer Calendly pour la prise de rendez-vous
- Différencier les parcours selon le type d'offre :
  - **Découverte** : Vers formulaire devis + calendrier
  - **Fidélité** : Vers réservation directe (client existant)  
  - **Ponctuel** : Vers devis détaillé

## Spécifications
- Boutons d'action repensés par carte
- Intégration Calendly ou système équivalent
- Parcours utilisateur optimisé
- Cohérence avec la stratégie Pro/Particulier

## Status
- [ ] En attente

## Priority
High - Impact direct sur la conversion

## Dependencies
- Compte Calendly ou alternative
- Page devis fonctionnelle (0001)

## Notes
Critical pour la conversion et l'expérience utilisateur.