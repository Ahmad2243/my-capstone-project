# My Capstone Project - AI Assistant Guidelines

## Project Context
This is a capstone software project focused on [Briefly state your project's goal, e.g., "a responsive web dashboard"].

## Tech Stack
- Frontend: HTML5, CSS3, JavaScript (ES6+)
- Runtime: Node.js (LTS)

## Development Commands
- Build: `npm run build` (when applicable)
- Run/Start: `node index.js` (when applicable)

## Coding Conventions & Styles
- **Code Style:** Use clean, modular, and modern JavaScript. Define helper functions clearly.
- **Naming Conventions:** camelCase for variables and functions, PascalCase for classes.
- **Commit Messages:** Follow the Conventional Commits 1.0.0 standard explicitly.
- **Error Handling:** Always wrap asynchronous operations in try/catch blocks and log helpful errors.
<<<<<<< HEAD

## Project Rules
1. **Form Handling:** Always use `react-hook-form` and `zod` for forms—never use manual `useState` or uncontrolled inputs.
2. **Accessibility:** Always link input fields to error messages using `aria-describedby` and `<label htmlFor="...">`.
3. **Verification:** Always write and run unit tests (`.test.tsx`) for form components before finalizing code.
=======
## AI Collaboration & Prompting Rules Learned

1. **Explicit Requirements Over Vague Requests:** Always provide component state specs, validation constraints, and file references up front to prevent missing feature logic and extra refactoring cycles.
2. **Accessible Form Architecture:** Ensure all interactive elements include explicit accessibility properties (e.g., proper `label` pairings, `aria-invalid` flags, and high-contrast focus states).
3. **Mandatory Test-Driven Verification:** Require written unit tests alongside component logic for edge cases (e.g., invalid email formats, boundary lengths) before considering a feature ready for review.
>>>>>>> d33511f8269c8315460396f84f65e044134ec0aa
