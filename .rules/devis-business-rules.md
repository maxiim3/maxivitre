# Règles Métier - Page Devis MaxiVitre

## Contexte Actuel
La page devis existante permet de :
- Sélectionner des types de fenêtres/portes (Standard, Large, Bay, Sliding, French, Skylight)
- Configurer pour chaque fenêtre : niveau de saleté, pourcentage de colle, hauteur, quantité
- Calculer automatiquement le prix total

## Nouvelles Règles Métier à Implémenter

### 1. Segmentation Client
- **Professionnels** : Tarifs préférentiels, options de facturation, volumes importants
- **Particuliers** : Tarifs standards, paiement direct, petits volumes
- Basculer entre les deux modes depuis la page devis

### 2. Types de Services Étendus
- **Nettoyage standard** : Vitres classiques
- **Décollement d'autocollants** : Tarification spécifique selon superficie
- **Nettoyage après travaux** : Majorations pour chantier
- **Entretien régulier** : Abonnements avec remises

### 3. Facteurs de Prix Révisés
- **Accessibilité** : Rez-de-chaussée, étage, grande hauteur, nacelle
- **Fréquence** : Ponctuel, mensuel, trimestriel, semestriel
- **Volume** : Remises dégressives par tranches
- **Urgence** : Majoration intervention rapide

### 4. Zones Géographiques
- **Zone 1** : Montpellier centre (tarif de base)
- **Zone 2** : Périphérie proche (+5€)
- **Zone 3** : Périphérie éloignée (+10€)
- **Hors zone** : Sur devis

### 6. Contraintes Métier
- **Minimum de facturation** : 50€ pour les particuliers, 80€ pour les professionnels
- **Devis valable** : 30 jours
- **Acompte** : 30% pour travaux > 500€
- **Délai intervention** : 48h à 15 jours selon disponibilité

## Améliorations UX/UI Prioritaires

### Interface
- Étapes guidées avec progression visuelle
- Mode sombre/clair
- Responsive design optimisé mobile
- Prévisualisation temps réel du devis

### Fonctionnalités
- Sauvegarde brouillon local
- Export PDF du devis
- Envoi par email
- Planification d'intervention
- Galerie photos avant/après

### Validation
- Contrôles de cohérence des données saisies
- Messages d'aide contextuels
- Suggestions automatiques selon l'historique