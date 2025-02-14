# MusicStream

## Overview

MusicStream is a modern web application for streaming and organizing music, built with Angular 17. The application provides an intuitive user experience with advanced features like state management using NgRx, audio playback controls, and responsive design. It also supports local data persistence via IndexedDB, ensuring offline functionality.

---
![Screenshot from 2025-02-14 09-52-08](https://github.com/user-attachments/assets/906de5ae-ed96-4a21-8c12-0cb1b6a054e6)

---
## Features

### Core Features

- **Track Management (CRUD):**

  - Add, update, delete, and view tracks.
  - Tracks include:
    - Song name
    - Artist name
    - Optional description (max 200 characters)
    - Date added (automatic)
    - Duration (calculated automatically)
    - Music category (e.g., Pop, Rock, Rap, etc.)

- **Audio Player:**

  - Controls for play, pause, next, and previous.
  - Volume and progress control.
  - Playback states managed using NgRx (`playing`, `paused`, `buffering`, etc.).

- **Data Persistence:**

  - Store metadata and audio files in IndexedDB.
  - Support for MP3, WAV, and OGG formats (max file size: 15MB).

- **Responsive Design:**

  - Adapted for mobile, tablet, and desktop screens.

### Bonus Features

- Cover images for tracks.
- Drag-and-drop functionality for reordering tracks.
- Integration with a song lyrics API.
- Advanced filters for track search.

---

## Technical Stack

- **Frontend Framework:** Angular 17
- **State Management:** NgRx
- **Persistence:** IndexedDB
- **Styling:** TailwindCSS&#x20;
- **Additional Libraries:**
  - RxJS
  - Web Audio API
  - Jasmine/Karma for testing
- **Tools:**
  - Figma for mockups
  - Docker for containerization

---

## Installation and Setup

### Prerequisites

- Node.js (>= 18.x)
- Angular CLI (>= 17.x)
- A modern web browser

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/bachiriy/MusicStream.git
   ```

2. Navigate to the project directory:

   ```bash
   cd app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   ng serve
   ```

5. Open the application in your browser:

   ```
   http://localhost:4200
   ```

---

## Project Structure

```plaintext
src/
├── app/
│   ├── components/       # UI components
│   ├── services/         # API and application logic
│   ├── state/            # NgRx actions, reducers, effects
│   ├── modules/          # Modular feature implementations
│   ├── pages/            # Application pages
├── assets/               # Static files (images, etc.)
├── environments/         # Environment-specific configurations
```

---

## Usage

### Add a Track

1. Navigate to the Library page.
2. Click on "Add Track".
3. Fill out the form and upload a valid audio file (MP3, WAV, OGG).
4. Submit the form to save the track.

### Play a Track

1. Navigate to the Library page.
2. Select a track to open the detailed view.
3. Use the audio player controls to play or pause the track.

### Search and Filter Tracks

1. Use the search bar on the Library page to find tracks by name or category.

---

## Testing

Run unit tests using Jasmine/Karma:

```bash
ng test
```

---

## Deployment

Build the application for production:

```bash
ng build --prod
```

Serve the application using any static server:

```bash
npx serve dist/app
```

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact



For inquiries, please contact [[Me](mailto\:medbachiry@example.com)].

### Figma
[Figma Link](https://www.figma.com/design/FF15DHpq7n2le4FXC9MaJd/MusicStream?node-id=0-1&t=qwOW82Py0sqxNkhW-1)


### Jira 
[Jira Link](https://www.figma.com/design/FF15DHpq7n2le4FXC9MaJd/MusicStream?node-id=0-1&t=qwOW82Py0sqxNkhW-1)
