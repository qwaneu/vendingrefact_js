#legacy vending machine exercise in javascript

#Installation

I wanted:
npm version 1.2.18 installed by 
node 0.10.5, but the last one is broken, see issue
https://github.com/busterjs/buster/issues/346 and the closed one
referred to in there, I got the same error

mac: brew remove node, brew install node

installing node 0.8.6 by hand:
(inspired by
http://stackoverflow.com/questions/3987683/homebrew-install-specific-version-of-formula
'simple workflow' ) 
brew install node
brew versions node

pick the commit for 0.8.6, cd to the directory listed in 'brew versions'
output, git checkout -b node0.8.6 <commitId from brew versions>
brew unlink
brew install

then install npm by hand (seemed to be necessary)

curl https://npmjs.org/install.sh | sh

and in your project:
npm install buster


(did not do -g for global, npm keeps things per project, so we can avoid
version hell)

we might look into nvm (like rvm, but running on the same machine might
cause conflicts) :
http://stackoverflow.com/questions/11284634/upgrade-nodejs-to-the-latest-version-on-mac-os
