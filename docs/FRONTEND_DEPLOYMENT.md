# Frontend deployment

The React frontend is deployed from `main` by `.github/workflows/aws.yml`.

A production deployment builds the Vite application, copies the immutable bundle to the EC2 web root, validates Nginx, verifies backend health through Nginx, and then verifies the React root page.

This file also provides a safe, code-neutral way to retrigger deployment when a manual workflow run is unavailable or inaccessible. A documentation-only commit to `main` triggers the same deployment workflow without changing application behavior.

Public verification currently depends on the configured production hostname resolving correctly; deployment may complete on EC2 while the final public health check still fails if DNS is unavailable.
