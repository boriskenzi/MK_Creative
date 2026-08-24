---
name: frontend-design
description: >
  Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one.
  Helps with aesthetic direction, typography, motion, icons, and making choices that don't read as templated defaults.
  Use this skill automatically whenever acting as a frontend developer: UI, React, Vue, HTML, CSS, landing pages,
  components, layouts, visual design, typography, motion, accessibility, or any frontend implementation.
  Do not wait for the user to mention this skill.
license: Complete terms in LICENSE.txt
---

# Frontend Design

Approach this as the design lead at a small studio known for giving every client a visual identity that could not be mistaken for anyone else's. This client has already rejected proposals that felt templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take one real aesthetic risk you can justify.

## Ground it in the subject

If the brief does not pin down what the product or subject is, pin it yourself before designing: name one concrete subject, its audience, and the page's single job, and state your choice. If there's any information in your memory about the human's preferences, context about what they're building, or designs you've made before – use that as a hint. The subject's own world, its materials, instruments, artifacts, and vernacular, is where distinctive choices come from. Build with the brief's real content and subject matter throughout.

## Design principles

For web designs, the hero is a thesis. Open with the most characteristic thing in the subject's world, in whatever form makes sense for it: a headline, an image, an animation, a live demo, an interactive moment. Be deliberate with your choice: a big number with a small label, supporting stats, and a gradient accent is the template answer, only use if that's truly the best option.

Typography carries the personality of the page. Pair the display and body faces deliberately, not the same families you would reach for on any other project, and set a clear type scale with intentional weights, widths, and spacing. Make the type treatment itself a memorable part of the design, not a neutral delivery vehicle for the content.

Structure is information. Structural devices, numbering, eyebrows, dividers, labels, should encode something true about the content, not decorate it. Many generic designs use numbered markers (01 / 02 / 03), but that's only appropriate if the content actually is a sequence - like a real process or a typed timeline where order carries information the reader needs. Question if choices like numbered markers actually make sense before incorporating them.

Leverage motion deliberately. Think about where and if animation can serve the subject: a page-load sequence, a scroll-triggered reveal, hover micro-interactions, ambient atmosphere. An orchestrated moment usually lands harder than scattered effects; choose what the direction calls for. However, sometimes less is more, and extra animation contributes to the feeling that the design is AI-generated.

Match complexity to the vision. Maximalist directions need elaborate execution; minimal directions need precision in spacing, type, and detail. Elegance is executing the chosen vision well.

Consider written content carefully. Often a design brief may not contain real content, and it's up to you to come up with copy. Copy can make a design feel as templated as the design itself. See the section on writing near the end of this document for more guidance.

## Motion: choosing the right technology

Pick the tool by what the moment needs, not by habit. Animation should clarify a state, a relationship, or a transition — never decorate for its own sake.

