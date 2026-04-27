import ServiceSeoPage from "./ServiceSeoPage";

const config = {
  eyebrow: "Chiayi Scalp SPA",
  shortName: "高壓氧外泌體毛囊再生頭皮SPA",
  title: "嘉義高壓氧外泌體毛囊再生頭皮SPA推薦",
  lead: "針對頭皮敏弱、落髮困擾、髮根扁塌與頭皮循環需求，透過高壓氧導入與外泌體護理，協助深層修護頭皮狀態。",
  priceTitle: "高壓氧外泌體毛囊再生頭皮SPA價格",
  price: "NT$6000 起",
  priceItems: [
    {
      name: "高壓氧外泌體毛囊再生頭皮SPA",
      note: "針對頭皮狀態深層修護",
      price: "NT$6000 起",
    },
  ],
  priceNote: "實際價格會依頭皮狀況、護理內容與現場評估調整。",
  portfolioCategory: "頭皮護理作品",
  trustTags: ["頭皮檢視", "深層修護", "毛囊養護"],
  audience: [
    {
      title: "頭皮容易敏感、乾癢",
      description: "適合頭皮容易緊繃、乾癢、泛紅，想要做深層舒緩與修護的顧客。",
    },
    {
      title: "髮根扁塌、頭皮循環差",
      description: "透過頭皮養護流程，協助改善頭皮環境，讓髮根狀態更輕盈蓬鬆。",
    },
    {
      title: "在意落髮與毛囊保養",
      description: "適合想定期保養毛囊、加強頭皮健康管理的顧客。",
    },
  ],
  process: [
    {
      title: "頭皮狀態檢視",
      description: "先了解頭皮敏感、出油、乾癢或落髮困擾，判斷適合的護理方向。",
    },
    {
      title: "深層清潔舒緩",
      description: "清潔頭皮多餘油脂與髒污，讓後續養護更容易吸收。",
    },
    {
      title: "高壓氧導入護理",
      description: "依頭皮狀況安排高壓氧與外泌體護理，協助修護頭皮環境。",
    },
    {
      title: "居家保養建議",
      description: "完成後提供洗護頻率與日常保養建議，幫助維持頭皮狀態。",
    },
  ],
  faq: [
    {
      question: "高壓氧外泌體頭皮SPA適合第一次做嗎？",
      answer: "可以，設計師會先評估頭皮狀況，再依照敏感度與需求調整護理流程。",
    },
    {
      question: "做完頭皮SPA會不會影響染燙？",
      answer: "通常不會，但若近期有染燙需求，建議預約時先告知，方便安排最適合的順序。",
    },
    {
      question: "多久做一次比較好？",
      answer: "一般可依頭皮狀況每 3 到 6 週保養一次，實際頻率可由設計師評估建議。",
    },
  ],
  ctaTitle: "想改善頭皮狀態，歡迎預約 VOV Hair Salon",
  ctaText: "我們會依照你的頭皮狀況與生活習慣，規劃適合的頭皮養護流程。",
};

const ChiayiExosomeScalpSpa = () => <ServiceSeoPage config={config} />;

export default ChiayiExosomeScalpSpa;
