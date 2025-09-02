# Custom Thumbnail Cropping Guide

## Overview
The gallery now supports custom crop center coordinates for each artwork thumbnail. This allows you to control exactly which part of an image is visible in the thumbnail preview.

## How It Works
Each artwork in `src/artworkData.js` can now have a `cropCenter` property that specifies the x,y coordinates for cropping.

## Coordinate System
- **X-axis**: Left (0%) to Right (100%)
- **Y-axis**: Top (0%) to Bottom (100%)
- **Center**: 50% for both x and y

## Examples

### Default Center Crop
```javascript
{
  id: 1,
  filename: 'example.png',
  name: 'Example Artwork',
  category: 'Example',
  // No cropCenter specified - defaults to center (50% 50%)
}
```

### Custom Crop Positions
```javascript
{
  id: 2,
  filename: 'character.png',
  name: 'Character Portrait',
  category: 'Character',
  cropCenter: { x: '50%', y: '30%' } // Focus on upper center (good for faces)
}
```

```javascript
{
  id: 3,
  filename: 'landscape.png',
  name: 'Landscape',
  category: 'Landscape',
  cropCenter: { x: '70%', y: '60%' } // Focus on right side, lower portion
}
```

```javascript
{
  id: 4,
  filename: 'action.png',
  name: 'Action Scene',
  category: 'Action',
  cropCenter: { x: '30%', y: '40%' } // Focus on left side, upper portion
}
```

## Common Use Cases

### Character Artworks
- **Face focus**: `{ x: '50%', y: '30%' }` - Centers on the upper portion
- **Full body**: `{ x: '50%', y: '50%' }` - Centers on the middle

### Landscape Artworks
- **Left side focus**: `{ x: '25%', y: '50%' }` - Shows left portion
- **Right side focus**: `{ x: '75%', y: '50%' }` - Shows right portion

### Action Scenes
- **Upper action**: `{ x: '50%', y: '25%' }` - Focuses on upper portion
- **Lower action**: `{ x: '50%', y: '75%' }` - Focuses on lower portion

## How to Customize

1. Open `src/artworkData.js`
2. Find the artwork you want to customize
3. Add or modify the `cropCenter` property
4. Use percentage values (0% to 100%) for both x and y
5. Save the file and refresh your gallery

## Tips for Best Results

- **Test different values**: Start with small adjustments (e.g., 40% instead of 50%)
- **Consider the thumbnail size**: The crop will be more noticeable on smaller thumbnails
- **Balance composition**: Think about what's most important in each artwork
- **Use preview tools**: Some image editors can show you what different crop positions look like

## Technical Details

- The feature uses CSS `object-position` property
- Coordinates are applied as inline styles for maximum compatibility
- If no `cropCenter` is specified, it defaults to center (50% 50%)
- Works with both images and video files
- Responsive and works across all device sizes

