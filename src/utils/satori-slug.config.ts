import loadGoogleFonts, { type FontOptions } from './loadGoogleFont'
import { defineSatoriConfig } from 'x-satori/astro'
export default defineSatoriConfig({
    height: 628,
    width: 1200,
    props: {
        title: 'Hello World',
        author: 'https://qbb.sh',
    },
    fonts: (await loadGoogleFonts('Hello World' + 'by '+'https://qbb.sh')) as FontOptions[],
})
