import React from "react";
import { Button } from "@relume_io/relume-ui";

const Product10 = ({ products }) => {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <h4 className="font-semibold">Productos</h4>
            <h1 className="mt-3 text-5xl font-bold md:mt-4 md:text-7xl lg:text-8xl">
              Productos
            </h1>
            <p className="mt-5 text-base md:mt-6 md:text-md">
              Descubre nuestra selección de productos para mujeres cristianas.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-start gap-x-5 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div key={product.sys.id}>
                <a href={product.fields.externalUrl} className="mb-3 block aspect-[5/6] md:mb-4">
                  <img
                    src={product.fields.productImage.fields.file.url} // Image URL from Contentful
                    alt={product.fields.productName}
                    className="size-full object-cover"
                  />
                </a>
                <a href={product.fields.externalUrl} className="flex flex-col text-center md:text-md">
                  <div className="mb-2">
                    <h3 className="font-semibold">{product.fields.productName}</h3>
                    <div className="text-sm">{product.fields.productCategory}</div>
                  </div>
                  <div className="text-md font-semibold md:text-lg">{`$${product.fields.price}`}</div>
                </a>
                <Button
                  variant="secondary"
                  size="sm"
                  title="Añadir al carrito"
                  className="mt-3 w-full md:mt-4"
                >
                  Añadir al carrito
                </Button>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
        <div className="mt-10 flex justify-center md:mt-14 lg:mt-16">
          <Button variant="secondary" size="primary" title="Ver todos">
            Ver todos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Product10;  // <-- Default export
