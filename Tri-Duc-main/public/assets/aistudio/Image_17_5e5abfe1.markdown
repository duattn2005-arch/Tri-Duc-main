---
name: Clinical Asset Intelligence
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3e494a'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6e797a'
  outline-variant: '#bdc9ca'
  surface-tint: '#006972'
  primary: '#00626a'
  on-primary: '#ffffff'
  primary-container: '#0e7c86'
  on-primary-container: '#ddfbff'
  inverse-primary: '#7cd4df'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#005c8d'
  on-tertiary: '#ffffff'
  tertiary-container: '#0076b3'
  on-tertiary-container: '#eff6ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#98f0fb'
  primary-fixed-dim: '#7cd4df'
  on-primary-fixed: '#001f23'
  on-primary-fixed-variant: '#004f56'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Be Vietnam Pro
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Be Vietnam Pro
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 24px
  margin: 32px
  space-xs: 4px
  space-sm: 8px
  space-md: 16px
  space-lg: 24px
  space-xl: 32px
---

## Brand & Style

This design system delivers a professional, clean, and highly reliable asset management interface tailored for the Vietnamese medical sector. The brand personality is rooted in clinical precision, institutional trust, and calm operational clarity. 

The aesthetic style blends **Corporate / Modern** foundations with functional minimalism. The visual environment is designed to evoke absolute confidence, patient safety, and systematic control. Heavy data-density screens remain legible and uncluttered through strict structural hierarchy, generous touch targets, and high-contrast accessibility standards.

## Colors

The color architecture is anchored by a deep clinical teal primary, supported by a neutral slate and cool gray palette. This ensures optimal contrast ratios for prolonged clinical monitoring and inventory auditing.

- **Primary (Teal - `#0E7C86`):** Drives primary actions, active state indicators, key metrics, and brand touchpoints.
- **Secondary (Slate - `#64748B`):** Used for secondary metadata, inactive states, borders, and structured table headers.
- **Tertiary (Blue - `#0284C7`):** Reserved for informational callouts, links, and system notifications.
- **Neutral Background (`#FFFFFF`) & Surfaces (`#F8FAFC`):** Pure white canvases paired with light gray container cards reduce eye strain and establish a clean diagnostic workspace.

## Typography

The typography system relies exclusively on **Be Vietnam Pro**, optimized for Vietnamese diacritics and rapid scanning of medical serial numbers, statuses, and inventory metrics. 

- Maintain strict adherence to defined font weights: `400` for body copy, `500` for interactive labels, and `600`/`700` for structural hierarchy.
- Ensure all tabular data utilizes monospaced numeric alignments where possible to maintain column integrity during equipment audits.

## Layout & Spacing

The layout is built upon a responsive 12-column fluid grid system optimized for desktop monitoring stations and tablet inventory devices. 

- **Gutters:** Consistent 24px spacing between grid columns ensures clear visual separation of dashboard modules.
- **Margins:** Outer canvas margins scale from 16px on mobile to 32px on desktop workspaces.
- **Rhythm:** Component spacing strictly follows an 8px baseline grid (`space-sm` to `space-xl`), preventing layout jitter and maintaining predictable scanning patterns for clinical staff.

## Elevation & Depth

Elevation is utilized sparingly to reinforce a clean, flat, high-contrast dashboard aesthetic without visual clutter.

- **Surface Tiers:** Rely on subtle background shifts (pure white cards on `#F8FAFC` canvas) rather than heavy drop shadows.
- **Borders & Outlines:** Use crisp, low-contrast outlines (`#E2E8F0`) to demarcate cards and table rows.
- **Floating Elements:** Modals, tooltips, and dropdown menus utilize diffused, low-opacity ambient shadows tinted with the primary teal hue to maintain spatial hierarchy.

## Shapes

The shape language uses a soft, structured approach with consistent 8px corner radii (`rounded-sm`).

- **Containers & Cards:** Standardize on 8px radii to project a modern, approachable, yet serious medical tool appearance.
- **Badges & Pills:** Fully rounded (`9999px`) for status indicators (e.g., "Operational", "In Calibration", "Maintenance Due").
- **Inputs & Buttons:** 8px radius across all interactive form controls to maintain a unified touch target geometry.

## Components

- **Buttons:** Primary actions utilize solid Teal (`#0E7C86`) fills with white text and 8px corners. Secondary buttons use transparent backgrounds with slate borders. Ensure minimum touch target heights of 40px.
- **Chips & Badges:** Pill-shaped status indicators with soft background tints (e.g., light green for active, light amber for warning, light red for critical maintenance).
- **Lists & Data Tables:** High-density rows separated by subtle 1px slate-200 dividers. Hover states must highlight the entire row softly in `#F1F5F9`.
- **Checkboxes & Radios:** Clear, high-contrast bounding boxes with 4px inner rounding for checkboxes to maintain distinct geometry from circular radio buttons.
- **Input Fields:** Outlined text boxes featuring 8px corners, `#CBD5E1` borders, and clear floating or top-aligned labels in Be Vietnam Pro. Focus states must display a 2px Teal ring.
- **Cards:** Light gray (`#F8FAFC`) background surfaces enclosed in a 1-pixel neutral border, housing telemetry graphs, device IDs, and location status metadata.
- **Specialized Additions:** Include status timeline trackers for equipment maintenance lifecycles and quick-scan barcode entry triggers.