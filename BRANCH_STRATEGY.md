# Branch Management & Git Strategy

> Created: 2026-03-24 | Version: 1.0

---

## 1. Current Branch Status

### 1.1 Branch Overview

| Branch | Purpose | Status | Last Activity |
|--------|---------|--------|---------------|
| `main` | Production branch | ✅ Active | 2026-03-24 |

### 1.2 Repository Analysis

```
Repository: badhope/github.io
Total Commits: 20+
Default Branch: main
Protected: No (recommended to enable)
```

---

## 2. Branch Strategy

### 2.1 Recommended Branch Model

For a personal portfolio project, we recommend a simplified Git Flow:

```
main (production)
│
├── develop (integration)
│   ├── feature/i18n
│   ├── feature/ai-chat
│   └── feature/visual-enhancements
│
└── release/v1.0 (optional for version releases)
```

### 2.2 Branch Naming Conventions

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feature/` | New features | `feature/dark-mode` |
| `fix/` | Bug fixes | `fix/contact-form` |
| `refactor/` | Code improvements | `refactor/auth` |
| `docs/` | Documentation | `docs/api-spec` |
| `test/` | Test additions | `test/user-flow` |
| `hotfix/` | Urgent production fixes | `hotfix/security-patch` |

---

## 3. Branch Lifecycle

### 3.1 Creation Process

1. Create from `main` for features, `develop` for integration work
2. Use descriptive names: `feature/user-authentication`
3. Set initial PR description template
4. Link to issue/ticket if applicable

### 3.2 Lifecycle Stages

```
1. Draft → 2. Active Development → 3. Code Review → 4. Merge → 5. Delete
```

### 3.3 Retention Policy

| Branch Type | Retention Period | Archive After |
|-------------|-----------------|---------------|
| Feature branches | Until merged | Immediately after merge |
| Release branches | Until next release + 30 days | After stabilization |
| Hotfix branches | Until verified fix | Immediately after merge |
| Abandoned branches | N/A | After 90 days of inactivity |

---

## 4. Current Recommendations

### 4.1 Immediate Actions

1. **Enable branch protection** on `main`:
   - Require pull request reviews
   - Require status checks (CI/CD)
   - Prevent force pushes

2. **Create `develop` branch** for integration testing

3. **Document merge strategy** in CONTRIBUTING.md

### 4.2 Future Branch Planning

| Milestone | Branch Strategy | Timeline |
|-----------|----------------|----------|
| v1.0 launch | Main + feature branches | Week 1-2 |
| v1.1 enhancements | develop branch integration | Week 3-4 |
| v2.0 major release | Git Flow with release branches | Month 2+ |

---

## 5. Git Workflow

### 5.1 Standard Process

```bash
# 1. Update main
git checkout main && git pull

# 2. Create feature branch
git checkout -b feature/your-feature

# 3. Develop & commit
git add . && git commit -m "feat: description"

# 4. Push branch
git push -u origin feature/your-feature

# 5. Create Pull Request
# - Use PR template
# - Link related issues
# - Request reviews

# 6. After approval, merge and delete
git checkout main && git pull
git branch -d feature/your-feature
```

### 5.2 Commit Message Convention

```
<type>(<scope>): <subject>

feat(i18n): add Chinese language support
fix(resume): correct PDF download link
docs(readme): update installation instructions
refactor(ai): simplify API call logic
test(chat): add integration tests
```

---

## 6. Review & Audit Schedule

| Activity | Frequency | Owner |
|----------|-----------|-------|
| Branch cleanup | Weekly | Developer |
| Protection rules review | Monthly | Developer |
| Access audit | Quarterly | Developer |
| Strategy review | Bi-annually | Developer |

---

*Document will be updated as project evolves.*
