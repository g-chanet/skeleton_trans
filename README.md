BEFORE
  install NODE JS
  install DOCKER
  install NPM

PLUGIN VS-CODE
  install VETUR 
  

DOCKER
  //https://hub.docker.com/_/postgres

BACKEND
  //https://docs.nestjs.com/first-steps
  RUN (npm i -g @nestjs/cli)
  RUN (nest new project-name)
  RUN (npm install @nestjs/common)
  RUN (npm install @nestjs/core)
  

  //https://docs.nestjs.com/recipes/prisma
  RUN (npm install prisma --save-dev)
  RUN (npx prisma)
  RUN (npx prisma)
  set .env (DATABASE_URL="postgres://postgres:password@localhost:5432/postgres")
  RUN (npx prisma migrate dev --name init)
  RUN (npm install @prisma/client)

  npx nest generate module prisma
  npx nest generate service prisma

  RUN (npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql)
  npx nest generate resource
  //GraphQL (code first)

  
  npx nest generate service messages

FRONTEND
  //https://vuejs.org/guide/quick-start.html#creating-a-vue-application
  RUN (npm init vue@latest)

  √ Project name: ... frontend
  √ Add TypeScript? ... Yes
  √ Add JSX Support? ... No 
  √ Add Vue Router for Single Page Application development? ...  Yes
  √ Add Pinia for state management? ... Yes
  √ Add Vitest for Unit Testing? ... No
  √ Add an End-to-End Testing Solution? » No
  √ Add ESLint for code quality? ... Yes
  √ Add Prettier for code formatting? ... Yes

  RUN (npm install --save vue-apollo graphql apollo-client apollo-link apollo-link-http apollo-cache-inmemory graphql-tag)