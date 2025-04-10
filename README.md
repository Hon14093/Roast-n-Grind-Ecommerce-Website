# Roast & Grind

### Cloning repo:
```
git init
git clone https://github.com/Hon14093/Roast-n-Grind-Ecommerce-Website
git checkout -b <branch_name>
git add .
git commit -m <message>
git push -u origin <branch_name>
```

### Frontend Set up:
```
cd client
npm install
npx shadcn@latest init
npm run dev
```

### Backend Set up:
```
cd server
npm install
npx prisma db pull
npx prisma generate
npm start
```
