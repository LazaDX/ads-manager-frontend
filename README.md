## Mini plateforme de gestion de campagnes publicitaires frontend

### 1. Introduction

Ce projet est le **frontend** d’une mini plateforme de gestion de campagnes publicitaires digitales.
Il permet de visualiser la liste des campagnes, de créer de nouvelles campagnes et de consulter les détails et statistiques d’une campagne.

**Stack utilisée :**

- React.js avec TypeScript
- TailwindCSS pour le style
- DaisyUI pour les composants UI harmonieux
- Lucide Icons pour les icônes
- Sonner pour les notifications

---

### 2. Installation et lancement

1. Cloner le dépôt :

```bash
git clone <URL_DU_REPO>
```

2. Se placer dans le dossier frontend :

```bash
cd frontend
```

3. Installer les dépendances :

```bash
npm install
```

4. Lancer l’application :

```bash
npm run dev
```

L’application sera disponible sur `http://localhost:5173`.

---

### 3. Architecture et structure du projet

Le projet suit une architecture simple et claire :

```
frontend/
│
├─ components/
├─ pages/
├─ types/
├─ services/
├─ App.tsx
└─ index.tsx
```

**Note sur les types :**

- Les fichiers dans `types/` permettent de typer les données venant du backend.
- Cela réduit considérablement les erreurs liées aux propriétés manquantes ou aux types incorrects.

---

### 4. Pages et fonctionnalités

#### Liste des campagnes

- Affiche le nom, statut, budget et CTR de chaque campagne.
- Bouton pour voir les détails d’une campagne.

#### Création de campagne

- Formulaire simple pour créer une nouvelle campagne.
- Validation minimale pour éviter les erreurs de saisie.

#### Détail d’une campagne

- Affiche toutes les informations de la campagne.
- Statistiques calculées (CTR, CPC).
- Boutons pour activer / mettre en pause la campagne.

---

### 5. Choix techniques et explications

- **React avec TypeScript** : pour plus de sécurité, notamment sur les données provenant du backend et pour réduire les erreurs runtime.
- **TailwindCSS + DaisyUI** : pour créer rapidement une interface simple, lisible et harmonieuse avec un thème cohérent (Nord).
- **Lucide Icons** : pour des icônes modernes et légères.
- **Sonner** : pour les notifications à l’utilisateur (succès, erreur, info).
- **Architecture components/pages/types** : séparation claire entre UI, logique de page et typage des données.

---

### 6. Ce que j’améliorerais avec plus de temps

- Ajouter une **gestion des erreurs plus avancée** avec un contexte global.
- Ajouter **pagination et filtres côté frontend** pour les listes de campagnes.
- Mettre en place **tests unitaires et e2e** pour les composants et pages.
- Ajouter un **thème sombre / clair dynamique** avec DaisyUI.
- Centraliser les appels API dans un `ApiService` pour mieux séparer la logique réseau des composants.

---

### 7. Validation et sécurité

- Les formulaires valident les champs avant envoi au backend.
- Les types TypeScript sécurisent les propriétés et types des objets pour éviter les bugs côté frontend.
