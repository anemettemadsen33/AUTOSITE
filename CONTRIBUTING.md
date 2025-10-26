# Contributing to AUTOSITE

Thank you for contributing to AUTOSITE! This guide will help you work effectively with our CI/CD system.

## 🚀 Getting Started

### Prerequisites
- PHP 8.2+
- Node.js 20+
- Composer 2+
- Git

### Setup

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/AUTOSITE.git
   cd AUTOSITE
   ```
3. **Install dependencies**
   ```bash
   # Backend
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate --seed
   
   # Frontend
   cd ../autosite-frontend
   npm install
   cp .env.example .env.local
   ```

## 📋 Development Workflow

### 1. Create a Feature Branch

**Option A: Manual**
```bash
git checkout -b feature/my-feature
```

**Option B: Automated (Recommended)**
1. Go to **Actions** → **Feature Issue Generator**
2. Run workflow with your feature name
3. This creates:
   - GitHub issue with template
   - Feature branch
   - Milestone assignment

### 2. Make Your Changes

- Write clean, documented code
- Follow existing code style
- Add tests for new features
- Keep commits atomic and well-described

### 3. Test Locally

```bash
# Backend
cd backend
./vendor/bin/pint              # Linting
php artisan test               # Tests
./vendor/bin/pest --coverage   # Coverage

# Frontend
cd autosite-frontend
npm run lint                   # Linting
npm run type-check            # TypeScript
npm run test                  # Tests
npm run test:coverage         # Coverage
```

### 4. Commit Your Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git add .
git commit -m "feat: add user messaging system"
```

**Commit Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

### 5. Push and Create PR

```bash
git push origin feature/my-feature
```

Then create a Pull Request on GitHub.

## ✅ PR Checklist

Before creating your PR, ensure:

- [ ] All tests pass locally
- [ ] Code is linted (no warnings)
- [ ] Coverage is ≥70%
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] No merge conflicts with base branch

## 🤖 Automated Checks

When you create a PR, these checks run automatically:

### ✅ Code Quality
- **Backend**: Laravel Pint linting
- **Frontend**: ESLint + TypeScript checks

### ✅ Tests
- **Backend**: Pest/PHPUnit tests (PHP 8.2, 8.3)
- **Frontend**: Jest tests (Node 18.x, 20.x)
- **E2E**: Playwright tests

### ✅ Security
- **CodeQL**: Security vulnerability scanning
- **Dependabot**: Dependency vulnerability checks

### ✅ Performance (Frontend PRs)
- **Lighthouse CI**: Performance audit
- Must meet targets: Performance ≥90, Accessibility ≥95

### ✅ PR Report
A bot will comment with:
- Test results
- Code coverage
- Security status
- Quality metrics

## 📊 Quality Standards

### Code Coverage
- **Minimum**: 70%
- **Target**: 80%+
- New features must include tests

### Performance Scores
- **Performance**: ≥90
- **Accessibility**: ≥95
- **Best Practices**: ≥90
- **SEO**: ≥95

### Code Style
- **Backend**: PSR-12 (enforced by Laravel Pint)
- **Frontend**: ESLint + Prettier config
- **TypeScript**: Strict mode enabled

## 🐛 Fixing Failed Checks

### Linting Failures

**Backend**:
```bash
cd backend
./vendor/bin/pint --test  # Check
./vendor/bin/pint         # Auto-fix
```

**Frontend**:
```bash
cd autosite-frontend
npm run lint              # Check
npm run lint -- --fix     # Auto-fix
```

### Test Failures
1. Check the workflow log for details
2. Run tests locally: `php artisan test` or `npm test`
3. Fix the failing test
4. Commit and push

### Coverage Too Low
1. Check coverage report in artifacts
2. Add tests for uncovered code
3. Run `./vendor/bin/pest --coverage` to verify

### Build Failures
1. Clear cache: `npm ci` or `composer install --no-cache`
2. Check dependency versions
3. Verify environment variables

## 🔒 Security Guidelines

### Never Commit
- ❌ API keys or secrets
- ❌ `.env` files
- ❌ Personal data
- ❌ Database credentials

### Always
- ✅ Use environment variables
- ✅ Review Dependabot PRs
- ✅ Address CodeQL warnings
- ✅ Validate user input
- ✅ Sanitize output

## 📝 Code Review Process

### What Reviewers Check
1. Code quality and style
2. Test coverage
3. Security concerns
4. Performance impact
5. Documentation updates

### Response Time
- **Maintainers**: Review within 48 hours
- **Contributors**: Address feedback within 7 days

### Approval Requirements
- ✅ All CI checks pass
- ✅ At least 1 approval
- ✅ No unresolved conversations
- ✅ Coverage maintained/improved

## 🎯 Feature Development

### Using Templates

We have pre-built templates for common features:

1. **Messaging System** (`messaging-buyer-dealer`)
   - Real-time buyer-dealer messaging
   - Includes backend + frontend tasks

2. **Test Drive Scheduling** (`test-drive-scheduling`)
   - Calendar integration
   - Booking system

3. **Image Upload** (`image-upload`)
   - Multiple image upload
   - Image optimization

4. **Wishlist & Compare** (`wishlist-compare`)
   - Save favorites
   - Compare vehicles

5. **Multi-Currency/Language** (`multi-currency-language`)
   - 8 language support
   - Currency conversion

**To use**: Run **Feature Issue Generator** workflow

### Custom Features
For custom features:
1. Create issue manually
2. Use feature template structure
3. Include:
   - Description
   - Requirements
   - Backend tasks
   - Frontend tasks
   - API specification
   - Testing plan

## 📚 Documentation

### When to Update Docs
- New features
- API changes
- Configuration changes
- Breaking changes

### Where to Update
- `README.md` - Project overview
- `.github/CI_CD_DOCUMENTATION.md` - CI/CD info
- API docs - Swagger/OpenAPI
- Code comments - Complex logic

## 🧪 Testing Guidelines

### Backend Tests
```php
// Feature test example
test('user can create a message', function () {
    $user = User::factory()->create();
    
    $response = $this->actingAs($user)
        ->post('/api/v1/messages', [
            'content' => 'Hello',
            'recipient_id' => 2
        ]);
    
    $response->assertStatus(201);
});
```

### Frontend Tests
```typescript
// Component test example
describe('MessageList', () => {
  it('displays messages', () => {
    const messages = [/* mock data */];
    render(<MessageList messages={messages} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### E2E Tests
```typescript
// Playwright test example
test('user can send message', async ({ page }) => {
  await page.goto('/messages');
  await page.fill('[data-testid="message-input"]', 'Hello');
  await page.click('[data-testid="send-button"]');
  await expect(page.locator('.message')).toContainText('Hello');
});
```

## 🔄 Continuous Integration

### On Every Push
- Linting
- Unit tests
- Integration tests

### On Pull Request
- All of the above, plus:
- Code coverage report
- Security scanning
- Performance audit
- Accessibility testing

### On Merge to Main
- All tests
- Production deployment
- Performance monitoring

## 📞 Getting Help

### Resources
1. [CI/CD Documentation](.github/CI_CD_DOCUMENTATION.md)
2. [Quick Reference](.github/QUICK_REFERENCE.md)
3. [README](README.md)

### Support Channels
- **Issues**: Create issue with `help-wanted` label
- **Discussions**: GitHub Discussions
- **Team**: Contact maintainers

## 🎉 Recognition

Contributors are recognized in:
- `CONTRIBUTORS.md`
- Release notes
- Project README

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).

---

Thank you for contributing to AUTOSITE! 🚗✨

