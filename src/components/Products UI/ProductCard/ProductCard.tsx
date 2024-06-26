'use client';

import { UltimateProducts } from '@/interfaces/ultimateProducts';
import styles from './ProductCardStyles.module.scss';
import type { FC } from 'react';
import Image from 'next/image';
import { Star, StarHalf } from 'grommet-icons';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addProductsToWishlist } from '@/store/slices/wishlistSlice';

interface ProductCardProps {
  product: UltimateProducts;
  onAddWishlistProduct?: () => void;
  onDeleteWishlistProduct?: () => void;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddProductToWishlist = () => {
    dispatch(addProductsToWishlist(product));
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productCard__container}>
        <Link
          className={styles.productCard__link}
          href={`/${product.category}/${
            product.name ? product.name.replaceAll(' ', '-') : ''
          }`}
        >
          <Image
            priority
            src={product.mainImage}
            alt={`Product Image ${product.title}`}
            width={200}
            height={220}
            className={styles.productCard__image}
          />
        </Link>
        <h3 className={styles.productCard__title}>
          {product.title.replaceAll('-', ' ')}
        </h3>
        <div className={styles.productCart__prices}>
          <h4 className={styles.productCard__price}>
            Price: {product.price} {+product.priceDiscount > 1000 ? '$' : '₴'}
          </h4>
          <p className={styles.productCard__discount}>
            {product.price} {+product.price > 1000 ? '$' : '₴'}
          </p>
        </div>
        <div className={styles.productCard__rating}>
          Rating:
          {product.productRating === 5 ? (
            <Star color='plain' />
          ) : (
            <StarHalf color='plain' />
          )}
          ({product.productRating})
        </div>
        <span className={styles.productCard__id}>ProductId: {product.id}</span>
        <Button
          type='button'
          className={styles.productCard__button}
          onClick={() => {
            handleAddProductToWishlist();
            handleScrollTop();
          }}
        >
          Add to Wishlist
        </Button>
      </div>
    </div>
  );
};
