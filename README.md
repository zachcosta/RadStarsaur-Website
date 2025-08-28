# RadStarsaur Art Portfolio

A modern, responsive art portfolio website built with React that showcases digital artwork in an elegant grid layout with full-scale image viewing capabilities.

## Features

- **Responsive Grid Layout**: Displays artwork in a beautiful, responsive grid that adapts to different screen sizes
- **Square Cropped Thumbnails**: All artwork is displayed as square thumbnails for consistent visual presentation
- **Full-Scale Image Viewing**: Click any artwork to view it at full scale in a modal overlay
- **Artwork Metadata**: Each piece includes a name, description, and category
- **Modern UI/UX**: Clean, modern design with smooth animations and hover effects
- **Loading States**: Skeleton loading animations while images load
- **Keyboard Navigation**: Press ESC to close the modal
- **Mobile Optimized**: Fully responsive design that works great on all devices

## Artwork Structure

The website automatically displays all PNG files from the `public/Artworks/` directory. Each artwork can be customized with:

- **Name**: Display name for the artwork
- **Alt Text**: Descriptive text for accessibility
- **Category**: Artwork category (e.g., Character, Monster, Conceptual)

## Local Development

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd RadStarsaur-Website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Adding New Artwork

1. Add your artwork files to the `public/Artworks/` directory
2. Update the `src/artworkData.js` file to include metadata for your new artwork:

```javascript
{
  id: 17,
  filename: 'YourNewArtwork.png',
  name: 'Your Artwork Name',
  altText: 'Description of your artwork for accessibility',
  category: 'Your Category'
}
```

## Deployment with AWS Amplify

This project is configured for easy deployment on AWS Amplify.

### Automatic Deployment

1. Connect your GitHub repository to AWS Amplify
2. Amplify will automatically detect the React app and use the `amplify.yml` configuration
3. Every push to your main branch will trigger a new deployment

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting service

## Project Structure

```
├── public/
│   ├── Artworks/          # Artwork images
│   └── index.html         # Main HTML file
├── src/
│   ├── components/        # React components
│   │   ├── ArtworkCard.js
│   │   ├── ArtworkGrid.js
│   │   └── ImageModal.js
│   ├── App.js            # Main app component
│   ├── App.css           # Main app styles
│   ├── artworkData.js    # Artwork metadata
│   ├── index.js          # React entry point
│   └── index.css         # Global styles
├── amplify.yml           # AWS Amplify configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## Customization

### Styling

- Modify `src/App.css` for header and main layout styles
- Update `src/components/ArtworkCard.css` for grid item styling
- Edit `src/components/ImageModal.css` for modal appearance

### Artwork Data

Edit `src/artworkData.js` to:
- Change artwork names and descriptions
- Add new categories
- Reorder artwork display
- Add additional metadata fields

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- Lazy loading of images
- Optimized image loading with skeleton states
- Responsive images that scale appropriately
- Efficient modal rendering

## License

This project is open source and available under the [MIT License](LICENSE).
