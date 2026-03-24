const fs = require('fs');

const content = `{
  "$schema": "https://mintlify.com/docs.json",
  "theme": "mint",
  "name": "Trinity Indonesia server Minecraft Anarchy RPG",
  "modeToggle": {
    "default": "light",
    "isHidden": true
  },
  "colors": {
    "primary": "#EA580C",
    "light": "#F97316",
    "dark": "#EA580C"
  },
  "favicon": "/favicon.ico",
  "navigation": {
    "groups": [
      {
        "group": "Mulai",
        "pages": [
          "index"
        ]
      }
    ]
  },
  "logo": {
    "light": "/logo/logo.webp",
    "dark": "/logo/logo.webp"
  },
  "navbar": {
    "links": [
      {
        "label": "Discord",
        "href": "https://discord.trinityindonesia.cc"
      }
    ],
    "primary": {
      "type": "button",
      "label": "Main Sekarang",
      "href": "https://store.trinityindonesia.cc/connect"
    }
  },
  "footer": {
    "socials": {
      "x": "https://x.com/mintlify",
      "github": "https://github.com/mintlify",
      "linkedin": "https://linkedin.com/company/mintlify"
    }
  }
}`;

fs.writeFileSync('docs.json', content, { encoding: 'utf8' });
console.log('Successfully rewrote docs.json as UTF-8.');
