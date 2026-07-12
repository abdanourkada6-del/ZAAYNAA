import React from 'react';
import { HeroSection } from '@/components/ui/hero-section-2';

/**
 * Démo du composant shadcn HeroSection.
 *
 * ⚠️ Images : la CSP de Hydrogen (entry.server.tsx →
 * createContentSecurityPolicy) n'autorise `img-src` que depuis 'self',
 * cdn.shopify.com et data:. Les URLs externes (Unsplash, Supabase…) sont
 * bloquées par le navigateur. On utilise donc les assets locaux de /public.
 * Pour autoriser Unsplash, il faudrait passer
 * `{imgSrc: ["'self'", 'https://cdn.shopify.com', 'https://images.unsplash.com', 'data:']}`
 * à createContentSecurityPolicy — à éviter sauf besoin réel en prod.
 */
export default function HeroSectionDemo() {
  return (
    <div className="w-full">
      <HeroSection
        logo={{
            url: "/zaaynaa-logo.jpg",
            alt: "ZAAYNAA",
            text: "ZAAYNAA"
        }}
        slogan="MODERN MOROCCAN QUIET LUXURY"
        title={
          <>
            Discret en surface. <br />
            <span className="text-primary">Extraordinaire de près.</span>
          </>
        }
        subtitle="Le minimalisme parisien rencontre l'héritage marocain. Chaque pièce cache un détail que seule celle qui la porte connaît."
        callToAction={{
          text: "DÉCOUVRIR LA COLLECTION",
          href: "/collections",
        }}
        backgroundImage="/nour-signature-hero.png"
        contactInfo={{
            website: "www.zaaynaa.com",
            phone: "+212 6 00 00 00 00",
            address: "Casablanca · Paris",
        }}
      />
    </div>
  );
}
