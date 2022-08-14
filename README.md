# knnc



This README.md will be added later

Requirements:  
1. Linux, macOS or Windows with WSL2
2. dfx version 0.11.1
3. nodejs version 16


Install nvm   
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```   
or   
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

then    
```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

Install nodejs v16
```
nvm install --lts
```

Install dfx version 0.11.1:  
```
DFX_VERSION=0.11.1 sh -ci "$(curl -sSL https://internetcomputer.org/install.sh)"
```

Clone the project:   
``` 
git clone https://github.com/DieuNN/knnc.git
 ```  

Install dependencies:   
```
npm i
```   

Start dfx:  
```
dfx start
```  

Deploy on local:   
```
dfx deploy
```
