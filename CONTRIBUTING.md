# Contributing to MiniLink

First off, thanks for taking the time to contribute! 

## How Can I Contribute?

### Reporting Bugs

- Check if the bug has already been reported in [Issues](https://github.com/yourusername/minilink/issues)
- If not, create a new issue with:
  - Clear title and description
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshots if applicable

### Suggesting Features

- Open an issue with the `enhancement` label
- Describe the feature and its use case
- Explain why it would be valuable

### Pull Requests

1. **Fork** the repo and create your branch from `main`
2. **Install** dependencies: `npm install`
3. **Run** the development server: `npm run dev`
4. **Make** your changes
5. **Test** your changes thoroughly
6. **Lint** your code: `npm run lint`
7. **Commit** with a descriptive message
8. **Push** to your fork and submit a PR

## Development Setup

```bash
# Clone your fork
git clone https://github.com/TuShArBhArDwA/MiniLink.git
cd MiniLink

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Set up database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

## Code Style

- Use TypeScript
- Follow the existing code patterns
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused

## Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Reference issues when applicable

Examples:
- `feat: add dark mode support`
- `fix: resolve login redirect issue`
- `docs: update README installation steps`

## Questions?

Feel free to open an issue with the `question` label!


---

## Sponsor

If you find this helpful, consider supporting me:

- **Sponsor Me:** [Buy Me a Coffee!](https://github.com/sponsors/TuShArBhArDwA)


---

## Connect with me

If you’d like to connect, feel free to reach out — [Click here](https://linktr.ee/codewithtusharbhardwaj)
