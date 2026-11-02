
# Personal Portfolio Website

## Project overview

This project is a responsive, multi-page personal portfolio website
created using HTML5, CSS3 and JavaScript.

It presents a developer's introduction, background, technical skills,
projects and contact information in an organised and accessible format.

## Purpose and user value

The purpose of the website is to showcase programming skills and
development work to prospective employers, clients and collaborators.

Visitors can:
- Learn about the developer's background and skills.
- Browse example projects and their technologies.
- Filter projects by category.
- Navigate between separate pages.
- Use a contact form with browser-side validation.
- Access the site on desktop, tablet and mobile devices.

## Technologies used

- HTML5 for semantic page structure.
- CSS3 for responsive styling and layout.
- JavaScript for navigation, project filtering and form validation.
- Git and GitHub for version control.
- GitHub Pages for static website hosting.

No external CSS or JavaScript libraries are required.

## Project structure

```text
personal-portfolio/
├── index.html
├── about.html
├── projects.html
├── contact.html
├── css/
│   └── style.css
├── Javascript/
│   └── script.js
├── js/
│   └── script.js
├── assets/
│   └── images/
│       └── profile.jpg
├── README.md
└── testing.md
```

## Setup instructions

1. Download or clone this repository.
2. Open the project folder in a code editor.
3. Add your profile image to `assets/images/`.
4. Replace example personal details, email addresses and social links.
5. Open `index.html` in a browser, or run a local development server.
6. Test all pages and interactive features before deployment.

## Accessibility and responsive design

The website uses semantic HTML, labelled form fields, keyboard focus
indicators, a skip link, descriptive image alt text and accessible
navigation controls.

Responsive CSS adapts the layout to different screen sizes.
Reduced-motion preferences are respected.

Accessibility should be verified through manual testing and
automated tools; the presence of these features does not guarantee
full compliance.

## Testing

Testing procedures, findings, and corrections are documented in
[testing.md](testing.md).

HTML can be checked with the W3C Markup Validation Service:
https://validator.w3.org/

CSS can be checked with the W3C CSS Validation Service:
https://jigsaw.w3.org/css-validator/

## Version control

Git is used to track changes throughout development.

Example commands:

```bash
git init
git add .
git commit -m "Initial portfolio structure"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Commit regularly using descriptive messages.

## Deployment with GitHub Pages

1. Push the project to a GitHub repository.
2. Open the repository's Settings.
3. Select Pages.
4. Choose deployment from a branch.
5. Select `main` and the root folder.
6. Save the settings.
7. Wait for GitHub Pages to publish the website.
8. Open the published URL and test every page.

GitHub Pages documentation:
https://docs.github.com/en/pages

## Contact form limitation

The contact form performs browser-side validation only.
It does not send emails or save submitted information.
A suitable form-handling service or backend must be configured
before the form can deliver messages.

## Credits and attribution

The HTML, CSS and JavaScript in this project were written for this
portfolio project. No third-party libraries are required.

Record any external images, code snippets, tutorials or assets
you introduce here, including the original source URL and licence.
Use only assets you have permission to publish.
