# Organisation des Tâches

Ce dossier contient toutes les tâches du projet organisées par priorité dans des sous-dossiers.

## Structure

```
.tasks/
├── high-priority/     # Tâches haute priorité
├── medium-priority/   # Tâches priorité moyenne
├── low-priority/      # Tâches basse priorité
└── completed/         # Tâches terminées
└── back-log/          # Tâches brouillon. Ne sont pas à faire
```

## Gestion des Priorités

- **High Priority**: Tâches critiques pour le fonctionnement du site ou demandées par les clients
- **Medium Priority**: Tâches importantes mais pas urgentes
- **Low Priority**: Améliorations et optimisations futures
- **Completed**: Tâches terminées et validées

## Workflow

1. Les nouvelles tâches sont créées dans le dossier de priorité approprié
2. Pour changer la priorité d'une tâche, la déplacer vers le bon dossier
3. Les tâches terminées sont déplacées vers `completed/`
4. Chaque fichier de tâche contient sa description complète et ses critères d'acceptation

## Format des Tâches

Chaque tâche suit le format `XXXX-type-description.md` où :

- `XXXX` : Numéro séquentiel (ex: 0001, 0002...)
- `type` : feature, chore, refactor, etc.
- `description` : Description courte en kebab-case
