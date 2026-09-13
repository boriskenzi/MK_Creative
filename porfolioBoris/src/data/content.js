import { asset } from "../lib/asset"

const IMG = {
  avatar: asset("images/avatar-menu.jpg"),
  heroFront: asset("images/hero-front.jpeg"),
  heroBack: asset("images/hero-back.jpeg"),
  about: asset("images/about.jpeg"),
  logo: asset("images/logo.png"),
}

export const content = {
  brand: "MK CREATIVE",
  person: "Mr Kenzi",
  whatsappNumber: "22661155223",
  phone: "+226 61 15 52 23",
  phoneAlt: "+226 64 81 93 10",
  phoneHref: "tel:+22661155223",
  phoneAltHref: "tel:+22664819310",
  email: "mkcreativegroup226@gmail.com",
  city: "Ouagadougou, Burkina Faso",
  images: IMG,
  nav: [
    { label: "Accueil", to: "/" },
    { label: "Réalisations", to: "/realisations" },
    { label: "À propos", to: "/about" },
    { label: "Tarifs", to: "/tarifs" },
  ],
  socials: [
    { name: "Instagram", href: "https://www.instagram.com/i.am.mr.kenzi/" },
    { name: "Behance", href: "https://www.behance.net/boristraore" },
    { name: "TikTok", href: "https://www.tiktok.com/@mrkenzi.bf" },
    { name: "X", href: "https://x.com/MrKenzi01" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/boriskenzi" },
    { name: "Facebook", href: "https://www.facebook.com/share/17SwgFHToQ/" },
  ],
  hero: {
    greeting: "Hi",
    name: "MK CREATIVE",
    wordLeft: "STUDIO",
    wordRight: "Brand Design",
    wordRightSub: "Photographie et Vidéographie",
    tagline:
      "Je suis Mr Kenzi, brand designer senior avec +7 ans d’expérience, également photographe et vidéaste.",
    bio: "Je suis Mr Kenzi, brand designer senior avec plus de 7 ans d’expérience, également photographe et vidéaste.",
  },
  who: {
    title: "Qui suis-je ?",
    body: "Je suis Mr Kenzi, brand designer senior, photographe et vidéaste. J'accompagne les entreprises, marques et particuliers dans la création d'identités visuelles fortes, de supports de communication percutants et de contenus visuels modernes.",
  },
  about: {
    title: "Prêt pour un projet ?",
    body: "N'hésitez surtout pas à nous contacter ! Notre objectif est de valoriser l'image de la clientèle et d'accroître son impact grâce à la créativité, la stratégie et la qualité. Nous accompagnons les entreprises, les marques et les particuliers dans la création d'identités visuelles fortes, de supports de communication percutants et de contenus visuels.",
    cta: "À propos",
    phoneLabel: "Appeler-moi :",
    emailLabel: "Email :",
  },
  aboutPage: {
    title: "Qui suis-je ?",
    name: "Mr Kenzi",
    lead: "Brand designer senior, photographe et vidéaste professionnel, je suis responsable de la structure MK Creative Group. J'accompagne les marques, les entreprises et les particuliers, partout dans le monde, dans la création d'identités visuelles fortes et de supports de communication percutants. Mon objectif est de valoriser l'image de mes clients et d'accroître leur impact grâce à la créativité, la stratégie et la qualité.",
  },
  realisations: {
    kicker: "Galeries",
    title: "Réalisations",
    lead: "Ici, c’est le travail réel : des visuels pour les marques, des portraits en studio, des reportages le jour J. Ouvrez une galerie et prenez le temps de regarder.",
    cta: "Voir la galerie",
    items: [
      {
        id: "visuels",
        title: "Création de visuels",
        body: "Identités, affiches, invitations et supports de communication.",
        image: asset("images/realisations/visuels.jpg"),
        source: "https://www.picdrop.com/mrkenzi/mrkenzi",
        fit: "contain",
        featured: true,
      },
      {
        id: "studio",
        title: "Shooting photo",
        body: "Portraits et shootings en studio.",
        image: asset("images/realisations/studio.jpg"),
        source: "https://www.picdrop.com/mrkenzi/9qW3ohvLzg",
        fit: "cover",
      },
      {
        id: "event",
        title: "Photo d'événement",
        body: "Mariages, cérémonies et reportages d'événements.",
        image: asset("images/realisations/event.jpg"),
        source: "https://www.picdrop.com/mrkenzi/MXRbEtDwzD",
        fit: "cover",
      },
    ],
  },
  servicesIntro: {
    title: "Que pouvons-nous faire pour vous ?",
    body: "Graphisme, photographie, vidéo, 3D... nous construisons des images qui racontent votre marque.",
  },
  services: [
    {
      n: "1",
      title: "Création Graphique | Brand Design",
      items: [
        "Branding, logos et chartes graphiques",
        "Affiches, flyers et supports publicitaires",
        "Impression sur tous supports",
        "Design d'interfaces (UI & UX)",
      ],
    },
    {
      n: "2",
      title: "Photographie",
      items: [
        "Portrait et shooting artistique",
        "Événementiel / institutionnel",
        "Produits",
        "Etc.",
      ],
    },
    {
      n: "3",
      title: "Vidéo",
      items: [
        "Clips promotionnels",
        "Vidéos institutionnelles",
        "Montage et storytelling visuel",
        "Motion design",
        "Scénario",
      ],
    },
    {
      n: "4",
      title: "Développement Full Stack",
      items: [
        "Création de sites web modernes et sur mesure",
        "Création d'applications",
      ],
    },
    {
      n: "5",
      title: "AI Artist",
      items: [
        "Génération d'images et de vidéos IA, clips",
        "Formation",
        "Prompt IA",
        "Et bien d'autres",
      ],
    },
  ],
  stats: [
    { value: 7, suffix: "+", label: "Années d'expérience" },
    { value: 200, suffix: "+", label: "Projets réalisés" },
    { value: 50, suffix: "+", label: "Clients dans le monde" },
  ],
  testimonials: {
    title: "Ce que disent mes clients",
    intro:
      "Leur confiance me pousse à livrer des images et des identités qui marquent. Voici quelques retours sur nos collaborations.",
    items: [
      {
        quote:
          "J'aime vraiment votre équipe et l'accompagnement que vous apportez. Que Dieu vous bénisse.",
        name: "Kabré Alidou",
        role: "Client",
      },
      {
        quote: "Équipe dynamique et professionnelle, bravo à vous.",
        name: "Gombré Abdoul Kader",
        role: "Client",
      },
      {
        quote:
          "Je vous recommande, mon mariage a été couvert par votre équipe et j'ai vraiment aimé.",
        name: "Nougtara Adèle",
        role: "Cliente",
      },
      {
        quote:
          "Pendant trois mois, nous avons travaillé ensemble pour booster ma boutique. J'ai vu l'impact réel sur les réseaux sociaux. Encore merci, Kenzi.",
        name: "Traoré Aïcha",
        role: "Cliente",
      },
    ],
    highlights: [
      {
        kicker: "Plus de 50 clients accompagnés",
        value: 95,
        suffix: "%",
        label: "Satisfaction",
      },
      {
        kicker: "Des visuels pensés pour faire grandir l’image de marque",
        value: 200,
        suffix: "%",
        label: "Impact",
      },
    ],
  },
  faq: {
    title: "Questions fréquentes",
    intro:
      "Les questions que l’on me pose le plus souvent. Si la vôtre n’est pas là, écrivez-moi. Je réponds volontiers.",
    items: [
      {
        question: "Quels services proposes-tu ?",
        answer:
          "Graphisme et branding, photographie (portrait, événementiel, produit, mode), vidéo (clips, films institutionnels, montage et scénario), ainsi que de l’UI/UX. Je peux aussi intervenir sur des supports print et de la direction artistique.",
      },
      {
        question: "Comment se passe un projet ?",
        answer:
          "On commence par comprendre votre marque, vos objectifs et votre public cible (idéalement à partir d'un fichier Word détaillé transmis par le client). Nous passons ensuite à la conception ou à la production, puis nous revenons vers vous avec une proposition pour validation, avant la livraison des fichiers prêts à l'emploi. Avant tout démarrage de projet, un acompte est demandé, dont le montant varie selon chaque projet.",
      },
      {
        question: "Combien de temps dure un projet ?",
        answer:
          "Cela dépend du brief. Une identité ou une campagne prend souvent plusieurs semaines. Un shooting, des visuels print ou un montage plus court peuvent se livrer plus vite.",
      },
      {
        question: "Que dois-je préparer avant de commencer ?",
        answer:
          "Vos objectifs, votre public, les éléments de marque déjà existants (logo, couleurs, photos) et des références que vous aimez. Plus le brief est clair, plus le résultat est juste.",
      },
      {
        question: "Est-ce que tu fais des retouches ?",
        answer:
          "Oui. Chaque projet inclut des rounds de revisions pour arriver à un résultat dont vous êtes fiers. Des allers-retours supplémentaires peuvent s’ajouter si besoin.",
      },
      {
        question: "Comment on démarre ?",
        answer:
          "Contactez-moi via le formulaire, WhatsApp ou email. On discute du projet, du délai et du budget, puis je vous envoie une proposition.",
      },
    ],
  },
  contact: {
    title: "Travaillons ensemble",
    intro:
      "Créons quelque chose d’extraordinaire ensemble : votre marque, vos images, votre prochaine campagne.",
    submit: "Envoyer sur WhatsApp",
    services: [
      "Création graphique",
      "Photographie",
      "Vidéo",
      "Développement Full Stack",
      "AI Artist",
    ],
  },
  journey: {
    title: "Mon parcours",
    intro:
      "De graphiste à photographe, puis fondateur de studio : un parcours mené par la direction artistique, l'image, et l'envie de faire grandir les marques.",
    items: [
      { role: "Co-fondateur, Directeur", company: "Lynx Photographie", dates: "2018 à 2020" },
      { role: "Directeur artistique", company: "Fashion Label Group", dates: "2020 à 2022" },
      { role: "Fondateur", company: "MK Creative", dates: "2024 - Présent" },
      { role: "Graphiste / DA", company: "Spirit Design / Créa Studio", dates: "2025" },
      { role: "Freelance", company: "Direction artistique & image", dates: "En continu" },
    ],
  },
  stack: {
    title: "Mes outils",
    intro:
      "Comme un couteau suisse, je m'adapte en fonction de chaque projet. Avec le temps et l'expérience, voici les outils que j'utilise le plus fréquemment :",
    items: [
      {
        name: "Photoshop",
        body: "Retouche, compositing et création graphique au quotidien.",
      },
      {
        name: "Illustrator",
        body: "Logos, identités et illustration vectorielle.",
      },
      {
        name: "Premiere Pro",
        body: "Montage des clips et films institutionnels.",
      },
      {
        name: "After Effects",
        body: "Motion design, FX...",
      },
      {
        name: "Lightroom",
        body: "Traitement professionnel.",
      },
      {
        name: "Blender",
        body: "3D et animation.",
      },
    ],
  },
  education: {
    title: "Formation",
    items: [
      { title: "Stage à Spirit Design" },
      { title: "Formation en informatique", place: "Ouagadougou" },
      { title: "Formation en intelligence artificielle" },
      { title: "Formation en audiovisuel", place: "2018 à aujourd'hui" },
    ],
  },
  process: {
    title: "Concevoir avec stratégie et créativité",
    intro:
      "Un process qui mélange stratégie et création : comprendre le besoin, proposer une direction, produire, affiner, livrer.",
    steps: [
      {
        n: "01",
        title: "Écoute & stratégie",
        body: "Je plonge dans votre activité, votre public et vos objectifs. On pose une direction claire avant de produire la moindre image.",
      },
      {
        n: "02",
        title: "Concept & direction",
        body: "Moodboards, pistes graphiques, références photo ou film. On choisit une ligne artistique avant d’entrer en production.",
      },
      {
        n: "03",
        title: "Production",
        body: "Design, shooting ou tournage, selon le brief. Je reste proche du terrain pour que l’image tienne la promesse du concept.",
      },
      {
        n: "04",
        title: "Retours & finitions",
        body: "On revoit ensemble. Retouches, montage, déclinaisons print ou digital jusqu’à ce que ça sonne juste.",
      },
      {
        n: "05",
        title: "Livraison",
        body: "Fichiers prêts à l’emploi, déclinaisons et conseils d’usage pour que la marque vive après le projet.",
      },
    ],
  },
}
