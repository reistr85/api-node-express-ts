# Shortener URL

Este projeto é uma API para encurtamento de URLs, desenvolvida com a arquitetura limpa (Clean Architecture) e totalmente desacoplada. O sistema é multi-tenant, permitindo que diferentes **empresas** (companies) tenham seus próprios **usuários** e **URLs**.

### Funcionalidades principais:

- **Criação de URLs encurtadas**: Não é necessário estar autenticado para criar uma URL encurtada.
- **Gerenciamento de URLs para usuários autenticados**: Caso um usuário esteja autenticado, ele poderá:

  - Listar todas as URLs criadas.
  - Alterar o destino de uma URL.
  - Excluir URLs.

### Estrutura do sistema:

- **Empresas (Companies)**: Cada empresa possui seus próprios usuários e URLs.
- **Usuários (Users)**: Cada usuário pode gerenciar suas próprias URLs, desde que autenticado.
- **URLs**: Cada URL pertence a um usuário e pode ser manipulada conforme a necessidade (listar, alterar ou excluir).

Este projeto foi desenvolvido com foco em escalabilidade e manutenção, utilizando princípios da Clean Architecture para garantir um código modular, bem estruturado e fácil de testar.

## Requisitos

### Node.js

Este projeto requer a versão do **Node.js** `>=22.11.0`. Para verificar se você tem o Node.js instalado, use o comando:

```bash
node -v

```

## Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/usuario/projeto.git

```

## Rodando o Projeto com Docker

Antes de usar o Docker, verifique se ele está instalado na sua máquina. Para isso, execute o seguinte comando:

```bash
docker --version
```

## Rodar o container docker para subir o banco de dados\*\*:

docker compose up -d ou docker-compose up -d
