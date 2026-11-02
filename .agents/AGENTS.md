# Shared agent instructions — Aroma-Spices

These instructions are shared by Codex, AGY, OpenCode, and other compatible agents.

## Working agreements

- Answer the requested question or task directly and avoid unrelated features or cleanup.
- Distinguish known facts, inferences, assumptions, and hypotheses.
- Preserve existing architecture and external contracts.
- Use Pascal-Kebab-Case directories, PascalCase files, camelCase functions and variables, and PascalCase types unless tooling, APIs, schemas, or language conventions require otherwise.
- Plan before large, multi-file, architectural, or risky changes; execute small clear changes directly.
- Run relevant tests, builds, linters, formatters, and type checks after implementation.
- Documentation follows successful verification.
- Never expose credentials, tokens, or private configuration.
- Local commits are permitted; pull, push, published merges, and destructive Git operations require explicit approval.

## Project memory

- This is a completed production Vue/Vite frontend and Node/Express/MongoDB backend; treat changes as maintenance unless development is explicitly reopened.
- Preserve the Ocean & Sand design tokens in `Frontend/Src/Style.css`; use CSS variables rather than hardcoded colors.
- Never rename `Frontend/Public/*.png` spice images without a coordinated production MongoDB update.
- Preserve the Resend HTTPS email path, explicit MongoDB database name `aroma-spices`, and async Mongoose hook conventions.
- Verify relevant work with the Backend ESLint gate and Frontend sitemap/build gate.
