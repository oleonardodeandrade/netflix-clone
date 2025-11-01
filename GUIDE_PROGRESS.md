# Netflix Clone - Guia de Desenvolvimento (Vite + React)

> **Stack**: Vite + React + TypeScript + TailwindCSS + Clerk + React Router + Jotai
>
> **Baseado no PDF "PROJETO 20.2" - Portfolio Boost Program**

---

## 📊 Progresso Geral

| Level | Status | Progresso | Estimativa |
|-------|--------|-----------|------------|
| **Level 0** - Setup | 🟡 Em Progresso | 70% | 4h |
| **Level 1** - Auth + UI Base | 🟡 Em Progresso | 25% | 12h |
| **Level 2** - TMDB + Modal | ⚪ Não Iniciado | 0% | 16h |
| **Level 3** - Features + DB | ⚪ Não Iniciado | 0% | 12h |
| **Level 4** - Otimizações | ⚪ Não Iniciado | 0% | 8h |
| **Level 5** - Deploy | ⚪ Não Iniciado | 0% | 4h |

**Total estimado**: 56 horas | **Progresso atual**: ~20%

---

## 🚀 Level 0: Configuração Inicial (70% completo)

### 0.1 - Criar repositório ✅
- [x] Criar repositório `netflix-clone` no GitHub
- [x] Clonar localmente na pasta `/Users/leonardoandrade/projects/psp/portfolio/`
- [x] Adicionar `.gitignore` para Node.js
- [x] Commit inicial: `chore: initialize project with vite, react and typescript`

### 0.2 - Inicializar projeto Vite ✅
- [x] Executar `yarn create vite netflix-clone --template react-ts`
- [x] Escolher: TypeScript + SWC
- [x] Navegar para a pasta do projeto
- [x] Verificar versões instaladas:
  - ✅ **Vite**: v7.1.7
  - ✅ **React**: v19.1.1
  - ✅ **TypeScript**: v5.9.3
- [x] Commit: `chore: initialize project with vite, react and typescript`

### 0.3 - Configurar Tailwind CSS ✅
- [x] Instalar: `yarn add -D tailwindcss postcss autoprefixer`
- [x] Verificar versão instalada: ✅ **TailwindCSS v4.1.16**
- [x] Configurar Tailwind com Vite plugin
- [x] Adicionar directives do Tailwind no CSS
- [x] Commits:
  - `feat: add tailwindcss dependencies`
  - `config: configure tailwindcss vite plugin`
  - `style: import tailwindcss in main stylesheet`

### 0.4 - Instalar React Router ✅
- [x] Instalar: `yarn add react-router-dom`
- [x] Verificar versão instalada: ✅ **React Router v7.9.4**
- [x] Commit: `chore: install react-router v7.9.4`

### 0.5 - Estrutura de pastas 🟡
```
src/
├── pages/              ✅ Criado
│   ├── Home.tsx        ✅ Criado
│   └── Login.tsx       ✅ Criado
├── components/         ❌ Falta criar
│   ├── header/
│   ├── hero/
│   ├── movie/
│   ├── footer/
│   └── ui/
├── services/           ❌ Falta criar
│   └── tmdb.ts
├── hooks/              ❌ Falta criar
│   └── useMovies.ts
├── store/              ❌ Falta criar (Jotai atoms)
│   └── movies.ts
├── types/              ❌ Falta criar
│   └── movie.ts
├── utils/              ❌ Falta criar
│   └── helpers.ts
└── constants/          ❌ Falta criar
    └── genres.ts
```

- [x] Criar `src/pages/` ✅
- [ ] Criar estrutura completa de componentes
- [ ] Criar estrutura de services
- [ ] Criar estrutura de hooks
- [ ] Criar estrutura de store (Jotai)
- [ ] Criar estrutura de types
- [ ] Criar estrutura de utils
- [ ] Criar estrutura de constants
- [ ] Commit: `chore: create project folder structure`

**Próximo passo:**
```bash
cd /Users/leonardoandrade/projects/psp/portfolio/netflix-clone
mkdir -p src/components/{header,hero,movie,footer,ui}
mkdir -p src/{services,hooks,store,types,utils,constants}
git add .
git commit -m "chore: create complete project folder structure"
```

### 0.6 - Configurar variáveis de ambiente ✅
- [x] Criar `.env.local` ✅
- [x] Criar `.env.example` ✅
- [x] Adicionar `.env.local` ao `.gitignore` (verificar)
- [x] Commit: `chore: add environment variables template`

