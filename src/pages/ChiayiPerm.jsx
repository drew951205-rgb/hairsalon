import ServiceSeoPage from "./ServiceSeoPage";

const config = {
  eyebrow: "Chiayi Perm",
  shortName: "燙髮",
  title: "嘉義燙髮推薦，自然捲度與韓系燙髮",
  lead: "VOV Hair Salon 提供嘉義燙髮服務，依照髮況、臉型與想要的捲度，規劃自然好整理的燙髮造型。",
  priceTitle: "燙髮價格",
  price: "NT$2000 起",
  priceNote: "價格會依髮長、髮量、燙髮設計與護理需求調整，建議先諮詢。",
  portfolioCategory: "燙髮作品",
  trustTags: ["髮況評估", "自然捲度", "燙後整理建議"],
  audience: [
    {
      title: "想增加髮型蓬鬆度",
      description: "適合頭頂容易扁塌、髮尾沒有線條，想讓整體更有份量感的顧客。",
    },
    {
      title: "想打造自然柔和捲度",
      description: "可依照日常整理能力，設計自然大捲、韓系捲度或修飾臉型的彎度。",
    },
    {
      title: "想改善髮型比例",
      description: "透過捲度與層次搭配，修飾頭型與臉型，讓整體輪廓更柔和。",
    },
  ],
  process: [
    {
      title: "髮況檢測",
      description: "確認髮質、受損程度、曾經染燙紀錄，避免過度處理造成負擔。",
    },
    {
      title: "捲度設計",
      description: "依照臉型、長度與平常整理方式，討論適合的捲度與層次。",
    },
    {
      title: "燙前防護",
      description: "依髮況安排必要的保護與護理，讓燙後質感更穩定。",
    },
    {
      title: "燙後整理教學",
      description: "完成後說明吹整方式、保養重點與維持捲度的方法。",
    },
  ],
  faq: [
    {
      question: "燙髮前需要先諮詢嗎？",
      answer: "建議先諮詢，設計師會依髮況與想要的捲度，評估適合的燙髮方式。",
    },
    {
      question: "燙髮會不會很難整理？",
      answer: "我們會依照你的日常習慣設計，完成後也會教你簡單的吹整方式。",
    },
    {
      question: "染髮和燙髮可以同一天做嗎？",
      answer: "需依髮況評估，不一定建議同日完成，現場會以髮質健康為優先。",
    },
  ],
  ctaTitle: "想找嘉義燙髮推薦，歡迎預約諮詢",
  ctaText: "讓設計師依照你的髮況與風格，規劃適合你的自然捲度。",
};

const ChiayiPerm = () => <ServiceSeoPage config={config} />;

export default ChiayiPerm;
