# Code Scanning Comparison Repo

This contrived repo replicates a bunch of common Sonar warnings, each commented at the place where the warning should present. The sonarlint extension for VS Code will highlight these errors.

## Sonar

There are approximately 21 Sonar findings in this sample repo. Mostly code smells / quality, but there's a couple of bugs and security hotspots too. I'd expect other SASTs to _at least_ find the security hotspots (regex and insure url).

## Snyk

Finds nothing with `snyk code test` is run on the CLI.

## GitHub

Finds the "unused variable" error on line 70.

## GitLab
