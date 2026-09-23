# Bhanu Portfolio

A responsive cinematic portfolio for Bhanu, built with HTML5, CSS3 and vanilla JavaScript.

## Folder structure

```text
bhanu-portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   ├── videos/
│   ├── icons/
│   └── fonts/
└── README.md
```

## Personal customization

- **Your name:** edit the brand text and page title in `index.html`.
- **Your photo:** put your photo at `assets/images/bhanu.jpg`. The About section already points there.
- **Project thumbnails:** add images to `assets/images/`, then update `.thumb-one` through `.thumb-six` in `css/style.css`.
- **Project videos:** put videos in `assets/videos/` and update the `WATCH VIDEO` links in the project modal in `index.html`.
- **Add projects:** duplicate a `.project-card` in `index.html`, update its `data-category`, `data-title`, `data-description`, `data-software`, title and thumbnail class.
- **Social links:** update the Instagram, YouTube and WhatsApp `href` values in the Contact section.
- **Email:** replace `hello@bhanuvistas.com` in the Contact section with your real email.
- **Fonts:** the current design uses Google Fonts. Optional local fonts can go in `assets/fonts/`.

The contact form validates in the browser only. It does not send email without a backend or form service.
