if (!/pnpm/.test(process.env.npm_execpath || '')) {
    console.warn('\u001b[33mYou are using other package management tools, please use pnpm instead.\u001b[39m')
    process.exit(1)
}
