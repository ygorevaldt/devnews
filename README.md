# clone-tabnews

Minha implementação do https://www.tabnews.com.br feita para aplicar na prática os conhecimentos passados durante as aulas do https://curso.dev

## Observação sobre TypeScript e Vercel

Em alguns ambientes, o VS Code pode usar uma versão mais nova do TypeScript do que a versão instalada no projeto e mostrar alertas de depreciação no `tsconfig.json`.

Para evitar falso positivo no editor:

1. Abra a Command Palette.
2. Execute `TypeScript: Select TypeScript Version`.
3. Selecione `Use Workspace Version`.

O build de produção usa a versão do TypeScript definida nas dependências do projeto.
