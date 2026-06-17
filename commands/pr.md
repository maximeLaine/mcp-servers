---
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git branch:*), Bash(git push:*), Bash(git checkout:*), Bash(gh pr create:*), Bash(gh pr view:*)
description: Create a GitHub pull request from the current branch
argument-hint: [base-branch] [--draft]
---

## Context

- Current branch: !`git branch --show-current`
- Status: !`git status --short`
- Commits ahead of main: !`git log main..HEAD --oneline 2>/dev/null || git log origin/main..HEAD --oneline 2>/dev/null || echo "Cannot determine"`
- Recent commits on this branch: !`git log --oneline -10 HEAD`
- Diff summary: !`git diff main...HEAD --stat 2>/dev/null || git diff origin/main...HEAD --stat 2>/dev/null || echo "Cannot determine base"`

## Your task

Arguments provided: $ARGUMENTS

1. **Parse arguments**: If a base branch is specified use it, otherwise default to `main`. Check for `--draft` flag.

2. **Verify preconditions**:
   - If on `main` or `master`, stop and tell the user to create a feature branch first
   - If there are uncommitted changes, warn the user and ask if they want to commit first
   - If the branch has no commits ahead of main, stop — there's nothing to PR

3. **Push the branch** if not already pushed:
   ```
   git push -u origin <current-branch>
   ```

4. **Check if a PR already exists** for this branch:
   ```
   gh pr view --json url,title,state 2>/dev/null
   ```
   If it already exists, show the URL and stop.

5. **Draft a PR title and body**:
   - Title: concise (under 70 chars), describes *what* changed. Use imperative mood (e.g. "Add X", "Fix Y", "Update Z").
   - Body: use this template:
     ```
     ## Summary
     - <bullet 1>
     - <bullet 2>

     ## Test plan
     - [ ] <how to verify this works>

     🤖 Generated with [Claude Code](https://claude.com/claude-code)
     ```
   - Base the content on the commit messages and diff stat. Be specific — avoid generic phrases like "various improvements".

6. **Create the PR** with `gh pr create`:
   ```
   gh pr create --title "..." --body "..." [--base <base-branch>] [--draft]
   ```

7. **Return the PR URL** so the user can open it.

Do all of this in as few messages as possible. Do not ask for confirmation unless the branch is on main/master or has uncommitted changes.
