# BEM com SASS - Implementação Completa

Este projeto demonstra a implementação completa da metodologia **BEM (Block Element Modifier)** usando **SASS**, combinada com a arquitetura **SMACSS**.

## 🎯 O que foi implementado

### ✅ **SASS + BEM Features**

#### 1. **Variáveis Estruturadas**
```scss
// Sistema de cores completo
$color-primary: #FF6B35;
$color-secondary: #004E89;

// Escala de cinzas
$color-gray-100: #f8f9fa;
$color-gray-200: #e9ecef;
// ... até $color-gray-900

// Sistema de espaçamento
$spacing-xs: 4px;
$spacing-sm: 8px;
// ... até $spacing-xl

// Breakpoints responsivos
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
// ... etc
```

#### 2. **Mixins Poderosos**
```scss
// Mixin para responsividade
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'sm' {
    @media (max-width: $breakpoint-sm) { @content; }
  }
  // ...
}

// Mixin para botões
@mixin button-base {
  display: inline-block;
  padding: $spacing-sm $spacing-md;
  border: 2px solid transparent;
  border-radius: $border-radius;
  // ...
}

// Mixin para cards
@mixin card-base {
  background: $color-white;
  border-radius: $border-radius;
  box-shadow: $shadow;
  // ...
}
```

#### 3. **Placeholders para Reutilização**
```scss
%text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

%visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  // ...
}
```

#### 4. **Nesting BEM com SASS**
```scss
// Estrutura BEM com nesting SASS
.theme-selector {
  position: fixed;
  top: $spacing-lg;
  right: $spacing-lg;
  @include card-base;
  padding: $spacing-md;

  &__button {
    @include button-base;
    background: $color-gray-200;

    &--theme-a {
      background: $color-primary;
      color: $color-white;

      &.theme-selector__button--active {
        background: #e55a2b;
        box-shadow: 0 0 0 2px rgba($color-primary, 0.2);
      }
    }
  }
}
```

#### 5. **Componentes BEM Modulares**

##### Theme Selector
```scss
.theme-selector {
  // ...
  &__button {
    // ...
    &--theme-a { /* ... */ }
    &--theme-b { /* ... */ }
    &--active { /* ... */ }
  }
}
```

##### Produto Component
```scss
.produto {
  @include card-base;

  &__imagem { /* ... */ }
  &__titulo { /* ... */ }
  &__descricao { /* ... */ }

  &--destaque { /* ... */ }
  &--ativo { /* ... */ }
  &--compacto { /* ... */ }
}
```

##### Header Section
```scss
.header-section {
  &__title { /* ... */ }
  &__subtitle { /* ... */ }
}
```

##### Info Section
```scss
.info-section {
  &__title { /* ... */ }
  &__content { /* ... */ }
}
```

#### 6. **Sistema de Temas com SASS**
```scss
.theme-a {
  .produto {
    border-color: $color-primary;
  }

  .info-section__title {
    color: $color-primary;
  }
}

.theme-b {
  .produto {
    border-color: $color-secondary;
    border-radius: $border-radius-lg;
  }

  .info-section__title {
    color: $color-secondary;
  }
}
```

#### 7. **Responsividade com Mixins**
```scss
.l-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-lg;

  @include respond-to('lg') {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-md;
  }

  @include respond-to('sm') {
    grid-template-columns: 1fr;
    gap: $spacing-sm;
  }
}

.produto--compacto {
  @include respond-to('sm') {
    .produto__conteudo {
      padding: $spacing-sm;
    }
  }
}
```

#### 8. **Utilitários com SASS**
```scss
// Classes utilitárias geradas com SASS
.text-center { text-align: center; }
.mt-1 { margin-top: $spacing-xs; }
.mt-2 { margin-top: $spacing-sm; }
// ...

// Utilitários responsivos
@include respond-to('sm') {
  .d-sm-none { display: none; }
  .d-sm-block { display: block; }
}
```

## 🚀 Como Usar

### **Instalação e Desenvolvimento**

```bash
# Instalar dependências
npm install

# Compilar SASS para CSS (produção)
npm run build-css

# Assistir mudanças durante desenvolvimento
npm run watch-css

# Ou usar o comando dev
npm run dev
```

### **Estrutura de Arquivos**

```
smacss/
├── main.scss          # Arquivo principal SASS
├── main.css           # CSS compilado
├── main.css.map       # Source map
├── components.css     # Componentes adicionais (CSS)
├── layout.css         # Layout (CSS)
├── module.css         # Módulos (CSS)
├── tema-a.css         # Tema A (CSS)
└── tema-b.css         # Tema B (CSS)
```

### **Workflow de Desenvolvimento**

1. **Edite apenas `main.scss`**
2. **Use `npm run watch-css`** para desenvolvimento
3. **Use `npm run build-css`** para produção
4. **O CSS é gerado automaticamente**

## 📋 Benefícios da Implementação SASS + BEM

### ✅ **Manutenibilidade**
- Variáveis centralizam mudanças
- Mixins evitam repetição de código
- Nesting mantém organização hierárquica

### ✅ **Escalabilidade**
- Novos componentes seguem padrões estabelecidos
- Sistema de temas facilita expansão
- Breakpoints padronizados

### ✅ **Performance**
- CSS minificado em produção
- Source maps para debugging
- Apenas classes necessárias são geradas

### ✅ **Colaboração**
- Convenções BEM claras
- Código auto-documentado
- Estrutura SMACSS organizada

## 🔧 Scripts Disponíveis

```json
{
  "build-css": "sass smacss/main.scss smacss/main.css --style=compressed",
  "watch-css": "sass --watch smacss/main.scss smacss/main.css",
  "dev": "npm run watch-css",
  "build": "npm run build-css"
}
```

## 🎨 Exemplos de Uso

### **Criando um Novo Componente**
```scss
// Adicione ao main.scss
.novo-componente {
  @include card-base;
  padding: $spacing-md;

  &__titulo {
    font-size: $font-size-lg;
    color: $color-gray-800;
  }

  &__conteudo {
    color: $color-gray-600;
  }

  &--primario {
    border-color: $color-primary;
  }
}
```

### **Adicionando Responsividade**
```scss
.novo-componente {
  // ...

  @include respond-to('md') {
    padding: $spacing-lg;
  }

  @include respond-to('sm') {
    padding: $spacing-sm;
  }
}
```

### **Extendendo Estilos**
```scss
.novo-componente--especial {
  @extend .novo-componente;
  background: linear-gradient(45deg, $color-primary, $color-secondary);
}
```

## 📚 Recursos e Boas Práticas

### **Convenções BEM + SASS**
- Use `__` para elementos
- Use `--` para modificadores
- Mantenha nesting máximo de 3 níveis
- Use variáveis para valores reutilizáveis
- Crie mixins para padrões repetitivos

### **Organização do Código**
- Variáveis no topo
- Mixins e placeholders em seguida
- Componentes BEM organizados
- Utilitários no final

### **Performance**
- Use `@extend` com moderação
- Prefira mixins para estilos complexos
- Minimize nesting profundo
- Use `&` para modificadores BEM

---

**Este projeto serve como referência completa para implementação profissional de BEM com SASS em projetos reais.** 🎯