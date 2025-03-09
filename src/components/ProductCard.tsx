"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, name, price, image }: ProductProps) {
  const router = useRouter();

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <Image
        src={image}
        alt={name}
        width={300}
        height={200}
        className="rounded-md cursor-pointer"
        onClick={() => router.push(`/products/${id}`)}
      />
      <h3 className="text-lg font-semibold mt-2">{name}</h3>
      <p className="text-gray-600">${price}</p>
      <button
        className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
        onClick={() => router.push(`/products/${id}`)}
      >
        View Details
      </button>
    </div>
  );
}
