# 🤖 CI/CD & Automation Documentation

This document describes the comprehensive CI/CD and automation setup for the AUTOSITE project.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Phase 1: Initial Setup & Audit](#phase-1-initial-setup--audit)
3. [Phase 2: Feature Implementation Automation](#phase-2-feature-implementation-automation)
4. [Phase 3: Continuous Testing & QA](#phase-3-continuous-testing--qa)
5. [Phase 4: Deployment & Monitoring](#phase-4-deployment--monitoring)
6. [Phase 5: Continuous Maintenance](#phase-5-continuous-maintenance)
7. [Configuration](#configuration)
8. [Workflows Reference](#workflows-reference)

## Overview

The AUTOSITE project uses GitHub Actions for comprehensive CI/CD automation, covering:

- **Code Quality**: Linting, testing, and code analysis
- **Security**: CodeQL scanning and dependency auditing
- **Performance**: Lighthouse CI and performance monitoring
- **Accessibility**: Automated accessibility testing
- **Deployment**: Automated deployment to production
- **Maintenance**: Regular dependency and tech debt reviews

## Phase 1: Initial Setup & Audit

### ✅ Implemented Workflows

#### 1. Backend CI (`backend-ci.yml`)
- **Trigger**: Push/PR to main/develop affecting backend
- **Actions**:
  - Install PHP dependencies
  - Run Laravel Pint (linting)
  - Run unit/integration tests
  - Generate test reports

#### 2. Backend Tests (`backend-tests.yml`)
- **Trigger**: Push/PR affecting PHP files
- **Actions**:
  - Test on multiple PHP versions (8.2, 8.3)
  - Run Pest tests with coverage
  - PHPStan static analysis
  - PHP-CS-Fixer code style checks
  - Upload coverage to Codecov

#### 3. Frontend CI (`frontend-ci.yml`)
- **Trigger**: Push/PR to main/develop affecting frontend
- **Actions**:
  - Install npm dependencies
  - Run TypeScript type checking
  - Run ESLint
  - Run Jest tests
  - Build Next.js application

#### 4. Frontend Tests (`frontend-tests.yml`)
- **Trigger**: Push/PR affecting frontend
- **Actions**:
  - Test on multiple Node versions (18.x, 20.x)
  - Run Jest tests with coverage
  - Upload coverage to Codecov

#### 5. E2E Tests (`e2e-tests.yml`)
- **Trigger**: Push/PR, daily schedule (2 AM UTC)
- **Actions**:
  - Start Laravel backend
  - Start Next.js frontend
  - Run Playwright E2E tests
  - Upload test reports and screenshots

#### 6. CodeQL Security Analysis (`codeql-analysis.yml`) ⭐ NEW
- **Trigger**: Push/PR, weekly schedule (Monday 6 AM UTC)
- **Actions**:
  - Scan JavaScript/TypeScript code
  - Scan PHP code
  - Report security vulnerabilities

#### 7. Dependabot Configuration (`dependabot.yml`) ⭐ NEW
- **Schedule**: Weekly on Monday 6 AM UTC
- **Monitors**:
  - Backend Composer dependencies
  - Frontend npm dependencies
  - GitHub Actions versions
- **Auto-creates PRs** for updates

#### 8. PR Quality Report (`pr-quality-report.yml`) ⭐ NEW
- **Trigger**: Pull requests
- **Actions**:
  - Run backend tests with coverage
  - Run frontend tests with coverage
  - Calculate coverage percentages
  - Post comprehensive report to PR
  - Upload coverage artifacts

#### 9. Lighthouse CI (`lighthouse-ci.yml`) ⭐ NEW
- **Trigger**: PR affecting frontend, weekly schedule (Wednesday 3 AM UTC)
- **Actions**:
  - Start backend and frontend
  - Run Lighthouse performance audits
  - Check scores against thresholds:
    - Performance ≥ 90
    - Accessibility ≥ 95
    - Best Practices ≥ 90
    - SEO ≥ 95
  - Post results to PR

## Phase 2: Feature Implementation Automation

#### 10. Feature Issue Generator (`feature-issue-generator.yml`) ⭐ NEW
- **Trigger**: Manual workflow dispatch
- **Input**: Feature name (e.g., messaging-buyer-dealer)
- **Actions**:
  - Creates detailed issue with checklist
  - Creates feature branch
  - Assigns to milestone
  - Adds appropriate labels

**Available Templates**:
- `messaging-buyer-dealer` - Messaging system
- `test-drive-scheduling` - Test drive booking
- `image-upload` - Real image upload
- `wishlist-compare` - Wishlist and comparison
- `multi-currency-language` - i18n/l10n support

**Usage**:
```bash
# Via GitHub UI: Actions → Feature Issue Generator → Run workflow
# Select feature from dropdown or enter custom name
```

## Phase 3: Continuous Testing & QA

#### 11. Test Failure Notification (`test-failure-notification.yml`) ⭐ NEW
- **Trigger**: On test failure
- **Actions**:
  - Send Slack notification (if configured)
  - Send email notification (if configured)
  - Create GitHub issue for repeated failures

#### 12. Performance Audit (`performance-audit.yml`) ⭐ NEW
- **Trigger**: Push to staging/main, daily schedule (4 AM UTC)
- **Actions**:
  - Run comprehensive Lighthouse audit
  - Check against performance threshold (≥90)
  - Create issue if below threshold
  - Upload performance reports

#### 13. Accessibility Testing (`accessibility-testing.yml`) ⭐ NEW
- **Trigger**: PR affecting frontend, weekly schedule (Friday 5 AM UTC)
- **Actions**:
  - Run Pa11y accessibility tests
  - Run axe-core Playwright tests
  - Test WCAG 2.1 AA compliance
  - Post results to PR
  - Upload accessibility reports

## Phase 4: Deployment & Monitoring

#### 14. Deploy to Production (`deploy.yml`)
- **Trigger**: Push to main, manual dispatch
- **Actions**:
  - Run all tests first
  - Deploy backend via SSH
  - Deploy frontend to Vercel
  - Send Slack notification

**Production Checks** (configured in deployment):
- ✅ HTTPS/SSL certificates
- ✅ Environment variables
- ✅ Worker queues
- ✅ Cron jobs
- ✅ Database migrations

## Phase 5: Continuous Maintenance

#### 15. Monthly Dependency Report (`monthly-dependency-report.yml`) ⭐ NEW
- **Trigger**: 1st of each month at 9 AM UTC
- **Actions**:
  - Audit backend dependencies (Composer)
  - Audit frontend dependencies (npm)
  - Check for security vulnerabilities
  - Create detailed report issue
  - Close previous month's report

#### 16. Tech Debt Review (`tech-debt-review.yml`) ⭐ NEW
- **Trigger**: Every 2 weeks (1st and 15th) at 10 AM UTC
- **Actions**:
  - Count TODO/FIXME/HACK comments
  - Identify large files (>500 lines)
  - Analyze code complexity
  - Create review issue with recommendations
  - Close previous review

## Configuration

### Required Secrets

Configure these in GitHub Settings → Secrets:

**Deployment**:
- `SSH_HOST` - Production server hostname
- `SSH_USERNAME` - SSH username
- `SSH_PRIVATE_KEY` - SSH private key
- `SSH_PORT` - SSH port (default: 22)
- `VERCEL_TOKEN` - Vercel deployment token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID

**Notifications** (optional):
- `SLACK_WEBHOOK` - Slack webhook URL for notifications
- `MAIL_SERVER` - SMTP server address
- `MAIL_PORT` - SMTP port
- `MAIL_USERNAME` - SMTP username
- `MAIL_PASSWORD` - SMTP password
- `NOTIFICATION_EMAIL` - Email for notifications

**Coverage** (optional):
- `CODECOV_TOKEN` - Codecov upload token

### Environment Variables

Backend `.env`:
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.autosite.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=autosite
DB_USERNAME=root
DB_PASSWORD=secret

QUEUE_CONNECTION=redis
CACHE_DRIVER=redis
SESSION_DRIVER=redis
```

Frontend `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://api.autosite.com
NEXT_PUBLIC_APP_ENV=production
```

## Workflows Reference

### Workflow Triggers Summary

| Workflow | Push | PR | Schedule | Manual |
|----------|------|----|---------  |--------|
| Backend CI | ✅ | ✅ | - | - |
| Backend Tests | ✅ | ✅ | - | - |
| Frontend CI | ✅ | ✅ | - | - |
| Frontend Tests | ✅ | ✅ | - | - |
| E2E Tests | ✅ | ✅ | Daily 2am | - |
| CodeQL | ✅ | ✅ | Weekly Mon 6am | - |
| PR Quality Report | - | ✅ | - | - |
| Lighthouse CI | ✅ | ✅ | Weekly Wed 3am | ✅ |
| Test Notifications | ✅ | ✅ | - | - |
| Performance Audit | ✅ | - | Daily 4am | ✅ |
| Accessibility | ✅ | ✅ | Weekly Fri 5am | ✅ |
| Deploy | ✅ | - | - | ✅ |
| Dependency Report | - | - | Monthly 1st 9am | ✅ |
| Tech Debt Review | - | - | Bi-weekly 10am | ✅ |
| Feature Generator | - | - | - | ✅ |

### Coverage Targets

| Component | Target | Current |
|-----------|--------|---------|
| Backend | ≥70% | Check PR reports |
| Frontend | ≥70% | Check PR reports |
| E2E | Key flows | Check artifacts |

### Performance Targets

| Metric | Target |
|--------|--------|
| Performance | ≥90 |
| Accessibility | ≥95 |
| Best Practices | ≥90 |
| SEO | ≥95 |

## Monitoring & Alerts

### Automated Alerts

1. **Test Failures**: Slack/Email notifications
2. **Performance Degradation**: GitHub issues created
3. **Security Vulnerabilities**: Dependabot PRs + CodeQL alerts
4. **Accessibility Issues**: PR comments
5. **Build Failures**: Slack notifications

### Manual Reviews

1. **Dependency Report**: Monthly (1st of month)
2. **Tech Debt Review**: Bi-weekly (1st and 15th)
3. **Performance Audit**: Daily on staging
4. **Accessibility Audit**: Weekly

## Best Practices

### For Developers

1. **Before Creating PR**:
   - Run tests locally
   - Check linting
   - Review coverage

2. **PR Checklist**:
   - All CI checks pass
   - Coverage ≥70%
   - No security vulnerabilities
   - Accessibility score maintained

3. **Code Quality**:
   - Add tests for new features
   - Keep files under 500 lines
   - Use TODO/FIXME comments sparingly
   - Update documentation

### For Reviewers

1. **Review PR Report**: Check coverage and test results
2. **Check Lighthouse**: Ensure performance targets met
3. **Review Security**: No CodeQL warnings
4. **Verify Accessibility**: No new violations

## Roadmap Integration

This CI/CD setup aligns with the 12-week project roadmap:

- **Weeks 1-2**: ✅ CI/CD setup complete
- **Weeks 3-8**: Feature implementation with automated issue creation
- **Week 9**: E2E testing and audits
- **Week 10**: Deployment automation
- **Weeks 11-12**: Continuous maintenance and monitoring

## Support

For issues or questions:
1. Check workflow run logs in GitHub Actions
2. Review this documentation
3. Check individual workflow files in `.github/workflows/`
4. Contact the development team

---

**Last Updated**: 2025-10-26  
**Version**: 1.0.0
