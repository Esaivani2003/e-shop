"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import Link from "next/link";

// Sample Products
const products = [
  { id: 1, name: "Smartphone", price: 599, image: "/images/smartphone.jpg" },
  { id: 2, name: "Laptop", price: 1099, image: "/images/laptop.jpg" },
  { id: 3, name: "Headphones", price: 199, image: "/images/headphones.jpg" },
  { id: 4, name: "Smart Watch", price: 299, image: "/images/keyboard.jpg" },
];

// Offers for the carousel
const offers = [
  { id: 1, image: "/images/offer1.jpg", title: "Big Sale on Electronics!" },
  { id: 2, image: "/images/offer2.jpg", title: "50% Off on Smartphones!" },
  { id: 3, image: "/images/offer3.jpg", title: "Buy 1 Get 1 Free on Headphones!" },
];

export default function ProductsPage() {
  return (
    <div className="p-6 bg-gray-100">
      {/* Offer Carousel */}
      <div className="mb-6">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="w-full h-[300px] md:h-[400px] rounded-lg shadow-lg"
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.id} className="relative w-full h-[300px] md:h-[400px]">
              <div className="relative w-full h-full">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover w-full h-full rounded-lg"
                  priority
                  quality={100}
                  sizes="(max-width:768px)100vw,(max-width:1200px)80vw,50vw"/>
                
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Product Listing */}
      <h1 className="text-3xl font-bold mb-4 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className="relative w-full h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <Link href={`/products/${product.id}`}>
              <button className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                View
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}