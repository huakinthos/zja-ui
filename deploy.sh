npm run docs:build

cd examples/.vuepress/dist

git init
git add .
git commit -m 'deploy'

git push -f git@github.com:ruaya/zja-ui.git master