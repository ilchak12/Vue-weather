npm run build

cd dist

git init
git add .
git commit -m "Init deploy"
git push -f https://github.com/ilchak12/Get-Weather.git master

cd -