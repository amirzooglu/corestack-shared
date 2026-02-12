# Corestack Shared

> Shared Zod validators, schemas, constants, and utility types used by both frontend and backend-api.

## Quick Start

```bash
pnpm install
pnpm build        # Compile TypeScript to dist/
pnpm dev          # Watch mode (tsc --watch)
pnpm lint         # ESLint
```

## Package Info

- **Name**: `corestack-shared`
- **Version**: 0.1.0
- **Runtime dependency**: Zod only
- **Output**: CommonJS (`dist/`)

## Architecture

```
src/
├── constants/                # Enums mirroring Prisma/DB values
│   ├── documentFormatTypes.ts    # ~45 file extensions (pdf, docx, xlsx, etc.)
│   └── templateDataTypes.ts      # 14 field data types (TEXT, DATE, CURRENCY, etc.)
├── schemas/                  # Zod schemas for DB entities (read models)
│   ├── NotesSchema.ts
│   ├── RequestNoteSchema.ts
│   └── RequestsSchema.ts
├── responses/                # API response wrappers
│   └── GetRequestNotesResponse.ts
├── utils/                    # Shared TypeScript utilities
│   └── types.ts                  # ZodReturnType<T>, WithRequired<T, K>
└── validators/               # Zod form validation schemas (write models)
    ├── AddCommentValidator.ts
    ├── AddDocumentValidator.ts
    ├── AddGroupValidator.ts
    ├── AddNoteValidator.ts
    ├── AddPartyValidator.ts
    ├── AddRequestTemplateQuestionaireValidator.ts
    ├── AddRequestTemplateValidator.ts
    ├── AddRequestValidator.ts
    ├── AddRequirementValidator.ts
    ├── AddTaskValidator.ts
    ├── AddTemplateValidator.ts
    ├── AddUserOrganizationValidator.ts
    ├── AddUserRoleValidator.ts
    ├── EditNoteValidator.ts
    ├── EditRequestTemplateQuestionaireValidator.ts
    ├── EditRequestTemplateValidator.ts
    ├── EditRequestValidator.ts
    ├── GetRequestTemplateValidator.ts
    ├── RequestTemplateAnswersValidator.ts
    ├── RequestTemplateQuestionaireAnswerValidator.ts
    ├── RequestTemplateQuestionaireAnswerValuesValidator.ts
    └── SendMessageValidator.ts
```

## Imports

No barrel `index.ts` — import via sub-path exports:

```typescript
import { addRequestValidationSchema } from "corestack-shared/validators/AddRequestValidator";
import { RequestsSchema } from "corestack-shared/schemas/RequestsSchema";
import { DocumentFormatTypeEnum } from "corestack-shared/constants/documentFormatTypes";
import { ZodReturnType } from "corestack-shared/utils/types";
```

## Design Patterns

| Category | Convention | Description |
|----------|-----------|-------------|
| **Schemas** (`schemas/`) | Read models | Zod schemas representing DB entity shapes for API responses |
| **Validators** (`validators/`) | Write models | Zod schemas for form/API input validation with rules (min length, required, etc.) |
| **Constants** (`constants/`) | Prisma enum mirrors | TypeScript enums kept in sync with Prisma schema enums |
| **Add/Edit pairs** | Validator pattern | Most entities have `Add*Validator` + `Edit*Validator` (Edit requires `id`) |

## Utility Types

From `src/utils/types.ts`:

- **`ZodReturnType<T>`** — Infers TypeScript type from a Zod schema or schema-factory function
- **`WithRequired<T, K>`** — Makes selected keys required on a type

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `zod` | ^3.23.8 | Schema validation (sole runtime dep) |
| `typescript` | ^5.0.0 | Compilation |
| `eslint` | ^8.0.0 | Linting |
