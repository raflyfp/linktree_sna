-- ========================================================
-- SKRIP DATABASE SUPABASE - PC STORE LINKTREE
-- Salin seluruh isi skrip ini ke SQL Editor di Dashboard Supabase Anda,
-- lalu klik "Run".
-- ========================================================

-- 1. TABEL STORES (TOKO MARKETPLACE & PIN PETA)
create table if not exists stores (
  id text primary key,
  name text not null,
  branch_name text not null,
  city text not null,
  province text not null,
  platform text not null default 'shopee',
  platform_label text not null default 'Shopee Official',
  url text not null,
  is_pusat boolean default false,
  badge text,
  description text,
  chibi_image text,
  delivery_speed text,
  promo_text text,
  rating text default '4.9',
  map_coordinates jsonb default '{"x": 50, "y": 50}'::jsonb,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. TABEL PRODUCTS (PRODUK MEDIS UNGGULAN)
create table if not exists products (
  id text primary key,
  name text not null,
  slug text not null,
  category text not null,
  short_description text not null,
  is_best_seller boolean default true,
  badge text,
  image_url text not null,
  chibi_mascot text,
  target_branch_id text,
  features text[] default '{}',
  chibi_quote text,
  rating text default '4.9/5.0',
  sold_count text default '1rb+ Terjual',
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. TABEL SITE_CONFIG (KONFIGURASI SITUS & WHATSAPP)
create table if not exists site_config (
  id text primary key default 'main',
  brand_name text default 'PC Store',
  tagline text default 'Pusat Solusi Perawatan & Produk Medis Terpercaya',
  description text default 'Official store jaringan cabang PC Store di seluruh Indonesia. Temukan produk perawatan berkualitas dan akses langsung ke toko marketplace resmi kami.',
  wa_phone_number text default '',
  wa_default_message text default 'Halo Admin PC Store, saya ingin bertanya seputar ketersediaan produk dan cabang.',
  tiktok_url text default 'https://tk.tokopedia.com/ZSq6yuf9J/',
  shopee_pusat_url text default 'https://s.shopee.co.id/7VGCzchHR7',
  instagram_url text default '',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- AKTIFKAN ROW LEVEL SECURITY (RLS)
alter table stores enable row level security;
alter table products enable row level security;
alter table site_config enable row level security;

-- HAPUS POLICY LAMA JIKA SUDAH ADA (AGAR BISA DI-RUN ULANG)
drop policy if exists "Allow public read stores" on stores;
drop policy if exists "Allow public modify stores" on stores;
drop policy if exists "Allow public read products" on products;
drop policy if exists "Allow public modify products" on products;
drop policy if exists "Allow public read site_config" on site_config;
drop policy if exists "Allow public modify site_config" on site_config;

-- KEBIJAKAN AKSES: Publik bisa membaca (select) dan mengubah (insert/update/delete)
create policy "Allow public read stores" on stores for select using (true);
create policy "Allow public modify stores" on stores for all using (true) with check (true);

create policy "Allow public read products" on products for select using (true);
create policy "Allow public modify products" on products for all using (true) with check (true);

create policy "Allow public read site_config" on site_config for select using (true);
create policy "Allow public modify site_config" on site_config for all using (true) with check (true);

-- ========================================================
-- DATA AWAL (SEED DATA 7 CABANG TOKO & PRODUK MEDIS)
-- ========================================================

-- Isi Data Toko Bawaan jika belum ada
insert into stores (id, name, branch_name, city, province, platform, platform_label, url, is_pusat, badge, description, chibi_image, delivery_speed, promo_text, rating, map_coordinates, order_index)
values
  ('pc-pusat-pasuruan-shopee', 'Toko Shopee PC Pusat Pasuruan', 'Pusat Pasuruan (Shopee)', 'Pasuruan', 'Jawa Timur', 'shopee', 'Shopee Official', 'https://s.shopee.co.id/7VGCzchHR7', true, 'Kantor Pusat Utama', 'Toko resmi pusat melayani pengiriman ke seluruh Indonesia dengan ketersediaan produk terlengkap dan garansi original.', '/images/products/polifix-chibi-thumbsup.png', 'Siap Kirim Kilat Hari Ini', 'Katalog Terlengkap & Official Guarantee', '4.9', '{"x": 44.2, "y": 75.5}'::jsonb, 1),
  ('pc-pusat-pasuruan-tiktok', 'TikTok Shop Pusat Pasuruan', 'Pusat Pasuruan (TikTok)', 'Pasuruan', 'Jawa Timur', 'tiktok', 'TikTok Shop', 'https://tk.tokopedia.com/ZSq6yuf9J/', true, 'Official TikTok Shop', 'Live shopping interaktif setiap hari, promo voucher potongan harga, dan gratis ongkir di TikTok Shop Resmi kami.', '/images/products/polifix-chibi-running.png', 'Live Stream Promo Harian', 'Kupon Diskon & Gratis Ongkir Ekstra', '4.9', '{"x": 44.2, "y": 75.5}'::jsonb, 2),
  ('pc-surabaya-shopee', 'Toko Shopee Surabaya', 'Cabang Surabaya', 'Surabaya', 'Jawa Timur', 'shopee', 'Shopee Cabang', 'https://id.shp.ee/M44uK33', false, 'Hub Logistik Jawa Timur', 'Pengiriman super kilat untuk kawasan Gerbangkertosusila dan sekitarnya dengan opsi pengiriman instan sameday.', '/images/products/polifix-chibi-hug.png', 'Same-day & Instant Available', 'Dekat & Lebih Cepat Sampai', '4.9', '{"x": 43.5, "y": 71.0}'::jsonb, 3),
  ('pc-malang-shopee', 'Toko Shopee Malang', 'Cabang Malang', 'Malang', 'Jawa Timur', 'shopee', 'Shopee Cabang', 'https://id.shp.ee/8J237w1', false, 'Area Malang Raya', 'Melayani Kota & Kabupaten Malang, Batu, dan sekitarnya dengan kemudahan belanja dan ongkir lebih hemat.', '/images/products/polifix-chibi-running.png', 'Pengiriman Cepat Malang Raya', 'Hemat Ongkir Area Selatan', '4.8', '{"x": 42.4, "y": 72.5}'::jsonb, 4),
  ('pc-jakarta-shopee', 'Toko Shopee Jakarta', 'Cabang Jakarta', 'Jakarta', 'DKI Jakarta', 'shopee', 'Shopee Cabang', 'https://id.shp.ee/Xb1vHjE', false, 'Official Hub Jabodetabek', 'Layanan prioritas untuk wilayah Jabodetabek dan sekitarnya demi efisiensi ongkos kirim dan durasi pengantaran tercepat.', '/images/products/polifix-chibi-thumbsup.png', 'Prioritas Pengiriman Jabodetabek', 'Ongkir Lebih Hemat & Fleksibel', '4.9', '{"x": 20.8, "y": 64.5}'::jsonb, 5),
  ('pc-bandung-shopee', 'Toko Shopee Bandung', 'Cabang Bandung', 'Bandung', 'Jawa Barat', 'shopee', 'Shopee Cabang', 'https://id.shp.ee/t6dF8sD', false, 'Cabang Jawa Barat', 'Menjangkau kebutuhan konsumen Jawa Barat dan sekitarnya langsung dari hub kota kembang Bandung.', '/images/products/polifix-chibi-hug.png', 'Layanan Cepat Area Jawa Barat', 'Stok Terjamin & Pengemasan Rapi', '4.8', '{"x": 23.5, "y": 71.5}'::jsonb, 6),
  ('pc-tarakan-shopee', 'Toko Shopee Tarakan Kalimantan Utara', 'Cabang Tarakan', 'Tarakan', 'Kalimantan Utara', 'shopee', 'Shopee Cabang', 'https://id.shp.ee/YoNQpuyu', false, 'Cabang Kalimantan', 'Solusi hemat ongkir bagi pelanggan di Pulau Kalimantan hingga kawasan IKN dengan jaminan sampai cepat.', '/images/products/polifix-chibi-hug.png', 'Solusi Cepat Kalimantan & IKN', 'Ongkir Murah untuk Area Kalimantan', '4.9', '{"x": 50.5, "y": 19.5}'::jsonb, 7)
on conflict (id) do nothing;

-- Isi Data Produk Bawaan jika belum ada
insert into products (id, name, slug, category, short_description, is_best_seller, badge, image_url, chibi_mascot, target_branch_id, features, chibi_quote, rating, sold_count, order_index)
values
  ('prod-polifix-new', 'Polifix (Kemasan Baru)', 'polifix-kemasan-baru', 'Plester Fiksasi Medis', 'Plester fiksasi penutup luka dengan formula perekat ramah kulit dan daya rekat optimal untuk kenyamanan pemakaian sehari-hari.', true, 'Best Seller • Kemasan Baru', '/images/products/polifix-kemasan-baru.svg', '/images/products/polifix-chibi-thumbsup.png', 'pc-pusat-pasuruan-shopee', array['Daya Rekat Optimal', 'Ramah Kulit & Lembut', 'Elastisitas Nyaman'], 'Halo! Aku Polifix, siap jaga luka tetap aman & nempel nyaman!', '4.9/5.0', '12rb+ Terjual', 1),
  ('prod-policrepe', 'Policrepe & Poligyp Care', 'policrepe-poligyp', 'Perban Elastis & Fiksasi', 'Perban elastis berkualitas tinggi dengan elastisitas seimbang, memberikan tekanan merata serta fleksibilitas gerak tubuh.', true, 'Favorit Medis • Top Choice', '/images/products/policrepe.svg', '/images/products/poligyp-chibi-cheer.png', 'pc-pusat-pasuruan-shopee', array['Kompresi Merata', 'Bisa Dicuci & Dipakai Ulang', 'Support Sendi Optimal'], 'Semangat! Bersamaku gerakan tubuh tetap lincah & terlindungi!', '4.9/5.0', '9.8rb+ Terjual', 2),
  ('prod-polidine', 'Polidine Antiseptic Formula', 'polidine-antiseptic', 'Antiseptik & Pembersih Luka', 'Cairan antiseptik higienis formula lembut untuk perlindungan maksimal dari bakteri, kuman, dan pencegahan infeksi pada luka.', true, 'Proteksi Maksimal • Higienis', '/images/products/polidine.svg', '/images/products/polidine-chibi-shield.png', 'pc-pusat-pasuruan-shopee', array['Perisai Anti Kuman', 'Formula Lembut', 'Aman untuk Keluarga'], 'Lindungi diri dan keluarga dari kuman bersama Polidine!', '4.8/5.0', '8.5rb+ Terjual', 3),
  ('prod-caressa-cotton', 'Caressa Cotton Balls & Buds', 'caressa-cotton-balls', 'Perawatan Luka & Higienis', 'Kapas higienis 100% murni lembut tanpa zat pemutih berbahaya, cocok untuk pembersih kulit bayi, luka medis, dan perawatan harian.', true, 'Kapas 100% Alami', '/images/products/caressa-cotton-balls.png', '/images/products/polifix-chibi-thumbsup.png', 'pc-pusat-pasuruan-shopee', array['100% Katun Murni', 'Lembut Tanpa Pemutih', 'Higienis & Steril'], 'Sentuhan lembut alami untuk kebersihan luka dan kulit sensitif!', '4.9/5.0', '7.2rb+ Terjual', 4)
on conflict (id) do nothing;

-- Isi Data Config Bawaan jika belum ada
insert into site_config (id, brand_name, tagline, description, wa_phone_number, wa_default_message, tiktok_url, shopee_pusat_url, instagram_url)
values
  ('main', 'PC Store', 'Pusat Solusi Perawatan & Produk Medis Terpercaya', 'Official store jaringan cabang PC Store di seluruh Indonesia. Temukan produk perawatan berkualitas dan akses langsung ke toko marketplace resmi kami.', '', 'Halo Admin PC Store, saya ingin bertanya seputar ketersediaan produk dan cabang.', 'https://tk.tokopedia.com/ZSq6yuf9J/', 'https://s.shopee.co.id/7VGCzchHR7', '')
on conflict (id) do nothing;
