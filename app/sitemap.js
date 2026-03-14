import billionaires from "@/data/billionaires.json";
import historical from "@/data/billionaires-ever-lived.json";
import fictional from "@/data/fictional-characters.json";

const SITE_URL = "https://www.list-of-billionaires.com";

function normalize(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export default function sitemap() {

  const urls = [];

  /* ---------------- STATIC PAGES ---------------- */

  const staticPages = [
    "",
    "/about",
    "/privacy-policy",
    "/terms-of-use",
    "/billionaires-ever-lived",
    "/fictional",
    "/special/wealthiest-family",
    "/categories/youngest-billionaires"
  ];

  staticPages.forEach((page) => {
    urls.push({
      url: `${SITE_URL}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: page === "" ? 1 : 0.8,
    });
  });

  /* ---------------- BILLIONAIRE PROFILE PAGES ---------------- */

  const list = billionaires.billionaires || billionaires;

  list.forEach((person) => {
    urls.push({
      url: `${SITE_URL}/${normalize(person.Name)}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  /* ---------------- HISTORICAL BILLIONAIRES ---------------- */

  const historicalList = historical.billionaires || historical;

  historicalList.forEach((person) => {
    urls.push({
      url: `${SITE_URL}/billionaires-ever-lived/${person.Slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  });

  /* ---------------- FICTIONAL CHARACTERS ---------------- */

  const fictionalList = fictional.characters || fictional;

  fictionalList.forEach((person) => {
    urls.push({
      url: `${SITE_URL}/fictional/${person.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  });

  /* ---------------- CATEGORY PAGES ---------------- */

  const categories = [
    "female",
    "philanthropists"
  ];

  categories.forEach((cat) => {
    urls.push({
      url: `${SITE_URL}/categories/${cat}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  /* ---------------- COUNTRIES ---------------- */

  const countries = new Set(
    list.map((p) => normalize(p.Country)).filter(Boolean)
  );

  countries.forEach((country) => {
    urls.push({
      url: `${SITE_URL}/country/${country}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  /* ---------------- INDUSTRIES ---------------- */

  const industries = new Set(
    list.map((p) => normalize(p.Industry)).filter(Boolean)
  );

  industries.forEach((industry) => {
    urls.push({
      url: `${SITE_URL}/industry/${industry}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  /* ---------------- REGIONS ---------------- */

  const regions = [
    "north-america",
    "latin-america",
    "asia",
    "europe",
    "africa",
    "oceania"
  ];

  regions.forEach((region) => {
    urls.push({
      url: `${SITE_URL}/region/${region}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  return urls;
}