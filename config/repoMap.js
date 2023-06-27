const getReportUrl = name => {
    return `direct:https://github.com/QAQDFAFD/${name}.git#main`
}

const vueTsRepo = getReportUrl('vue-ts-base-template')
const vueJSRepo = getReportUrl('vue-base-template')

const repoMap = {
    11: vueJSRepo,
    12: vueTsRepo,
}

module.exports = repoMap
