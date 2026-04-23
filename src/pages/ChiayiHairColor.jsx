import ServiceSeoPage from "./ServiceSeoPage";

const config = {
  eyebrow: "Chiayi Hair Color",
  shortName: "染髮",
  title: "嘉義染髮推薦，質感髮色與霧感染髮",
  lead: "VOV Hair Salon 提供嘉義染髮服務，依照膚色、髮況與風格需求，設計自然耐看的質感髮色。",
  priceTitle: "染髮價格",
  price: "NT$1500 起",
  priceNote: "價格會依髮長、髮量、漂髮需求與護理內容調整，建議現場諮詢。",
  portfolioCategory: "染髮作品",
  trustTags: ["膚色分析", "質感髮色", "染後護理建議"],
  audience: [
    {
      title: "想讓氣色更明亮",
      description: "適合想透過髮色修飾膚色，讓整體看起來更有精神的顧客。",
    },
    {
      title: "想嘗試霧感或特殊色",
      description: "可依照髮況與預算，討論是否需要漂髮以及適合的色調深淺。",
    },
    {
      title: "想維持低調質感",
      description: "適合上班族或第一次染髮，選擇自然耐看、退色也不突兀的髮色。",
    },
  ],
  process: [
    {
      title: "髮況與膚色分析",
      description: "確認髮色基底、受損程度與膚色冷暖，找出適合你的色調。",
    },
    {
      title: "色彩提案",
      description: "依照想呈現的風格，討論霧感、暖棕、冷色或自然色系。",
    },
    {
      title: "染前防護",
      description: "依髮況安排防護與護理，降低染後乾澀與退色不均。",
    },
    {
      title: "染後保養建議",
      description: "完成後說明洗護方式與維持髮色的日常注意事項。",
    },
  ],
  faq: [
    {
      question: "染髮一定要漂髮嗎？",
      answer: "不一定，需依目標髮色與原本髮色判斷，自然色系通常不一定需要漂髮。",
    },
    {
      question: "染後可以維持多久？",
      answer: "會依髮質、洗髮頻率與色系不同而改變，現場會提供保養建議。",
    },
    {
      question: "第一次染髮適合什麼顏色？",
      answer: "建議從自然棕、霧棕或低調質感色開始，比較好駕馭也好整理。",
    },
  ],
  ctaTitle: "想找嘉義染髮推薦，歡迎預約髮色諮詢",
  ctaText: "我們會依照你的膚色、髮況與風格，設計適合你的質感髮色。",
};

const ChiayiHairColor = () => <ServiceSeoPage config={config} />;

export default ChiayiHairColor;
