import ServiceSeoPage from "./ServiceSeoPage";

const config = {
  eyebrow: "Chiayi Scalp Care",
  shortName: "綜效頭皮SPA含洗",
  title: "嘉義綜效頭皮SPA含洗推薦",
  lead: "結合頭皮清潔、舒緩按摩與洗護流程，適合想放鬆、改善頭皮悶黏感，並讓髮絲恢復清爽蓬鬆的顧客。",
  priceTitle: "綜效頭皮SPA含洗價格",
  price: "NT$1200 起",
  priceItems: [
    {
      name: "絲馭光頭皮SPA護理含洗",
      note: "深層清潔頭皮，舒緩悶黏與出油感",
      price: "NT$1200 起",
    },
  ],
  priceNote: "含洗護流程，實際內容會依頭皮狀況與現場評估調整。",
  portfolioCategory: "頭皮護理作品",
  trustTags: ["深層清潔", "舒緩放鬆", "含洗護流程"],
  audience: [
    {
      title: "頭皮容易出油、悶黏",
      description: "適合常覺得頭皮不清爽、容易有悶熱感，想做深層清潔的顧客。",
    },
    {
      title: "想放鬆紓壓",
      description: "透過頭皮 SPA 與洗護流程，讓頭皮與肩頸都能放鬆。",
    },
    {
      title: "想讓髮根更蓬鬆",
      description: "清潔頭皮多餘油脂與髒污後，髮根更容易呈現輕盈感。",
    },
  ],
  process: [
    {
      title: "頭皮需求確認",
      description: "了解頭皮出油、悶黏、乾癢或放鬆需求，安排適合的清潔流程。",
    },
    {
      title: "頭皮清潔",
      description: "溫和清潔頭皮髒污與油脂，降低悶黏感，讓頭皮恢復清爽。",
    },
    {
      title: "舒緩按摩",
      description: "搭配頭皮按摩與洗護，放鬆緊繃感，也讓整體體驗更舒服。",
    },
    {
      title: "吹整完成",
      description: "完成洗護後整理髮根蓬鬆度，並提供日常清潔建議。",
    },
  ],
  faq: [
    {
      question: "綜效頭皮SPA含洗需要多久？",
      answer: "通常約 70 到 90 分鐘，會依現場頭皮狀況與護理流程略有不同。",
    },
    {
      question: "頭皮SPA可以常做嗎？",
      answer: "可以，若頭皮容易出油或壓力大，可依設計師建議定期保養。",
    },
    {
      question: "做完會需要特別保養嗎？",
      answer: "建議維持適合自己的洗髮頻率，並避免過度清潔或使用太刺激的產品。",
    },
  ],
  ctaTitle: "想讓頭皮重新清爽，歡迎預約 VOV Hair Salon",
  ctaText: "我們會依照你的頭皮狀態安排合適的清潔與舒緩流程。",
};

const ChiayiScalpSpa = () => <ServiceSeoPage config={config} />;

export default ChiayiScalpSpa;
