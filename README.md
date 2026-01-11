# Porthat

A modern, customizable portfolio template built with TanStack Start and React 19. Configure everything from a single JSON file and deploy in minutes.

![Porthat](public/assets/ogimg.png)

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | TanStack Start (React 19) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Language | TypeScript |
| Build | Vite 7 |

## Features

**Configuration**
- Single-file setup via `data.json`
- 6 built-in theme presets
- Custom themes via Coolors.co URLs
- Light and dark mode with animated transitions

**Components**
- Hero section with avatar, banner, and social links
- Auto-scrolling skill carousel
- GitHub contribution chart integration
- Spotify now playing widget
- Expandable experience and education sections
- Project cards with gradient hover effects
- Blog section with reading time estimates
- Footer with rotating quotes

**Technical**
- Responsive mobile-first design
- SEO optimized with Open Graph meta tags
- View Transitions API for smooth theme switching
- Sections auto-collapse when items exceed 4

## Quick Start

```bash
git clone https://github.com/pixperk/porthat.git
cd porthat
npm install
npm run dev
```

Open http://localhost:3000 to view your portfolio.

## Configuration

Edit `src/data/data.json` to customize your portfolio:

```json
{
  "theme": "monochrome",
  "github": "your-github-username",
  "illustration": false,
  "profile": {
    "name": "Your Name",
    "handle": "username",
    "avatar": "https://...",
    "banner": "https://...",
    "bio": "Your bio here",
    "location": "City, Country",
    "resumeUrl": "https://...",
    "email": "you@email.com"
  },
  "roles": ["Developer", "Designer"],
  "socials": [...],
  "skills": [...],
  "experience": [...],
  "education": [...],
  "projects": [...],
  "blogs": [...],
  "quotes": [...]
}
```

### Profile Fields

| Field | Description |
|-------|-------------|
| name | Display name |
| handle | Username shown in footer |
| avatar | Profile picture URL |
| banner | Header background image URL |
| bio | Short description |
| location | Your location |
| resumeUrl | Link to resume/CV |
| email | Contact email |

### Skills

```json
{
  "name": "TypeScript",
  "icon": "code",
  "color": "#3178C6"
}
```

Available icons: `brain`, `target`, `crown`, `trophy`, `gamepad`, `message`, `mic`, `eye`, `code`, `database`, `globe`, `server`, `terminal`, `zap`

### Experience

```json
{
  "company": "Company Name",
  "role": "Your Title",
  "type": "Full-time",
  "period": "2022 - Present",
  "location": "Remote",
  "details": [
    "Achievement or responsibility",
    "Another bullet point"
  ]
}
```

### Education

```json
{
  "institution": "University Name",
  "degree": "Bachelor's Degree",
  "field": "Computer Science",
  "period": "2018 - 2022",
  "location": "City, Country",
  "grade": "3.8 GPA",
  "details": ["Relevant coursework", "Activities"]
}
```

### Projects

```json
{
  "id": "1",
  "title": "Project Name",
  "slug": "project-slug",
  "description": "What the project does",
  "image": "https://...",
  "tags": ["React", "TypeScript"],
  "github": "https://github.com/...",
  "demo": "https://...",
  "featured": true
}
```

### Blog Posts

```json
{
  "slug": "post-slug",
  "title": "Post Title",
  "date": "2024-01-15",
  "excerpt": "Brief summary",
  "tags": ["Topic"],
  "coverImage": "https://...",
  "readingTime": "5 min"
}
```

## Themes

Set the `theme` field in `data.json` to any preset name.

### Ocean

![Ocean](public/assets/themes/ocean.png)

### Midnight

![Midnight](public/assets/themes/midnight.png)

### Sunset

![Sunset](public/assets/themes/sunset.png)

### Forest

![Forest](public/assets/themes/forest.png)

### Rose

![Rose](public/assets/themes/rose.png)

### Monochrome

![Monochrome](public/assets/themes/monochrome.png)

### Custom Themes

Create a palette on [Coolors.co](https://coolors.co) and use the URL programmatically:

```typescript
const { setCustomTheme } = useTheme();
setCustomTheme("https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51");
```

Colors map to: `primary`, `secondary`, `accent`, `highlight`, `muted`

## Spotify Integration

Display your currently playing or last played track with the Spotify widget.

### Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new application
3. Add `http://localhost:3000/callback` to Redirect URIs
4. Copy your Client ID and Client Secret

### Get Refresh Token

1. Open this URL in your browser (replace `YOUR_CLIENT_ID`):

```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-read-currently-playing%20user-read-recently-played
```

2. After authorizing, you'll be redirected to a URL like:
```
http://localhost:3000/callback?code=AUTHORIZATION_CODE
```

3. Exchange the code for a refresh token:

```bash
curl -X POST https://accounts.spotify.com/api/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=AUTHORIZATION_CODE" \
  -d "redirect_uri=http://localhost:3000/callback" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET"
```

4. Copy the `refresh_token` from the response.

### Environment Variables

Create a `.env` file in your project root:

```env
VITE_SITE_URL=https://your-domain.com
VITE_SPOTIFY_CLIENT_ID=your_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
VITE_SPOTIFY_REFRESH_TOKEN=your_refresh_token
```

`VITE_SITE_URL` is used for OG meta tags and should be your production domain. The Spotify widget will automatically show your currently playing track, or your last played track if nothing is playing.

## Demo Mode

Set `"illustration": true` in `data.json` to enable the demo panel:

- Preview all theme presets live
- Toggle between light and dark modes
- View complete feature list
- Access documentation

Set to `false` before deploying to production.

## Deployment

### Vercel

```bash
npm run build
vercel deploy
```

### Netlify

```bash
npm run build
netlify deploy --prod
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Project Structure

```
src/
  components/portfolio/
    Hero.tsx            Profile header with avatar and socials
    Experience.tsx      Work history with expandable details
    Education.tsx       Academic background
    Projects.tsx        Project cards with gradient hover
    Blog.tsx            Blog post listings
    SkillSlider.tsx     Auto-scrolling skill carousel
    GitHubChart.tsx     GitHub contribution graph
    SpotifyWidget.tsx   Now playing widget
    Footer.tsx          Quotes and credits
    IllustrationOverlay.tsx   Demo mode panel
  context/
    ThemeContext.tsx    Theme state management
  lib/
    themes.ts           Theme presets and utilities
    constants.ts        Animation variants
  types/
    portfolio.ts        TypeScript interfaces
  data/
    data.json           Portfolio content
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server on port 3000 |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests with Vitest |

## License

MIT
