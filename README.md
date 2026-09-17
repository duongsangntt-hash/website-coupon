# Save More With Coupons — Coupon & Deal Affiliate Website

**Save More With Coupons** (domain: `savemorewithcoupons.com`) là website
tổng hợp coupon, mã giảm giá, promo code và deals từ nhiều shop online, phục
vụ affiliate marketing. Toàn bộ dữ liệu (store, coupon, category, blog) nằm
trong các file TypeScript ở thư mục `/data`, **không sử dụng database,
backend API, CMS hay dịch vụ cloud nào**. Website được build hoàn toàn tĩnh
(`next build` với `output: "export"`) ra file HTML/CSS/JS thuần túy — chạy
được trên **bất kỳ shared hosting Apache thông thường nào**, không cần
Node.js, không cần "Setup Node.js App".

## Tech stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS
- lucide-react (icon)
- Không database, không ORM, không CMS

---

## 0. Checklist trước khi deploy thật

- [ ] **Hosting** — chỉ cần shared hosting Apache thông thường (gói rẻ nhất
  của AZDIGI cũng đủ), vì site build ra file tĩnh, không cần Node.js chạy
  trên server. Không cần tier có "Setup Node.js App".
- [ ] **Domain trỏ đúng** và **bật SSL** (Let's Encrypt) sau khi domain đã
  resolve — xem mục 8.4.
- [ ] **Set up hộp mail thật** cho địa chỉ khai báo ở `SITE_EMAIL` trong
  `lib/site.ts` (mặc định `support@savemorewithcoupons.com`) — nút liên hệ,
  form contact và tất cả trang pháp lý đều trỏ mailto tới địa chỉ này. Nếu
  chưa tạo hộp mail thật trên domain, đổi `SITE_EMAIL` sang email bạn đang
  dùng thật (Gmail cũng được) để tránh khách gửi mail vào hố đen.
- [ ] Sau khi site live, submit `https://savemorewithcoupons.com/sitemap.xml`
  vào Google Search Console để được index nhanh hơn.
- [ ] File `List Affiliate.xlsx` ở gốc project **không cần** và **không nên**
  upload lên server (đã thêm vào `.gitignore`) — dữ liệu đã được đưa vào
  `data/stores.ts` và `data/coupons.ts` rồi.

---

## 1. Cài đặt

```bash
npm install
```

## 2. Chạy môi trường development

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## 3. Build & chạy production

```bash
npm run build
```

Lệnh này xuất ra thư mục `out/` — toàn bộ trang dưới dạng HTML/CSS/JS tĩnh,
không cần Node.js để chạy. Xem thử ở máy local bằng bất kỳ static server
nào, ví dụ:

```bash
npx serve out
```

## 4. Kiểm tra code (lint)

```bash
npm run lint
```

---

## 5. Cấu trúc dữ liệu (`/data`)

Đây là phần **quan trọng nhất** — bạn cập nhật toàn bộ nội dung website chỉ
bằng cách sửa 4 file này, không cần đụng vào component hay route nào:

```
data/
  stores.ts       # danh sách shop
  coupons.ts      # danh sách coupon / deal
  categories.ts   # danh mục
  blog.ts         # bài viết blog
```

Kiểu dữ liệu tương ứng khai báo trong `lib/types.ts`.

### 5.1. Thêm Store mới

Mở `data/stores.ts`, thêm object mới vào mảng `stores`:

```ts
{
  id: "11",                                  // id duy nhất, dạng chuỗi
  name: "ExampleStore",
  slug: "examplestore",                      // dùng cho URL /stores/examplestore
  logo: "/images/stores/examplestore.svg",   // xem mục 5.5 về logo
  category: "electronics",                   // slug trùng với data/categories.ts
  description: "Mô tả ngắn về shop, hiển thị ở trang store.",
  website: "https://example.com",
  featured: false,                           // true để ưu tiên hiển thị
}
```

Sau khi lưu, trang `/stores`, `/stores/examplestore` và sitemap sẽ tự động
xuất hiện — **không cần sửa component hay route nào khác**.

### 5.2. Thêm Coupon mới

Mở `data/coupons.ts`, thêm object mới vào mảng `coupons`:

```ts
{
  id: "21",
  storeId: "examplestore",        // phải trùng slug của store trong stores.ts
  title: "15% Off Storewide",
  description: "Save 15% on your entire order.",
  discount: "15% OFF",            // text hiển thị nổi bật trên card
  code: "SAVE15",                 // bỏ field này (hoặc để undefined) nếu deal không cần code
  type: "percentage",             // "percentage" | "fixed-amount" | "free-shipping" | "deal"
  expires: "2026-12-31",          // định dạng YYYY-MM-DD, bỏ trống nếu là deal vĩnh viễn
  affiliateUrl: "https://example.com/?aff_id=YOUR_AFFILIATE_ID",
  featured: false,                // true để lên Hot Deals / trang chủ
  verified: false,                // true để hiện badge "Verified"
  popular: false,                 // true để hiện badge "Popular"
  category: "electronics",        // slug category, dùng để lọc theo category
  createdAt: "2026-09-01",        // dùng để sort "Newest"
}
```

**Coupon hết hạn tự động ẩn khỏi Active Deals / Featured / trang `/coupons`**
dựa trên field `expires` so với ngày hiện tại — không cần cronjob, không cần
sửa code. Coupon hết hạn của một store vẫn được liệt kê (mờ đi) ở cuối trang
store tương ứng để tham khảo.

### 5.3. Thêm Category mới

Mở `data/categories.ts`:

```ts
{
  id: "16",
  name: "Books",
  slug: "books",
  icon: "BookOpen",   // tên icon từ lucide-react, xem components/CategoryIcon.tsx
  description: "Coupons and deals on books and e-readers.",
}
```

Nếu dùng icon mới, thêm icon đó vào `ICON_MAP` trong
`components/CategoryIcon.tsx` (import từ `lucide-react`).

> Category hiện dùng icon (lucide-react) thay vì ảnh, nên nhẹ và không cần
> quản lý file ảnh. Thư mục `public/images/categories/` được giữ sẵn nếu sau
> này bạn muốn đổi sang ảnh thật cho category.

### 5.4. Thêm bài Blog mới

Mở `data/blog.ts`:

```ts
{
  id: "6",
  title: "Tiêu đề bài viết",
  slug: "tieu-de-bai-viet",             // dùng cho URL /blog/tieu-de-bai-viet
  excerpt: "Tóm tắt ngắn hiển thị ở danh sách blog.",
  image: "/images/blog/tieu-de-bai-viet.svg",
  category: "guides",
  date: "2026-09-10",
  author: "Save More With Coupons Team",
  content: [
    "Đoạn văn thứ nhất...",
    "Đoạn văn thứ hai...",
  ],
}
```

### 5.5. Logo store / hình ảnh blog

Toàn bộ ảnh nằm trong `/public/images/`:

```
public/images/stores/{slug}.png   # logo store (favicon thật, fetch từ website shop)
public/images/blog/{slug}.svg     # ảnh đại diện bài blog (placeholder gradient)
```

Logo của 19 shop hiện tại là **favicon thật** lấy từ website chính thức của
từng shop (không phải hình vẽ placeholder). Khi thêm store mới mà chưa có
logo, đặt tạm một file ảnh bất kỳ (hoặc favicon lấy từ trang shop) vào đúng
đường dẫn `logo` khai báo trong `data/stores.ts` — component `StoreLogo` chỉ
cần một file ảnh hợp lệ tại đường dẫn đó, không quan tâm định dạng SVG hay
PNG. Muốn đổi logo, chỉ cần **ghi đè đúng file cùng tên** (hoặc đổi path
`logo` trong `data/stores.ts` nếu đổi đuôi file). Không cần sửa component.

Ảnh blog vẫn là placeholder SVG (gradient màu + nhãn category); ghi đè cùng
cách nếu muốn dùng ảnh thật.

### 5.6. Cập nhật Affiliate Link

Mỗi coupon có field `affiliateUrl` trong `data/coupons.ts`. Thay giá trị
placeholder (`https://example.com/affiliate-link`) bằng link affiliate thật
của bạn (ví dụ link từ mạng affiliate hoặc link có `?aff_id=...`). Toàn bộ
link affiliate trên site được render với
`target="_blank" rel="sponsored nofollow noopener"` để bảo toàn tracking và
tuân thủ khuyến nghị SEO của Google — bạn không cần cấu hình gì thêm.

---

## 6. SEO đã cấu hình sẵn

- Metadata (title, description, canonical, Open Graph, Twitter Card) cho
  từng trang qua Next.js Metadata API — xem `export const metadata` hoặc
  `generateMetadata` trong từng file `page.tsx`.
- JSON-LD: `Organization`, `WebSite` (toàn site — `app/layout.tsx`),
  `BreadcrumbList` (mọi trang có breadcrumb), `Article` (blog post),
  `ItemList` (trang store).
- Sitemap tự động: `app/sitemap.ts` → `/sitemap.xml`, bao gồm mọi store,
  category, blog post.
- `app/robots.ts` → `/robots.txt`, cho phép crawl toàn bộ trang public, chặn
  crawl trang `/search` (kết quả tìm kiếm nội bộ, không cần index).
- Ảnh Open Graph mặc định sinh tự động tại `app/opengraph-image.tsx`.

Đổi domain thật cho SEO: xem mục 8.2 (biến môi trường `NEXT_PUBLIC_SITE_URL`).

---

## 7. Analytics (tuỳ chọn, chưa bật)

Hàm `trackAffiliateClick(coupon)` trong `lib/utils.ts` được gọi mỗi khi
người dùng click "Get Deal" / "Copy Code & Get Deal". Hiện tại hàm này chỉ
gửi event tới `window.gtag` hoặc `window.dataLayer` **nếu đã tồn tại** — nếu
bạn chưa cài Google Analytics/GTM thì hàm này không làm gì cả (an toàn, không
lỗi). Khi cần bật tracking:

1. Thêm script Google Tag Manager / GA4 vào `app/layout.tsx`.
2. Không cần sửa gì thêm — `trackAffiliateClick` sẽ tự động gửi event
   `affiliate_click` kèm `store_id`, `coupon_id`, `coupon_title`.

---

## 8. Deploy lên AZDIGI

Site build ra file **tĩnh hoàn toàn** (`output: "export"` trong
`next.config.ts`) — không cần Node.js, không cần "Setup Node.js App",
không có process nào chạy thường trực trên server. Bất kỳ gói shared
hosting Apache nào của AZDIGI cũng chạy được.

### 8.1. Build & commit output tĩnh

**Luôn build ở máy dev, không build trên server.** Lý do: shared hosting
cPanel (CloudLinux LVE) giới hạn số tiến trình một tài khoản được tạo, mà
`next build` cần mở worker phụ để build song song nên hay lỗi (`spawn
EAGAIN`, `cagefs_enter: Unable to fork`...) trên loại hosting này. Vì vậy
thư mục `out/` (kết quả build tĩnh) được **commit thẳng vào Git** — xem
`.gitignore`, `/out/` không bị loại trừ như `.next/`. Server không bao giờ
phải tự chạy `next build`.

```bash
npm run build              # tạo lại out/
git add -A && git commit -m "..."
git push
```

### 8.2. Cấu hình domain

Domain của site là `savemorewithcoupons.com`, đã set làm mặc định trong
`lib/site.ts` (`SITE_URL`). Nếu deploy lên domain/subdomain khác (staging),
tạo file `.env.local` trước khi build:

```
NEXT_PUBLIC_SITE_URL=https://savemorewithcoupons.com
```

Biến này dùng để build canonical URL, Open Graph và sitemap ngay lúc
`npm run build` — vì giờ build luôn ở máy dev, set trong `.env.local` local
là đủ, không cần set gì trên server.

### 8.3. Đưa `out/` lên đúng thư mục web của domain

Dùng lại đúng workflow **Git™ Version Control** trong cPanel đã thiết lập
trước đó (clone repo về, vd `~/website-coupon`), rồi chọn 1 trong 2 cách để
`out/` trở thành thư mục web thực sự của domain:

**Cách 1 — Deploy tự động bằng `.cpanel.yml` (khuyến nghị):** file
`.cpanel.yml` ở gốc repo đã cấu hình sẵn để copy `out/*` vào `public_html`
mỗi khi bạn bấm nút **"Deploy HEAD Commit"** trong Git Version Control.
Chỉ cần sửa `USERNAME` trong file này thành đúng username cPanel của bạn
(commit + push lại), sau đó `git pull` xong bấm Deploy là xong — không cần
thao tác gì thêm.

**Cách 2 — Đổi Document Root:** trong cPanel → **Domains**, sửa Document
Root của `savemorewithcoupons.com` trỏ thẳng vào `~/website-coupon/out`
(áp dụng được nếu domain đó không phải domain chính của tài khoản).

### 8.4. Cấu hình SSL

Bật **SSL miễn phí (Let's Encrypt)** trong mục SSL/TLS của domain trên
AZDIGI, sau đó bật "Force HTTPS" — làm một lần, không liên quan gì đến việc
deploy code nên không cần lặp lại sau này.

### 8.5. Cập nhật sau khi sửa coupon/store

Vì dữ liệu nằm trong file TypeScript (`/data`) nên **mỗi lần sửa coupon/store
cần build lại rồi mới thấy thay đổi trên production**:

```bash
npm run build        # chạy ở máy dev, tạo lại out/
git add -A && git commit -m "Update coupons" && git push
```

Trên server (cPanel Terminal hoặc nút Deploy của Git Version Control):

```bash
cd ~/website-coupon
git checkout -- .
git pull origin main
```

Nếu dùng Cách 1 ở mục 8.3, bấm **"Deploy HEAD Commit"** để copy `out/` mới
vào `public_html`. Nếu dùng Cách 2 (Document Root trỏ thẳng `out/`), `git
pull` xong là đã lên production ngay — **không cần restart gì cả**, không
có process nào để restart.

---

## 9. Không có Database

Dự án này **không** sử dụng và **không** cần:

MongoDB, MySQL, PostgreSQL, Supabase, Firebase, Prisma/ORM, backend API
riêng, CMS, Docker, Redis. Toàn bộ dữ liệu là static TypeScript trong
`/data`, được Next.js build thành trang tĩnh (SSG) tại thời điểm `next
build`.

## 10. Cấu trúc thư mục chính

```
app/                  # routes (App Router)
components/           # UI components dùng chung
data/                 # dữ liệu store/coupon/category/blog — sửa ở đây
lib/                  # types, helper functions, site config
public/images/        # logo store thật (PNG), ảnh blog (placeholder SVG)
```
