// NOTE: is using prettier, config editor to just format "modified" on save

export default {
    singleQuote: true,
    printWidth: 100,
    'editor.formatOnSave': true,
    'editor.tabSize': 4,
    proseWrap: 'always',
    tabWidth: 4,
    requireConfig: false,
    useTabs: false,
    trailingComma: 'all',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    semi: true,
    plugins: ['prettier-plugin-tailwindcss'],
};
