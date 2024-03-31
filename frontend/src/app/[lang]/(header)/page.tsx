import React from "react";

import styles from "./home.module.scss";

import Button from "@/src/components/button";
import HomeImage1 from "@/public/img/home/1.jpeg";
import HomeImage2 from "@/public/img/home/2.jpeg";
import HomeImage3 from "@/public/img/home/3.jpeg";
import HomeImage4 from "@/public/img/home/4.jpeg";
import HomeImage5 from "@/public/img/home/5.jpeg";
import HomeImage6 from "@/public/img/home/6.jpeg";
import Image from "next/image";
import Slider from "./components/slider";
import FindUs from "./components/findUs";
import { IJwtPayload } from "@/src/utils/authenticate";
import { headers } from "next/headers";
import { Locale } from "@/src/types";
import { getDictionary } from "../dictionaries";

interface IHomePageProps {
  params: { lang: Locale };
}

const images = [
  HomeImage1,
  HomeImage2,
  HomeImage3,
  HomeImage4,
  HomeImage5,
  HomeImage6,
];

const HomePage = async ({ params }: IHomePageProps) => {
  const { home, productCard } = await getDictionary(params.lang);
  const headersList = headers();
  const userData: IJwtPayload = JSON.parse(headersList.get("userData") || "{}");

  const isUserDataExists = Object.keys(userData).length !== 0;

  return (
    <main className={styles.wrapper}>
      <section className={styles.welcomeWrapper}>
        <div className={styles.welcomeInfo}>
          <h1 className={styles.welcomeTitle}>{home.title}</h1>
          <h2 className={styles.welcomeSubtitle}>{home.subtitle}</h2>
          <div className={styles.welcomeBtn}>
            <Button text={home.btn} />
          </div>
        </div>
        <div className={styles.welcomeImagesWrapper}>
          {images.map((img, idx) => (
            <div key={idx} className={styles.welcomeImage}>
              <Image
                src={img}
                alt={`home-${idx}`}
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>
      <section className={styles.bestSellersWrapper}>
        <h3 className={styles.sectionTitle}>{home.sellersTitle}</h3>
        <div className={styles.bestSellerSlider}>
          <Slider isUserDataExists={isUserDataExists} pageData={productCard} />
        </div>
      </section>
      <section className={styles.findUsWrapper}>
        <h3 className={styles.sectionTitle}>{home.findTitle}</h3>
        <FindUs />
      </section>
    </main>
  );
};

export default HomePage;
