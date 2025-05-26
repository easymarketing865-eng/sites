notsoeasy/SECTION.md#L1-34
# Creating a New Section with Astro

This guide explains how to create a new "section" in the project using [Astro](https://astro.build/). Sections are modular, reusable content or layout pieces composing pages in the site.

---

## Steps to Generate a New Section

> **Note:** When copying ready-made sections from Figma or template resources (like HTML or React examples), make sure to convert any Tailwind CSS or other utility classes into inline `<style>` CSS, CSS Modules, or scoped styles directly within your `.astro` file. Astro does not interpret Tailwind classes natively unless your project is configured for it. Always ensure your new sections use compatible, maintainable styles.

1. **Navigate to the Sections Directory**  
   All sections are located in `notsoeasy/sections/`. Place your new section here.

2. **Create a New Astro File**  
   Name your file descriptively in `PascalCase`. Example:  
   `HeroSection.astro`  
   `FeatureGrid.astro`

3. **Basic Section Structure**
   Each `.astro` file will typically contain:
   - Frontmatter for imports, props, logic
   - HTML/JSX for markup and expressions
   - Optional slot(s) for content or nested components

   Example Skeleton:
   ```notsoeasy/sections/ExampleSection.astro#L1-9
   ---
   export interface Props {
     title: string;
   }
   const { title } = Astro.props;
   ---
   <section>
     <h2>{title}</h2>
     <!-- Your content here -->
   </section>
   ```

4. **Export Props (if Needed)**
   Define your props in the frontmatter for type safety and configurability.

5. **Styling**
   - Use scoped styles within your `.astro` using `<style>` tags.
   - Prefer Tailwind CSS utility classes if your project has it enabled, or standard CSS Modules.

6. **Usage Example**
   To use the section in a page or another component:

   - **To add to [`index.astro`](src/pages/index.astro):**

     1. At the top, add an import for your section:
        ```notsoeasy/src/pages/index.astro#L1
        import ExampleSection from "../sections/ExampleSection.astro";
        ```

     2. Insert your section’s component in the desired spot inside the `<main>`:
        ```notsoeasy/src/pages/index.astro#L42
        <ExampleSection title="Welcome!" />
        ```

   - **In any other component or page:**
     ```notsoeasy/pages/anyPage.astro#L1
     import ExampleSection from '../sections/ExampleSection.astro';
     ...
     <ExampleSection title="Welcome!" />
     ```

---

## Tips for New Sections

- **Keep components modular:** Only include logic and markup related to that section.
- **Add documentation:** Use code comments for any non-obvious logic or design decisions.
- **Test in isolation** before integrating with larger pages.
- **Consider slots** or advanced props for highly reusable sections.

For more, consult the [Astro documentation](https://docs.astro.build/).