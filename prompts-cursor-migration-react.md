# Migration Framer → React (MK Creative) — Prompts Cursor

Basé sur l'analyse complète du site actuel (Home, About, Projects, Blogs).
Objectif : reproduire fidèlement le style et les animations, avec un contenu piloté par données (facile à mettre à jour ensuite avec tes vrais textes/images).

---

## 0. Setup global du projet (à lancer en premier)

```
Contexte : Je migre mon portfolio personnel (actuellement sur Framer, template "Portavia") vers un projet React (Vite) autonome. Je dois reproduire EXACTEMENT le style visuel et les animations. Le contenu sera mis à jour ensuite avec mes propres textes/images — structure tout en données externalisées, pas de texte en dur dans les composants.

Stack :
- React + Vite
- React Router (pages : /, /about, /projects, /projects/:slug, /blogs, /blogs/:slug)
- Tailwind CSS
- GSAP + ScrollTrigger pour toutes les animations
- Structure de données : /src/data/projects.js et /src/data/blogs.js (arrays d'objets), pour piloter les pages de liste ET les pages de détail dynamiques

Arborescence à créer :
/src
  /components
    Header.jsx
    Footer.jsx
    ContactSection.jsx
    ServicesMarquee.jsx
    ProjectCard.jsx
    BlogCard.jsx
    StatsCounter.jsx
    TestimonialsSlider.jsx
    FaqAccordion.jsx
  /pages
    Home.jsx
    About.jsx
    Projects.jsx
    ProjectDetail.jsx
    Blogs.jsx
    BlogDetail.jsx
  /data
    projects.js
    blogs.js
    content.js (textes génériques : hero, bio, services, stack, process)
  /hooks
    useScrollReveal.js (wrapper GSAP ScrollTrigger réutilisable)

Merci de créer d'abord cette arborescence + le setup Tailwind/GSAP/React Router, avec des fichiers de données vides (schema commenté) que je remplirai à l'étape suivante.
```

---

## 1. Schéma de données — Projects

```
Crée /src/data/projects.js avec un array d'objets suivant ce schéma (contenu placeholder pour l'instant, je le remplacerai) :

{
  slug: "nom-du-projet",           // utilisé pour l'URL /projects/:slug
  title: "Titre du projet",
  category: "Branding" | "Graphic Design" | "Web Design" | "UI / UX Design",
  description: "Résumé court affiché sur la carte",
  image: "/src/assets/projects/xxx.jpg",
  year: "2025",
  industry: "Secteur",
  client: "Nom client",
  duration: "X semaines",
  problem: "Texte du problème",
  solution: "Texte de la solution",
  challenge: "Texte du défi",
  summary: "Texte de synthèse"
}

Je fournirai 6-8 projets. Structure Projects.jsx pour lister toutes les cartes en grille (avec bouton "Load More" / pagination si besoin), et ProjectDetail.jsx pour afficher une fiche complète via useParams(slug), avec section "More Projects" en bas (3-4 projets suggérés, exclut le projet courant).
```

## 2. Schéma de données — Blogs

```
Crée /src/data/blogs.js avec ce schéma :

{
  slug: "titre-article",
  title: "Titre",
  category: "Insights" | "Tutorials" | "Resources",
  date: "27 Apr 2025",
  excerpt: "Résumé affiché sur la carte",
  image: "/src/assets/blogs/xxx.jpg",
  sections: [
    { heading: "Titre H2", body: "Texte du paragraphe" },
    ...
  ]
}

Blogs.jsx : liste en grille avec tag catégorie + date + résumé, section "Most Viewed" en haut.
BlogDetail.jsx : article complet via useParams(slug), + bloc newsletter "Get monthly inspiration..." + section "More to Discover" (2 articles liés) en bas.
```

---

## 3. Header + Footer (composants partagés)

```
Header.jsx :
- Logo/avatar rond à gauche
- Nav : Home, About, Projects, Blogs
- Badge "Available for work" ou CTA Contact à droite, qui scrolle vers #contact
- Sticky au scroll

Footer.jsx :
- Colonne contact : "Appeler-moi : [téléphone]" / "Email : [email]"
- Réseaux sociaux (X, Instagram, Behance, Dribbble) en icônes (utiliser Lucide ou Feather, pas d'icônes générées par IA)
- Copyright dynamique (année courante)

Ces deux composants sont utilisés sur toutes les pages — les données de contact (tél/email/réseaux) doivent venir de /src/data/content.js pour être modifiables en un seul endroit.
```

