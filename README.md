# LSA Shop - Application E-commerce (Frontend) 🛒

Projet de spécialisation en développement web, construit avec **Vanilla JavaScript** et **Tailwind CSS**, suivant les principes de la **Programmation Fonctionnelle** et les standards de sécurité **OWASP**.

## 🚀 Fonctionnalités Clés

### 🔒 Sécurité & Robustesse (Standards OWASP)
- **Authentification JWT** : Persistance sécurisée des sessions utilisateur.
- **Protection CSRF** : Configuration automatique d'Axios pour la gestion des jetons XSRF.
- **Politique CSP** : Page dédiée affichant les rapports de violation (Mocks inclus).
- **Vérification d'identité** : Contrôle systématique du profil sur toutes les pages sensibles.
- **Zéro Commentaire** : Code source épuré de tout commentaire comme l'exige le sujet.

### 🛍️ Expérience Utilisateur Premium
- **Catalogue Dynamique** : Recherche par titre et filtrage instantané.
- **Panier Immuable** : Gestion de l'état du panier via un Store fonctionnel et tiroir (Drawer) ergonomique.
- **UI Responsive** : Design moderne avec Tailwind CSS 4.0.
- **Toasts de Notifications** : Retours visuels immédiats pour les succès et erreurs.

### 🧪 Qualité & Maintenance
- **Tests Unitaires** : Suite de tests avec **Jest** validant la logique du `ProductService`.
- **Architecture Modulaire** : Séparation stricte des composants, services et gestion d'état.

---

## 🛠️ Installation & Démarrage

### Pré-requis
- **Node.js** (v18+)
- **npm** ou **yarn**

### Étapes
1. **Cloner le projet** :
   ```bash
   git clone [URL-DU-REPO]
   cd Projet-sp-cialisation-Developpement
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

4. **Lancer les tests unitaires** :
   ```bash
   npm test
   ```

---

## 🏗️ Structure du Projet
```text
src/
├── components/   # Composants UI (Navbar, Layout, etc.)
├── config/       # Configuration API (Axios)
├── pages/        # Vues principales (Home, Auth, Dashboard, security)
├── services/     # Appels API et logique métier
├── state/        # Gestion d'état (CartStore, UserStore)
├── utils/        # Utilitaires et Mocks
└── main.js       # Point d'entrée et Routage
```

---

## 📜 Consignes Respectées
- Usage exclusif de `map/filter/reduce`.
- Chaînage `.then()/.catch()` systématique.
- Aucune bibliothèque UI (React/Vue).
- Conformité stricte aux exigences du sujet PDF.