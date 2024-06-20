# Eval Hono

### **BDD :**

**Flipper :**

- Date de sortie
- Nom Flipper
- Note
- link Video
- Description
- Prix
- Image
- Etat
- Quantité

**Marque :**

- nom marque
- guide
- logo

### **Liste des marques :**

```jsx
[
    {
        "_id": "667438417d1f6ae1faf4c633",
        "nom": "Stern",
        "guide": "https://www.lyon-flipper.com/flippers/stern-pinball/guide-demarrage-flipper-stern-pinball_compressed.pdf",
        "logo": "https://www.lyon-flipper.com/user/pages/02.flippers/01.stern-pinball/stern-pinball-logo.svg",
        "__v": 0
    },
    {
        "_id": "66743c177f5b20a92e837d32",
        "nom": "Williams",
        "guide": "https://www.lyon-flipper.com/flippers/williams/guide-demarrage-flipper-williams_compressed.pdf",
        "logo": "https://www.lyon-flipper.com/user/pages/02.flippers/03.williams/williams-logo.svg",
        "__v": 0
    }
]
```

### Liste des flippers :

```jsx
[
    {
        "_id": "66743a062fe86f37da4c0b8e",
        "nom": "Stern",
        "marque": "66742c6edb42f080109388eb",
        "prix": 10,
        "dateDeSortie": "2022-04-15T00:00:00.000Z",
        "note": 10,
        "image": "https://www.lyon-flipper.com/user/pages/02.flippers/01.stern-pinball/stern-pinball-logo.svg",
        "stock": 100,
        "etat": "New",
        "lienVideo": "https://www.lyon-flipper.com/user/pages/02.flippers/01.stern-pinball/stern-pinball-logo.svg",
        "description": "fsdgsfgqfqsdd",
        "__v": 0
    },
    {
        "_id": "66743e54c6972d3ab43891f1",
        "nom": "Stern Star Trek Pro",
        "marque": "66743c177f5b20a92e837d32",
        "prix": 7000,
        "dateDeSortie": "2019-11-05T00:00:00.000Z",
        "note": 9.1,
        "image": "https://www.lyon-flipper.com/user/pages/02.flippers/01.stern-pinball/star-trek-pinball-logo.svg",
        "stock": 20,
        "etat": "New",
        "lienVideo": "https://www.youtube.com/watch?v=star-trek-pro",
        "description": "Le flipper Star Trek Pro offre une aventure intergalactique avec des graphismes de haute qualité et des sons immersifs. Parfait pour les fans de Star Trek et les amateurs de flippers.",
        "__v": 0
    },
    {
        "_id": "66743e64c6972d3ab43891f3",
        "nom": "Stern Jurassic Park Pro",
        "marque": "66743c177f5b20a92e837d32",
        "prix": 7200,
        "dateDeSortie": "2020-08-10T00:00:00.000Z",
        "note": 9.2,
        "image": "https://www.lyon-flipper.com/user/pages/02.flippers/01.stern-pinball/jurassic-park-pinball-logo.svg",
        "stock": 30,
        "etat": "New",
        "lienVideo": "https://www.youtube.com/watch?v=jurassic-park-pro",
        "description": "Le flipper Jurassic Park Pro vous transporte dans le monde des dinosaures avec des graphismes impressionnants et des sons réalistes. Idéal pour les amateurs d'aventures et de flippers.",
        "__v": 0
    },
    {
        "_id": "66743e78c6972d3ab43891f5",
        "nom": "Stern Avengers Pro",
        "marque": "66743c177f5b20a92e837d32",
        "prix": 7500,
        "dateDeSortie": "2021-06-20T00:00:00.000Z",
        "note": 9,
        "image": "https://www.lyon-flipper.com/user/pages/02.flippers/01.stern-pinball/avengers-pinball-logo.svg",
        "stock": 50,
        "etat": "New",
        "lienVideo": "https://www.youtube.com/watch?v=avengers-pro",
        "description": "Le flipper Avengers Pro offre une expérience de jeu exceptionnelle avec des scènes et des sons captivants des Avengers. Parfait pour les fans de Marvel et les amateurs de flippers.",
        "__v": 0
    }
]
```

### Optimisations

- **Pagination**: Pour accélérer la présentation en liste des flippers sur la page d'accueil, l’ajout d’une pagination réduirait la taille des réponses. Cela permet de charger les flippers par page, réduisant ainsi le temps de chargement et améliorant l'expérience utilisateur.

  **Proposition**: Implémenter la pagination en utilisant des paramètres `page` et `limit` dans les requêtes API. Par exemple, `GET /flippers?page=1&limit=10` pour obtenir la première page avec 10 flippers. Cela réduira la quantité de données envoyées à chaque requête, optimisant la vitesse de chargement de la page.

- **Recherche Optimisée**: Pour améliorer la recherche par nom de flipper :

  **Proposition**: Créer un index de texte sur le champ `nom` dans la collection de flippers et utiliser des requêtes de recherche de texte.
  Par exemple, on ajoute un index de texte sur le champ `nom` et utiliser la recherche texte avec mongo:

    ```json
    
    {
      "nom": "text"
    }
    
    ```

  Ensuite, utiliser la recherche texte dans les requêtes:

    ```jsx
    db.flippers.find({ $text: { $search: "nom du flipper" } })
    ```

  Cela permettra de rechercher rapidement les flippers par leur nom, offrant des résultats plus pertinents et un temps de réponse réduit.