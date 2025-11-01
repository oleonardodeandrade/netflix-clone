# Netflix Clone - Progresso do Projeto

> **Stack Atual**: Vite + React + TypeScript + TailwindCSS + Clerk + React Router

---

## 📊 Visão Geral do Progresso

| Level | Status | Progresso |
|-------|--------|-----------|
| **Level 0** - Configuração Inicial | ✅ Completo | 100% |
| **Level 1** - Autenticação | ✅ Completo | 100% |
| **Level 2** - Catálogo de Filmes | 🟡 Em Progresso | 60% |
| **Level 3** - Features Extra | ⚪ Não iniciado | 0% |
| **Level 4** - Database (Opcional) | ⚪ Não iniciado | 0% |
| **Level 5** - Deploy | ⚪ Não iniciado | 0% |

---

## ✅ Level 0: Configuração Inicial (70%)

### 0.1 - Criar repositório
- [x] Criar repositório `netflix-clone` no GitHub
- [x] Clonar localmente
- [x] Commit inicial: `chore: initialize project with vite, react and typescript`

### 0.2 - Inicializar projeto Vite
- [x] Executar `yarn create vite netflix-clone --template react-ts`
- [x] Verificar versões instaladas:
  - ✅ React: v19.1.1
  - ✅ TypeScript: v5.9.3
  - ✅ Vite: v7.1.7
- [x] Commit: `chore: initialize project with vite, react and typescript`

### 0.3 - Instalar Tailwind CSS
- [x] Instalar: `yarn add -D tailwindcss postcss autoprefixer`
- [x] Verificar versão instalada: ✅ TailwindCSS v4.1.16
- [x] Configurar Tailwind
- [x] Commit: `feat: add tailwindcss dependencies`

### 0.4 - Instalar React Router
- [x] Instalar: `yarn add react-router-dom`
- [x] Verificar versão instalada: ✅ React Router v7.9.4
- [x] Commit: `chore: install react-router v7.9.4`

### 0.5 - Estrutura de pastas
- [x] Criar `src/pages/` ✅
- [ ] Criar `src/components/` ❌
- [ ] Criar `src/services/` ❌
- [ ] Criar `src/hooks/` ❌
- [ ] Criar `src/types/` ❌
- [ ] Criar `src/utils/` ❌
- [ ] Criar `src/constants/` ❌
- [ ] Criar `src/store/` (para Jotai) ❌
- [ ] Commit: `chore: create project folder structure`

**Estrutura ideal:**
```
src/
├── pages/           # ✅ Existe
│   ├── Home.tsx     # ✅ Existe
│   └── Login.tsx    # ✅ Existe
├── components/      # ❌ Falta criar
│   ├── header/
│   ├── hero/
│   ├── movie/
│   ├── footer/
│   └── ui/
├── services/        # ❌ Falta criar
│   └── tmdb.ts
├── hooks/           # ❌ Falta criar
│   └── useMovies.ts
├── store/           # ❌ Falta criar (Jotai atoms)
│   └── movies.ts
├── types/           # ❌ Falta criar
│   └── movie.ts
├── utils/           # ❌ Falta criar
│   └── helpers.ts
└── constants/       # ❌ Falta criar
    └── genres.ts
```

### 0.6 - Configurar ESLint
- [x] Configuração padrão do Vite já existe
- [ ] Adicionar regras customizadas se necessário
- [ ] Commit separado: `chore: configure eslint rules`

### 0.7 - Git Flow setup
- [ ] Criar branch `develop` a partir da `main` ❌
- [ ] Push da branch develop ❌
- [ ] Usar branches `feat/*` para features ❌
- [ ] Commit: `chore: setup git flow with develop branch`

**Nota:** Até agora tudo foi feito direto na `main`. Recomendo criar `develop` agora.

---

## ✅ Level 1: Autenticação com ClerkJS (80%)

### 1.1 - Instalar ClerkJS
- [x] ~~Criar branch: `feat/authentication`~~ (feito na main)
- [x] Instalar: `yarn add @clerk/clerk-react`
- [x] Verificar versão instalada: ✅ @clerk/clerk-react v5.53.3
- [x] Commit: `chore: install @clerk/clerk-react v5.53.3`

### 1.2 - Criar conta Clerk
- [x] Criar aplicação "Netflix Clone" no Clerk
- [x] Habilitar OAuth providers (Google e GitHub)
- [x] Copiar chaves da aplicação

