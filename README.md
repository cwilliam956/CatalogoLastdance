📝 Descrição
O LastDance é um aplicativo de catálogo de produtos desenvolvido com React Native e Expo, integrado com serviços AWS para armazenamento, processamento e segurança. O projeto demonstra a utilização de 4 tecnologias AWS essenciais:

Amazon S3 - Armazenamento de imagens dos produtos

Amazon DynamoDB - Banco de dados para informações dos produtos

AWS IAM - Gerenciamento seguro de acessos e permissões

Amazon CloudFront - Distribuição global do conteúdo estático

✨ Funcionalidades
📱 Catálogo de produtos em lista vertical

🖼️ Visualização de imagens em alta qualidade

🔍 Busca e filtragem de produtos por categoria

🔐 Autenticação segura de usuários

✏️ CRUD completo de produtos (Create, Read, Update, Delete)

⚡ Performance otimizada com cache

🛠️ Tecnologias Utilizadas
Frontend
React Native

Expo

TypeScript

Tailwind CSS

React Navigation

Backend/Serviços AWS
Amazon S3 - Armazenamento de imagens

Amazon DynamoDB - Armazenamento de dados dos produtos

AWS IAM - Controle de acesso seguro

Amazon CloudFront - CDN para distribuição de conteúdo

🚀 Como Executar o Projeto
Pré-requisitos
Node.js (v18+)

Expo CLI

Conta AWS configurada

Instalação
Clone o repositório:

bash
git clone https://github.com/seu-usuario/lastdance-app.git
cd lastdance-app
Instale as dependências:

bash
npm install
Configure as variáveis de ambiente AWS:

bash
cp .env.example .env
Edite o arquivo .env com suas credenciais AWS.

Inicie o aplicativo:

bash
expo start
🔧 Configuração AWS
1. Amazon S3
Crie um bucket para armazenar imagens dos produtos

Configure as permissões CORS adequadas

2. Amazon DynamoDB
Crie uma tabela Products com:

Partition Key: id (String)

Sort Key: category (String)

3. AWS IAM
Crie um usuário IAM com políticas para:

Acesso ao S3 (PutObject, GetObject)

Acesso ao DynamoDB (CRUD)

Utilize credenciais temporárias para maior segurança

4. Amazon CloudFront
Configure uma distribuição apontando para o bucket S3

Habilite HTTPS e compressão

📦 Estrutura do Projeto
lastdance-app/
├── app/                  # Código principal
├── assets/               # Recursos estáticos
├── components/           # Componentes reutilizáveis
├── hooks/                # Lógica customizada
├── services/             # Integração com AWS
├── types/                # Tipos TypeScript
└── utils/                # Funções utilitárias
