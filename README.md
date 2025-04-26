📌 Visão Geral
O Catálogo LastDance é um aplicativo multiplataforma (iOS/Android) desenvolvido em React Native + Expo para gerenciar um catálogo de produtos (roupas, acessórios, canecas e mochilas). O projeto utiliza 4 serviços AWS essenciais para armazenamento, segurança e escalabilidade.

🚀 Tecnologias AWS Utilizadas
Serviço AWS	Descrição
Amazon S3	Armazenamento seguro das imagens dos produtos
DynamoDB	Banco de dados NoSQL para informações dos produtos
AWS IAM	Controle de acesso seguro aos recursos AWS
CloudFront	Distribuição global do conteúdo com baixa latência
✨ Funcionalidades
✅ Autenticação de usuários (Login/Logout)
✅ CRUD completo de produtos (Criar, Ler, Atualizar, Excluir)
✅ Upload de imagens para o Amazon S3
✅ Listagem vertical de produtos (estilo e-commerce)
✅ Filtros por categoria (Roupas, Acessórios, Canecas, Mochilas)
✅ Integração com DynamoDB para persistência dos dados

🛠️ Como Executar Localmente
Pré-requisitos
Node.js (v18+)

Expo CLI (npm install -g expo-cli)

Conta AWS com acesso a S3, DynamoDB, IAM e CloudFront

Passos para Configuração
Clone o repositório

bash
git clone https://github.com/cwilliam956/CatalogoLastdance.git
cd CatalogoLastdance
Instale as dependências

bash
npm install
Configure as variáveis AWS
Crie um arquivo .env na raiz do projeto com:

env
AWS_ACCESS_KEY_ID=SUA_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=SUA_SECRET_KEY
AWS_REGION=us-east-1
AWS_S3_BUCKET=lastdance-products
DYNAMODB_TABLE=Products
Inicie o app

bash
expo start
(Escaneie o QR Code com o Expo Go no celular ou use um emulador)

🔧 Configuração AWS
1. Amazon S3 (Armazenamento de Imagens)
Crie um bucket chamado lastdance-products

Ative o CORS para permitir uploads via app

2. DynamoDB (Banco de Dados)
Crie uma tabela Products com:

Partition Key: id (String)

Sort Key: category (String)

3. AWS IAM (Permissões Seguras)
Crie um usuário IAM com permissões para:

S3: PutObject, GetObject

DynamoDB: PutItem, GetItem, Scan, DeleteItem

4. CloudFront (CDN para Imagens)
Configure uma distribuição apontando para o bucket S3

Habilite HTTPS e otimize o cache

📂 Estrutura do Projeto
CatalogoLastdance/
├── app/
│   ├── (auth)/           # Telas de autenticação
│   ├── (tabs)/           # Navegação principal
│   ├── product/          # CRUD de produtos
│   └── _layout.tsx       # Configuração de rotas
├── assets/               # Ícones e imagens locais
├── components/           # Componentes reutilizáveis
├── hooks/                # Lógica de autenticação e produtos
├── services/             # Conexão com AWS (S3, DynamoDB)
├── types/                # Tipos TypeScript
└── utils/                # Funções auxiliares (formatação, upload)