### 1.3 - Configurar variáveis de ambiente
- [x] Criar arquivo `.env.local` ✅
- [x] Adicionar `VITE_PUBLIC_CLERK_PUBLISHABLE_KEY=` ✅
- [x] Criar `.env.example` ✅
- [x] Commit: `chore: add environment variables template`

**Nota:** Verificar se `.env.local` está no `.gitignore`

### 1.4 - Wrapper ClerkProvider
- [x] Envolver aplicação com `<ClerkProvider>` no `main.tsx`
- [x] Passar publishable key como prop
- [x] Commit: `config: integrate clerk provider`

### 1.5 - Criar página de Login
- [x] Criar `src/pages/Login.tsx`
- [x] Usar componente `<SignIn>` do Clerk
- [x] Commit: `feat: create home and login pages`

### 1.6 - Criar página Home (protegida)
- [x] Criar `src/pages/Home.tsx`
- [x] Adicionar componentes de autenticação do Clerk
- [x] Commit: `feat: add clerk authentication components to home page`

### 1.7 - Configurar rotas protegidas
- [x] Criar sistema de rotas no `App.tsx`
- [x] Usar `<SignedIn>`, `<SignedOut>` do Clerk
- [x] Commit: `feat: configure application routes`

### 1.8 - Testar autenticação
- [ ] Executar `yarn dev` ❌
- [ ] Testar login com Google ❌
- [ ] Testar login com GitHub ❌
- [ ] Testar logout ❌
- [ ] Verificar redirecionamentos ❌
- [ ] Commit: `test: verify authentication flow`

### 1.9 - PR para develop
- [ ] ~~Criar PR de `feat/authentication` → `develop`~~ (N/A - feito na main)

---

## ✅ Level 2: Catálogo de Filmes (60%)

> **Status:** Em Progresso - PR #5 merged!