---

## 4. Page Home (la plus riche — à faire section par section)

### 4.1 Hero
```
Section Hero (page Home) :
- Petit texte "Hi" au-dessus du titre
- Nom/marque en grand (ex: "MK CREATIVE")
- Tagline : présentation courte (designer + années d'expérience)
- Paragraphe bio (2-3 phrases)
- Animation d'entrée : fade-in + translateY stagger sur chaque ligne de texte, via GSAP timeline au chargement (pas ScrollTrigger, c'est le hero donc au mount)

Contenu en data/content.js, propriété hero: { greeting, name, tagline, bio }
```

### 4.2 Services (marquee horizontal infini)
```
Identique à la section Services de la page About : 4 catégories de services (Photographie, Graphic Design, Web Design, Branding), chacune avec 4 sous-prestations en liste. Réutilise le composant ServicesMarquee.jsx déjà créé pour About (props: services array), ne pas dupliquer le code.
```

### 4.3 Stats compteurs animés
```
Section stats (3 chiffres : Années d'expérience, Projets réalisés, Clients dans le monde) :
- Compteurs qui s'animent de 0 à la valeur finale au scroll (GSAP + ScrollTrigger, trigger onEnter, duration ~1.5s, ease "power1.out")
- Utiliser un composant StatsCounter.jsx réutilisable, props: { value, suffix, label } (suffix ex: "+", "%")

Contenu : data/content.js → stats: [{ value: 7, suffix: "+", label: "Années d'expérience" }, ...]
```

### 4.4 Portfolio (projets à la une)
```
Section "Portfolio" :
- Titre + sous-titre
- Grille de 4 ProjectCard.jsx (les 4 projets les plus récents depuis data/projects.js)
- CTA "Browse All Projects" → /projects
- Reveal au scroll : fade-in + scale léger, stagger sur les cartes
```

### 4.5 Testimonials
```
Section "What My Clients Say" :
- Slider/carousel de témoignages (nom, rôle, citation)
- Alterné avec 2 blocs stats ("X clients satisfaits — Satisfaction Rate", "Croissance CA clients — Growth")
- Utiliser un slider simple en GSAP (draggable ou boutons prev/next) plutôt qu'une librairie externe, pour cohérence avec le reste du style

Contenu : data/content.js → testimonials: [{ quote, name, role }, ...]
```

### 4.6 FAQ
```
Section "Frequently Asked Questions" :
- Accordéon de 6 questions/réponses
- Animation d'ouverture : height auto via GSAP (ou CSS grid-template-rows trick), rotation de l'icône +/− au clic
- Une seule question ouverte à la fois (ou plusieurs, à confirmer selon comportement voulu)

Composant FaqAccordion.jsx, props: items array [{ question, answer }]
```

### 4.7 Blog preview
```
Section "Design Insights & Ideas" (aperçu blog sur Home) :
- 2 dernières BlogCard.jsx depuis data/blogs.js
- CTA "Browse All Insights" → /blogs
```

### 4.8 Contact (section partagée)
```
Crée ContactSection.jsx (utilisé sur Home ET About, ancre #contact) :
- Titre "Let's work together" + sous-titre
- Formulaire : Nom, Email, Select "Service Needed?" (Branding, Web Design, UI/UX), Textarea message, bouton Submit
- Bloc infos : Email, Téléphone, réseaux sociaux

Envoi du formulaire via WhatsApp (pas de backend) :
- État contrôlé (useState) pour Nom, Email, Service, Message
- Au submit (handleSubmit, avec e.preventDefault()) : construire un message texte formaté à partir des champs, ex :
  `Nouveau contact via le site%0A%0ANom: {nom}%0AEmail: {email}%0AService: {service}%0AMessage: {message}`
  (utiliser encodeURIComponent() sur chaque valeur plutôt que %0A en dur, plus fiable)
- Rediriger vers `https://wa.me/{NUMERO_WHATSAPP}?text={messageEncode}` avec window.open(url, "_blank")
- Le numéro WhatsApp (format international sans le +, ex: 22661155223) doit venir de /src/data/content.js, propriété whatsappNumber, pour être modifiable facilement
- Après le clic, réinitialiser le formulaire (setState vide) et afficher un petit message de confirmation ("Ouverture de WhatsApp...")
- Validation basique : bouton désactivé tant que Nom + Email + Message ne sont pas remplis
- Le bouton Submit doit avoir le texte "Envoyer sur WhatsApp" (ou garder "Submit" selon préférence visuelle, à valider avec le style existant)
```

---

## 5. Page About

*(déjà couverte dans le prompt précédent — Hero "Qui suis-je ?", Services marquee réutilisé, Timeline expérience en marquee/scroll, Tech Stack en grille, galerie photo, Process 5 étapes, Contact réutilisé)*

Ajout : la section Timeline (parcours pro) et Process peuvent aussi être extraites en composants réutilisables (`TimelineMarquee.jsx`, `ProcessSteps.jsx`) avec données dans `content.js`.

---

## 6. Page Projects (liste)

```
Projects.jsx :
- H1 "Featured Projects" + paragraphe d'intro
- Grille de toutes les ProjectCard.jsx (image, catégorie en tag, titre, description courte)
- Bouton "Load More" (pagination simple : afficher 6 par défaut, charger 6 de plus au clic)
- Reveal au scroll en stagger sur les cartes

