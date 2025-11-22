// src/components/common/SEO.tsx
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  name?: string;
  type?: string;
}

export function SEO({ title, description, name, type = "website" }: SEOProps) {
  return (
    <Helmet>
      {/* Título Estándar */}
      <title>{title} | Portfolio Hub</title>

      {/* Metadatos Básicos */}
      <meta name="description" content={description} />

      {/* Metadatos para Redes Sociales (Open Graph / Facebook / LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Metadatos para Twitter */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
