interface FooterList {
  category: string;
  items: FooterLink[];
}

interface FooterLink {
  label: string;
  link: string;
}

const footerData: FooterList[] = [
  { category: "SpendSplit", items: [{ label: "Home", link: "/" }, { label: "Help", link: "/" }] },
  {
    category: "Contribute",
    items: [
      { label: "Contribute code", link: "/" },
      { label: "Suggest features", link: "/" },
      { label: "Contact me", link: "/" },
    ],
  },
];

export { footerData }