Chaque ProjectCard est cliquable → /projects/:slug
```

## 7. Page Project Detail

```
ProjectDetail.jsx (route dynamique /projects/:slug) :
- Récupère le projet via useParams + find dans data/projects.js
- H1 titre + tag catégorie
- Description courte
- Bloc meta en grille : Year / Industry / Client / Project Duration
- 4 sections longues : Problem / Solution / Challenge / Summary (chacune avec un H3 titre de section)
- Section "More Projects" en bas : 3 autres projets (aléatoires ou suivants), en grille
- Si slug introuvable → redirect vers /projects
```

## 8. Page Blogs (liste)

```
Blogs.jsx :
- H1 "Design Insights & Ideas" + intro
- Section "Most Viewed" (2-3 articles mis en avant, cartes plus grandes)
- Grille de toutes les BlogCard.jsx (image, tag catégorie, date, titre, résumé)
```

## 9. Page Blog Detail

```
BlogDetail.jsx (route dynamique /blogs/:slug) :
- Récupère l'article via useParams + find dans data/blogs.js
- H1 titre + tag catégorie + date
- Corps de l'article : liste de sections (H2 + paragraphe) depuis blog.sections
- Bloc newsletter "Get monthly inspiration..." avec formulaire email simple
- Section "More to Discover" : 2 articles liés en bas
```

---

## 9bis. Notification WhatsApp (récap technique)

Approche retenue : **lien `wa.me` pré-rempli**, déclenché au clic sur Submit — pas de backend, pas de coût, pas de compte API à créer.

- Format de l'URL : `https://wa.me/<numéro international sans +>?text=<message encodé>`
- Fonctionne sur mobile (ouvre l'app WhatsApp) et desktop (ouvre WhatsApp Web ou l'app si installée)
- Limite à connaître : c'est le **visiteur** qui envoie le message final depuis son propre WhatsApp — ce n'est pas un envoi automatique invisible. Il faut donc que le CTA soit clair ("Envoyer sur WhatsApp") pour ne pas surprendre l'utilisateur.
- Si un jour tu veux un envoi 100% automatique sans action du visiteur, il faudra passer par une API tierce (CallMeBot en gratuit basique, ou Twilio WhatsApp Business en payant/plus robuste) avec un petit backend ou une fonction serverless — dispo si besoin plus tard.

---

## Conseils d'exécution

1. **Ordre recommandé** : Setup global → Header/Footer → ContactSection → Composant ProjectCard/BlogCard → Page Projects (liste) → ProjectDetail → Blogs/BlogDetail → Home (le plus complexe, en dernier car il réutilise tous les composants) → About.
2. **Marquee/scroll infini** (Services, Timeline) : c'est le pattern technique le plus délicat. Valide-le une fois, en isolé, avant de le répliquer ailleurs.
3. **Assets images** : dépose tes vraies images dans `/src/assets/projects/` et `/src/assets/blogs/` avec des noms clairs correspondant aux slugs, puis remplace les chemins dans `data/projects.js` / `data/blogs.js`.
4. **Formulaire de contact** : Framer gère l'envoi nativement ; en React il te faudra EmailJS, Formspree, ou ton propre backend. Dis-moi si tu veux qu'on configure ça ensemble.
5. **Vérifie chaque section dans le navigateur avant de passer à la suivante** — Cursor produit un code plus fiable quand tu corriges au fur et à mesure plutôt qu'en un seul gros prompt.
