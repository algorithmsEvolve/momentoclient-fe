import { generateLocalSrc } from '@/composables/file'

export default [
    // start::global
    generateLocalSrc('/themes/bara/global/background-mobile.png'),
    // end::global

    // start::cover
    generateLocalSrc('/themes/bara/cover/mobile-decor-bottom-left.png'),
    generateLocalSrc('/themes/bara/cover/mobile-decor-top-right.png'),
    // end::cover

    // start::opening
    generateLocalSrc('/themes/bara/opening/mobile-decor-middle-right.png'),
    generateLocalSrc('/themes/bara/opening/mobile-decor-middle-left.png'),
    generateLocalSrc('/themes/bara/opening/mobile-decor-top.png'),
    generateLocalSrc('/themes/bara/opening/instagram-icon.svg'),
    // end::opening

    // start::date
    generateLocalSrc('/themes/bara/date/date-icon.svg'),
    generateLocalSrc('/themes/bara/date/mobile-decor-bottom.png'),
    // end::date
    
    // start::countdown
    generateLocalSrc('/themes/bara/count-down/balloon-icon.svg'),
    generateLocalSrc('/themes/bara/count-down/just-married-icon.svg'),
    // end::countdown

    // start::countdown and display picture
    generateLocalSrc('/themes/bara/count-down-and-display-picture/mobile-decor-top.png'),
    generateLocalSrc('/themes/bara/count-down-and-display-picture/decor-top-left.png'),
    generateLocalSrc('/themes/bara/count-down-and-display-picture/decor-top-right.png'),
    // end::countdown and display picture
    
    // start::location
    generateLocalSrc('/themes/bara/location/location-icon.svg'),
    // end::location
    
    // start::filter
    generateLocalSrc('/themes/bara/filter-instagram/streaming-icon.svg'),
    generateLocalSrc('/themes/bara/filter-instagram/livestream-icon.svg'),
    // end::filter

    // start::footer
    generateLocalSrc('/themes/bara/footer/mobile-decor-bottom-center.png'),
    generateLocalSrc('/themes/bara/footer/footer-momento-logo.svg'),
    // end::footer

    // start::component
    generateLocalSrc('/themes/bara/component/close-modal.svg'),
    generateLocalSrc('/themes/bara/component/copied.svg'),
    generateLocalSrc('/themes/bara/component/copy.svg'),
    generateLocalSrc('/themes/bara/component/email-closed.svg'),
    generateLocalSrc('/themes/bara/component/gift-bca.png'),
    generateLocalSrc('/themes/bara/component/gift-bri.png'),
    generateLocalSrc('/themes/bara/component/gift-dki.png'),
    generateLocalSrc('/themes/bara/component/gift-mandiri.png'),
    generateLocalSrc('/themes/bara/component/momentospin.svg'),
    generateLocalSrc('/themes/bara/component/rounded-check.svg'),
    generateLocalSrc('/themes/bara/component/sad-face.svg'),
    generateLocalSrc('/themes/bara/component/smile-face.svg'),
    generateLocalSrc('/themes/bara/component/volume-off.svg'),
    generateLocalSrc('/themes/bara/component/volume-on.svg'),
    generateLocalSrc('/themes/bara/component/location-fm-active.svg'),
    generateLocalSrc('/themes/bara/component/location-fm.svg'),
    generateLocalSrc('/themes/bara/component/opening-fm-active.svg'),
    generateLocalSrc('/themes/bara/component/opening-fm.svg'),
    generateLocalSrc('/themes/bara/component/time-fm-active.svg'),
    generateLocalSrc('/themes/bara/component/time-fm.svg'),
    generateLocalSrc('/themes/bara/component/wish-fm-active.svg'),
    generateLocalSrc('/themes/bara/component/wish-fm.svg'),
    // end::component
]