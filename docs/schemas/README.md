# Schema Maintenance

This directory contains YAML schema definitions that are used to generate schema documentation pages.

## How It Works

1. **YAML Schema Files** (`*.yml`) - Single source of truth for data schemas
2. **TypeScript Schema Files** (`src/schemas/*.ts`) - Generated from YAML for use in React components
3. **MDX Documentation Pages** - Import and render schemas using the `SchemaTable` component

## Adding a New Schema

### 1. Create YAML Schema File

Create a new YAML file in `docs/schemas/` with the following structure:

```yaml
table_name:
  name: Display Name
  description: Table description
  location: Optional S3 or database location
  fields:
    - name: field_name
      type: string|int|boolean|array
      required: true|false
      description: Field description
```

### 2. Generate TypeScript Schema

Convert the YAML to a TypeScript file in `src/schemas/`:

```typescript
export const schemaName = {
  table_name: {
    name: "Display Name",
    description: "Table description",
    location: "s3://...",
    fields: [
      { name: "field_name", type: "string", required: true, description: "..." },
      // ...
    ]
  },
  // ...
};
```

### 3. Create MDX Documentation Page

Create a new `.mdx` file in the appropriate docs directory:

```mdx
---
sidebar_position: 4
---

import SchemaTable from '@site/src/components/SchemaTable';
import { schemaName } from '@site/src/schemas/schemaName';

# Schema Name

Description...

## Table Section

<SchemaTable schema={schemaName.table_name} />
```

## Updating an Existing Schema

1. Edit the YAML file in `docs/schemas/`
2. Regenerate the TypeScript file in `src/schemas/`
3. The MDX page will automatically reflect the changes

## Example: Sailthru

- YAML: `docs/schemas/sailthru.yml`
- TypeScript: `src/schemas/sailthru.ts`
- Documentation: `docs/Data Delivery/Sailthru Schema.mdx`
- Referenced from: `docs/Data Delivery/Feedback.md`

## Future Improvements

Consider automating the YAML → TypeScript conversion with a build script.
