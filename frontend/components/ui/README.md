# 🎨 UI Components Library

Professional, reusable UI components built with React, TypeScript, and Tailwind CSS for the AUTOSITE platform.

## 📦 Components

### Button
Versatile button component with multiple variants and states.

**Variants:** primary, secondary, outline, ghost, danger, success  
**Sizes:** sm, md, lg, xl

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>

<Button variant="primary" loading leftIcon={<Icon />}>
  Loading...
</Button>
```

### Card
Flexible card container with sub-components for structured content.

**Variants:** default, hover, featured, gradient, bordered  
**Sub-components:** CardHeader, CardTitle, CardDescription, CardContent, CardFooter

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

<Card variant="hover" hoverable>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

### Input
Form input component with labels, error states, and icons.

```tsx
import { Input } from '@/components/ui';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

<Input
  label="Search"
  placeholder="Search vehicles..."
  leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
  error={errors.search}
  fullWidth
/>
```

### Select
Dropdown select component with custom styling.

```tsx
import { Select } from '@/components/ui';

<Select
  label="Vehicle Type"
  options={[
    { value: 'car', label: 'Car' },
    { value: 'truck', label: 'Truck' }
  ]}
  fullWidth
/>
```

### Badge
Small status or category indicator.

**Variants:** default, primary, success, warning, danger, info  
**Sizes:** sm, md, lg

```tsx
import { Badge } from '@/components/ui';

<Badge variant="success" dot>
  Active
</Badge>
```

### Alert
Contextual feedback messages.

**Variants:** info, success, warning, error

```tsx
import { Alert } from '@/components/ui';

<Alert variant="success" title="Success!" closable onClose={handleClose}>
  Your changes have been saved.
</Alert>
```

### Modal
Dialog overlay for focused content.

**Sizes:** sm, md, lg, xl, full

```tsx
import { Modal } from '@/components/ui';
import { Button } from '@/components/ui';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  footer={
    <>
      <Button variant="outline" onClick={handleClose}>Cancel</Button>
      <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
    </>
  }
>
  Are you sure you want to continue?
</Modal>
```

### Skeleton
Loading placeholder components.

**Variants:** text, circular, rectangular  
**Presets:** SkeletonCard, SkeletonVehicleCard, SkeletonList

```tsx
import { Skeleton, SkeletonVehicleCard } from '@/components/ui';

<Skeleton variant="text" width="80%" />
<SkeletonVehicleCard />
```

## 🎨 Design Tokens

### Colors
- **Primary**: Blue gradient (#2563eb to #06b6d4)
- **Accent**: Cyan (#06b6d4)
- **Status Colors**: Success (green), Warning (yellow), Error (red), Info (blue)

### Spacing
Based on 4px increments: xs (4px), sm (8px), md (16px), lg (24px), xl (32px)

### Animations
- Fade in/out
- Slide (up, down, left, right)
- Blob animation (for backgrounds)
- Shimmer (for loading states)

## 🚀 Usage

```tsx
// Import individual components
import { Button, Card, Input } from '@/components/ui';

// Use in your components
const MyComponent = () => {
  return (
    <Card variant="hover">
      <Input label="Email" type="email" />
      <Button variant="primary" fullWidth>
        Submit
      </Button>
    </Card>
  );
};
```

## 📝 Best Practices

1. **Consistency**: Use these components across the entire application for visual consistency
2. **Accessibility**: All components include proper ARIA labels and keyboard navigation
3. **Responsive**: Components are mobile-first and work on all screen sizes
4. **Theming**: Colors and spacing use Tailwind tokens for easy theming
5. **Performance**: Components are optimized with proper memoization

## 🔧 Customization

Components accept standard HTML props and can be customized with className:

```tsx
<Button className="custom-class" variant="primary">
  Custom Button
</Button>
```

## 📚 Related Files

- **Tailwind Config**: `/frontend/tailwind.config.ts` - Custom theme, animations, colors
- **Global Styles**: `/frontend/app/globals.css` - Base styles and CSS custom properties
- **Design System**: `/DESIGN_SYSTEM.md` - Complete design guidelines

## 🎯 Future Enhancements

- [ ] Checkbox component
- [ ] Radio component
- [ ] Textarea component
- [ ] Tooltip component
- [ ] Dropdown menu component
- [ ] Tabs component
- [ ] Accordion component
- [ ] Pagination component
- [ ] DatePicker component
- [ ] Toast notification system

---

**Built with ❤️ for AUTOSITE**  
*Last Updated: October 27, 2025*
