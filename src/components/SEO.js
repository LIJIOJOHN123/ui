import React from "react";
import { Helmet } from "react-helmet-async";
const SEO = ({ title, description, keywords, author, image, url }) => {
  const fullImageUrl = image ? `${window.location.origin}${image}` : null;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
