# 🚀 Deploy no Vercel

Este projeto está pronto para ser deployado no Vercel com tanto o frontend quanto o backend funcionando.

## Como Rodar Localmente

### 1. Instalar dependências
```bash
cd costs
npm install
```

### 2. Em um terminal - Rodar o Backend (json-server)
```bash
npm run backend
```
Isso inicia o servidor JSON em `http://localhost:5000`

### 3. Em outro terminal - Rodar o Frontend (React)
```bash
npm start
```
Acesse o app em `http://localhost:3000`

## Deploy no Vercel (Opção 1: Backend no Vercel)

⚠️ **Nota importante**: O json-server em serverless functions na Vercel é limitado (timeout de 10s). Para o melhor funcionamento, considere a Opção 2.

### Passos:
1. Faça push do seu código para GitHub
2. Acesse https://vercel.com → "New Project"
3. Selecione seu repositório
4. Vercel detectará automaticamente e deployará
5. Acesse seu app em `https://seu-projeto.vercel.app`

A API estará em `https://seu-projeto.vercel.app/api`

## Deploy no Vercel (Opção 2: Backend separado - RECOMENDADO ⭐)

Use a Vercel apenas para o frontend e coloque o backend em outro lugar:

### a) Backend no Railway (Recomendado)
1. Acesse https://railway.app
2. Clique "New Project" → "Deploy from GitHub"
3. Selecione seu repositório
4. Configure a variável de ambiente `NODE_ENV=production`
5. Copie a URL do seu projeto no Railway

### b) Frontend no Vercel
1. Fork/Push seu código para GitHub
2. Acesse https://vercel.com → "New Project"
3. Em "Environment Variables", adicione:
   ```
   REACT_APP_API_URL=https://seu-projeto-railway.up.railway.app
   ```
4. Deploy!

## Estrutura de Arquivos

```
costs/
├── api/
│   └── server.js          # Servidor JSON (usado no Vercel)
├── db.json                # Banco de dados
├── public/
├── src/
│   ├── components/
│   ├── config/
│   │   └── api.js        # Configuração dinâmica de URL
│   └── ...
├── .env.local            # Variáveis locais (não commit)
├── vercel.json           # Configuração Vercel
├── package.json
└── ...
```

## Variáveis de Ambiente

### Desenvolvimento (`.env.local`)
```
REACT_APP_API_URL=http://localhost:5000
```

### Produção (Vercel - configurar no dashboard)
```
REACT_APP_API_URL=https://seu-projeto.vercel.app/api
```
ou
```
REACT_APP_API_URL=https://seu-projeto-railway.up.railway.app
```

## Troubleshooting

**Problema**: API retorna 404
- ✅ Verifique se a URL em `.env.local` está correta
- ✅ Verifique se o backend está rodando em `npm run backend`

**Problema**: CORS error
- Isso é esperado em produção com backend separado. Configure CORS no backend.

**Problema**: Dados não aparecem no Vercel
- O `db.json` está sendo usado. Em produção, considere usar um banco de dados real.

## Próximos Passos

1. Testar localmente com `npm start` + `npm run backend`
2. Push para GitHub
3. Deploy no Vercel
4. (Opcional) Usar Railway para backend se quiser escalabilidade

---
**Mais dúvidas?** Consulte a documentação:
- Vercel: https://vercel.com/docs
- Railway: https://docs.railway.app
