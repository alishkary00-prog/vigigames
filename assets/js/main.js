document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('projectsGrid');

    // آدرس دقیق فایل روی GitHub Pages
    fetch('https://alishkary00-prog.github.io/vigigames/data/projects.json?t=' + Date.now())
        .then(res => {
            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error("فایل projects.json پیدا نشد. لطفاً در پوشه data ایجاد کنید.");
                }
                throw new Error(`خطا ${res.status}`);
            }
            return res.json();
        })
        .then(projects => {
            if (!projects || projects.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column:1/-1;text-align:center;padding:100px 20px;color:#ffd700;font-size:1.8rem;">
                        هنوز هیچ پروژه‌ای اضافه نشده!<br><br>
                        <small style="color:#aaa;">به زودی پروژه‌های خفن میان!</small>
                    </div>
                `;
                return;
            }

            projects.forEach(p => {
                const statusText = p.status === "completed" ? "تکمیل شده" :
                                  p.status === "in-progress" ? "در حال ساخت" : "لغو شده";
                const statusClass = p.status || "in-progress";

                const card = `
                    <div class="project-card" data-aos="fade-up">
                        <img src="${p.image}" alt="${p.name}"
                             onerror="this.src='https://placehold.co/800x600/222/ffd700?text=No+Image&font=vazirmatn'">
                        <h3>${p.name}</h3>
                        <p>${p.desc || 'توضیحات در حال تکمیل...'}</p>
                        <span class="status ${statusClass}">${statusText}</span>
                    </div>
                `;
                grid.innerHTML += card;
            });
        })
        .catch(err => {
            console.error("خطا در بارگذاری پروژه‌ها:", err);
            grid.innerHTML = `
                <div style="grid-column:1/-1;text-align:center;padding:100px;color:#ff6b6b;">
                    خطا در بارگذاری پروژه‌ها<br>
                    <small>${err.message}</small>
                </div>
            `;
        });
});
