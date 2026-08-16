import Hero from "@/components/home/Hero";
import OurClients from "@/components/home/OurClients";
import CTA from "@/components/home/CTA";
import Services from "@/components/home/Services";
import SuccessStories from "@/components/home/SuccessStories";
import HowItWorks from "@/components/home/HowItWorks";
import FAQ from "@/components/home/FAQ";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <head>
        {/* Left panel's first slideshow frame */}
        <link
          rel="preload"
          as="image"
          href="/images/webp/1-800.webp"
          imageSrcSet="/images/webp/1-800.webp 800w, /images/webp/1-2000.webp 2000w"
          imageSizes="(max-width: 767px) 100vw, 50vw"
        />
        {/* Right panel's first slideshow frame */}
        <link
          rel="preload"
          as="image"
          href="/images/webp/4-800.webp"
          imageSrcSet="/images/webp/4-800.webp 800w, /images/webp/4-2000.webp 2000w"
          imageSizes="(max-width: 767px) 100vw, 50vw"
        />
      </head>
      <Hero />
      <OurClients/>
      <CTA/>
      <Services/>
      <SuccessStories/>
      <HowItWorks/>
      <FAQ/>
      <FeaturedWorks/>
      <Contact/>
    </>
  );
}