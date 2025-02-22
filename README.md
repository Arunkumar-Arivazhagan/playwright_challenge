# Spot the Bug - Playwright E2E Tests

**Core Directories:**

* **`pages`**: Contains page object model (POM) classes for interacting with specific pages of the application under test. This promotes maintainability and readability in tests. `spot-the-bug-page.ts` likely defines interactions with the "Spot the Bug" page.
* **`tests`**: Holds the Playwright test specifications. `spot-the-bug.spec.ts` likely contains the end-to-end tests for the "Spot the Bug" functionality.
* **`utils`**: Contains utility functions and helper classes used across the project, such as `driver-utils.ts` which probably provides helper functions for interacting with the browser or Docker.

**Configuration and Setup:**

* **`.github/workflows`**: This directory contains workflow files for GitHub Actions, automating CI/CD processes. `docker-ci-cd.yml` likely defines the workflow for building and deploying the Docker container.
* **`docker-compose.yml`**: Defines how the different Docker containers in your application work together (if using multiple containers). Helpful for local development and testing.
* **`Dockerfile`**: Contains instructions for building the Docker image for your application.
* **`package.json` and `package-lock.json`**: `package.json` lists the dependencies, and `package-lock.json` ensures consistent installation across environments.
* **`playwright.config.ts`**: Configuration file for Playwright, defining settings like browser options, test reporters, and timeouts.
* **`tsconfig.json`**: Configuration file for TypeScript, defining how the TypeScript code is compiled.

**Other Files:**

* **`README.md`**: This file (the one you're reading!) provides information about the project.
* **`spot-the-bug-page.ts`**: Example of a Page Object Model file, likely contains methods for interacting with elements on the "Spot the Bug" page.
* **`spot-the-bug.spec.ts`**: Example of a Playwright test specification file, likely contains tests for the "Spot the Bug" feature.


**Workflow Example (from `docker-ci-cd.yml`):**

The `docker-ci-cd.yml` file in the `.github/workflows` directory defines a CI/CD pipeline that:
 1. Builds the Docker image defined by the `Dockerfile`.
 2. Runs Playwright tests inside the Docker container.
 3. (Potentially) Deploys the container to a staging or production environment.