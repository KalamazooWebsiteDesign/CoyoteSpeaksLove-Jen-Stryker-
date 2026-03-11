const WC_STORE_API = "/wp-json/wc/store/v1";
const WC_API = "/wp-json/wc/v3";
const WC_KEY = "ck_bbd142ce6a61d3d6759f29b9f8d3dd4af0f0314a";
const WC_SECRET = "cs_abc6b4dcb8233cd64f5bad1a97fb1bbde0bfead1";
const AUTH_HEADER = "Basic " + btoa(WC_KEY + ":" + WC_SECRET);

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  categories: { id: number; name: string; slug: string }[];
  images: { id: number; src: string; alt: string }[];
  featured: boolean;
  stock_status: string;
}

export async function getProducts(): Promise<WCProduct[]> {
  const res = await fetch(`${WC_API}/products?per_page=50&status=publish`, {
    headers: { Authorization: AUTH_HEADER },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductBySlug(slug: string): Promise<WCProduct | null> {
  const res = await fetch(`${WC_API}/products?slug=${slug}&status=publish`, {
    headers: { Authorization: AUTH_HEADER },
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  const products = await res.json();
  return products[0] || null;
}

// Store API for cart (uses cookies, no auth needed)
export async function getCart() {
  const res = await fetch(`${WC_STORE_API}/cart`);
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export async function addToCart(productId: number, quantity = 1) {
  const nonceRes = await fetch(`${WC_STORE_API}/cart`);
  const nonce = nonceRes.headers.get("Nonce") || nonceRes.headers.get("X-WC-Store-API-Nonce") || "";

  const res = await fetch(`${WC_STORE_API}/cart/add-item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Nonce: nonce,
    },
    body: JSON.stringify({ id: productId, quantity }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to add to cart");
  }
  return res.json();
}

export async function updateCartItem(itemKey: string, quantity: number) {
  const nonceRes = await fetch(`${WC_STORE_API}/cart`);
  const nonce = nonceRes.headers.get("Nonce") || nonceRes.headers.get("X-WC-Store-API-Nonce") || "";

  const res = await fetch(`${WC_STORE_API}/cart/update-item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Nonce: nonce,
    },
    body: JSON.stringify({ key: itemKey, quantity }),
  });
  if (!res.ok) throw new Error("Failed to update cart");
  return res.json();
}

export async function removeCartItem(itemKey: string) {
  const nonceRes = await fetch(`${WC_STORE_API}/cart`);
  const nonce = nonceRes.headers.get("Nonce") || nonceRes.headers.get("X-WC-Store-API-Nonce") || "";

  const res = await fetch(`${WC_STORE_API}/cart/remove-item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Nonce: nonce,
    },
    body: JSON.stringify({ key: itemKey }),
  });
  if (!res.ok) throw new Error("Failed to remove item");
  return res.json();
}