**Conteúdo atual do `.env.example`:**
```env
# Clerk Authentication
VITE_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# API Configuration
# VITE_API_URL=http://localhost:3000
```

**Adicionar (quando chegar no Level 2):**
```env
# TMDB API
VITE_TMDB_API_KEY=
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

### 0.7 - Configurar ESLint 🟡
- [x] Configuração padrão do Vite já existe ✅
- [ ] Adicionar Prettier se necessário
- [ ] Adicionar regras customizadas
- [ ] Commit: `chore: configure eslint and prettier`

### 0.8 - Git Flow setup ❌
- [ ] Criar branch `develop` a partir da `main`
- [ ] Push da branch develop: `git push -u origin develop`
- [ ] Para próximas features, usar branches `feat/*`
- [ ] Commit: `chore: setup git flow with develop branch`

**⚠️ Atenção**: Atualmente tudo está sendo feito direto na `main`. Recomendo criar `develop` agora.

```bash
git checkout -b develop
git push -u origin develop
git checkout main
```

### 0.9 - Testar build inicial ❌
- [ ] Executar `yarn dev` e verificar que inicia
- [ ] Executar `yarn build` e verificar que compila
- [ ] Testar `yarn preview` (build de produção local)
- [ ] Commit: `test: verify initial build works`

---

## 🔐 Level 1: Autenticação + Tela Principal Base (25% completo)

> **Objetivo**: Sistema completo de autenticação E estrutura base da UI

### 1.1 - Setup ClerkJS ✅
- [x] Criar conta em [clerk.com](https://clerk.com)
- [x] Criar aplicação "Netflix Clone"
- [x] Habilitar providers: Email, Google, GitHub
- [x] Copiar `VITE_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [x] Adicionar keys no `.env.local`

### 1.2 - Instalar e configurar ClerkJS ✅
- [x] Instalar: `yarn add @clerk/clerk-react`
- [x] Verificar versão instalada: ✅ **@clerk/clerk-react v5.53.3**
- [x] Commit: `chore: install @clerk/clerk-react v5.53.3`

### 1.3 - Configurar ClerkProvider ✅
- [x] Envolver app com `<ClerkProvider>` no `main.tsx`
- [x] Passar publishable key como prop
- [x] Commit: `config: integrate clerk provider`

### 1.4 - Criar páginas de autenticação ✅
- [x] Criar `src/pages/Login.tsx`
- [x] Criar `src/pages/Home.tsx`
- [x] Usar componentes do Clerk (`<SignIn>`, etc)
- [x] Commits:
  - `feat: create home and login pages`
  - `feat: add clerk authentication components to home page`

### 1.5 - Configurar rotas protegidas ✅
- [x] Configurar React Router no `App.tsx`
- [x] Usar `<SignedIn>`, `<SignedOut>` do Clerk
- [x] Rota `/` → Home (protegida)
- [x] Rota `/login` → Login (pública)
- [x] Commit: `feat: configure application routes`

### 1.6 - Testar autenticação completa ❌
- [ ] Executar `yarn dev`
- [ ] Testar registro com email
- [ ] Testar login com Google
- [ ] Testar login com GitHub
- [ ] Testar logout
- [ ] Verificar proteção de rotas
- [ ] Verificar redirecionamentos
- [ ] Commit: `test: verify authentication flow`

**⚠️ IMPORTANTE**: Teste agora antes de continuar!

```bash
yarn dev
# Acessar http://localhost:5173
# Testar todos os fluxos de autenticação
```

---

### 1.7 - Instalar dependências para UI ❌

**Faltam instalar:**
- [ ] Instalar: `yarn add jotai`
- [ ] Instalar: `yarn add axios`
- [ ] Instalar: `yarn add react-hot-toast`
- [ ] Instalar: `yarn add lucide-react` (ícones)
- [ ] Verificar versões instaladas
- [ ] Commit: `chore: install jotai vX, axios vX, react-hot-toast vX, lucide-react vX`

```bash
yarn add jotai axios react-hot-toast lucide-react
# Depois verificar versões no package.json
git add package.json yarn.lock
git commit -m "chore: install jotai vX.X.X, axios vX.X.X, react-hot-toast vX.X.X, lucide-react vX.X.X"
```

### 1.8 - Criar tipos base ❌
- [ ] Criar `src/types/movie.ts` com tipos do PDF

**Tipos necessários (do PDF):**
```typescript
export type Movie = {
  id: string;
  previewUrl: string;
  posterUrl: string;
  backdropUrl: string;
  title: string;
  tags: string[];
  description?: string;
  episodes?: Episode[];
  rating: number;
  year: number;
  duration: string;
  cast: Actor[];
}

export type Episode = {
  id: string;
  movieId: string;
  previewUrl: string;
  title: string;
  tags: string[];
  description?: string;
  episodeNumber: number;
  seasonNumber: number;
}

export type Actor = {
  id: string;
  fullName: string;
  profileUrl: string;
}

export type Genre = 'comedy' | 'romance' | 'horror' | 'action' | 'drama' | 'all';

export type DashboardMap = Map<string, Movie[]>;
```

- [ ] Commit: `feat: add typescript type definitions`

### 1.9 - Criar dados mock iniciais ❌
- [ ] Criar `src/constants/mockMovies.ts` com 20-30 filmes mock
- [ ] Incluir dados completos para cada filme
- [ ] Usar URLs de placeholder (ex: via.placeholder.com ou picsum)
- [ ] Commit: `chore: add mock movie data for development`

**Exemplo de filme mock:**
```typescript
export const MOCK_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Stranger Things',
    description: 'Quando um menino desaparece, sua mãe, um chefe de polícia e seus amigos devem enfrentar forças aterrorizantes para tê-lo de volta.',
    posterUrl: 'https://via.placeholder.com/300x450/FF0000/FFFFFF?text=Stranger+Things',
    backdropUrl: 'https://via.placeholder.com/1920x1080/000000/FFFFFF?text=Backdrop',
    previewUrl: 'https://via.placeholder.com/300x450',
    rating: 8.7,
    year: 2016,
    duration: '51min',
    tags: ['Sci-Fi', 'Horror', 'Drama'],
    cast: [
      { id: '1', fullName: 'Millie Bobby Brown', profileUrl: '' },
      { id: '2', fullName: 'Finn Wolfhard', profileUrl: '' },
    ],
    episodes: [],
  },
  // ... mais 19-29 filmes
];
```

### 1.10 - Criar atoms Jotai ❌
- [ ] Criar `src/store/movies.ts`
- [ ] Criar `src/store/ui.ts`
- [ ] Commit: `feat: create jotai atoms for state management`

**`src/store/movies.ts`:**
```typescript
import { atom } from 'jotai';
import { Movie, Genre } from '@/types/movie';

export const moviesAtom = atom<Movie[]>([]);
export const selectedGenreAtom = atom<Genre>('all');
export const myListAtom = atom<Movie[]>([]);
export const heroMovieAtom = atom<Movie | null>(null);
```

**`src/store/ui.ts`:**
```typescript
import { atom } from 'jotai';
import { Movie } from '@/types/movie';

export const previewModalAtom = atom<Movie | null>(null);
export const searchQueryAtom = atom<string>('');
export const isSearchOpenAtom = atom<boolean>(false);
export const isMobileMenuOpenAtom = atom<boolean>(false);
```

### 1.11 - Criar Header completo ❌
- [ ] Criar `components/header/Header.tsx`
- [ ] Criar `components/header/HeaderActions.tsx`
- [ ] Criar `components/header/SearchBar.tsx`
- [ ] Criar `components/header/GenreSelector.tsx`
- [ ] Commit: `feat: create header with navigation and search`

**Features do Header:**
- Logo Netflix (ou texto estilizado)
- Links: Início, Filmes, Séries, Minha Lista
- SearchBar integrada (toggle)
- User menu com avatar (Clerk `<UserButton />`)
- Scroll behavior: transparente → preto sólido quando scroll > 50px

**Exemplo básico:**
```typescript
// src/components/header/Header.tsx
import { UserButton } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors ${
      scrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-8">
          <h1 className="text-red-600 text-3xl font-bold">NETFLIX</h1>
          <nav className="flex gap-4">
            <Link to="/" className="text-white hover:text-gray-300">Início</Link>
            <Link to="/movies" className="text-white hover:text-gray-300">Filmes</Link>
            <Link to="/my-list" className="text-white hover:text-gray-300">Minha Lista</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* SearchBar aqui */}
          <UserButton afterSignOutUrl="/login" />
        </div>
      </div>
    </header>
  );
}
```

### 1.12 - Criar Hero Section ❌
- [ ] Criar `components/hero/HeroSection.tsx`
- [ ] Criar `components/hero/HeroActions.tsx`
- [ ] Integrar com heroMovieAtom
- [ ] Commit: `feat: create hero section with movie showcase`

**Features do Hero:**
- Background: backdrop do filme (gradiente overlay)
- Título do filme (grande, bold)
- Descrição (max 3 linhas, truncada)
- Tags/Gêneros
- Botão "▶ Assistir" (vermelho, grande)
- Botão "ℹ Mais Informações" (cinza, outline)
- Fade in/out ao trocar filmes

**Exemplo:**
```typescript
// src/components/hero/HeroSection.tsx
import { useAtom } from 'jotai';
import { heroMovieAtom } from '@/store/movies';
import { HeroActions } from './HeroActions';

