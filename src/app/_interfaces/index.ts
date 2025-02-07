export type productType = {
  id?: number;
  documentId?: string;
  title?: string;
  description?: [{ children: [{ text: string }] }];
  price?: number;
  banners?: { url?: string };
  instantDelivery?: boolean;
  files?: string;
  whats?: string;
  whatsInculded?: string;
  category?: string;
};

export type cartContextType = {
  id?: string | number;
  product?: productType;
};

// title
// description
// price
// banners
// instantDelivery
// files
// whats
// whatsInculded
// category
