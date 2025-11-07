# Frontend Package Update Plan

## Current Vulnerabilities
- **63 total vulnerabilities**: 49 moderate, 12 high, 2 critical
- Main issues: postcss, terser, tough-cookie, yargs-parser

## Update Strategy

### Phase 1: Safe Automatic Fixes (Non-Breaking)
These can be updated with `npm audit fix`:
- tough-cookie: <4.1.3 → ≥4.1.3 (Prototype Pollution fix)
- Various transitive dependencies

### Phase 2: Safe Version Bumps (Tested Compatibility)
Update to latest compatible versions without breaking changes:

#### Dependencies:
1. **@amcharts/amcharts4**: ^4.10.15 → ^4.10.39 (latest 4.x)
2. **@fortawesome/fontawesome-free**: ^5.15.1 → ^6.5.1 (major update, test carefully)
3. **bootstrap**: 4.5.3 → 4.6.2 (latest 4.x, avoid 5.x for now)
4. **html2canvas**: ^1.1.1 → ^1.4.1 (latest)
5. **jquery**: 3.5.1 → 3.7.1 (security fixes)
6. **jquery-ui-dist**: ^1.12.1 → ^1.13.2 (latest)
7. **jszip**: ^3.10.1 → ^3.10.1 (already latest)
8. **ol** (OpenLayers): ^6.5.0 → ^6.15.1 (stay in 6.x, avoid 7.x+ breaking changes)
9. **ol-hashed**: ^2.0.0 → ^2.1.0 (latest)
10. **ol-layerswitcher**: ^3.8.3 → ^4.1.2 (check compatibility with ol 6.x)
11. **pdfmake**: ^0.2.7 → ^0.2.9 (latest 0.2.x)
12. **popper.js**: ^1.16.1 → @popperjs/core ^2.11.8 (recommended migration)

#### DevDependencies:
1. **parcel-bundler**: ^1.12.4 → ^1.12.5 (latest 1.x, or consider Parcel 2)
2. **sass**: ^1.32.4 → ^1.69.5 (latest)
3. **dotenv-cli**: ^7.3.0 → ^7.4.2 (latest)

### Phase 3: Major Updates (Requires Testing)
Consider for future updates:
- **Parcel 1.x → Parcel 2.x**: Major rewrite, significant changes
- **Bootstrap 4 → Bootstrap 5**: Breaking changes in markup/classes
- **FontAwesome 5 → 6**: Icon name changes

## Testing Checklist
After each phase:
- [ ] Application builds successfully
- [ ] Map loads and displays correctly
- [ ] Layer controls work
- [ ] Search functionality works
- [ ] PDF export works
- [ ] No console errors
- [ ] All interactive features functional

## Rollback Plan
If issues occur:
```bash
cp package.json.backup package.json
rm -rf node_modules package-lock.json
npm install
```
