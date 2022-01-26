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

export { ProductInfoType };
