const IMG = {
  avatar: "/images/avatar.jpeg",
  heroFront: "/images/hero-front.jpeg",
  heroBack: "/images/hero-back.jpeg",
  about: "/images/about.jpeg",
  wave: "/images/wave.gif",
  logo: "/images/logo.png",
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
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Projects", to: "/projects" },
    { label: "Blogs", to: "/blogs" },
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
    wordRight: "DESIGNER",
    tagline:
      "Je suis Mr Kenzi, brand designer senior avec +7 ans d’expérience, également photographe et vidéaste.",
    bio: "Je suis Mr Kenzi, brand designer senior avec plus de 7 ans d’expérience, également photographe et vidéaste.",
  },
  who: {
    title: "Qui suis-je ?",
    body: "Je suis Mr Kenzi, brand designer senior avec plus de 7 ans d’expérience, également photographe et vidéaste. Basé à Ouagadougou, j’accompagne les entreprises, marques et particuliers dans la création d’identités visuelles fortes, de supports de communication percutants et de contenus visuels modernes.",
  },
  about: {
    title: "À propos de moi",
    body: "Basé à Ouagadougou (Burkina Faso), j’accompagne les entreprises, marques et particuliers dans la création d’identités visuelles fortes, de supports de communication percutants et de contenus visuels modernes. Mon objectif : valoriser l’image de mes clients et accroître leur impact grâce à la créativité, la stratégie et la qualité.",
    cta: "Mon histoire",
    phoneLabel: "Appeler-moi :",
    emailLabel: "Email :",
  },
  aboutPage: {
    title: "Qui suis-je ?",
    name: "Mr Kenzi",
    lead: "Brand designer senior avec plus de 7 ans d’expérience, également photographe et vidéaste.",
    body: "Basé à Ouagadougou, j’accompagne les entreprises, marques et particuliers dans la création d’identités visuelles fortes, de supports de communication percutants et de contenus visuels modernes. Mon objectif est de valoriser l’image de mes clients et d’accroître leur impact grâce à la créativité, la stratégie et la qualité.",
  },
  servicesIntro: {
    title: "Que pouvons-nous faire pour vous ?",
    body: "Graphisme, photographie, vidéo : je construis des images qui racontent votre marque et restent en tête.",
  },
  services: [
    {
      n: "1",
      title: "Graphisme",
      items: [
        "Identité visuelle & branding",
        "Affiches, flyers, supports publicitaires",
        "Logos & chartes graphiques",
        "Impression tout support",
        "UI & UX",
      ],
    },
    {
      n: "2",
      title: "Photographie",
      items: [
        "Portrait & shooting artistique",
        "Événementiel",
        "Produits & mode",
      ],
    },
    {
      n: "3",
      title: "Vidéo",
      items: [
        "Clips promotionnels",
        "Vidéos institutionnelles",
        "Montage & storytelling visuel",
        "Scénario",
      ],
    },
    {
      n: "4",
      title: "Branding",
      items: [
        "Stratégie d’identité de marque",
        "Direction artistique",
        "Supports de communication",
        "Contenus visuels modernes",
      ],
    },
  ],
  stats: [
    { value: 7, suffix: "+", label: "Années d'expérience" },
    { value: 268, suffix: "+", label: "Projets réalisés" },
    { value: 50, suffix: "+", label: "Clients dans le monde" },
  ],
  portfolio: {
    title: "Portfolio",
    intro:
      "Ces projets illustrent l’alliance entre stratégie et créativité : des identités, des images et des films pensés pour valoriser une marque et augmenter son impact.",
    cta: "Tous les projets",
  },
  projectsPage: {
    title: "Projets en vedette",
    intro:
      "Une sélection de travaux où le design, la photo et la vidéo servent un vrai objectif de communication.",
    more: "Plus de projets",
  },
  testimonials: {
    title: "Ce que disent mes clients",
    intro:
      "Leur confiance me pousse à livrer des images et des identités qui marquent. Voici quelques retours sur nos collaborations.",
    items: [
      {
        quote:
          "Mr Kenzi a vraiment compris ma vision et l’a transformée en visuels percutants. Le résultat a dépassé mes attentes.",
        name: "John Harris",
        role: "Directeur marketing",
        avatar: "/images/testimonial-1.jpg",
      },
      {
        quote:
          "Il a pris le temps de comprendre nos objectifs et a livré un design qui parle vraiment à notre public.",
        name: "Michael Lee",
        role: "Product Manager",
        avatar: "/images/testimonial-2.jpg",
      },
      {
        quote:
          "Une direction artistique nette, de la photo au montage. Notre image de marque a gagné en clarté et en force.",
        name: "Sarah Johnson",
        role: "CEO",
        avatar: "/images/testimonial-3.jpg",
      },
      {
        quote:
          "En tant que petit entrepreneur, j’ai apprécié un process simple, humain, sans stress.",
        name: "Laura Bennett",
        role: "Cheffe d’entreprise",
        avatar: "/images/testimonial-4.jpg",
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
      "Les questions que l’on me pose le plus souvent. Si la vôtre n’est pas là, écrivez-moi — je réponds volontiers.",
    items: [
      {
        question: "Quels services proposes-tu ?",
        answer:
          "Graphisme et branding, photographie (portrait, événementiel, produit, mode), vidéo (clips, films institutionnels, montage et scénario), ainsi que de l’UI/UX. Je peux aussi intervenir sur des supports print et de la direction artistique.",
      },
      {
        question: "Comment se passe un projet ?",
        answer:
          "On commence par comprendre votre marque, vos objectifs et votre public. Ensuite : concept, production (design, shooting ou montage), allers-retours, puis livraison des fichiers prêts à l’emploi.",
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
  blogsPreview: {
    title: "Notes & idées",
    intro:
      "Tendances, process créatif et regards sur le design, la photo et la vidéo — pour nourrir vos projets.",
    cta: "Tous les articles",
  },
  contact: {
    title: "Travaillons ensemble",
    intro:
      "Créons quelque chose d’extraordinaire ensemble — votre marque, vos images, votre prochaine campagne.",
    submit: "Envoyer sur WhatsApp",
    services: ["Branding", "Graphisme", "Photographie", "Vidéo", "UI/UX"],
  },
  journey: {
    title: "Mon parcours",
    intro:
      "De photographe à fondateur de studio : un chemin mené par la direction artistique, l’image et l’envie de faire grandir les marques.",
    items: [
      { role: "Fondateur", company: "MK Creative", dates: "2024 — Présent" },
      { role: "Directeur artistique", company: "Spirit Design", dates: "2025" },
      {
        role: "Directeur artistique",
        company: "Fashion Label Group",
        dates: "2020 — 2022",
      },
      { role: "Directeur", company: "Lynx Photographie", dates: "2018 — 2020" },
      {
        role: "Freelance",
        company: "Direction artistique & image",
        dates: "En continu",
      },
    ],
  },
  stack: {
    title: "Mes outils",
    intro:
      "Je compose avec les outils du design, de la photo et du film. Photoshop et Illustrator pour le graphisme, Premiere et After Effects pour le mouvement, Blender pour la 3D.",
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
        body: "Montage des clips, films institutionnels et récits visuels.",
      },
      {
        name: "After Effects",
        body: "Motion design, FX et habillage d’image.",
      },
      {
        name: "Blender",
        body: "3D et images de synthèse pour des univers plus profonds.",
      },
      {
        name: "Lightroom",
        body: "Développement photo, couleur et cohérence d’un shooting.",
      },
    ],
  },
  education: {
    title: "Formation",
    items: [
      {
        title: "Master I Génie Civil (BTP)",
        place: "Université des Technologies du Management (UTM)",
      },
      {
        title: "Licence en Génie Civil (BTP)",
        place: "Université des Technologies du Management (UTM)",
      },
      { title: "Bac F4 (Génie Civil)", place: "CPFP" },
      { title: "BEPC", place: "Lycée Technique de Ouagadougou (LTO), 2015" },
      { title: "CEP", place: "Lycée Privé La Salle Badenya" },
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
  newsletter: {
    title: "Recevoir des idées, chaque mois",
    body: "Un mot court : process, images, projets en cours. Pas de spam.",
    cta: "S’inscrire",
  },
}
