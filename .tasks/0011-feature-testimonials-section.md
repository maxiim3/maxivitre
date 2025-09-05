# Feature: Section témoignages

## Description
Ajouter une section témoignages clients pour renforcer la crédibilité et la confiance.

## Spécifications

### Contenu témoignages
- **3-5 témoignages** clients réels
- **Segmentés** : Commerces (priorité), Agences, Particuliers
- **Format** : Citation + Nom + Entreprise/Fonction + Photo optionnelle
- **Critères** : Qualité, ponctualité, rapport qualité/prix, professionnalisme

### Exemples de témoignages
- **Commerce** : "Vitrine toujours impeccable, intervention weekend parfaite"
- **Bureau** : "Service pro, aucune gêne pour notre activité"
- **Particulier** : "Travail soigné, prix correct, je recommande"

### Design
- **Carousel** avec navigation
- **Cards élégantes** avec système de notes (5 étoiles)
- **Responsive** : 1 sur mobile, 3 sur desktop
- **Cohérence** avec le design existant

### Intégration SEO
- **Rich snippets** : Schema.org Review
- **Mots-clés** locaux intégrés naturellement
- **Trust signals** : Logos entreprises clientes (avec accord)

### Données structurées
```json
{
  "@type": "Review",
  "reviewRating": {"@type": "Rating", "ratingValue": "5"},
  "author": {"@type": "Person", "name": "Jean D."},
  "reviewBody": "Service impeccable..."
}
```

## Placement
- **Homepage** : Après section "Pourquoi nous choisir"
- **Animation** : Apparition au scroll

## Status
- [ ] En attente

## Priority
Medium - Impact confiance client

## Dependencies
- Collecte témoignages réels
- Autorisations clients

## Notes
Forte valeur ajoutée pour la conversion.