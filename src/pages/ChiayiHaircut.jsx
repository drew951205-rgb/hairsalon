import ServiceSeoPage from "./ServiceSeoPage";

const config = {
  eyebrow: "Chiayi Haircut",
  shortName: "剪髮",
  title: "嘉義剪髮推薦，洗剪特惠套餐",
  lead: "VOV Hair Salon 提供嘉義專業剪髮服務，依照臉型、髮流、髮量與日常整理習慣，設計適合你的髮型輪廓。",
  priceTitle: "剪髮價格",
  price: "NT$800 起",
  priceNote: "包含洗髮、剪髮與基礎整理，實際內容依現場服務為準。",
  portfolioCategory: "剪髮作品",
  trustTags: ["臉型修飾", "髮流評估", "好整理髮型"],
  audience: [
    {
      title: "想整理髮型輪廓",
      description: "適合想修飾臉型、調整層次，讓髮型看起來更乾淨俐落的顧客。",
    },
    {
      title: "頭髮容易扁塌或毛躁",
      description: "透過層次與髮量調整，讓髮型更有空氣感，也更容易日常整理。",
    },
    {
      title: "想換造型但不想太冒險",
      description: "可以先從瀏海、長度與輪廓微調開始，保留安全感又有新鮮感。",
    },
  ],
  process: [
    {
      title: "需求溝通",
      description: "先了解你平常整理方式、喜歡的長度與想改善的髮型問題。",
    },
    {
      title: "臉型與髮流評估",
      description: "依照臉型比例、髮量、自然髮流與頭型，規劃適合的剪裁方向。",
    },
    {
      title: "剪裁設計",
      description: "調整層次、厚薄與輪廓，讓髮型更符合你的生活習慣。",
    },
    {
      title: "整理教學",
      description: "完成後會說明回家如何吹整與維持髮型線條。",
    },
  ],
  faq: [
    {
      question: "洗剪特惠套餐包含什麼？",
      answer:
        "基本包含洗髮、剪髮與基礎整理，若有特殊護理或造型需求會再現場確認。",
    },
    {
      question: "不知道適合什麼髮型可以預約嗎？",
      answer:
        "可以，設計師會依照臉型、髮流與整理習慣給你建議，不需要一開始就決定好髮型。",
    },
    {
      question: "剪髮多久整理一次比較好？",
      answer: "一般建議 6 到 8 週整理一次，能維持髮型輪廓與髮尾狀態。",
    },
  ],
  ctaTitle: "想找嘉義剪髮推薦，歡迎預約 VOV Hair Salon",
  ctaText: "讓我們依照你的臉型與生活習慣，設計一款好看又好整理的髮型。",
};

const ChiayiHaircut = () => <ServiceSeoPage config={config} />;

export default ChiayiHaircut;
