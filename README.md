# StudySync AI

## Groq AI Mentor

The AI Mentor uses Groq through the local Node API server. Create a `.env.local` file in the project root:

```env
GROQ_API_KEY=your_new_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

Start both processes in separate terminals:

```bash
npm run api
npm run dev
```

Restart the API server after changing the key. Live Groq mode is enabled by default; set `VITE_GROQ_ENABLED=false` only when you want the included mock responses.

For production, proxy Groq requests through a server-side endpoint so the API key is never exposed in browser code.

## Development

```bash
npm install
npm run dev
```

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
