import { tools } from './src/lib/tools-registry';

try {
  const q = "a";
  const results = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q.toLowerCase()) ||
      t.tags?.some((tag) => tag.includes(q.toLowerCase()))
  ).slice(0, 8);
  console.log("Search worked. Results found:", results.length);
} catch (e) {
  console.error("Search crashed:", e);
}
