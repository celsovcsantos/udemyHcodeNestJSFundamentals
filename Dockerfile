
# Use a imagem Node.js como base
FROM node:20-slim

# Atualize o sistema e instale as dependências necessárias
RUN apt-get update && apt-get install -y procps git

# Atualize o npm para a versão mais recente
RUN npm install -g npm@latest
RUN npm i -g @nestjs/cli
RUN npm install -g pino-pretty

#EXPOSE 54320

#node - ID 1000 (equivale ao usuário local, por conta de permissões)
USER node

# Crie e defina o diretório de trabalho da aplicação
WORKDIR /home/node/app

CMD [ "/home/node/app/.docker/start.sh" ]