export function HeroSection() {
  const [heroMovie] = useAtom(heroMovieAtom);

  if (!heroMovie) return null;

  return (
    <div className="relative h-[80vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroMovie.backdropUrl}
          alt={heroMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center px-8 md:px-16">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            {heroMovie.title}
          </h1>

          <p className="text-lg text-white/90 line-clamp-3">
            {heroMovie.description}
          </p>

          <div className="flex gap-2">
            {heroMovie.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-sm text-white/70">
                {tag}
              </span>
            ))}
          </div>

          <HeroActions movie={heroMovie} />
        </div>
      </div>
    </div>
  );
}
```

### 1.13 - Criar MovieCard base ❌
- [ ] Criar `components/movie/MovieCard.tsx`
- [ ] Hover effects (scale + shadow)
- [ ] Click → abre preview modal
- [ ] Lazy loading de imagens
- [ ] Commit: `feat: create movie card component`

**Features do MovieCard:**
- Poster image
- Hover: scale(1.05) + shadow grande
- Smooth transitions
- Click: abre modal de preview

```typescript
// src/components/movie/MovieCard.tsx
import { useSetAtom } from 'jotai';
import { previewModalAtom } from '@/store/ui';
import { Movie } from '@/types/movie';

type Props = {
  movie: Movie;
};

