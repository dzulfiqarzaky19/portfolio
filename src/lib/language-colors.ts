export type LanguageColor = string

const LANGUAGE_COLORS: Record<string, string> = {
    // TypeScript variants
    TypeScript: 'text-[hsl(var(--lang-ts))] bg-[hsl(var(--lang-ts)/0.15)]',
    typescript: 'text-[hsl(var(--lang-ts))] bg-[hsl(var(--lang-ts)/0.15)]',
    ts: 'text-[hsl(var(--lang-ts))] bg-[hsl(var(--lang-ts)/0.15)]',
    tsx: 'text-[hsl(var(--lang-ts))] bg-[hsl(var(--lang-ts)/0.15)]',

    // JavaScript variants
    JavaScript: 'text-[hsl(var(--lang-js))] bg-[hsl(var(--lang-js)/0.15)]',
    javascript: 'text-[hsl(var(--lang-js))] bg-[hsl(var(--lang-js)/0.15)]',
    js: 'text-[hsl(var(--lang-js))] bg-[hsl(var(--lang-js)/0.15)]',
    jsx: 'text-[hsl(var(--lang-js))] bg-[hsl(var(--lang-js)/0.15)]',

    // JSON
    JSON: 'text-[hsl(var(--lang-json))] bg-[hsl(var(--lang-json)/0.15)]',
    json: 'text-[hsl(var(--lang-json))] bg-[hsl(var(--lang-json)/0.15)]',

    // Shell/Bash
    Bash: 'text-[hsl(var(--lang-bash))] bg-[hsl(var(--lang-bash)/0.15)]',
    bash: 'text-[hsl(var(--lang-bash))] bg-[hsl(var(--lang-bash)/0.15)]',
    sh: 'text-[hsl(var(--lang-bash))] bg-[hsl(var(--lang-bash)/0.15)]',
    zsh: 'text-[hsl(var(--lang-bash))] bg-[hsl(var(--lang-bash)/0.15)]',

    // Backend stuff
    Prisma: 'text-[hsl(var(--lang-prisma))] bg-[hsl(var(--lang-prisma)/0.15)]',
    prisma: 'text-[hsl(var(--lang-prisma))] bg-[hsl(var(--lang-prisma)/0.15)]',
    SQL: 'text-[hsl(var(--lang-prisma))] bg-[hsl(var(--lang-prisma)/0.15)]',
    sql: 'text-[hsl(var(--lang-prisma))] bg-[hsl(var(--lang-prisma)/0.15)]',

    // Structure
    Directory: 'text-[hsl(var(--lang-dir))] bg-[hsl(var(--lang-dir)/0.15)]',
    directory: 'text-[hsl(var(--lang-dir))] bg-[hsl(var(--lang-dir)/0.15)]',
    'Plain Text': 'text-[hsl(var(--lang-dir))] bg-[hsl(var(--lang-dir)/0.15)]',
    text: 'text-[hsl(var(--lang-dir))] bg-[hsl(var(--lang-dir)/0.15)]',
}

const DEFAULT_COLOR = 'text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.15)]'

export function getLanguageColor(language: string | undefined): string {
    if (!language) return DEFAULT_COLOR
    return LANGUAGE_COLORS[language] || DEFAULT_COLOR
}
