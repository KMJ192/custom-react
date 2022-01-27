interface ProductInfoType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
  productOptions: {
    created_at: string;
    id: number;
    name: string;
    price: number;
    stock: number;
    updated_at: string;
  }[];
}

interface SelectedType {
  [key: string]: {
    name: string;
    price: number;
  };
}

export { ProductInfoType, SelectedType };
