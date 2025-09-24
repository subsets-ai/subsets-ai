# Subsets Documentation Site

This repository contains the documentation website for Subsets, built with Docusaurus 3.7.0.

## Project Overview

**Subsets** is an AI-driven retention experimentation and automation platform for subscription businesses. This documentation site explains how businesses can:
1. Connect their data to Subsets via various data connections
2. Deliver data samples following specified formats
3. Integrate with marketing automation tools to receive AI-driven retention automations

## Technology Stack

- **Framework**: Docusaurus 3.7.0 (React-based static site generator)
- **Language**: TypeScript
- **Package Manager**: Yarn
- **Node Version**: >=18.0
- **Styling**: Custom CSS with Docusaurus theming

## Development Commands

```bash
# Install dependencies
yarn

# Start development server (with hot reload)
yarn start

# Build for production
yarn build

# Serve production build locally
yarn serve

# Type checking
yarn typecheck

# Clear Docusaurus cache
yarn clear
```

## Project Structure

```
├── docs/                     # Documentation content (Markdown files)
│   ├── overview.md          # Main overview page (routes to /)
│   ├── Data Connections/    # Data integration methods
│   ├── Data Delivery/       # Data format specifications
│   └── Integrations/        # Marketing automation integrations
├── src/
│   └── css/
│       └── custom.css       # Custom styling
├── docusaurus.config.ts     # Main Docusaurus configuration
├── sidebars.ts             # Sidebar navigation structure
└── package.json            # Dependencies and scripts
```

## Key Configuration

- **Site URL**: https://docs.subsets.com
- **Base Path**: `/` (docs serve as root)
- **Organization**: subsets-ai
- **Routing**: Docs-only mode (no blog, docs at root path)

## Content Areas

The documentation is organized into three main sections:

### 1. Data Connections (`/data-connections/`)
Methods for connecting external data sources to Subsets platform.

### 2. Data Delivery (`/Data%20Delivery/`)
Specifications and formats for delivering data samples, including behavioral data.

### 3. Integrations (`/integrations/`)
Available marketing automation tool integrations including:
- Braze
- HubSpot
- Iterable
- OneSignal
- Piano
- Responsys
- Sailthru
- BlueConic

## Development Guidelines

### Adding New Documentation
1. Create `.md` files in appropriate `docs/` subdirectories
2. Use frontmatter for sidebar positioning: `sidebar_position: N`
3. Update `sidebars.ts` if adding new sections
4. Follow existing content structure and styling

### Content Standards
- Use clear, concise language for technical integration steps
- Include code examples where applicable
- Maintain consistent formatting across all documentation
- Test all integration instructions

### Deployment
The site uses GitHub Actions for automatic deployment:
- **Trigger**: Push/merge to `main` branch
- **Target**: GitHub Pages (likely)
- **Build**: Automatic via Docusaurus build process

## Troubleshooting

### Common Issues
- **Build Failures**: Run `yarn typecheck` to identify TypeScript issues
- **Broken Links**: Configuration throws on broken links (`onBrokenLinks: 'throw'`)
- **Cache Issues**: Use `yarn clear` to reset Docusaurus cache

### Testing
- Always test documentation changes locally with `yarn start`
- Verify all internal links work correctly
- Check responsive design on different screen sizes
- Validate external integration links

## Contributing

When making changes:
1. Run `yarn typecheck` before committing
2. Test locally with `yarn start`
3. Ensure all links are functional
4. Follow existing documentation patterns and tone
5. Update this CLAUDE.md if adding new sections or changing structure