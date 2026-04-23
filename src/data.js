export const navItems = [
  { label: "首頁", path: "/" },
  { label: "價目表", path: "/services" },
  { label: "作品集", path: "/portfolio" },
  { label: "關於我們", path: "/stylists" },
  { label: "預約", path: "/booking" },
  { label: "聯絡", path: "/contact" },
];

export const services = [
  {
    title: "剪髮",
    description: "專業剪髮設計，適合各種髮型與臉型。",
    price: "NT$800 起",
    duration: "約 30-60 分鐘",
    note: "請提前預約，建議每 6-8 週修剪一次",
  },
  {
    title: "染髮",
    description: "日系自然染色技術，使用高品質染料，持久亮麗不傷髮。",
    price: "NT$1500 起",
    duration: "約 120-180 分鐘",
    note: "漂染前需諮詢，長髮加價",
  },
  {
    title: "燙髮",
    description: "韓系燙髮技術，創造自然捲度，適合各種髮質。",
    price: "NT$2000 起",
    duration: "約 180-240 分鐘",
    note: "燙後需特別護理",
  },
  {
    title: "高壓氧外泌體毛囊再生頭皮SPA",
    description: "結合高壓氧導入與外泌體養護，針對毛囊與頭皮狀態進行深層修護。",
    price: "NT$3000 起",
    duration: "約 60分鐘",
    note: "高壓氧外泌體服務，幫助生髮、防止掉髮，讓您青春年輕",
  },
  {
    title: "綜效頭皮SPA含洗",
    description: "專業綜效頭皮SPA服務，包含洗髮，擁有舒壓放鬆的美好體驗。",
    price: "NT$1600 起",
    duration: "約  60 分鐘",
    note: "適合頭皮緊繃、出油或想深度放鬆的顧客",
  },
];

export const portfolioItems = [
  {
    category: "剪髮作品",
    items: [
      {
        title: "韓系短髮",
        subtitle: "髮長：中長髮 → 短髮",
        stylist: "小美",
        note: "每6週修剪，建議使用滋養洗髮精",
        image: "/assets/派大興.jpg",
      },
      {
        title: "自然層次",
        subtitle: "髮長：長髮 → 層次長髮",
        stylist: "阿明",
        note: "定期修剪，保持層次感",
        image: "/assets/派大興.jpg",
      },
    ],
  },
  {
    category: "染髮作品",
    items: [
      {
        title: "奶茶色染髮",
        subtitle: "髮質：粗硬髮 → 柔順亮麗",
        stylist: "小華",
        note: "使用專用護色產品，定期補色",
        image: "/assets/派大興.jpg",
      },
      {
        title: "霧感色系",
        subtitle: "髮質：受損髮 → 健康霧感",
        stylist: "小美",
        note: "避免頻繁洗髮，使用溫和洗髮精",
        image: "/assets/派大興.jpg",
      },
    ],
  },
  {
    category: "燙髮作品",
    items: [
      {
        title: "韓系大捲",
        subtitle: "髮質：直髮 → 自然大捲",
        stylist: "阿明",
        note: "使用防掉捲產品，定期修剪",
        image: "/assets/派大興.jpg",
      },
      {
        title: "日系微捲",
        subtitle: "髮質：細軟髮 → 輕柔微捲",
        stylist: "小華",
        note: "使用滋養髮膜，保持捲度",
        image: "/assets/日系測試.jpg",
      },
    ],
  },
];

export const stylists = [
  {
    name: "Jenny",
    specialty: "日系染髮、霧感色系",
    experience: "5年",
    languages: "中文、英文",
    rating: "★★★★★ (98%)",
  },
  {
    name: "阿明",
    specialty: "韓系燙髮、男士造型",
    experience: "7年",
    languages: "中文",
    rating: "★★★★★ (96%)",
  },
  {
    name: "小華",
    specialty: "頭皮護理、特殊造型",
    experience: "4年",
    languages: "中文、日文",
    rating: "★★★★★ (95%)",
  },
];

export const bookingTimes = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

export const testimonials = [
  "染髮效果超自然，設計師很專業！",
  "頭皮護理後頭髮變得更健康了",
  "預約方便，服務態度好",
];
