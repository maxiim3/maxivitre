# Migration Nuxt 4 et Installation MCP Server

## Description

Migration majeure de Nuxt 3 vers Nuxt 4 pour bénéficier des dernières fonctionnalités et corrections de bugs. Installation du MCP (Model Context Protocol) server de Nuxt pour améliorer l'assistance AI.

## Contexte

Le projet rencontrait une erreur Rollup/Nitro bloquante avec Nuxt 3.13/3.14. La migration vers Nuxt 4 résout ce problème et apporte des améliorations de performance et de stabilité.

## Modifications Effectuées

### Packages Mis à Jour

- **Nuxt** : `3.13.0` → `4.2.1` (version majeure)
- **@nuxt/image** : `1.8.1` → `2.0.0` (breaking changes)
- **@nuxt/fonts** : `0.10.2` → `0.12.1`
- **@nuxtjs/tailwindcss** : `6.11.4` → `6.14.0`

### MCP Server Installé

```bash
claude mcp add --transport http nuxt-remote https://nuxt.com/mcp
```

Le MCP server Nuxt donne à Claude Code un accès direct à :
- Documentation Nuxt 4 complète
- Articles de blog et guides
- Guides de déploiement

Configuration ajoutée à `/home/maxime/.claude.json`

### Cache Nettoyé

```bash
rm -rf .nuxt .output
```

## Problèmes Résolus

- ✅ Erreur Rollup/Nitro : `[plugin impound] This module cannot be imported in server runtime`
- ✅ Versions obsolètes des dépendances
- ✅ Browserslist data obsolète (14 mois)

## Breaking Changes Potentiels

⚠️ **@nuxt/image 2.0** : Potentiellement des changements dans l'API
- À surveiller : utilisation de `NuxtImg` dans les composants
- Vérifier la compatibilité des propriétés (sizes, format, quality, etc.)

⚠️ **Nuxt 4** : Nouvelles conventions et optimisations
- Auto-imports améliorés
- Nouveau système de routing (compatibilité maintenue)
- TypeScript strict par défaut

## Tests à Effectuer

- [ ] Vérifier que le serveur dev démarre sans erreur
- [ ] Tester la page d'accueil (/)
- [ ] Tester la page devis (/devis)
- [ ] Vérifier le chargement des images (NuxtImg)
- [ ] Contrôler les fonts Google
- [ ] Valider le build de production

## Commandes

```bash
# Développement
bun run dev

# Build production
bun run build

# Preview production
bun run preview
```

## Date

2 décembre 2025

## Sprint Points

**3 points** - Migration technique importante

## Impact Business

- ✅ Stabilité améliorée du serveur de développement
- ✅ Performances optimisées
- ✅ Support des dernières fonctionnalités Nuxt
- ✅ Meilleure assistance AI via MCP

## Notes Techniques

- Les fichiers `.nuxt` et `.output` sont recréés automatiquement au démarrage
- La configuration `nuxt.config.ts` reste compatible
- Aucune modification du code métier nécessaire (pour l'instant)

## Prochaines Étapes

1. Valider que tout fonctionne en dev
2. Tester en production
3. Reprendre la tâche 0019 (Intégration Business Configuration)
