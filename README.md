# 📊 Costs01

Aplicação desenvolvida em **React** para gerenciamento de custos, com backend simples via **json-server** e possibilidade de integração com **Firebase**.  
Deploy disponível em: [costs01.vercel.app](https://costs01.vercel.app)

---

## 📂 Estrutura do Projeto

- **public/** → arquivos públicos da aplicação  
- **scripts/** → scripts auxiliares de backend  
- **src/** → código-fonte principal em React  
- **db.json** → base de dados mock para o json-server  
- **.env.example** → exemplo de variáveis de ambiente  
- **vercel.json** → configuração de deploy na Vercel  

---

## ⚙️ Tecnologias

- **React (Create React App)**  
- **json-server** para simulação de API  
- **Firebase** (opcional, para dados e hosting)  
- **Vercel** para deploy  

---

## 🚀 Como rodar localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/ogabrieldias/costs01.git
cd costs01

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# editar os valores conforme necessário

# 4. Rodar backend (json-server)
npm run backend
# disponível em http://localhost:5000

# 5. Rodar frontend
npm start
# disponível em http://localhost:3000
