# 🧪 AUTOSITE - Testing Guide

> **Complete manual testing guide for MVP features**

---

## 📋 Table of Contents

1. [Pre-Testing Setup](#pre-testing-setup)
2. [Frontend Testing](#frontend-testing)
3. [Backend Testing](#backend-testing)
4. [Integration Testing](#integration-testing)
5. [Responsive Testing](#responsive-testing)
6. [Security Testing](#security-testing)
7. [Performance Testing](#performance-testing)
8. [Test Checklist](#test-checklist)

---

## 🔧 Pre-Testing Setup

### 1. Start the Application

**Option A: Quick Start (Windows)**
```bash
# Double-click START.bat
START.bat
```

**Option B: Manual Start**
```bash
# Terminal 1 - Backend
cd backend
php artisan serve --port=8000

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 2. Verify Services are Running

- ✅ Frontend: http://localhost:3000
- ✅ Backend: http://127.0.0.1:8000
- ✅ Admin Panel: http://127.0.0.1:8000/admin

### 3. Prepare Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@autosite.com | password |
| Dealer | dealer1@autosite.com | password |
| Buyer | buyer1@example.com | password |

---

## 🎨 Frontend Testing

### Test 1: Homepage

**Steps:**
1. Navigate to http://localhost:3000
2. Verify hero section displays correctly
3. Check search bar is visible and functional
4. Scroll down to view featured vehicles
5. Verify vehicle cards display properly
6. Check category cards are visible
7. Click on a category card

**Expected Results:**
- ✅ Hero section with background image
- ✅ Search bar with placeholder text
- ✅ Featured vehicles carousel (3-4 vehicles)
- ✅ Category cards with icons and counts
- ✅ Smooth animations and transitions
- ✅ No layout shifts or broken images

**Screenshot Location:** Take screenshot of homepage

---

### Test 2: Vehicle Listing Page

**Steps:**
1. Click "Vehicule" in navigation
2. Wait for page to load
3. Verify vehicle grid displays (21 vehicles)
4. Scroll through all vehicles
5. Check pagination controls
6. Click "Next Page" if available

**Expected Results:**
- ✅ Grid layout (3 columns on desktop)
- ✅ All 21 vehicles displayed
- ✅ Vehicle cards show: image, make, model, year, price
- ✅ Hover effects on vehicle cards
- ✅ Loading state appears during fetch
- ✅ Pagination works correctly

---

### Test 3: Advanced Filters

**Steps:**
1. On vehicles page, locate filter sidebar
2. **Test Brand Filter:**
   - Select "BMW" from dropdown
   - Verify only BMW vehicles show
   - Clear filter
3. **Test Price Range:**
   - Set min price: 10000
   - Set max price: 30000
   - Verify filtered results
4. **Test Year Range:**
   - Set min year: 2020
   - Verify only 2020+ vehicles show
5. **Test Fuel Type:**
   - Select "Electric"
   - Verify only electric vehicles show
6. **Test Transmission:**
   - Select "Automatic"
   - Verify results
7. **Test Condition:**
   - Select "New"
   - Verify only new vehicles show
8. **Test Multiple Filters:**
   - Combine: BMW + Automatic + 2020+
   - Verify correct filtering

**Expected Results:**
- ✅ Each filter works independently
- ✅ Multiple filters work together (AND logic)
- ✅ Results update immediately
- ✅ Filter count updates correctly
- ✅ "Clear all filters" button works
- ✅ URL updates with filter parameters

---

### Test 4: Search Functionality

**Steps:**
1. On homepage, locate search bar
2. Type "BMW X5"
3. Press Enter or click search
4. Verify search results page
5. Try searching "Mercedes"
6. Try searching nonsense text "asdfghjkl"

**Expected Results:**
- ✅ Search redirects to vehicles page with query
- ✅ Results match search term
- ✅ Empty state shows when no results
- ✅ Search term persists in search bar

---

### Test 5: Vehicle Details Page

**Steps:**
1. From vehicle listing, click any vehicle card
2. Wait for details page to load
3. Verify all sections are present
4. Test photo gallery:
   - Click next/prev arrows
   - Click on thumbnail images
   - Verify full-size image loads
5. Scroll to view specifications
6. Check dealer information card
7. Click "Contact Dealer" button

**Expected Results:**
- ✅ Vehicle title, price, year displayed
- ✅ Photo gallery works smoothly
- ✅ All vehicle specifications shown
- ✅ Vehicle description readable
- ✅ Dealer card shows: name, rating, badge
- ✅ "Verified Dealer" badge visible
- ✅ Contact button is functional

---

### Test 6: Authentication - Registration

**Steps:**
1. Click "Autentificare" in navigation
2. Click "Register" or "Create Account"
3. Fill in registration form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
4. Select role: "Buyer"
5. Click "Register"
6. Verify redirect to homepage or dashboard

**Expected Results:**
- ✅ Registration form displays correctly
- ✅ Form validation works (email format, password match)
- ✅ Error messages show for invalid input
- ✅ Success message on registration
- ✅ User is logged in automatically
- ✅ Redirect to appropriate page

---

### Test 7: Authentication - Login

**Steps:**
1. If logged in, logout first
2. Click "Autentificare"
3. Enter credentials:
   - Email: buyer1@example.com
   - Password: password
4. Click "Login"
5. Verify successful login

**Expected Results:**
- ✅ Login form displays correctly
- ✅ Form validation works
- ✅ Error message for wrong credentials
- ✅ Success message on login
- ✅ User menu appears in navigation
- ✅ Redirect to homepage or previous page

---

### Test 8: User Menu & Logout

**Steps:**
1. Ensure you're logged in
2. Click on user avatar/name in navigation
3. Verify dropdown menu appears
4. Check menu items:
   - Profile
   - My Vehicles (for dealers)
   - Favorites (if implemented)
   - Settings
   - Logout
5. Click "Logout"
6. Verify logout successful

**Expected Results:**
- ✅ User menu dropdown works
- ✅ Menu shows appropriate items for user role
- ✅ Logout redirects to homepage
- ✅ User is fully logged out
- ✅ Protected pages are inaccessible

---

## 🔌 Backend Testing

### Test 9: API Endpoints

**Using Postman or curl:**

#### 1. Test Vehicle Listing API
```bash
curl http://localhost:8000/api/v1/vehicles
```

**Expected:**
- ✅ Returns JSON array of vehicles
- ✅ Status code: 200
- ✅ Contains 21 vehicles

#### 2. Test Vehicle Details API
```bash
curl http://localhost:8000/api/v1/vehicles/1
```

**Expected:**
- ✅ Returns single vehicle object
- ✅ Status code: 200
- ✅ Contains all vehicle fields

#### 3. Test Filtered Vehicles API
```bash
curl "http://localhost:8000/api/v1/vehicles?make=BMW&fuel_type=Electric"
```

**Expected:**
- ✅ Returns filtered vehicles
- ✅ Results match filters
- ✅ Status code: 200

#### 4. Test Authentication - Register
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@test.com",
    "password": "password",
    "password_confirmation": "password"
  }'
```

**Expected:**
- ✅ Returns user object with token
- ✅ Status code: 201
- ✅ Token is valid

#### 5. Test Authentication - Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "buyer1@example.com",
    "password": "password"
  }'
```

**Expected:**
- ✅ Returns user object with token
- ✅ Status code: 200
- ✅ Token is valid

---

### Test 10: Admin Panel

**Steps:**
1. Navigate to http://127.0.0.1:8000/admin
2. Login with admin credentials:
   - Email: admin@autosite.com
   - Password: password
3. Test each resource:

#### Vehicles Resource
1. Click "Vehicles" in sidebar
2. Verify vehicle list displays
3. Click "New Vehicle"
4. Fill in form and create vehicle
5. Edit a vehicle
6. Delete a test vehicle

#### Users Resource
1. Click "Users" in sidebar
2. Verify user list displays
3. Search for a user
4. View user details
5. Edit user role

#### Dealers Resource
1. Click "Dealers" in sidebar
2. Verify dealer list displays
3. Check dealer verification status
4. View dealer statistics

**Expected Results:**
- ✅ All resources load correctly
- ✅ CRUD operations work
- ✅ Form validation works
- ✅ Success/error messages show
- ✅ Filters and search work
- ✅ Pagination works

---

## 🔗 Integration Testing

### Test 11: End-to-End User Flow

**Buyer Journey:**
1. Land on homepage
2. Search for "BMW"
3. Apply filters: Price 20000-40000
4. Click on a vehicle
5. View details and gallery
6. Click "Contact Dealer"
7. Register/Login if not authenticated
8. Send message to dealer (if messaging implemented)

**Dealer Journey:**
1. Login as dealer
2. Navigate to dashboard
3. Click "Add Vehicle"
4. Fill in vehicle details
5. Upload images
6. Submit vehicle
7. Verify vehicle appears in listings
8. Edit vehicle details
9. View messages (if implemented)

**Expected Results:**
- ✅ Complete flow works without errors
- ✅ Data persists correctly
- ✅ Navigation is intuitive
- ✅ Forms submit successfully
- ✅ Redirects work properly

---

## 📱 Responsive Testing

### Test 12: Mobile Devices

**Steps:**
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on different devices:

#### iPhone 12 Pro (390x844)
- Test homepage layout
- Test vehicle listing
- Test filters (mobile drawer)
- Test navigation menu (hamburger)
- Test vehicle details page

#### iPad (768x1024)
- Test all pages
- Verify tablet-specific layouts
- Check grid columns adjust

#### Desktop (1920x1080)
- Verify full desktop experience
- Check all 3-column grids

**Expected Results:**
- ✅ Layout adapts to screen size
- ✅ No horizontal scroll
- ✅ Touch targets are adequate (44px min)
- ✅ Text is readable
- ✅ Images scale properly
- ✅ Navigation is accessible

### Test 13: Browser Compatibility

**Test in:**
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

**Verify:**
- All features work consistently
- Styling is correct
- No console errors

---

## 🔐 Security Testing

### Test 14: Authentication Security

**Steps:**
1. **Test Protected Routes:**
   - Try accessing /dashboard without login
   - Should redirect to login
   
2. **Test Token Expiry:**
   - Login and get token
   - Wait for token expiry
   - Try accessing protected route
   - Should require re-login

3. **Test CSRF Protection:**
   - Try submitting form without CSRF token
   - Should be rejected

4. **Test SQL Injection:**
   - Try malicious input in search: `' OR '1'='1`
   - Should be sanitized

5. **Test XSS:**
   - Try script injection: `<script>alert('xss')</script>`
   - Should be escaped

**Expected Results:**
- ✅ Protected routes require authentication
- ✅ Expired tokens are rejected
- ✅ CSRF protection works
- ✅ SQL injection prevented
- ✅ XSS attacks prevented

---

## ⚡ Performance Testing

### Test 15: Load Times

**Using Chrome DevTools:**
1. Open Network tab
2. Disable cache
3. Reload homepage
4. Check metrics:
   - DOMContentLoaded: < 1.5s
   - Load: < 2.5s
   - Largest Contentful Paint: < 2.5s

**Test on:**
- Homepage
- Vehicle listing page
- Vehicle details page

### Test 16: Lighthouse Audit

**Steps:**
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

**Target Scores:**
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 90
- SEO: ≥ 95

---

## ✅ Test Checklist

### Frontend Features
- [ ] Homepage loads correctly
- [ ] Vehicle listing displays all vehicles
- [ ] Brand filter works
- [ ] Price range filter works
- [ ] Year filter works
- [ ] Fuel type filter works
- [ ] Transmission filter works
- [ ] Condition filter works
- [ ] Multiple filters work together
- [ ] Search functionality works
- [ ] Vehicle details page displays correctly
- [ ] Photo gallery works
- [ ] Registration works
- [ ] Login works
- [ ] Logout works
- [ ] User menu works
- [ ] Mobile responsive works
- [ ] Tablet responsive works
- [ ] Desktop layout works

### Backend Features
- [ ] API returns vehicles
- [ ] API returns single vehicle
- [ ] API filters work
- [ ] API authentication works
- [ ] API authorization works
- [ ] Admin panel loads
- [ ] Admin can create vehicles
- [ ] Admin can edit vehicles
- [ ] Admin can delete vehicles
- [ ] Admin can manage users
- [ ] Dealer can create vehicles
- [ ] Dealer can edit own vehicles

### Security
- [ ] Protected routes require auth
- [ ] CSRF protection works
- [ ] SQL injection prevented
- [ ] XSS prevented
- [ ] Passwords are hashed
- [ ] Tokens expire properly

### Performance
- [ ] Page load < 2.5s
- [ ] API response < 500ms
- [ ] Images optimized
- [ ] Lighthouse score ≥ 90

---

## 🐛 Bug Reporting Template

If you find a bug during testing, report it using this template:

```markdown
### Bug Title
Brief description of the issue

**Steps to Reproduce:**
1. Step one
2. Step two
3. Step three

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox/Safari
- Screen Size: Desktop/Tablet/Mobile

**Screenshots:**
[Attach if applicable]

**Priority:**
Critical / High / Medium / Low
```

---

## 📊 Testing Report Template

After completing all tests, fill out this report:

```markdown
# Testing Report

**Date:** [Date]
**Tester:** [Name]
**Version:** 1.0.0-mvp

## Summary
- Total Tests: [Number]
- Passed: [Number]
- Failed: [Number]
- Skipped: [Number]

## Test Results

### Frontend
- Homepage: ✅ PASS / ❌ FAIL
- Vehicle Listing: ✅ PASS / ❌ FAIL
- Filters: ✅ PASS / ❌ FAIL
- Search: ✅ PASS / ❌ FAIL
- Vehicle Details: ✅ PASS / ❌ FAIL
- Authentication: ✅ PASS / ❌ FAIL

### Backend
- API Endpoints: ✅ PASS / ❌ FAIL
- Admin Panel: ✅ PASS / ❌ FAIL
- Database: ✅ PASS / ❌ FAIL

### Security
- Authentication: ✅ PASS / ❌ FAIL
- Authorization: ✅ PASS / ❌ FAIL
- Input Validation: ✅ PASS / ❌ FAIL

### Performance
- Load Times: ✅ PASS / ❌ FAIL
- Lighthouse Score: [Score]

## Issues Found
1. [Issue description]
2. [Issue description]

## Recommendations
- [Recommendation 1]
- [Recommendation 2]

## Overall Status
✅ READY FOR PRODUCTION / ⚠️ NEEDS FIXES / ❌ NOT READY
```

---

## 🎯 Success Criteria

The MVP is considered **READY FOR PRODUCTION** when:

✅ All critical tests pass  
✅ No critical bugs found  
✅ Performance targets met  
✅ Security tests pass  
✅ Responsive design works  
✅ User flows complete successfully  

---

## 📞 Support

If you encounter issues during testing:
- Check [TROUBLESHOOTING](./README_QUICK.md#-quick-troubleshooting) section
- Review [MVP_COMPLETE.md](./MVP_COMPLETE.md) documentation
- Contact development team

---

**Happy Testing! 🎉**

*Last Updated: October 25, 2025*