export function MovieCard({ movie }: Props) {
  const setPreviewModal = useSetAtom(previewModalAtom);

  return (
    <div
      className="group relative cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10"
      onClick={() => setPreviewModal(movie)}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full rounded-md shadow-lg group-hover:shadow-2xl"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors rounded-md" />
    </div>
  );
}
```

### 1.14 - Criar MovieRow ❌
- [ ] Criar `components/movie/MovieRow.tsx`
- [ ] Scroll horizontal suave
- [ ] Setas de navegação (← →)
- [ ] Commit: `feat: create movie row with horizontal scroll`

**Features do MovieRow:**
- Título da seção
- Scroll horizontal de cards
- Setas aparecem no hover
- Snap scrolling

```typescript
// src/components/movie/MovieRow.tsx
import { Movie } from '@/types/movie';
import { MovieCard } from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

type Props = {
  title: string;
  movies: Movie[];
};

export function MovieRow({ title, movies }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-2 px-8">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>

      <div className="group relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        {/* Movies */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {movies.map(movie => (
            <div key={movie.id} className="min-w-[200px] md:min-w-[250px]">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
}
```

### 1.15 - Criar página Browse completa ❌
- [ ] Atualizar `src/pages/Home.tsx` para ser a página Browse
- [ ] Estrutura: Header + Hero + MovieRows + Footer
- [ ] Usar dados mock
- [ ] Commit: `feat: create browse page with movie sections`

**Estrutura da página:**
```typescript
// src/pages/Home.tsx (Browse)
import { useEffect } from 'react';
import { useSetAtom, useAtom } from 'jotai';
import { heroMovieAtom, moviesAtom, selectedGenreAtom } from '@/store/movies';
import { MOCK_MOVIES } from '@/constants/mockMovies';
import { Header } from '@/components/header/Header';
import { HeroSection } from '@/components/hero/HeroSection';
import { MovieRow } from '@/components/movie/MovieRow';
import { Footer } from '@/components/footer/Footer';

