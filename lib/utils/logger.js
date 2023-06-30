import pico from 'picocolors'
export default {
    info(text) {
        console.log(text)
    },
    success(text) {
        console.log(pico.green(text))
    },
    warning(text) {
        console.log(pico.yellow(text))
    },
    error(text) {
        console.log(pico.red(text))
    },
    title(text) {
        console.log(pico.cyan(text))
    },
}
