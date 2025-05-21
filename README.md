# Website Fix Documentation

## Issue Fixed
This update fixes the glitchy black line effect that was expanding from the top of the page during scrolling.

## Changes Made
The issue was caused by the JavaScript parallax effect that was modifying the hero section's background position during scrolling. This effect, combined with the hero section's overlay, was creating the unwanted black line that expanded during scrolling.

### Modified Files:
- `js/script.js`: Disabled the `initParallaxEffect` function that was causing the issue

### Technical Details:
The original code was modifying the `backgroundPositionY` of the hero section based on scroll position:
```javascript
// Original problematic code
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
}
```

This was changed to:
```javascript
// Fixed code
function initParallaxEffect() {
    // Function intentionally left empty to prevent the black line scrolling glitch
    // Original code was modifying backgroundPositionY on scroll which caused the issue
}
```

Additionally, the event listener that was calling this function on page load was commented out.

## Testing
The fix has been tested by scrolling through the entire page, and the black line effect no longer appears.