export function Home() {
  const setHeroMovie = useSetAtom(heroMovieAtom);
  const [movies, setMovies] = useAtom(moviesAtom);
  const [selectedGenre] = useAtom(selectedGenreAtom);

  useEffect(() => {
    // Carregar mock data
    setMovies(MOCK_MOVIES);
    setHeroMovie(MOCK_MOVIES[0]); // Primeiro filme como hero
  }, []);

  // Filtrar por gênero
  const filteredMovies = selectedGenre === 'all'
    ? movies
    : movies.filter(m => m.tags.includes(selectedGenre));

  // Dividir em categorias
  const myList = movies.slice(0, 6); // Mock: primeiros 6
  const trending = movies.slice(6, 12);
  const action = movies.filter(m => m.tags.includes('action'));
  const comedy = movies.filter(m => m.tags.includes('comedy'));

  return (
    <div className="bg-black min-h-screen">
      <Header />

      <HeroSection />

      <div className="space-y-8 pb-16">
        {myList.length > 0 && <MovieRow title="Minha Lista" movies={myList} />}
        <MovieRow title="Em Alta" movies={trending} />
        <MovieRow title="Ação" movies={action} />
        <MovieRow title="Comédia" movies={comedy} />
      </div>

      <Footer />
    </div>
  );
}
```

### 1.16 - Criar Footer ❌
- [ ] Criar `components/footer/Footer.tsx`
- [ ] Links, redes sociais, copyright
- [ ] Commit: `feat: create footer component`

**Simples:**
```typescript
// src/components/footer/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-black text-gray-400 px-8 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Início</a></li>
              <li><a href="#" className="hover:underline">Filmes</a></li>
              <li><a href="#" className="hover:underline">Séries</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Ajuda</a></li>
              <li><a href="#" className="hover:underline">Contato</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Privacidade</a></li>
              <li><a href="#" className="hover:underline">Termos</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Redes Sociais</h3>
            <div className="flex gap-4">
              {/* Ícones de redes sociais */}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2024 Netflix Clone. Projeto educacional.</p>
        </div>
      </div>
    </footer>
  );
}
```

### 1.17 - Adicionar Toaster ❌
- [ ] Configurar `<Toaster>` do react-hot-toast
- [ ] Adicionar no App.tsx ou layout principal
- [ ] Customizar cores para tema Netflix
- [ ] Commit: `feat: add toast notifications`

```typescript
// src/App.tsx (adicionar)
import { Toaster } from 'react-hot-toast';

// Dentro do return:
<Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: '#333',
      color: '#fff',
    },
    success: {
      iconTheme: {
        primary: '#10B981',
        secondary: '#fff',
      },
    },
    error: {
      iconTheme: {
        primary: '#EF4444',
        secondary: '#fff',
      },
    },
  }}
