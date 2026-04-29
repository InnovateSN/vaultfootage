# SignalBid

Autonomous opportunity intelligence for UK SMEs.

SignalBid is a web-first SaaS that ingests public procurement, grant and innovation-funding opportunities, scores them against an SME profile, then sends actionable briefs, deadlines and pipeline alerts.

This repository has been reset from the old `vaultfootage` placeholder into the SignalBid product foundation.

## Product

SignalBid helps small businesses stop manually checking multiple government portals. The app continuously collects public opportunities, ranks them, explains why they matter, and turns each listing into a concise action brief.

Core monetisation model:

Free tier for limited saved searches and weekly alerts.
Solo plan at £29/month.
Pro plan at £79/month.
Team plan at £199/month.
Agency plan added later for multi-client monitoring.

## Stack

Next.js App Router
TypeScript
Server-side opportunity scoring
Cron-compatible ingestion endpoint
Stripe-ready billing endpoints
Vercel-ready deployment

## First milestone

The current build includes the product shell, opportunity data model, scoring engine, public dashboard, ingestion route, Stripe checkout route placeholder, webhook route placeholder, and architecture documentation.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and fill the keys when ready.

## Status

MVP foundation active. Next steps are real data ingestion, database persistence, authentication and live billing.