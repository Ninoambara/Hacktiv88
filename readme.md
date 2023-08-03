mock up website dapat dilihat di bagian sini:
https://www.canva.com/design/DAFnxa8rd9k/TsZTGd-jV7GeD55E7NlQxg/edit

Standup bisa dilihat dari sini:
https://docs.google.com/spreadsheets/d/1viE2f2dHPKGqcDvmqoRcHg4gFWqrKtM0OYOd7VkUcdY/edit#gid=110979658

Deadline: Jumat jam 9 <---- persentasi project
namun deadline pribadi jam 9 malam, Kamis: 06 July 2023

framework dasar:
npm init -y
npm i pg express ejs sequelize pg-hstore
npm install --save-dev sequelize-cli
npx sequelize-cli init
.gitignore node_modules
mkdir controller views routes data
setting config
setting migrations
add migrations skeleton untuk add column pdfLink
setting seeder
setting file app.js, index.js (controller) dan index.js (routes)