/>
```

### 1.18 - Testar UI completa com mock data ❌
- [ ] Verificar responsividade (mobile, tablet, desktop)
- [ ] Testar scroll horizontal dos MovieRows
- [ ] Testar hover effects
- [ ] Verificar que header fica sólido no scroll
- [ ] Commit: `test: verify ui with mock data`

### 1.19 - PR para develop (se usando Git Flow) ❌
- [ ] ~~Criar PR de `feat/authentication-and-base-ui` → `develop`~~
- [ ] Ou merge direto se não estiver usando branches

---

## 🎬 Level 2: Integração TMDB + Preview Modal + Busca (0%)

> **Status:** Não iniciado. Complete Level 1 primeiro!

### 2.1 - Setup TMDB API
- [ ] Criar branch: `feat/tmdb-integration`
- [ ] Criar conta em [themoviedb.org](https://www.themoviedb.org/)
- [ ] Solicitar API Key
- [ ] Adicionar `VITE_TMDB_API_KEY` no `.env.local`
- [ ] Adicionar no `.env.example`
- [ ] Commit: `chore: setup tmdb api credentials`

### 2.2 - Criar serviço TMDB
- [ ] Criar `src/services/tmdb.ts`
- [ ] Configurar Axios instance
- [ ] Criar funções: `getPopularMovies`, `searchMovies`, `getMovieDetails`, `getTrending`, `getGenres`
- [ ] Commit: `feat: create tmdb api service`

### 2.3 - Criar mappers TMDB → Movie type
- [ ] Criar `src/utils/tmdb-mapper.ts`
- [ ] Função: `mapTMDBToMovie(tmdbMovie: any): Movie`
- [ ] Mapear todas as propriedades
- [ ] Commit: `feat: create tmdb data mapper`

### 2.4 - Criar hook useMovies
- [ ] Criar `src/hooks/useMovies.ts`
- [ ] Integrar com TMDB service
- [ ] Gerenciar loading/error states
- [ ] Commit: `feat: create useMovies hook`

### 2.5 - Atualizar Browse page com dados reais
- [ ] Substituir MOCK_MOVIES por dados da TMDB
- [ ] Adicionar loading skeletons
- [ ] Adicionar error boundaries
- [ ] Commit: `feat: integrate tmdb data in browse page`

### 2.6 - Criar MoviePreviewModal (COMPLEXO!)
- [ ] Criar `components/movie/MoviePreviewModal.tsx`
- [ ] Features:
  - Video preview (se disponível) ou backdrop
  - Título + ano + rating + duração
  - Botão Play
  - Botão "+" (adicionar à lista)
  - Botão "👍" (avaliar)
  - Botão compartilhar
  - Descrição completa
  - Tags/Gêneros
  - Elenco (top 5)
  - Episódios (se série)
  - "Títulos similares" (4 filmes)
- [ ] Animação fade + scale
- [ ] Fechar com ESC ou click fora
- [ ] Commit: `feat: create movie preview modal`

### 2.7 - Integrar modal com MovieCard
- [ ] Atualizar MovieCard para abrir modal
- [ ] Passar movie para previewModalAtom
- [ ] Commit: `feat: integrate preview modal with movie cards`

### 2.8 - Criar sistema de busca
- [ ] Criar `src/hooks/useSearch.ts` com debounce
- [ ] 3 níveis: exact, similar, others
- [ ] Commit: `feat: create search hook with debounce`

### 2.9 - Criar página Search
- [ ] Criar `src/pages/Search.tsx`
- [ ] 3 seções de resultados
- [ ] Integrar com useSearch
- [ ] Commit: `feat: create search page with three result sections`

### 2.10 - Melhorar SearchBar
- [ ] Animação de expansão
- [ ] Loading indicator
- [ ] Clear button
- [ ] Commit: `feat: improve search bar with animations`

### 2.11 - Criar página My List
- [ ] Criar `src/pages/MyList.tsx`
- [ ] Listar myListAtom
- [ ] Empty state
- [ ] Commit: `feat: create my-list page`

### 2.12 - Atualizar rotas
- [ ] Adicionar `/search` → Search
- [ ] Adicionar `/my-list` → MyList
- [ ] Adicionar `/movie/:id` → MovieDetails (opcional)
- [ ] Commit: `feat: add new routes`

### 2.13 - Adicionar loading skeletons
- [ ] Criar `components/ui/MovieCardSkeleton.tsx`
- [ ] Criar `components/ui/HeroSkeleton.tsx`
- [ ] Usar durante loading
- [ ] Commit: `style: add loading skeletons`

### 2.14 - Testar integração completa
- [ ] Testar carregamento TMDB
- [ ] Testar preview modal
- [ ] Testar busca
- [ ] Commit: `test: verify tmdb integration and search`

### 2.15 - PR para develop
- [ ] Criar PR de `feat/tmdb-integration` → `develop`

---

## ⭐ Level 3: Features Avançadas + Database (0%)

> **Status:** Não iniciado

### 3.1 - Setup Prisma
- [ ] Criar branch: `feat/database-and-features`
- [ ] Instalar Prisma
- [ ] Commit: `chore: install prisma vX.X.X`

### 3.2 - Configurar banco de dados
- [ ] Railway ou PlanetScale
- [ ] PostgreSQL connection string
- [ ] Commit: `chore: setup database connection`

### 3.3 - Criar Prisma Schema
- [ ] Models: User, Favorite, Rating
- [ ] Relations
- [ ] Commit: `feat: create prisma schema`

### 3.4 - Executar migrations
- [ ] `npx prisma migrate dev --name init`
- [ ] Commit: `chore: run initial database migration`

### 3.5 - Criar Prisma client
- [ ] `src/lib/prisma.ts`
- [ ] Singleton pattern
- [ ] Commit: `feat: setup prisma client`

### 3.6 - Criar API layer
- [ ] Como Vite é front-end only, você tem 2 opções:
  1. **Criar backend separado** (Express/Fastify + Prisma)
  2. **Usar Vercel Serverless Functions** (quando fizer deploy)
  3. **Firebase/Supabase** como BaaS alternativo

**Recomendação**: Use **localStorage** primeiro (simples), depois migre para **Supabase** (mais fácil que Prisma para front-end).

### 3.7 - Implementar favoritos
- [ ] Hook useFavorites
- [ ] localStorage ou API
- [ ] Commit: `feat: add favorites functionality`

### 3.8 - Implementar ratings
- [ ] Hook useRatings
- [ ] StarRating component
- [ ] Commit: `feat: add user rating system`

### 3.9 - Implementar compartilhamento
- [ ] Web Share API
- [ ] Fallback: clipboard
- [ ] Commit: `feat: add share functionality`

### 3.10 - Melhorar responsividade
- [ ] Mobile menu
- [ ] Breakpoints
- [ ] Commit: `style: improve responsive design`

### 3.11 - Dark mode (opcional)
- [ ] Toggle theme
- [ ] localStorage persistence
- [ ] Commit: `feat: add dark mode toggle`

### 3.12 - PR para develop
- [ ] Criar PR

---

## 🚀 Level 4: Otimizações (0%)

> **Status:** Não iniciado

### 4.1 - Performance
- [ ] Lazy loading de rotas
- [ ] React.memo, useMemo, useCallback
- [ ] Commit: `perf: optimize javascript performance`

### 4.2 - Imagens
- [ ] Lazy loading
- [ ] Placeholders
- [ ] Commit: `perf: optimize images`

### 4.3 - Bundle
- [ ] Code splitting
- [ ] Tree shaking
- [ ] Commit: `perf: optimize bundle size`

### 4.4 - Lighthouse
- [ ] Target: 90+ em todas métricas
- [ ] Commit: `test: verify performance metrics`

---

## 🌐 Level 5: Deploy (0%)

> **Status:** Não iniciado

### 5.1 - Build local
- [ ] `yarn build`
- [ ] `yarn preview`
- [ ] Commit: `chore: verify production build`

### 5.2 - Deploy Vercel
- [ ] Conectar repo
- [ ] Configurar env vars
- [ ] Deploy!
- [ ] Commit: `docs: add deployment url`

### 5.3 - README
- [ ] Professional README
- [ ] Screenshots
- [ ] Commit: `docs: create professional readme`

### 5.4 - Release v1.0.0
- [ ] Git tag
- [ ] GitHub Release
- [ ] Commit: `chore: create v1.0.0 release`

---

## 🎯 PRÓXIMOS PASSOS IMEDIATOS

### **Agora faça isso (em ordem):**

```bash
# 1. Criar estrutura de pastas
cd /Users/leonardoandrade/projects/psp/portfolio/netflix-clone
mkdir -p src/components/{header,hero,movie,footer,ui}
mkdir -p src/{services,hooks,store,types,utils,constants}
git add .
git commit -m "chore: create complete project folder structure"

