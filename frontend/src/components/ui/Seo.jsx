import { useEffect } from "react";

export default function Seo({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Alsalaam Primary & Secondary School` : "Alsalaam Primary & Secondary School";
    document.title = fullTitle;

    const setMeta = (name, content, isProperty = false) => {
      if (!content) return;
      const attr = isProperty ? "property" : "name";
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
  }, [title, description]);

  return null;
}