### 2.1 - Configurar TMDB API ✅
- [x] Criar branch: `feat/movie-catalog`
- [x] Criar conta em [themoviedb.org](https://www.themoviedb.org/)
- [x] Gerar API Key
- [x] Adicionar `VITE_TMDB_API_KEY=` no `.env.local` e `.env.example`
- [x] Commit: `chore: add TMDB API environment variables`

### 2.2 - Criar tipos TypeScript ✅
- [x] Criar `src/types/movie.ts` - Tipos de domínio
- [x] Criar `src/types/external-api/api.ts` - Tipos da API externa
- [x] Definir interfaces: `Movie`, `Actor`, `Episode`, `PaginatedResponse`
- [x] Commit: `feat: add domain types for movie catalog`

### 2.3 - Criar interface MovieService ✅
- [x] Criar `src/services/movieService.ts`
- [x] Definir contrato limpo (provider-agnostic)
- [x] 8 métodos: popular, trending, by genre, search, details, now playing, top rated, upcoming
- [x] Commit: `feat: define MovieService interface`

### 2.4 - Implementar provider com Clean Architecture ✅
- [x] Criar `src/services/api-provider/client.ts` - Cliente HTTP com native fetch
- [x] Criar `src/services/api-provider/adapter.ts` - Transformação de dados
- [x] Criar `src/services/api-provider/implementation.ts` - Implementação do MovieService
- [x] Zero referências ao provider específico no código público
- [x] Commit: `feat: implement movie data provider with clean architecture`

### 2.5 - Exportar serviço ✅
- [x] Criar `src/services/index.ts`
- [x] Exportar instância única do movieService
- [x] Commit: `feat: export movie service instance`

### 2.6 - Atualizar Home com catálogo ✅
- [x] Integrar movieService na `src/pages/Home.tsx`
- [x] Fetch de filmes populares
- [x] Grid responsivo de filmes (2/4/6 colunas)
- [x] Skeleton loading com animate-pulse
- [x] Otimização React Strict Mode (useRef)
- [x] Error handling
- [x] Commit: `feat: display popular movies in catalog with skeleton loading`

### 2.7 - PR para develop ✅
- [x] Criar PR de `feat/movie-catalog` → `develop`
- [x] Descrição profissional com arquitetura
- [x] Commits atômicos e semânticos (6 commits)
- [x] Merge com squash
- [x] PR #5: https://github.com/oleonardodeandrade/netflix-clone/pull/5

---

### 🎯 PRÓXIMOS PASSOS (Level 2 continuação - 40% restante)

### 2.8 - Criar componente MovieCard 📌 PRÓXIMO
- [ ] Criar `src/components/movie/MovieCard.tsx`
- [ ] Receber props: Movie
- [ ] Exibir: poster, título, ano, rating
- [ ] Adicionar hover effects (scale + shadow)
- [ ] Tornar clicável para abrir modal de preview
- [ ] Commit: `feat: create movie card component`

### 2.9 - Criar componente MovieRow
- [ ] Criar `src/components/movie/MovieRow.tsx`
- [ ] Scroll horizontal com setas de navegação
- [ ] Suavização de scroll
- [ ] Commit: `feat: create movie row with horizontal scroll`

### 2.10 - Criar Header completo
- [ ] Criar `src/components/header/Header.tsx`
- [ ] Logo Netflix, navegação, SearchBar, UserButton
- [ ] Scroll behavior: transparente → preto sólido
- [ ] Commit: `feat: create header with navigation`

### 2.11 - Criar Hero Section
- [ ] Criar `src/components/hero/HeroSection.tsx`
- [ ] Background com backdrop do filme
- [ ] Título, descrição, tags
- [ ] Botões "Assistir" e "Mais Informações"
- [ ] Commit: `feat: create hero section`

### 2.12 - Refatorar Home page
- [ ] Estrutura: Header + Hero + MovieRows
- [ ] Múltiplas linhas: Popular, Trending, Top Rated, etc
- [ ] Commit: `refactor: restructure home page with sections`

### 2.13 - Criar MoviePreviewModal (COMPLEXO!)
- [ ] Criar `src/components/movie/MoviePreviewModal.tsx`
- [ ] Features: video preview, detalhes, ações, similares
- [ ] Animação fade + scale
- [ ] Fechar com ESC ou click fora
- [ ] Commit: `feat: create movie preview modal`

### 2.14 - Implementar busca
- [ ] Criar SearchBar component
- [ ] Debounce (300ms)
- [ ] Integrar com movieService.searchMovies
- [ ] Commit: `feat: add search functionality`

---

## ⚪ Level 3: Features Extra (0%)

> **Status:** Não iniciado

### 3.1 - Sistema de Favoritos
- [ ] Criar branch: `feat/favorites`
- [ ] Criar atom `favoritesAtom` no Jotai
- [ ] Adicionar botão de favoritar no MovieCard
- [ ] Adicionar botão de favoritar no MovieDetails
- [ ] Persistir favoritos no localStorage
- [ ] Commit: `feat: add favorites functionality with localstorage`

### 3.2 - Página de Favoritos
- [ ] Criar `src/pages/Favorites.tsx`
- [ ] Listar filmes favoritados
- [ ] Permitir remover favoritos
- [ ] Empty state quando não há favoritos
- [ ] Adicionar rota `/favorites`
- [ ] Commit: `feat: create favorites page`

### 3.3 - Sistema de Rating
- [ ] Criar componente `StarRating.tsx`
- [ ] Permitir usuário dar rating (1-5 estrelas)
- [ ] Criar atom `userRatingsAtom` no Jotai
- [ ] Persistir ratings no localStorage
- [ ] Exibir rating do usuário vs TMDB rating
- [ ] Commit: `feat: add user rating system`

### 3.4 - Funcionalidade de Compartilhar
- [ ] Adicionar botão "Share" no MovieDetails
- [ ] Usar Web Share API (se disponível)
- [ ] Fallback: copiar link para clipboard
- [ ] Toast notification de sucesso
- [ ] Commit: `feat: add share functionality`

### 3.5 - Instalar biblioteca de toasts
- [ ] Instalar: `yarn add react-hot-toast`
- [ ] Verificar versão instalada
- [ ] Configurar Toaster no App
- [ ] Commit: `chore: install react-hot-toast vX.X.X`

### 3.6 - Header/Navigation
- [ ] Criar componente `Header.tsx`
- [ ] Links: Home, Movies, Favorites
- [ ] User menu com avatar (Clerk)
- [ ] Logout button
- [ ] Sticky header com backdrop blur
- [ ] Commit: `feat: create navigation header`

### 3.7 - Melhorar responsividade
- [ ] Revisar breakpoints do Tailwind
- [ ] Ajustar grid de filmes (1 col mobile, 2-3 tablet, 4-5 desktop)
- [ ] Menu mobile hamburger
- [ ] Testar em diferentes tamanhos
- [ ] Commit: `style: improve responsive design`

### 3.8 - Dark mode (bonus)
- [ ] Implementar toggle dark/light mode
- [ ] Usar Tailwind dark: classes
- [ ] Persistir preferência no localStorage
- [ ] Commit: `feat: add dark mode toggle`

### 3.9 - PR para develop
- [ ] Criar PR de `feat/favorites` → `develop`
- [ ] Revisar mudanças
- [ ] Merge após aprovação

---

## ⚪ Level 4: Database com Prisma (Opcional - 0%)

> **Status:** Não iniciado

Este nível é **opcional** mas adiciona muito valor ao portfólio!

### 4.1 - Setup Prisma
- [ ] Criar branch: `feat/database`
- [ ] Instalar: `yarn add prisma @prisma/client`
- [ ] Instalar: `yarn add -D prisma`
- [ ] Verificar versões instaladas
- [ ] Executar: `npx prisma init`
- [ ] Commit: `chore: install and initialize prisma vX.X.X`

### 4.2 - Configurar banco de dados
- [ ] Criar conta no Railway ou PlanetScale
- [ ] Obter connection string PostgreSQL
- [ ] Adicionar `DATABASE_URL=` no `.env.local`
- [ ] Commit: `chore: setup database connection`

### 4.3 - Criar schema Prisma
- [ ] Criar model `User` (id, clerkId, email, createdAt)
- [ ] Criar model `Favorite` (id, userId, movieId, createdAt)
- [ ] Criar model `Rating` (id, userId, movieId, rating, createdAt)
- [ ] Definir relations
- [ ] Commit: `feat: create prisma schema models`

### 4.4 - Executar migration
- [ ] Executar: `npx prisma migrate dev --name init`
- [ ] Verificar migration criada
- [ ] Commit: `chore: run initial prisma migration`

### 4.5 - Criar Prisma client
- [ ] Criar `src/lib/prisma.ts`
- [ ] Instanciar PrismaClient singleton
- [ ] Commit: `feat: setup prisma client`

### 4.6 - Criar API routes (ou services)
- [ ] Criar `src/services/favorites.ts`
- [ ] Funções: `addFavorite()`, `removeFavorite()`, `getUserFavorites()`
- [ ] Criar `src/services/ratings.ts`
- [ ] Funções: `addRating()`, `getUserRatings()`
- [ ] Commit: `feat: create database service layer`

### 4.7 - Integrar Clerk User ID
- [ ] Obter `userId` do Clerk via `useUser()`
- [ ] Passar userId para funções de database
- [ ] Sincronizar user no Prisma ao primeiro login
- [ ] Commit: `feat: integrate clerk user with prisma`

### 4.8 - Migrar favoritos para DB
- [ ] Refatorar Favorites para usar Prisma em vez de localStorage
- [ ] Manter loading states
- [ ] Error handling
- [ ] Commit: `refactor: migrate favorites to database`

### 4.9 - Migrar ratings para DB
- [ ] Refatorar Ratings para usar Prisma em vez de localStorage
- [ ] Manter loading states
- [ ] Error handling
- [ ] Commit: `refactor: migrate ratings to database`

### 4.10 - PR para develop
- [ ] Criar PR de `feat/database` → `develop`
- [ ] Revisar mudanças
- [ ] Merge após aprovação

---

## ⚪ Level 5: Deployment e Finalização (0%)

> **Status:** Não iniciado

### 5.1 - Build de produção
- [ ] Executar: `yarn build`
- [ ] Verificar pasta `dist/` gerada
- [ ] Testar build local: `yarn preview`
- [ ] Commit: `chore: verify production build`

### 5.2 - Deploy no Vercel
- [ ] Criar conta no Vercel
- [ ] Conectar repositório GitHub
- [ ] Configurar environment variables no Vercel
- [ ] Deploy automático da branch `main`
- [ ] Commit: `docs: add vercel deployment url to readme`

### 5.3 - README profissional
- [ ] Criar seções: About, Features, Screenshots, Tech Stack, Installation, Usage
- [ ] Adicionar badges (versão, deploy, tech stack)
- [ ] Adicionar GIF/screenshots do projeto
- [ ] Link para deploy
- [ ] Instruções de desenvolvimento local
- [ ] Commit: `docs: create professional readme`

### 5.4 - Screenshots
- [ ] Capturar: tela de login
- [ ] Capturar: catálogo de filmes
- [ ] Capturar: detalhes do filme
- [ ] Capturar: página de favoritos
- [ ] Otimizar imagens
- [ ] Adicionar na pasta `.github/images/`
- [ ] Commit: `docs: add project screenshots`

### 5.5 - Criar Release v1.0.0
- [ ] Criar tag: `git tag v1.0.0`
- [ ] Push tag: `git push origin v1.0.0`
- [ ] Criar Release no GitHub
- [ ] Adicionar changelog
- [ ] Commit: `chore: create v1.0.0 release`

### 5.6 - Verificações finais
- [ ] Testar autenticação em produção
- [ ] Testar busca de filmes
- [ ] Testar favoritos
- [ ] Testar ratings
- [ ] Testar responsividade
- [ ] Verificar performance (Lighthouse)
- [ ] Commit: `test: verify production deployment`

---

## 📦 Tecnologias Instaladas

| Tecnologia | Versão Instalada | Status |
|------------|------------------|--------|
| **Vite** | v7.1.7 | ✅ |
| **React** | v19.1.1 | ✅ |
| **TypeScript** | v5.9.3 | ✅ |
| **Tailwind CSS** | v4.1.16 | ✅ |
| **React Router** | v7.9.4 | ✅ |
| **ClerkJS** | v5.53.3 | ✅ |
| **Native Fetch** | Built-in | ✅ |
| **Jotai** | - | ⚪ Não instalado |
| **React Hot Toast** | - | ⚪ Não instalado |
| **Prisma** | - | ⚪ Não instalado (opcional) |

---

## 🎯 Próximos Passos Imediatos

### 1. **Completar Level 0** (30% restante)
```bash
# Criar estrutura de pastas completa
mkdir -p src/components/header
mkdir -p src/components/hero
mkdir -p src/components/movie
mkdir -p src/components/footer
mkdir -p src/components/ui
mkdir -p src/services
mkdir -p src/hooks
mkdir -p src/store
mkdir -p src/types
mkdir -p src/utils
mkdir -p src/constants

git add .
git commit -m "chore: create complete project folder structure"
```

### 2. **Setup Git Flow**
```bash
# Criar e publicar branch develop
git checkout -b develop
git push -u origin develop

# Voltar para main
git checkout main

# Para próximas features, usar:
# git checkout develop
# git checkout -b feat/movie-catalog
```

### 3. **Testar Autenticação (Level 1 - 20% restante)**
```bash
# Rodar projeto
yarn dev

# Testar:
# - Login com Google
# - Login com GitHub
# - Logout
# - Proteção de rotas

# Se tudo OK:
git commit -m "test: verify authentication flow"
```

### 4. **Iniciar Level 2 - Catálogo de Filmes**
- Criar conta TMDB
- Instalar Axios e Jotai
- Começar a construir o catálogo

---

## 📈 Métricas do Projeto

- **Commits totais:** 20+ (6 commits atômicos no PR #5)
- **Pull Requests:** 5 (último: feat/movie-catalog)
- **Tempo estimado investido:** ~8-10 horas
- **Progresso geral:** ~52%
- **Próximo milestone:** Completar Level 2 (componentes de UI: MovieCard, MovieRow, Header, Hero)

---

## 🚨 Atenções Importantes

1. **Git Flow não está sendo seguido** - Tudo na `main`, sem `develop` ou branches de feature
2. **Estrutura de pastas incompleta** - Falta criar várias pastas essenciais
3. **Autenticação não foi testada** - Precisa validar o fluxo completo
4. **Versões documentadas nos commits** ✅ - Isso está correto!

---

## 💡 Recomendações

1. **Termine o Level 0 e 1 completamente** antes de prosseguir
2. **Implemente Git Flow** para trabalhar de forma mais organizada
3. **Teste a autenticação** agora para garantir que está funcionando
4. **Documente descobertas** em comentários do código

---

## 🎯 RESUMO: O QUE FOI FEITO E O QUE VEM AGORA

### ✅ Concluído (PR #5 - feat/movie-catalog)
- **Clean Architecture implementada** com separação total entre domínio e provider
- **Tipos TypeScript** completos (Movie, Actor, Episode, PaginatedResponse)
- **MovieService interface** com 8 métodos (provider-agnostic)
- **Cliente API** com native fetch e transformação de dados via adapter
- **Home page** exibindo 12 filmes populares com skeleton loading
- **Otimização React Strict Mode** (apenas 1 requisição HTTP)
- **6 commits atômicos** seguindo Conventional Commits

### 📌 PRÓXIMO PASSO: MovieCard Component
**Branch:** `feat/ui-components`

Criar o componente `MovieCard` reutilizável que será usado em toda a aplicação:
- Layout: poster image + hover effects
- Dados: título, ano, rating
- Interatividade: click abre modal de preview
- Responsivo e acessível

```bash
git checkout -b feat/ui-components
mkdir -p src/components/movie
# Começar criando MovieCard.tsx
```

### 🚀 Sequência após MovieCard
1. **MovieRow** - linha horizontal de filmes com scroll
2. **Header** - navegação + search + user menu
3. **Hero Section** - banner principal com filme destaque
4. **Refatorar Home** - estrutura completa com todos os componentes

---

Última atualização: 28/10/2024
