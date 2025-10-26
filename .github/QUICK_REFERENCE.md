# 🚀 CI/CD Quick Reference

Quick guide for developers working with the AUTOSITE CI/CD system.

## 🔍 PR Workflow

When you create a PR, these checks will run automatically:

1. ✅ **Code Quality**
   - Backend: Laravel Pint (linting)
   - Frontend: ESLint + TypeScript
   
2. ✅ **Tests**
   - Backend: Pest/PHPUnit
   - Frontend: Jest
   - E2E: Playwright
   
3. ✅ **Security**
   - CodeQL scanning
   - Dependency vulnerability check
   
4. ✅ **Performance** (for frontend changes)
   - Lighthouse CI audit
   
5. ✅ **Accessibility** (for frontend changes)
   - Pa11y + axe-core tests

**PR Report**: Check the automated comment for coverage, test results, and quality metrics.

## 📝 Creating a New Feature

### Option 1: Manual

```bash
# Create issue manually
# Create branch
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "feat: implement my feature"
git push -u origin feature/my-feature

# Create PR
```

### Option 2: Automated (Recommended)

1. Go to **Actions** → **Feature Issue Generator**
2. Click **Run workflow**
3. Select or enter feature name:
   - `messaging-buyer-dealer`
   - `test-drive-scheduling`
   - `image-upload`
   - `wishlist-compare`
   - `multi-currency-language`
   - Or enter custom name

This will:
- ✅ Create a detailed issue with checklist
- ✅ Create the feature branch
- ✅ Add to milestone
- ✅ Apply appropriate labels

## 🧪 Running Tests Locally

### Backend Tests
```bash
cd backend
composer install
php artisan test

# With coverage
./vendor/bin/pest --coverage
```

### Frontend Tests
```bash
cd autosite-frontend
npm install
npm test

# With coverage
npm run test:coverage
```

### E2E Tests
```bash
cd autosite-frontend
npm run e2e

# Debug mode
npm run e2e:debug
```

### Linting
```bash
# Backend
cd backend
./vendor/bin/pint

# Frontend
cd autosite-frontend
npm run lint
npm run type-check
```

## 📊 Coverage Requirements

- **Minimum**: 70% code coverage
- **Target**: 80%+ code coverage
- Check PR report for current coverage

## 🎯 Performance Targets

All pages must meet:
- **Performance**: ≥ 90
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 90
- **SEO**: ≥ 95

## 🔔 Notifications

### Test Failures
If tests fail, you'll receive:
- ❌ GitHub check failure
- 📧 Email (if configured)
- 💬 Slack message (if configured)

### Performance Issues
If performance drops below 90:
- 🐛 Automatic issue created
- 💬 Slack notification (if configured)

## 🔧 Workflow Triggers

| Event | Triggers |
|-------|----------|
| **Push to main/develop** | All tests, deployment (main only) |
| **Create PR** | All tests, quality report, Lighthouse |
| **Daily** | E2E tests, performance audit |
| **Weekly** | CodeQL, accessibility, dependency updates |
| **Monthly** | Dependency report (1st of month) |
| **Bi-weekly** | Tech debt review (1st and 15th) |

## 📅 Maintenance Schedule

### Weekly (Monday 6 AM UTC)
- CodeQL security scan
- Dependabot dependency checks

### Weekly (Wednesday 3 AM UTC)
- Lighthouse CI performance audit

### Weekly (Friday 5 AM UTC)
- Accessibility testing

### Monthly (1st @ 9 AM UTC)
- Dependency report with update recommendations

### Bi-weekly (1st & 15th @ 10 AM UTC)
- Tech debt review
- Code quality analysis

## 🐛 Troubleshooting

### PR Checks Failing?

1. **Check the workflow logs**: Click on the failed check
2. **Common issues**:
   - Linting errors: Run `pint` or `eslint` locally
   - Test failures: Run tests locally
   - Coverage too low: Add more tests
   - Build errors: Check dependencies

### Local vs CI Differences?

- Clear your cache: `npm ci` instead of `npm install`
- Check PHP/Node versions match CI
- Ensure `.env.example` is up to date

### Need Help?

1. Check workflow logs in GitHub Actions
2. Review [CI/CD Documentation](.github/CI_CD_DOCUMENTATION.md)
3. Ask in team chat
4. Create an issue with `ci-help` label

## 🎓 Best Practices

### Before Committing
- [ ] Run tests locally
- [ ] Check linting
- [ ] Verify coverage ≥70%
- [ ] Update tests for new features

### Before Creating PR
- [ ] Rebase on latest main/develop
- [ ] All tests pass locally
- [ ] No linting errors
- [ ] Documentation updated

### During Code Review
- [ ] All CI checks green
- [ ] Coverage maintained/improved
- [ ] No security warnings
- [ ] Performance targets met

## 🔐 Security

### CodeQL Alerts
- View under **Security** → **Code scanning**
- Address immediately if critical
- Comment in PR if false positive

### Dependabot PRs
- Review dependency updates
- Check for breaking changes
- Merge regularly to stay current

## 📈 Metrics Dashboard

View project metrics:
- **Coverage**: Codecov dashboard
- **Performance**: Lighthouse CI reports
- **Security**: Security tab → Code scanning
- **Dependencies**: Dependabot alerts

## 🚀 Deployment

### Staging
```bash
# Merge to staging branch
git checkout staging
git merge feature/my-feature
git push
```

### Production
```bash
# Merge to main (via PR)
# Deployment runs automatically
# Monitor in Actions tab
```

**Note**: Only merge to `main` after all checks pass!

## 📞 Support

- **Documentation**: `.github/CI_CD_DOCUMENTATION.md`
- **Issues**: Create issue with `ci-help` label
- **Team**: Reach out in team chat

---

**Last Updated**: 2025-10-26  
**Quick Reference Version**: 1.0.0
