# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Strapi v5.26.0 headless CMS for a multi-language blog with GraphQL API. Uses MySQL as primary database with Cloudinary for media storage.

## Commands

```bash
npm run dev          # Start development server with hot reload
npm run start        # Start production server
npm run build        # Build admin panel for production

# Data management scripts
node scripts/seed.js                    # Seed sample data
node scripts/seed-comprehensive.js      # Full dataset seeding
node scripts/clear-all-data.js          # Clear all data
node scripts/check-existing-data.js     # Check data status
```

## Architecture

### Content Types (src/api/)

- **Post** - Blog posts with i18n, draft/publish workflow, blocks content (content_first, content_sec), category relation, tags relation
- **Category** - Hierarchical categories (self-referencing parent/child), i18n enabled
- **Tag** - Tags with many-to-many post relation, i18n enabled
- **Subscriber** - Newsletter subscriptions (public create allowed, no i18n)
- **Contact** - Contact form submissions (public create allowed, no i18n)

### GraphQL Extensions (src/index.js)

Custom `Creator` type exposes `createdBy` field on Post with id, firstname, lastname. The bootstrap function auto-configures public permissions:
- Read access (find/findOne): Post, Category, Tag
- Create access: Subscriber, Contact

### Database Configuration (config/database.js)

Supports MySQL (default), PostgreSQL, and SQLite. Configure via environment variables:
- `DATABASE_CLIENT` - mysql/postgres/sqlite
- `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`
- `DATABASE_USERNAME`, `DATABASE_PASSWORD`

### Key Patterns

- Content types use Strapi's i18n plugin for multi-language support
- Slugs follow pattern `^[a-z0-9]+(?:-[a-z0-9]+)*$`
- Blocks type used for rich content fields (content_first, content_sec)
- Media stored on Cloudinary (configured in config/plugins.js)
- API defaults: limit 25, maxLimit 100 (config/api.js)

### Environment Variables

Copy `.env.example` to `.env`. Required variables:
- `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`
- `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET`

## GraphQL Query Example

```graphql
{
  posts(filters: {slug: {eq: "your-slug"}}) {
    title
    content_first
    createdBy { firstname lastname }
    category { title slug }
    tags { title }
  }
}
```
