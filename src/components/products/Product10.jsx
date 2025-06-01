import React from "react";
import { Button } from "@relume_io/relume-ui";
import Link from "next/link";

const Product10 = ({ products }) => {
  // Sort products by displayOrder (ascending), fallback to 999 if missing
  const sortedProducts = (products || []).slice().sort((a, b) => {
    const orderA = a.fields.displayOrder ?? 999;
    const orderB = b.fields.displayOrder ?? 999;
    return orderA - orderB;
  });

  return (
    <section
      id="relume"
      className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#501E16] shadow-lg"
    >
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <h4 className="font-semibold text-[#ffffff]">Productos</h4>
            <h1 className="mt-3 text-5xl font-bold text-[#ffffff] md:mt-4 md:text-7xl lg:text-8xl">
              Productos
            </h1>
            <p className="mt-5 text-base text-[#ffffff] md:mt-6 md:text-md">
              Descubre nuestra selección de productos para mujeres cristianas.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-start gap-x-5 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <div
                key={product.sys.id}
                className="bg-[#501E16] rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <Link
                  href={`/productos/${product.fields.productSlug}`}
                  className="mb-3 block aspect-[5/6] md:mb-4 overflow-hidden rounded-lg"
                >
                  <img
                    src={product.fields.productImage.fields.file.url}
                    alt={product.fields.productName}
                    className="size-full object-cover"
                  />
                </Link>
                <Link
                  href={`/productos/${product.fields.productSlug}`}
                  className="flex flex-col text-center md:text-md"
                >
                  <div className="mb-2">
                    <h3 className="font-semibold text-[#ffffff]">
                      {product.fields.productName}
                    </h3>
                    <div className="text-sm text-[#ffffff]">
                      {product.fields.productCategory}
                    </div>
                  </div>
                  <div className="text-md font-semibold text-[#ffffff] md:text-lg">{`$${product.fields.price}`}</div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-[#777]">No products found</p>
          )}
        </div>
        <div className="mt-10 flex justify-center md:mt-14 lg:mt-16">
          <Link href="/productos">
            
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Product10;
