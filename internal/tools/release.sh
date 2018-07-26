#!/usr/bin/env bash

set -e # exit when error

printf '\n\e[1;34m%-6s\e[m\n' "Releasing..."

if ! npm owner ls | grep -q "$(npm whoami)"
then
  printf '\n\e[1;91m%-6s\e[m\n' "[Release]: Not an owner of the npm repo, ask a contributor for access"
  exit 1
fi

currentBranch=`git rev-parse --abbrev-ref HEAD`
if [ $currentBranch != 'master' ]; then
  printf '\n\e[1;91m%-6s\e[m\n' "[Release]: You must be on Master"
  exit 1
fi

if [[ -n $(git status --porcelain) ]]; then
  printf '\n\e[1;91m%-6s\e[m\n' "[Release]: Working tree is not clean (git status)"
  exit 1
fi

printf "\n\n[Release]: update working tree"
git pull origin master
git fetch origin --tags

printf "[Release]: yarn"
yarn

currentVersion=`cat package.json | ./node_modules/.bin/json version`

# header
printf "\n\n[Release]: current version is \e[92m %s \033[0m" $currentVersion
printf "\n[Release]: a changelog will be generated only if a fix/feat/performance/breaking token is found in git log"
printf "\n[Release]: you must choose a new ve.rs.ion (semver)"
printf "\n[Release]: press q to exit the next screen\n\n"

# preview changelog
read -p "=> [Release]: press [ENTER] to view changes since latest version.."

./node_modules/.bin/conventional-changelog --preset angular --output-unreleased | less

# choose and bump new version
# printf "\n\nRelease: Please enter the new chosen version > "
printf "\n=> [Release]: please type the new chosen version > "
read -e newVersion

npm version "$newVersion" --no-git-tag-version

# update changelog
printf "\n\n[Release]: update changelog"
./node_modules/.bin/conventional-changelog --preset angular --infile CHANGELOG.md --same-file

# git add and tag
commitMessage="release v$newVersion
See https://github.com/tillersystems/tiller-eslint-config/blob/master/CHANGELOG.md"
git add package.json CHANGELOG.md README.md
printf %s "$commitMessage" | git commit --file -
git tag "v$newVersion"

printf "\n\n[Release]: almost done.\n"
read -p "=> Release: when ready, press [ENTER] to push to github and publish the package"

printf "\n\n[Release]: push to github, publish on npm\n"
git push origin master
git push origin --tags

npm publish

printf "\n\n[Release]:
🦄 Package was published to npm.\n\n"
