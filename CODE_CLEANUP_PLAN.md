# Code Cleanup & Optimization Plan

> Created: 2026-03-24 | Version: 1.0

---

## 1. Dead Code Audit

### 1.1 Unused Components (Can Be Deleted)

| File | Size | Reason | Risk |
|------|------|--------|------|
| `src/components/Navbar.tsx` | ~100 lines | Renamed to Navigation.tsx | Low |
| `src/components/ParticlesBackground.tsx` | ~80 lines | Renamed to ParticleBackground.tsx | Low |
| `src/components/AnimatedSection.tsx` | ~50 lines | Functionality covered by motion.div | Low |
| `src/components/TiltCard.tsx` | ~120 lines | Not used anywhere | Low |
| `src/components/ThreeParticleDoor.tsx` | ~150 lines | Not used anywhere | Low |

### 1.2 Unused Dependencies

| Package | Reason | Impact |
|---------|--------|--------|
| `gsap` | gsap-config.ts not imported anywhere | Low |
| `@gsap/react` | Not installed but config exists | None |

### 1.3 Unused Files

| File | Reason |
|------|--------|
| `src/lib/animations/gsap-config.ts` | Never imported |
| `src/lib/animations/three-scenes.ts` | Never imported |
| `src/pages/_document.tsx` | Next.js 13+ uses app router |

---

## 2. Cleanup Priority

### 2.1 High Priority (Safe to Delete)

```bash
# Unused components
DELETE src/components/Navbar.tsx
DELETE src/components/AnimatedSection.tsx
DELETE src/components/TiltCard.tsx
DELETE src/components/ThreeParticleDoor.tsx
DELETE src/components/ParticlesBackground.tsx

# Unused library files
DELETE src/lib/animations/gsap-config.ts
DELETE src/lib/animations/three-scenes.ts
DELETE src/pages/_document.tsx
```

### 2.2 Medium Priority (Review Before Delete)

| File | Recommendation |
|------|----------------|
| `src/components/ui/Button.tsx` | Keep - may be useful for consistency |
| `src/components/ui/InteractiveButton.tsx` | Keep - used in some places |

---

## 3. Code Quality Issues

### 3.1 TypeScript Strictness

| Issue | Location | Severity |
|-------|----------|----------|
| Missing error boundaries | Global | Medium |
| Any types in some handlers | Multiple | Low |
| Missing loading states | AI Chat | Medium |

### 3.2 Performance Issues

| Issue | Location | Impact |
|-------|----------|--------|
| Large bundle size | /tools (323kB) | High |
| No lazy loading | 3D components | Medium |
| Missing memo | Frequent re-renders | Low |

---

## 4. Content Filtering

### 4.1 Current Content Status

| Content Area | Status | Notes |
|--------------|--------|-------|
| Blog posts | Mock data | Should be CMS or Markdown |
| Statistics | Mock (125k views) | OK for demo |
| Comments | Giscus (moderated) | ✅ Good |
| Contact form | Mailto link | Works but limited |

### 4.2 Recommendations

1. **Blog**: Use Markdown files or lightweight CMS (Notion API)
2. **Statistics**: Replace with real analytics (Vercel Analytics)
3. **Comments**: Giscus already has moderation ✅

---

## 5. Testing Strategy

### 5.1 Current Coverage

| Type | Status | Coverage |
|------|--------|----------|
| Unit Tests | None | 0% |
| Integration Tests | None | 0% |
| E2E Tests | None | 0% |
| Manual QA | Partial | ~60% |

### 5.2 Recommended Testing Stack

| Type | Tool | Priority |
|------|------|----------|
| Unit | Vitest | High |
| Component | React Testing Library | High |
| E2E | Playwright | Medium |
| Visual Regression | Percy | Low |

### 5.3 Target Coverage

| Milestone | Coverage Target |
|-----------|-----------------|
| v1.0 | 40% |
| v1.1 | 60% |
| v2.0 | 80% |

---

## 6. Implementation Timeline

| Phase | Tasks | Time |
|-------|-------|------|
| 1 | Delete unused files | 30 min |
| 2 | Install test framework | 1 hour |
| 3 | Write basic tests | 4 hours |
| 4 | Optimize bundles | 2 hours |
| 5 | Content system (optional) | 8 hours |

---

## 7. Verification Checklist

- [ ] All unused files deleted
- [ ] No import errors after cleanup
- [ ] Build succeeds
- [ ] Tests pass
- [ ] Bundle size reduced
- [ ] Manual QA completed

---

*Document will be updated as cleanup progresses.*
