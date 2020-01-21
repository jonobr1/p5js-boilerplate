# navigate into the build output directory
cd public

# if you are deploying to a custom domain
# echo 'expressing-kandinsky.net' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:jonobr1/p5js-boilerplate.git master:gh-pages

cd -
