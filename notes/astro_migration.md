# Astro Migration Guide: Moving From Deno Fresh to Astro

This step-by-step guide helps you migrate your creative agency website from Deno Fresh to Astro. It leverages your brand’s mobile-first, editorial design principles, and ensures the migration aligns with best practices outlined in your [landing plan](notsoeasy/notes/landing_plan.md) and [visual style guide](notsoeasy/notes/visual_style.md).

---

## 1. Preparation & Planning

- **Inventory Your Codebase:**  
  - List all pages, components, layouts, static assets, and utilities in your Deno Fresh project.
  - Note uses of Deno APIs and Fresh-specific features.
- **Review Visual & UX Requirements:**  
  - Revisit the landing plan to define your page structure and flow.
  - Confirm fonts, color palette, and layout conventions from the visual style guide.
- **Set Migration Goals:**  
  - Mobile-first UI, performance, SEO, maintainability, and future scalability.
  - Eliminate Deno/Fresh-specific dependencies to achieve maximum portability.

---

## 2. Set Up the Astro Project

- **Create a New Astro Project:**
  - Run: `npm create astro@latest` or `pnpm create astro@latest`
  - Choose "Minimal" starter template for a clean slate.
- **Organize Directory Structure:**  
  - Mirror the page and component structure from your Deno Fresh project.
  - Create directories for:
    - `src/pages`
    - `src/components`
    - `src/layouts`
    - `public/assets` (for images, fonts, etc.)
- **Install Dependencies:**
  - Add any UI libraries (e.g., Tailwind CSS, FontSource), and script/font loaders needed for your brand visuals.
  - Example:  
    - `npm install tailwindcss @fontsource/your-font-family`

---

## 3. Port Layouts & Shared Components

- **Migrate _app and root layouts to Astro Layouts:**  
  - Create reusable layout components in `src/layouts` for header, footer, etc.
  - Move branding elements (logo, nav) per visual guidelines.
- **Convert Fresh Components to Astro Components:**
  - Rename `.tsx` or `.jsx` components to `.astro` or `.tsx` as appropriate.
  - Replace Fresh islands with Astro islands (`client:load`, `client:visible`, etc.) for interactivity.
  - Translate all inline styles, CSS modules, or utility classes with your preferred styling approach (e.g., Tailwind).

---

## 4. Port (and Reorder) Pages & Routes

- **Recreate the Route Structure in `src/pages`:**
  - Home/Landing page: `src/pages/index.astro`
  - Additional sections as outlined in landing plan (Service cards, Showreel, Brands, Segments, etc.)
- **Map Route Order to New UX Flow:**
  - Ensure the content matches the [Landing Page Structure](notsoeasy/notes/landing_plan.md)  
    (Hero → Services → Showreel → Trusted Brands → Target Segments → Optionals → Contact/Footer)
- **Copy and Refactor Page Content:**
  - Remove Deno-specific code (Fresh handlers, APIs).
  - Switch data loading/props to Astro conventions using frontmatter and Astro's data API.

---

## 5. Update Static Assets & Fonts

- **Images:**
  - Move images (`photos/headshot.webp` and others) to `public/assets`.
  - Update references in components/pages.
- **Fonts:**
  - Add required font files or CDN links for:
    - Bold uppercase sans-serif (for headlines, e.g., via `@fontsource`)
    - Handwritten script font (for accents)
- **Icons:**
  - Import/convert icons to SVG or use an icon library compatible with Astro.

---

## 6. Styling & Theming

- **Implement the Visual Style Guide:**
  - Set global styles for color palette in `src/styles/global.css` (or Tailwind config).
  - Define typography rules, utility classes, and grid system per [visual_style.md](notsoeasy/notes/visual_style.md).
- **Responsive & Mobile-First Enhancements:**
  - Test all sections at mobile widths first.
  - Add touch/swipe support for carousels where required.
- **Apply Editorial Effects:**  
  - Integrate handwritten font accents using appropriate tags/utility classes.
  - Use grid/collage layouts for images as noted in the landing plan.

---

## 7. Add Interactivity & Enhancements

- **Replace Fresh's Islands with Astro Islands:**
  - Use partial hydration (`client:*` directives) for interactive widgets, e.g., carousels or video overlays.
- **Migrate/Rewrite API Calls:**
  - Move any dynamic data fetching (if needed) to Astro endpoints or use static site generation where possible for performance.
- **SEO & Metadata:**
  - Add `<head>` tags: Meta descriptions, Open Graph tags, favicon.
  - Configure Astro’s `astro.config.mjs` for sitemap generation and SEO plugins.

---

## 8. Test, Optimize, and Refine

- **Visual Review:**
  - Compare each section/page with the reference guides for fidelity.
  - Review mobile, tablet, and desktop breakpoints.
- **Performance Checks:**
  - Audit with Lighthouse or Astro's built-in tools.
  - Ensure images are optimized and critical CSS is loaded first.
- **Accessibility:**
  - Use semantic HTML elements and ARIA labels for nav, forms, and video controls.
- **Functional Testing:**
  - Make sure all forms, links, and CTA buttons work as intended.

---

## 9. Go Live & Further Steps

- **Deploy to Hosting:**
  - Choose hosting based on output (Static: Vercel, Netlify, etc. / SSR: Astro SSR-compatible hosts).
- **Configure Redirects and Domain:**
  - Update DNS or hosting config for your production domain.
- **SEO, Social, and Analytics:**
  - Submit sitemap to search engines.
  - Set up social links and tracking integrations.
- **Iterate & Expand:**
  - Use feedback from users and stakeholders to refine design/content.
  - Add more projects, testimonials, and visual polish over time.

---

## Reference

- [Landing Page & Marketing Blueprint](notsoeasy/notes/landing_plan.md)
- [Visual Style Guide](notsoeasy/notes/visual_style.md)
- [Astro Documentation](https://docs.astro.build/)

---

**By following these steps, you ensure a smooth, high-impact migration that maintains your creative, editorial identity while taking full advantage of Astro’s performance and flexibility.**