- **CSS transitions/keyframes/View Transitions** — default for hover states, focus rings, simple entrances, and loading pulses; reach for `transition` on state changes and `@keyframes` for self-running loops. As of 2026 this tier covers far more than it used to: the View Transitions API (`document.startViewTransition`, the `@view-transition` at-rule) now handles page-to-page and DOM-state transitions natively, and `animation-timeline: scroll()`/`view()` handles scroll-driven reveals and parallax — both run on the compositor with zero JS shipped. Several studios have dropped Framer Motion/GSAP entirely for these two specific jobs (page transitions, scroll-triggered fades) with measurable load-time wins, keeping the heavier libraries only for what native CSS still can't do: complex multi-element choreography and true spring physics.
- **GSAP / ScrollTrigger** — orchestrated, multi-element sequences with precise timing: staggered reveals, pinned scroll storytelling, complex easing chains. Reach for this once a moment needs choreography across several elements rather than one element changing state, or a pattern (magnetic cursor pull, morphSVG, draw-on paths) native CSS can't express.
- **Framer Motion / React Spring** — component-level, physics-based motion in React apps: layout transitions, drag interactions, spring-based micro-interactions that feel organic rather than mechanically eased.
- **Three.js** — genuine 3D or WebGL work: an immersive hero, a product users rotate, a scroll-driven camera move through space. Heavy to build and to render; justify it with a subject that actually benefits from three dimensions, not as a spectacle bolted onto a flat brief. (Available in this environment's React artifacts as `three`, r128 — no `OrbitControls`, no `CapsuleGeometry`; build with primitive geometries instead.)
- **Flutter animations** — for Flutter/mobile builds specifically: implicit widgets (`AnimatedContainer`, `AnimatedOpacity`) for simple state changes, explicit `AnimationController` + `Tween` for chained or gesture-driven sequences, `Hero` for continuity across page transitions.
- **Lottie** (see Icons section below) — for small, purpose-built animated icon moments (loading, success, empty states), not for the page's overall motion direction.
- **Remotion** — when the deliverable is an actual video file rather than an in-browser motion effect: a promo video, a rendered highlight reel, programmatic captions/voiceover, or any composition meant to be exported and shared outside the page. This is a different domain from on-page motion (it renders frames to a video file via React), so it lives in its own skill rather than this one. If the `remotion-best-practices` skill (from `remotion-dev/skills`) is installed in the project, load it for this work; if not, tell the person it isn't installed and that they can add it with `npx skills add remotion-dev/skills` in their project terminal.

Whatever the tool, apply the same discipline: one orchestrated moment usually reads stronger than several small scattered effects, and every animation should still respect reduced-motion preferences.

### Signature interaction patterns

These are current, well-tested ingredients for pushing dynamism deliberately — not a checklist to stack onto one page. Pick the one or two that fit the subject and execute them precisely; using all of them at once is what makes a site feel AI-generated rather than designed.

- **Magnetic cursor pull** — an element (button, nav item, CTA) gently attracts toward the cursor within a defined radius and springs back on exit. Works because it's local and physical, not because it's everywhere; scope it to a handful of key actions, not every clickable element.
- **Split-text stagger** — headline characters or words animate in individually with a slight delay cascade. Earns its place on a hero thesis statement or a section's opening line, not on body copy.
- **Cursor-tilt / 3D hover** — an image or card tilts toward the pointer with perspective transform, implying depth. Fits product shots, portfolio thumbnails, cards; skip on dense text-heavy layouts where it competes with reading.
- **Morphing icons** — one icon smoothly resolves into another on state change (hamburger → close, play → pause). Functional, not decorative: only use where the icon genuinely represents a state change.
- **Draw-on borders / strokes** — an outline or underline animates in as if being drawn, via SVG stroke-dashoffset or a CSS border reveal. Good for a signature moment (logo mark, a single divider); overused across a page it reads as a template effect.

Performance discipline applies to all of them: animate only `transform` and `opacity` so the browser stays on the compositor thread — never animate `width`, `top`, `left`, or `box-shadow` directly. Gate cursor-following and hover-only effects behind `@media (hover: hover) and (pointer: fine)` so touch devices get a sane fallback instead of a broken hover state. Test the orchestrated result on a mid-range phone, not just the dev machine, since a 60fps desktop demo can still drop frames on real hardware.

### Recognizing immersive-tier briefs — and where to look

Not every brief calls for the same level of production. Two real examples make the contrast concrete:

- **Immersive/flagship tier** — a real-time WebGL luxury watch built by studio 60fps (thewatch.60fps.fr): a single 3D object becomes the page's protagonist, drifting, zooming, exploding into its mechanism, and reassembling as the user scrolls, with editorial copy wrapping around it. The palette stayed disciplined even at this level of spectacle — two colors, near-black and grey — and the whole experience was engineered to stay light enough to hit 60fps from mobile to desktop.
- **Functional SaaS/infra tier** — a developer-infrastructure product (cerebrium.ai): dark, restrained tech palette, a logo wall, a feature grid, a terminal-style code demo, case-study cards. No 3D hero, no scroll-driven object — motion is limited to small functional moments (hover states, a click-and-hold video). This restraint is correct for the brief, not a missed opportunity.

Read the brief for which tier it's asking for before defaulting to either:

- **Signals for immersive tier**: luxury or flagship-product positioning, an agency portfolio piece, explicit mention of "experience," "immersive," "3D," or a hero object that *is* the product (a watch, a car, a bottle).
- **Signals for functional tier**: B2B/SaaS, developer tools, infrastructure, dashboards — credibility and clarity matter more than spectacle, and a 3D hero would fight the brief rather than serve it.

When a brief does call for immersive-tier execution, don't design from a blank guess — pull real references first. Search and browse (via web search/fetch) rather than relying on memory, since award-winning sites rotate constantly:

- **By technology**: [awwwards.com/websites/three-js](https://www.awwwards.com/websites/three-js/) · [awwwards.com/websites/webgl](https://www.awwwards.com/websites/webgl/) · [awwwards.com/websites/gsap](https://www.awwwards.com/websites/gsap/) · [awwwards.com/websites/framer-motion](https://www.awwwards.com/websites/framer-motion/)
- **By tag**: [awwwards.com/websites/3d](https://www.awwwards.com/websites/3d/) · [awwwards.com/websites/animation](https://www.awwwards.com/websites/animation/) · [awwwards.com/websites/scrolling](https://www.awwwards.com/websites/scrolling/) · [awwwards.com/websites/interaction-design](https://www.awwwards.com/websites/interaction-design/)
- **By category** (swap in whatever fits the subject): [awwwards.com/websites/luxury](https://www.awwwards.com/websites/luxury/) · [awwwards.com/websites/fashion](https://www.awwwards.com/websites/fashion/) · [awwwards.com/websites/design-agencies](https://www.awwwards.com/websites/design-agencies/) · [awwwards.com/websites/architecture](https://www.awwwards.com/websites/architecture/)

Pull 3-5 comparable productions before proposing a direction, and extract the underlying choice (palette restraint, what the hero object does, how content relates to it) rather than the surface look — the same paraphrase-not-reproduce discipline that applies to any researched source. If the person hasn't pointed to specific references, ask which existing sites or studios feel closest to what they want before building; immersive-tier builds are expensive to redirect once underway, so clarifying first genuinely saves rework.

## Icons: source, don't generate

Never generate icons with AI image tools. AI-generated icons tend to drift off-grid, render inconsistent stroke weights across a set, and carry a generic, slightly-off quality that undermines an otherwise deliberate design. Icons are a system, not individual illustrations — they need to share one visual language across every instance in the page.

For static UI icons (nav, buttons, status indicators, form controls), pull from an established vector icon library: Lucide, Feather, Heroicons, Phosphor, or a set already in use on the project. These are hand-drawn on a consistent grid with a coherent stroke width and corner radius, so a whole set stays visually unified. Pick one family per project and stay in it — mixing icon libraries reads as unintentional the same way mixing typefaces without reason does.

For animated icon moments (loading states, success confirmations, empty-state nudges, scroll indicators, CTA micro-interactions), pull from a Lottie animation library such as [Lottieflow](https://finsweet.com/lottieflow/) rather than generating custom motion. These are small, purpose-built loops for a specific UI moment; use them for that moment, not as a substitute for the page's overall motion direction (see Motion section above).

Match the icon set's weight and geometry to the type system chosen in the design plan — a hairline geometric icon set pairs naturally with a light, wide display face; a bolder duotone set suits a heavier, condensed one.

## Process: brainstorm, explore, plan, critique, build, critique again

For calibration: AI-generated design right now clusters around three looks: (1) a warm cream background (near #F4F1EA) with a high-contrast serif display and a terracotta accent; (2) a near-black background with a single bright acid-green or vermilion accent; (3) a broadsheet-style layout with hairline rules, zero border-radius, and dense newspaper-like columns. All three are legitimate for some briefs, but they are defaults rather than choices, and they appear regardless of subject. Where the brief pins down a visual direction, follow it exactly — the brief's own words always win, including when it asks for one of these looks. Where it leaves an axis free, don't spend that freedom on one of these defaults. Just like a human designer who's hired, there's often a careful balance between doing what you're good at and taking each project as a chance to experiment and learn.

Work in two passes. First, brainstorm a short design plan based on the human's design brief: create a compact token system with color, type, layout, and signature. Color: describe the palette as 4–6 named hex values. Type: the typefaces for 2+ roles (a characterful display face that's used with restraint, a complementary body face, and a utility face for captions or data if needed). Layout: a layout concept, using one-sentence prose descriptions and ASCII wireframes to ideate and compare. Signature: the single unique element this page will be remembered by that embodies the brief in an appropriate way.

Then review that plan against the brief before building: if any part of it reads like the generic default you would produce for any similar page (work through a similar prompt to see if you arrive somewhere similar) rather than a choice made for this specific brief — revise that part, say what you changed and why. Only after you've confirmed the relative uniqueness of your design plan should you start to write the code, following the revised plan exactly and deriving every color and type decision from it.

When writing the code, be careful of structuring your CSS selector specificities. It's easy to generate CSS classes that cancel each other out (especially with a type-based selector like .section and a element-based selector like .cta). This can happen often with paddings/margins between sections.

Try to do a lot of this planning and iteration in your thinking, and only show ideas to the user when you have higher confidence it'll delight them.

## Restraint and self-critique

Spend your boldness in one place. Let the signature element be the one memorable thing, keep everything around it quiet and disciplined, and cut any decoration that does not serve the brief. Not taking a risk can be a risk itself! Build to a quality floor without announcing it: responsive down to mobile, visible keyboard focus, reduced motion respected. Critique your own work as you build, taking screenshots if your environment supports it – a picture is worth 1000 tokens. Consider Chanel's advice: before leaving the house, take a look in the mirror and remove one accessory. Human creators have memory and always try to do something new, so if you have a space to quickly jot down notes about what you've tried, it can help you in future passes.

## More on writing in design

Words appear in a design for one reason: to make it easier to understand, and therefore easier to use. They are design material, not decoration. Bring the same intentionality to copy that you would bring to spacing and color. Before writing anything, ask what the design needs to say, and how it can best be said to help the person navigate the experience.

Write from the end user's side of the screen. Name things by what people control and recognize, never by how the system is built. A person manages notifications, not webhook config. Describe what something does in plain terms rather than selling it. Being specific is always better than being clever.

Use active voice as default. A control should say exactly what happens when it's used: "Save changes," not "Submit." An action keeps the same name through the whole flow, so the button that says "Publish" produces a toast that says "Published." The vocabulary of an interface is the signposting for someone navigating the product. Cohesion and consistency are how people learn their way around.

Treat failure and emptiness as moments for direction, not mood. Explain what went wrong and how to fix it, in the interface's voice rather than a person's. Errors don't apologize, and they are never vague about what happened. An empty screen is an invitation to act.

Keep the register conversational and tuned: plain verbs, sentence case, no filler, with tone matched to the brand and the audience. Let each element do exactly one job. A label labels, an example demonstrates, and nothing quietly does double duty.