# 2. Setup Git Flow
git checkout -b develop
git push -u origin develop
git checkout main

# 3. Instalar dependências UI
git checkout develop
yarn add jotai axios react-hot-toast lucide-react
# Verificar versões no package.json
git add package.json yarn.lock
git commit -m "chore: install jotai vX.X.X, axios vX.X.X, react-hot-toast vX.X.X, lucide-react vX.X.X"

# 4. Testar autenticação
yarn dev
# Abrir http://localhost:5173
# Testar login/logout
```

### **Depois:**
- [ ] Criar tipos TypeScript (movie.ts)
- [ ] Criar mock data
- [ ] Criar Jotai atoms
- [ ] Começar a construir Header
- [ ] Hero Section
- [ ] MovieCard + MovieRow
- [ ] Página Browse completa

---

## 📦 Resumo de Tecnologias

| Tecnologia | Versão | Status |
|------------|--------|--------|
| Vite | v7.1.7 | ✅ |
| React | v19.1.1 | ✅ |
| TypeScript | v5.9.3 | ✅ |
| Tailwind CSS | v4.1.16 | ✅ |
| React Router | v7.9.4 | ✅ |
| Clerk | v5.53.3 | ✅ |
| Jotai | - | ⚪ |
| Axios | - | ⚪ |
| React Hot Toast | - | ⚪ |
| Lucide React | - | ⚪ |

---

**Última atualização**: 26/10/2024
**Progresso geral**: ~20%
**Próximo milestone**: Completar Level 1 (UI base + testes)
