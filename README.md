<p align="center">
    <img width="192" alt="Hack Club logo" src="https://assets.hackclub.com/flag-standalone.svg">
</p>
<h1 align="center">
    The <a href="https://slack.hackclub.com/">Hack Club Slack Landing Page!</a>
</h1>

# Welcome to Hack Club!

This is our Slack landing page for brand new users! 

## Development

```bash
npm install --legacy-peer-deps
npm run dev
```

## Production Build

```bash
npm run build
npm start
```

## Docker

```bash
docker build -t slack-hackclub-com .
docker run -p 3000:3000 slack-hackclub-com
```
