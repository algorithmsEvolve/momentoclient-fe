import { generateLocalSrc } from '@/composables/file'

const desktopImages = [
    // start::cover
    generateLocalSrc('/themes/botan/global/background-desktop.png'),
    generateLocalSrc('/themes/botan/component/email-closed.svg'),
    generateLocalSrc('/themes/botan/cover/decor-back.png'),
    generateLocalSrc('/themes/botan/cover/decor-back-left.png'),
    generateLocalSrc('/themes/botan/cover/decor-left.png'),
    generateLocalSrc('/themes/botan/cover/decor-right.png'),
    // end::cover

    // start::opening
    generateLocalSrc('/themes/botan/opening/decor-back.png'),
    generateLocalSrc('/themes/botan/opening/decor-top.png'),
    generateLocalSrc('/themes/botan/opening/decor-bottom-left.png'),
    generateLocalSrc('/themes/botan/opening/decor-bottom-right.png'),
    // end::opening

    // start::date
    generateLocalSrc('/themes/botan/date/date-icon.svg'),
    generateLocalSrc('/themes/botan/date/decor-side.png'),
    // end::date
    
    // start::countdown
    generateLocalSrc('/themes/botan/count-down/balloon-icon.svg'),
    generateLocalSrc('/themes/botan/count-down/just-married-icon.svg'),
    // end::countdown
    
    // start::location
    generateLocalSrc('/themes/botan/location/location-icon.svg'),
    generateLocalSrc('/themes/botan/location/decor-top-left.png'),
    generateLocalSrc('/themes/botan/location/decor-top-right.png'),
    // end::location

    // start::rsvp
    generateLocalSrc('/themes/botan/rsvp/decor-back.png'),
    generateLocalSrc('/themes/botan/rsvp/decor-bottom-left.png'),
    generateLocalSrc('/themes/botan/rsvp/decor-bottom-right.png'),
    // end::rsvp
    
    // start::filter
    generateLocalSrc('/themes/botan/filter-instagram/streaming-icon.svg'),
    // end::filter

    // start::wish
    generateLocalSrc('/themes/botan/wish/decor-back.png'),
    generateLocalSrc('/themes/botan/wish/decor-top-left.png'),
    generateLocalSrc('/themes/botan/wish/decor-bottom.png'),
    // end::wish

    // start::gift
    generateLocalSrc('/themes/botan/component/gift-mandiri.png'),
    generateLocalSrc('/themes/botan/component/gift-bri.png'),
    generateLocalSrc('/themes/botan/component/copy.svg'),
    // end::gift

    // start::footer
    generateLocalSrc('/themes/botan/footer/decor-back.png'),
    generateLocalSrc('/themes/botan/footer/decor-bottom-left.png'),
    generateLocalSrc('/themes/botan/footer/decor-bottom-right.png'),
    // end::footer

    // start::component
    generateLocalSrc('/themes/botan/component/volume-on.svg'),
    generateLocalSrc('/themes/botan/component/volume-off.svg'),
    generateLocalSrc('/themes/yuugure/component/smile-face.png'),
    generateLocalSrc('/themes/yuugure/component/sad-face.png'),
    // end::component
]

export default desktopImages
