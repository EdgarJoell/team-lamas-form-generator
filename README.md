# TeamLamasFormGenerator

## Purpose
This project was a gift for my wife's parents that are truckers who do long-hauls across the country. 
They have to fill out these fillable PDF forms that were super difficult for them to use on their phones.
They're not super tech-savvy so filling out a PDF is already hard, then doing it on 
a little iPhone 16 screen is even harder for them.

This web app was designed for them to fill out the minimum necessary information for their forms
in a really easy format. They pick whichever PDF variant they need for that moment,
quickly fill out the needed info, then generate a completed PDF form for them to send to their employer.

This app has since then made their lives a lot easier especially when they can use this app completely offline. Yes,
you read that correctly. This app can be used completely disconnected from the internet. Since they're over-the-road
truckers, they hit signal dead zones often so the offline capability really saves their skins whenever they have to 
make these forms before arriving at their destinations. 

## Architecture
1) Front-End only web app that uses Angular without SSR.
2) No back-end meaning I can host it for free on GitHub Pages.
3) Utilizes the "Angular PWA" NPM package to handle the offline functionality via Service Workers.
4) Include passcode verification with bcrypt encryption to ensure only they can create these forms.
5) Utilizes the PDF library (pdf-lib package) to do all PDF modification and creation.
6) (Future plan) Includes GitHub Actions to automate deployment to GitHub Pages once features get merged to main branch.

## Example Usage
