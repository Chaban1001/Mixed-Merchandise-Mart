'use client';

import { useEffect, useState } from 'react';
import styles from './ComputersStyles.module.scss';
import computersProducts from '@/api/ultimateProducts/ultimateProducts.json';
import { UltimateProducts } from '@/interfaces/ultimateProducts';
import { ProductCard } from '@/components/ProductCard/ProductCard';

export default function Computers() {
  const [computers, setComputers] =
    useState<UltimateProducts[]>(computersProducts);

  useEffect(() => {
    setComputers(computersProducts);
  }, []);

  return (
    <section className={styles.computers}>
      <div className={styles.computers__container}>
        <h1 className={styles.computers__title}>
          Mixed Market | Computers & Laptops
        </h1>
        <div className={styles.computers__products}>
          {computers.map((computer, index) => (
            <ProductCard key={index} product={computer} />
          ))}
        </div>
      </div>
    </section>
  );
}
