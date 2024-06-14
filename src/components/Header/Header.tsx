'use client';

import { FC, useState } from 'react';
import styles from './HeaderStyles.module.scss';
import { HeaderBanner } from '../HeaderBanner/HeaderBanner';
import { NavBarItems } from '../NavBarItems/NavBarItems';
import { NavItem, navItems } from '@/common/navItems/navItems';
import { Input } from '../ui/Input/Input';
import { Basket, Favorite, Search, User } from 'grommet-icons';
import { SearchValue } from '@/types/types';
import { usePathname } from 'next/navigation';
import { DropDown } from '../ui/DropDown/DropDown';
import Image from 'next/image';
import Link from 'next/link';
import { NavIconsLinks } from '@/interfaces/header-links';
import { useAppSelector } from '@/hooks/useAppSelector';
import dynamic from 'next/dynamic';

type DropDownType = boolean;

const Header: FC = () => {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState<SearchValue>('');
  const [isDropDownOpen, setIsDropDownOpen] = useState<DropDownType>(false);
  const wishlistCounter = useAppSelector(
    (state) => state.wishlist.wishlistCounter
  );

  const handleDropDownToggle = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <HeaderBanner />
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <h3 className={styles.logoTitle}>Mixed Mart</h3>
        </div>
        <nav className={styles.header__nav}>
          <ul className={styles.nav__menu}>
            {navItems.map((link: NavItem) => (
              <NavBarItems key={link.href} link={link} active={pathname} />
            ))}
          </ul>
          <label htmlFor='search' className={styles.searchLabel}>
            <Input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              name='search'
              type='text'
              placeholder='What are you looking for?'
              className={styles.searchInput}
            />
            <Search color='black' style={{ width: 20, height: 20 }} />
          </label>
          <div className={styles.header__iconsBlock}>
            <div className={styles.favorite__block}>
              <Link href={NavIconsLinks.WISHLIST}>
                <Favorite className={styles.icon} color='black' />
                <span className={styles.icon__counter}>{wishlistCounter}</span>
              </Link>
            </div>
            <div className={styles.basket__block}>
              <Link href={NavIconsLinks.CART}>
                <Basket className={styles.icon} color='black' />
                <span className={styles.icon__counter}>0</span>
              </Link>
            </div>
            <div className={styles.account__block}>
              <Image
                src='/icons/user.svg'
                alt=''
                width={22}
                height={22}
                onClick={handleDropDownToggle}
              />
              <DropDown
                isMenuOpen={isDropDownOpen}
                onToggle={handleDropDownToggle}
                onClose={handleDropDownToggle}
              />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
