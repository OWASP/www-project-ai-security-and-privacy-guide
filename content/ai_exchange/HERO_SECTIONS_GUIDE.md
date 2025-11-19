# Hero Section Templates

This guide explains how to use the reusable hero section shortcodes for the OWASP AI Exchange website.

## Available Templates

### 1. Dark Hero Section (`hero-section.html`)
A full-width dark gradient hero section with network graphics background.

**Usage:**
```
{{< hero-section 
  title="Connect with us" 
  subtitle="Engage with the OWASP AI team through various platforms." 
  button_text="Let's connect" 
  button_link="#platforms" 
>}}
```

**Parameters:**
- `title` - Main heading text (default: "Welcome")
- `subtitle` - Descriptive text below the title (default: "Discover more about our mission")
- `button_text` - Text for the call-to-action button (default: "Get Started")
- `button_link` - Link/anchor for the button (default: "#")

### 2. Light Hero Section (`hero-section-light.html`)
A full-width light gradient hero section for pages that need a lighter theme.

**Usage:**
```
{{< hero-section-light 
  title="About Us" 
  subtitle="Learn more about our mission and values." 
  button_text="Learn More" 
  button_link="/about" 
>}}
```

**Parameters:**
- Same as dark hero section

## Key Features

### Full Width Design
- Uses `w-screen` and negative margins to break out of any container constraints
- Truly full width on all screen sizes, including high-resolution displays

### Responsive Typography
- Scales appropriately for different screen sizes
- Special handling for high-resolution displays (1536px+, 1920px+)

### Interactive Elements
- Hover effects on buttons with scale transforms
- Smooth transitions and shadow effects

### Decorative Elements
- Subtle network/graphic patterns in the background
- Floating geometric shapes for visual interest

## Examples

### Connect Page
```
{{< hero-section 
  title="Connect with us" 
  subtitle="Engage with the OWASP AI team through various platforms." 
  button_text="Let's connect" 
  button_link="#platforms" 
>}}
```

### About Page
```
{{< hero-section-light 
  title="About OWASP AI Exchange" 
  subtitle="Your comprehensive guide to AI security and privacy." 
  button_text="Explore Content" 
  button_link="/docs" 
>}}
```

### Home Page
```
{{< hero-section 
  title="The Ultimate AI Security Guide" 
  subtitle="Access to 200+ pages of practical guidance on protecting AI and data-centric systems." 
  button_text="Explore the Content" 
  button_link="/docs/ai_security_overview/#how-to-use-this-document" 
>}}
```

## Styling Notes

- Both templates use Tailwind CSS classes
- Custom CSS is included for gradients and high-resolution scaling
- The hero sections are designed to be completely independent of page containers
- All decorative elements are positioned absolutely and won't interfere with content flow
