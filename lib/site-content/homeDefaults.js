export const homeDefaults = {
  version: 1,
  seo: {
    title: 'Momento - Undangan Digital, Mahar & Seserahan',
    description: 'Ciptakan momen pernikahan yang autentik dan kreatif 🪄',
    ogImageUrl: '',
  },
  opening: {
    headline: "Everything For\nYour Special Moments",
    services: [
      'Sewa Seserahan',
      'Frame Mahar',
      'Undangan Digital',
      'Flower Bouquet',
      'Wedding Keepsake',
      'Wedding Content Creator',
    ],
    cta: {
      desktopLabel: 'LIHAT HARGA',
      mobileLabel: 'HITUNG ESTIMASI HARGA',
      href: '/estimasi'
    },
    decorationImage: {
      src: '/images/home-decoration.png',
      alt: 'Decoration',
    },
  },
  why: {
    items: [
      {
        title: 'Authentic',
        description: 'Momento memberikan sentuhan original di setiap desain, khusus buat Kamu agar beda dari yang lain.',
        icon: { src: '/icons/why/authentic.svg', alt: 'Authentic' },
      },
      {
        title: 'Professional',
        description: 'Dibuat oleh tim berpengalaman, Momento berkomitmen memberikan hasil sesuai dengan keinginan Kamu.',
        icon: { src: '/icons/why/professional.svg', alt: 'Professional' },
      },
      {
        title: 'As You Wish',
        description: 'Produk Momento dirancang sesuai keinginan Kamu. Dipastikan semua detail pas seperti yang Kita sepakati.',
        icon: { src: '/icons/why/as-you-wish.svg', alt: 'As You Wish' },
      },
      {
        title: 'Responsive',
        description: 'Kamu ngga perlu khawatir, Momento siap bantu Kamu kapan pun. Tanya apa saja, dipastikan pengalamanmu bareng Momento lancar hingga hari H.',
        icon: { src: '/icons/why/responsive.svg', alt: 'Responsive' },
      },
      {
        title: 'Up-to-date',
        description: 'Kami nggak mau momenmu terlihat membosankan. Makanya, Momento selalu bikin desain yang fresh agar acaramu tetap kekinian.',
        icon: { src: '/icons/why/up-to-date.svg', alt: 'Up-to-date' },
      },
    ],
  },
  seserahan: {
    title: 'Sewa seserahan',
    description: 'Momento melayani sewa seserahan untuk acara lamaran dan pernikahan di wilayah <span class="font-bold">JADETABEK</span>.<br class="hidden md:block" /> Berlokasi di <span class="font-bold">Tangerang</span>, kami juga menyediakan layanan pengiriman melalui <span class="font-bold">Lalamove</span> dan <span class="font-bold">Gosend Car</span>.',
    images: [
      { src: '/images/seserahan-items/seserahan-1.png', alt: 'Seserahan 1' },
      { src: '/images/seserahan-items/seserahan-2.png', alt: 'Seserahan 2' },
      { src: '/images/seserahan-items/seserahan-3.png', alt: 'Seserahan 3' },
      { src: '/images/seserahan-items/seserahan-4.png', alt: 'Seserahan 4' },
      { src: '/images/seserahan-items/seserahan-5.png', alt: 'Seserahan 5' },
      { src: '/images/seserahan-items/seserahan-6.png', alt: 'Seserahan 6' },
      { src: '/images/seserahan-items/seserahan-7.png', alt: 'Seserahan 7' },
    ],
    cta: {
      label: 'Selengkapnya',
      href: '/harga?category=seserahan',
    },
  },
  mahar: {
    title: 'Frame Mahar',
    description: 'Menghadirkan mahar pernikahan yang dapat kamu simpan selamanya. Bebas request warna sesuai dengan tema pernikahanmu. Pengiriman dari <span class="font-bold">Tangerang</span> tersedia melalui Paxel maupun Gosend untuk layanan instan.',
    images: [
      { src: '/images/mahar-items/mahar-1.png', alt: 'Mahar 1' },
      { src: '/images/mahar-items/mahar-2.png', alt: 'Mahar 2' },
      { src: '/images/mahar-items/mahar-3.png', alt: 'Mahar 3' },
      { src: '/images/mahar-items/mahar-4.png', alt: 'Mahar 4' },
    ],
    cta: {
      label: 'Selengkapnya',
      href: '/harga?category=mahar',
    },
  },
  invitation: {
    title: 'Undangan Digital',
    description: 'Hadir dengan desain responsif di semua perangkat. Dilengkapi fitur <span class="font-bold whitespace-nowrap md:whitespace-normal">Exclusive Guest Name</span>, <span class="font-bold">Dashboard Kelola Tamu</span> untuk <span class="font-bold">RSVP</span>, <span class="font-bold">Unique Link Invitation</span> untuk dibagikan, dan masih banyak lagi yang dapat kamu sesuaikan dengan kebutuhanmu.',
    leftImages: [
      { src: '/images/undangan-items/left/invitation-left-1.png', alt: 'Undangan Left 1' },
      { src: '/images/undangan-items/left/invitation-left-2.png', alt: 'Undangan Left 2' },
      { src: '/images/undangan-items/left/invitation-left-3.png', alt: 'Undangan Left 3' },
      { src: '/images/undangan-items/left/invitation-left-4.png', alt: 'Undangan Left 4' },
    ],
    rightImages: [
      { src: '/images/undangan-items/right/invitation-right-1.png', alt: 'Undangan Right 1' },
      { src: '/images/undangan-items/right/invitation-rigth-2.png', alt: 'Undangan Right 2' },
      { src: '/images/undangan-items/right/invitation-rigth-3.png', alt: 'Undangan Right 3' },
      { src: '/images/undangan-items/right/invitation-rigth-4.png', alt: 'Undangan Right 4' },
    ],
    cta: {
      label: 'Selengkapnya',
      href: '/harga?category=undangan',
    },
  },
  highlight: {
    title: 'More Extras!',
    description: 'Selain layanan dan produk utama, Momento juga menyediakan berbagai pelengkap pernikahan untuk menyempurnakan hari spesialmu',
    items: [
      {
        title: 'Wedding Keepsake',
        description: 'Properti pernikahan seperti vow, surat, amplop, dsb. yang dapat disimpan sebagai kenangan dan dokumentasi',
        image: { src: '/images/extras/keepsake.png', alt: 'Wedding Keepsake' },
      },
      {
        title: 'Flower Bouqet',
        description: 'Buket bunga untuk pengantin wanita yang dibawa selama acara pernikahan, dan dapat disesuaikan dengan tema',
        image: { src: '/images/extras/bouqet.png', alt: 'Flower Bouqet' },
      },
      {
        title: 'Wedding Content Creator',
        description: 'Jasa pembuatan konten selama acara menggunakan iphone, yang siap dibagikan ke media sosial secara lifetime',
        image: { src: '/images/extras/wcc.png', alt: 'Wedding Content Creator' },
      },
    ],
    cta: {
      label: 'Selengkapnya',
      href: '/harga?category=keepsake',
    },
  },
  testimony: {
    title: 'Apa Kata Mereka?',
    description: 'Dari mereka yang telah menggunakan jasa Momento sejak 2023.',
    quoteImage: {
      src: '/images/testimonies/quote-mark.svg',
      alt: 'Quote Icon',
    },
    stats: [
      { icon: '/images/testimonies/icons/008-wedding gift.svg', value: '200+', label: 'Tray Seserahan disewakan' },
      { icon: '/images/testimonies/icons/025-picture.svg', value: '50+', label: 'Pengantin telah mempercayakan kami' },
      { icon: '/images/testimonies/icons/027-beverage.svg', value: '25+', label: 'Frame Mahar dirangkai' },
      { icon: '/images/testimonies/icons/034-wedding invitation.svg', value: '25+', label: 'Undangan Digital dibuat' },
      { icon: '/images/testimonies/icons/023-message.svg', value: '1500+', label: 'Undangan telah disebarkan' },
    ],
    items: [
      {
        name: 'Itsna & Rizky',
        date: 'Desember 2025',
        image: '/images/testimonies/testimony-pictures/itsna-rizky.png',
        text: 'Saya sangat suka dengan layanan Momento untuk desain seserahan dan mahar pernikahan saya. Hasilnya rapi, detailnya terasa premium, dan sesuai dengan tema pernikahan kami. Keluarga dan tamu pun banyak yang memuji tampilannya. Selain itu, pelayanannya ramah, pengerjaannya tepat waktu, dan harganya sangat sebanding dengan kualitas yang diberikan. Untuk calon pengantin yang sedang mencari vendor seserahan dan mahar, saya sangat merekomendasikan Momento. 😊✨',
      },
      {
        name: 'Shana & Danang',
        date: 'Oktober 2025',
        image: '/images/testimonies/testimony-pictures/shana-danang.png',
        text: 'Aku sangat merekomendasikan Momento ini untuk membantu kalian para pejuang halal yang ingin desain mahar, seserahan, dan undangan digital. Pengerjaannya sangat profesional dan apik bgt gess untuk harga paketan pun sangat terjangkau dan banyak free nya. Adminnya juga sangat komunikatif bgt kalau ada yang kurang atau perlu revisi dari kita. Terimakasih banyak Tim Momento 💓✨',
      },
      {
        name: 'Rifa & Bayu',
        date: 'Februari 2025',
        image: '/images/testimonies/testimony-pictures/rifa-bayu.png',
        text: 'Hasilnya sangat bagus, rapi, dan sesuai yang diinginkan. Pelayanannya jg fast respon, cukup baik dan selalu merekomendasikan yg terbaik seperti apaaa. Thank you momento sudah mempercantik Seserahan, Bingkai Mahar, dan Undangan Digitalnya❤️ best!!!❤️️❤️️❤️️',
      },
      {
        name: 'Ajeng & Tirta',
        date: 'Desember 2024',
        image: '/images/testimonies/testimony-pictures/ajeng-tirta.png',
        text: 'Hasilnya sangat bagus, rapi, dan sesuai yang diinginkan. Pelayanannya jg fast respon, cukup baik dan selalu merekomendasikan yg terbaik seperti apaaa. Thank you momento sudah mempercantik Seserahan, Bingkai Mahar, dan Undangan Digitalnya❤️ best!!!❤️️❤️️❤️️',
      },
      {
        name: 'Chyntia & Bagus',
        date: 'November 2024',
        image: '/images/testimonies/testimony-pictures/chyntia-bagus.png',
        text: 'The best mahar frame that you can find ever. Best packaging, best price and best owner. Trust me!!! Hasilnya sesuai sama design yang udah disepakati dan yang kita mau. Beberapa kali ganti konsep/revisi tapi owner nya selalu usahakan yg terbaik. Highly recommended for all bride and groom who want mahar frame with premium results. Sukses selalu Momento',
      },
      {
        name: 'Riri & Ari',
        date: 'Mei 2024',
        image: '/images/testimonies/testimony-pictures/riri-ari.png',
        text: 'Komunikatif dan sabar bgt. Undangan digital ku jadi cantik bgt sesuai dengan color pallete yg ku mau. Kotak seserahan dihias dengan sangat cantik dan rapi, banyak yg muji dan nanyain rent dimana. Rentnya disini ya guys!!! Dijamin rapi dan cantik sesuai tema yg kita mau. Makasih momento project, sukses terus yaaa!!!',
      },
      {
        name: 'Viranda & Akbar',
        date: 'November 2023',
        image: '/images/testimonies/testimony-pictures/viranda-akbar.png',
        text: 'Pengerjaannya cepat, hasilnya bagus banget dan sesuai sama yang direquest, adminnya fast respon dan ramah, pelayanannya juga oke banget!',
      },
    ],
    bottomDecoration: {
      src: '/images/testimonies/testimony-bottom-decoration.png',
      alt: 'Wave Decoration',
    },
  },
  extraBanner: {
    title: 'Kalau kamu masih bingung dengan produk-produk Momento, atau kamu butuh saran tema yang pas dengan pernikahanmu, jangan ragu untuk ngobrol dengan kami ya!',
    buttonText: 'HUBUNGI KAMI',
    buttonHref: 'https://wa.me/6285117797966',
  },
};
