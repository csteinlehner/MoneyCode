# Development Strategy

Guidelines for developing TransferSnap — a static single-file PWA.

---

## 1. Branching Model

**Trunk-based development with short-lived feature branches:**

- `main` is always deployable — never commit directly to it
- Every change goes through a `feature/*` branch
- Merge via Pull Request, then delete the branch
- Branch naming: `feature/short-description`

---

## 2. Tidy First? (Kent Beck)

Before implementing a feature or fixing a bug, ask: *"Would a small structural cleanup make this change easier?"*

- Tidyings are small, behavior-preserving structural changes (extract helper, remove dead code, normalize naming)
- Always in a **separate commit** (`tidy: ...`) before the behavior change (`feat: ...` / `fix: ...`)
- Skip tidying if it takes longer than the actual change

---

## 3. Commit Discipline

**Commit after every logical step** — not everything at the end.

### Commit Types

- `feat:` — New functionality
- `fix:` — Bug fix
- `tidy:` — Structural change without behavior change
- `docs:` — Documentation
- `chore:` — Config, build, dependencies

### Rules

- `tidy:` and `feat:`/`fix:` are always **separate commits**
- Commit messages: imperative, max 50 chars, optional body for "why"

---

## 4. PR Workflow

1. Create feature branch from `main`
2. Develop, commit frequently
3. Push branch, create PR (`gh pr create`)
4. Test the change manually in the browser
5. Merge via GitHub, delete branch
6. Verify deployment on transfersnap.com

---

## 5. Code Rules

- All code lives in `index.html` (HTML + CSS + JS) — keep it that way unless complexity demands splitting
- No external dependencies beyond `qrcode.min.js`
- Validate user input at form boundaries
- When adding/removing files, update the `FILES` array in `sw.js` and bump the cache version
