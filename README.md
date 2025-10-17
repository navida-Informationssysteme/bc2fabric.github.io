# BC2Fabric Documentation Site

This repository contains the static documentation site for BC2Fabric. It is designed for GitHub
Pages and features a persistent left-hand navigation with a two-level hierarchy for quick access to
getting started guides, in-depth tutorials, and reference material.

## Structure

```
.
├── assets/
│   ├── css/styles.css      # Shared styling for the docs layout
│   └── js/main.js          # Navigation enhancements (active state detection)
├── getting-started/        # Onboarding content and live preview of bc2fabric.com
├── guides/                 # Deep-dive tutorials and walkthroughs
└── index.html              # Landing page for the documentation portal
```

The **BC2Fabric Preview** page embeds https://bc2fabric.com directly inside the documentation for
quick visual comparison while drafting content.

## Local development

Serve the site locally with any static file server, for example:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000> to browse the documentation experience.
