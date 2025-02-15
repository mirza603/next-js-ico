'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '~/styles/Home.module.css'; // Ensure this path is correct

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Logic to check if it's client-side
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>ICO Presale - Token Launch</title>
        <meta name="description" content="Participate in the ICO presale and get early access to our tokens!" />
      </Head>
      <header>
        <h1>Welcome to [Your Token] ICO</h1>
        <p>Secure your tokens today. Limited supply available!</p>
        <a href="/presale" className={styles.ctaButton}>Join the Presale</a>
      </header>
      <section>
        <h2>Why Choose Us?</h2>
        <p>[Your token's unique features and benefits]</p>
      </section>
    </div>
  );
}
