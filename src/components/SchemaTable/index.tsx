import React from 'react';

interface SchemaField {
  name: string;
  type: string;
  description?: string;
  required?: boolean | string;
}

interface SchemaTable {
  name: string;
  description?: string;
  location?: string;
  fields: SchemaField[];
}

interface SchemaTableProps {
  schema: SchemaTable;
  defaultOpen?: boolean;
}

export default function SchemaTable({ schema, defaultOpen = false }: SchemaTableProps): JSX.Element {
  return (
    <details style={{ marginBottom: '1.5rem' }} open={defaultOpen}>
      <summary style={{
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '1.1em',
        padding: '0.5rem 0',
        userSelect: 'none'
      }}>
        {schema.name}
      </summary>
      <div style={{ marginTop: '1rem' }}>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {schema.fields.map((field) => (
              <tr key={field.name}>
                <td><code>{field.name}</code></td>
                <td>{field.type}</td>
                <td>{field.required === true ? 'Always' : typeof field.required === 'string' ? field.required : 'Optional'}</td>
                <td>{field.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
