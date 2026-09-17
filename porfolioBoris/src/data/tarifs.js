export const tarifPage = {
  kicker: "MK Creative",
  title: "Tarifs",
  lead: "Une grille claire, métier par métier. Choisissez une formule, on confirme ensemble le brief, le délai et la date.",
  cta: "Discuter de cette formule",
  devis: "Demander un devis",
}

export const tarifFamilies = [
  {
    id: "photo",
    label: "Photo",
    groups: [
      {
        id: "studio",
        title: "Shooting studio",
        note: "Livraison express en moins de 24h : +10 000 FCFA.",
        packs: [
          {
            name: "Pack de base",
            price: "15 000 FCFA",
            summary: "5 photos retouchées • 2 tenues",
            items: ["5 photos retouchées", "2 tenues maximum"],
          },
          {
            name: "Pack Découverte",
            price: "20 000 FCFA",
            summary: "10 photos retouchées • 2 tenues",
            items: ["10 photos retouchées", "2 tenues maximum"],
          },
          {
            name: "Pack Essentiel",
            price: "30 000 FCFA",
            badge: "Populaire",
            summary: "15 photos retouchées • 4 tenues",
            items: ["15 photos retouchées", "4 tenues maximum"],
          },
          {
            name: "Pack Prestige",
            price: "50 000 FCFA",
            summary: "20 photos retouchées + brutes • 6 tenues",
            items: ["20 photos retouchées", "Photos brutes incluses", "6 tenues maximum"],
          },
        ],
      },
      {
        id: "outdoor",
        title: "Shooting hors studio",
        note: "Extérieur, en ville. Livraison express en moins de 24h : +10 000 FCFA.",
        packs: [
          {
            name: "Pack Découverte",
            price: "35 000 FCFA",
            summary: "10 photos retouchées • un lieu",
            items: ["10 photos retouchées", "Lieu unique en ville"],
          },
          {
            name: "Pack Essentiel",
            price: "50 000 FCFA",
            badge: "Populaire",
            summary: "15 photos retouchées",
            items: ["15 photos retouchées"],
          },
          {
            name: "Pack Prestige",
            price: "85 000 FCFA",
            summary: "20 photos + brutes • 2 lieux",
            items: ["20 photos retouchées", "Photos brutes incluses", "2 lieux au choix"],
          },
        ],
      },
    ],
  },
  {
    id: "events",
    label: "Événements",
    groups: [
      {
        id: "wedding",
        title: "Mariage",
        note: "Les horaires indiqués sont extensibles, sauf mention contraire.",
        packs: [
          {
            name: "Formule de base",
            price: "100 000 FCFA",
            hours: "Jusqu’à la réception",
            summary: "Photos illimitées retouchées sur clé USB",
            items: ["Photos illimitées retouchées", "Livraison sur clé USB", "Fin de service à la réception"],
          },
          {
            name: "Formule Standard",
            price: "175 000 FCFA",
            hours: "Jusqu’à la réception",
            summary: "Photos illimitées, album 100 photos, vidéo résumé",
            items: [
              "Photos illimitées retouchées sur clé USB",
              "Album 100 photos",
              "Vidéo résumé",
              "Fin de service à la réception",
            ],
          },
          {
            name: "Formule Avancée",
            price: "250 000 FCFA",
            hours: "Jusqu’à 19h, extensible",
            summary: "Album, vidéo résumé, vidéo longue, tableau taille moyenne",
            items: [
              "Photos illimitées",
              "Album 100 photos",
              "1 vidéo résumé",
              "1 vidéo longue",
              "Tableau photo taille moyenne",
            ],
          },
          {
            name: "Formule Avancée +",
            price: "300 000 FCFA",
            badge: "Recommandée",
            hours: "Jusqu’à 19h, extensible",
            summary: "Album 120 photos, deux vidéos, cadre et pre-wedding ou EVJF",
            items: [
              "Photos illimitées",
              "Album + 120 photos",
              "Vidéo résumé",
              "Vidéo longue",
              "Cadre photo taille moyenne",
              "1 shooting pre-wedding ou EVJF, au choix",
            ],
          },
          {
            name: "Formule Premium",
            price: "375 000 FCFA",
            badge: "Le choix des mariés",
            hours: "Jusqu’à 21h",
            summary: "Pre-wedding ou EVJF, aérien, tableau grand format",
            items: [
              "Photos illimitées",
              "Album + 120 photos",
              "Vidéo résumé",
              "Vidéo longue",
              "Cadre photo taille moyenne",
              "1 shooting pre-wedding ou EVJF, au choix",
              "Prise de vue aérienne",
              "Tableau photo grand format",
            ],
          },
          {
            name: "Formule Excellence",
            price: "550 000 FCFA",
            hours: "Jusqu’à la fin de l’événement",
            summary: "Prestige : pre-wedding, aérien, album 200 photos",
            items: [
              "Photos illimitées",
              "Album 200 photos",
              "Vidéo résumé",
              "Vidéo longue",
              "Couverture jusqu’à l’accompagnement de la mariée",
              "Tableau photo grand format",
              "1 shooting pre-wedding avec vidéo d’annonce ou EVJF, au choix",
              "Prise de vue aérienne",
            ],
          },
        ],
        extras: [
          { name: "Album photo supplémentaire", price: "À partir de 20 000 FCFA" },
          { name: "Séance EVJF seule", price: "À partir de 50 000 FCFA" },
          { name: "Tableau photo supplémentaire", price: "À partir de 20 000 FCFA" },
        ],
      },
      {
        id: "event",
        title: "Événementiel",
        note: "Anniversaires, séminaires, baptêmes et cérémonies similaires.",
        packs: [
          {
            name: "Base",
            price: "85 000 FCFA",
            hours: "5h, extensible",
            summary: "Prestation photo uniquement",
            items: ["Photo uniquement", "5 heures, extensibles"],
          },
          {
            name: "Essentielle",
            price: "150 000 FCFA",
            badge: "Populaire",
            hours: "5h, extensible",
            summary: "Photo + vidéo essentielle",
            items: ["Photo", "Vidéo essentielle", "5 heures, extensibles"],
          },
          {
            name: "Confort",
            price: "175 000 FCFA",
            hours: "6h, extensible",
            summary: "Photo, vidéo longue et résumé réseaux",
            items: ["Photo", "Vidéo longue", "Vidéo résumé pour les réseaux", "6 heures, extensibles"],
          },
          {
            name: "Prestige",
            price: "275 000 FCFA",
            hours: "6h, extensible",
            summary: "Photo, vidéo, aérien et résumé réseaux",
            items: ["Photo", "Vidéo essentielle", "Prise aérienne", "Vidéo résumé pour les réseaux", "6 heures, extensibles"],
          },
        ],
      },
      {
        id: "institutional",
        title: "Institutionnel & entreprises",
        note: "ONG, sociétés et marques. Prestation établie sur devis.",
        devisOnly: true,
        packs: [
          {
            name: "Couverture sur-mesure",
            price: "Sur devis",
            summary: "Durée, logistique et droits d’usage selon le brief",
            items: [
              "Durée et ampleur de l’événement",
              "Logistique et nombre d’intervenants",
              "Droits de diffusion et d’usage commercial",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "design",
    label: "Graphisme",
    groups: [
      {
        id: "posters",
        title: "Affiches & supports",
        note: "Délais standards : 48h à 72h. Express sous 32h : +50 %.",
        packs: [
          {
            name: "Affiche basique",
            price: "À partir de 10 000 FCFA",
            summary: "Design simple, propre, soigné • 1 révision",
            items: ["Événementiel, commerce, annonce, mariage", "1 série d’ajustements"],
          },
          {
            name: "Affiche corporate",
            price: "À partir de 15 000 FCFA",
            summary: "Identité de marque et mise en valeur commerciale • 2 révisions",
            items: ["Intégration de l’identité visuelle", "Compositions et retouches", "2 séries d’ajustements"],
          },
          {
            name: "Affiche premium",
            price: "À partir de 35 000 FCFA",
            summary: "Sur-mesure, photomontage, déclinaisons multi-formats",
            items: [
              "Compositions complexes, photomontages ou illustrations",
              "Déclinaisons réseaux et impression HD",
              "2 séries d’ajustements",
            ],
          },
          {
            name: "Grand format & signalétique",
            price: "À partir de 20 000 FCFA",
            summary: "Panneaux, kakémonos, vitrines, fichiers print",
            items: ["Panneaux, habillages, kakémonos, vitrines", "Fichiers haute résolution prêts à l’impression"],
          },
        ],
      },
      {
        id: "logo",
        title: "Création de logo",
        packs: [
          {
            name: "Logo typographique",
            price: "À partir de 25 000 FCFA",
            summary: "2 propositions • 2 révisions • PNG, JPG, PDF",
            items: ["Travail de typographie et couleur", "2 propositions visuelles", "2 révisions", "PNG transparent, JPG, PDF HD"],
          },
          {
            name: "Logo illustratif",
            price: "À partir de 50 000 FCFA",
            summary: "Symbole sur-mesure + typo • versions couleur et mono",
            items: [
              "Pictogramme ou symbole distinctif",
              "Typographie associée",
              "2 propositions • 2 révisions",
              "Couleur, monochrome, fichiers vectoriels",
            ],
          },
          {
            name: "Logo premium / mascotte",
            price: "À partir de 75 000 FCFA",
            summary: "3 propositions • 3 révisions • guide d’usage",
            items: [
              "Illustration avancée, relief ou mascotte",
              "3 propositions visuelles",
              "3 révisions",
              "Guides d’utilisation",
            ],
          },
        ],
      },
      {
        id: "branding",
        title: "Packs identité de marque",
        packs: [
          {
            name: "Pack Starter",
            price: "À partir de 45 000 FCFA",
            summary: "Logo basique + profils et bannières réseaux",
            items: ["Logo basique", "Photo de profil réseaux", "Habillages bannières Facebook / LinkedIn / Instagram"],
          },
          {
            name: "Pack Branding Standard",
            price: "À partir de 75 000 FCFA",
            summary: "Logo complet + mini-guide de marque",
            items: ["Logo typo + symbole", "Mini-guide couleurs et typographies", "Photo de profil", "2 propositions • 3 révisions"],
          },
          {
            name: "Pack Identité Corporate",
            price: "À partir de 125 000 FCFA",
            summary: "Charte, cartes de visite, papier à en-tête",
            items: [
              "Pack Standard",
              "Charte graphique complète",
              "Cartes de visite recto/verso",
              "Papier à en-tête",
              "3 propositions • 4 révisions",
            ],
          },
          {
            name: "Pack Business & Print",
            price: "À partir de 180 000 FCFA",
            summary: "Papeterie, motion logo, 50 cartes imprimées",
            items: [
              "Pack Corporate",
              "Chemise à rabat",
              "Modèle facture / devis",
              "Bannières réseaux",
              "Animation du logo 5–10 s",
              "50 cartes de visite imprimées offertes",
              "3 propositions • 4 révisions",
            ],
          },
          {
            name: "Pack Branding Excellence",
            price: "À partir de 450 000 FCFA",
            badge: "360°",
            summary: "Identité, print, spot animé et 10 photos studio",
            items: [
              "Logo et charte complète",
              "Papeterie d’entreprise",
              "Flyer et kakémono",
              "Spot publicitaire animé (< 1 min)",
              "10 photos studio professionnelles",
              "Accompagnement stratégique de lancement ou rebranding",
            ],
          },
        ],
      },
      {
        id: "retainers",
        title: "Abonnements visuels",
        note: "Planning de publication à transmettre avant production. Textes, photos et logos fournis par le client. Au-delà des séries incluses, les modifications sont facturées en plus.",
        packs: [
          {
            name: "À l’unité",
            price: "À partir de 10 000 FCFA",
            summary: "Un visuel, un besoin ponctuel",
            items: ["Création à la demande"],
          },
          {
            name: "Formule 1",
            price: "50 000 FCFA / mois",
            summary: "5 visuels • 1 série de modifications",
            items: ["5 visuels sur-mesure", "1 série de modifications par visuel"],
          },
          {
            name: "Formule 2",
            price: "120 000 FCFA / mois",
            badge: "Recommandée",
            summary: "8 visuels • 2 séries de modifications",
            items: ["8 visuels sur-mesure", "2 séries de modifications par visuel"],
          },
          {
            name: "Formule 3",
            price: "160 000 FCFA / mois",
            summary: "15 visuels • 3 séries de modifications",
            items: ["15 visuels sur-mesure", "3 séries de modifications par visuel"],
          },
        ],
      },
    ],
  },
  {
    id: "digital",
    label: "IA & 3D",
    groups: [
      {
        id: "ai-still",
        title: "Visuels IA",
        packs: [
          {
            name: "Image / photo d’art IA",
            price: "À partir de 5 000 FCFA",
            summary: "Avatars, visuels artistiques ou décors sur-mesure",
            items: ["Avatars professionnels", "Visuels artistiques", "Décors ultra-réalistes"],
          },
        ],
      },
      {
        id: "ai-video",
        title: "Animation vidéo IA",
        packs: [
          {
            name: "Format court",
            price: "À partir de 25 000 FCFA",
            summary: "10 secondes, animation d’images sans narration",
            items: ["10 secondes", "Animation dynamique d’images", "Sans narration"],
          },
          {
            name: "Format standard",
            price: "À partir de 55 000 FCFA",
            summary: "15 secondes, transitions, voix off et sound design",
            items: [
              "15 secondes",
              "Scénarisation courte",
              "Transitions dynamiques IA",
              "Voix off et sound design",
            ],
          },
          {
            name: "Format développé",
            price: "À partir de 150 000 FCFA",
            summary: "1 minute, script, multi-scènes et habillage sonore",
            items: [
              "60 secondes",
              "Script et vidéo narrative complète",
              "Animation multi-scènes IA",
              "Voix off pro IA",
              "Habillage sonore",
            ],
          },
          {
            name: "Format long",
            price: "Sur devis",
            summary: "+25 000 FCFA par 30 secondes supplémentaires",
            items: ["Au-delà d’une minute", "Tranche additionnelle : +25 000 FCFA / 30 s"],
          },
        ],
      },
      {
        id: "three-d",
        title: "Modélisation 3D",
        packs: [
          {
            name: "Objet / produit 3D",
            price: "À partir de 50 000 FCFA",
            summary: "Rendu HD sous plusieurs angles",
            items: ["Modélisation d’objet ou produit", "Rendu haute définition"],
          },
          {
            name: "3D + animation short",
            price: "À partir de 85 000 FCFA",
            summary: "Reel ou présentation produit (5 - 10 secondes)",
            items: ["Animation 3D courte", "Présentation produit ou réseaux"],
          },
          {
            name: "Spot publicitaire 3D",
            price: "À partir de 180 000 FCFA",
            summary: "Modélisation, scénario, VFX et montage",
            items: ["Modélisation", "Scénarisation", "Animation avancée", "Effets visuels", "Montage audio / vidéo"],
          },
        ],
      },
    ],
  },
]

export const tarifConditions = [
  {
    title: "Acompte",
    body: "Le projet démarre après un acompte de 50 % à 70 %, selon la nature et l’urgence de la prestation.",
  },
  {
    title: "Modifications",
    body: "Les révisions portent sur l’ajustement du concept choisi. Un changement d’orientation graphique en cours de projet est réévalué.",
  },
  {
    title: "Délais express",
    body: "Une exécution prioritaire sous 32 heures est majorée de 50 % du tarif initial.",
  },
]
