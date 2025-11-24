// main.js — آخرین نسخه کامل VIGIGAMES Dark Cyberpunk Theme
document.addEventListener("DOMContentLoaded", async () => {
    const projectsGrid = document.getElementById("projectsGrid");
    const adsGrid = document.getElementById("adsGrid");

    try {
        // لود داده‌ها از JSON (با کش‌شکن برای GitHub Pages)
        const response = await fetch("data/projects.json?t=" + Date.now());
        if (!response.ok) throw new Error("فایل JSON پیدا نشد");
        const data = await response.json();

        // --- لود پروژه‌ها ---
        const projects = data.projects || [];

        if (projects.length === 0) {
            projectsGrid.innerHTML = `
                <div style="grid-column:1/-1; text-align:center; padding:120px; color:#334455; font-size:2rem;">
                    به زودی...<br>
                    <span style="font-size:1.1rem; color:#00ffff88;">در سایه‌ها منتظر باش</span>
                </div>`;
        } else {
            projectsGrid.innerHTML = "";
            projects.forEach(p => {
                const statusText = p.status === "completed" ? "تکمیل شده" :
                                  p.status === "in-progress" ? "در حال ساخت" : "لغو شده";
                const statusColor = p.status === "completed" ? "#00ff88" :
                                   p.status === "in-progress" ? "#ff0088" : "#666";

                projectsGrid.innerHTML += `
                    <div class="card">
                        <img src="${p.image}" 
                             onerror="this.src='https://placehold.co/800x600/111/00ffff?text=VIGIGAMES'" 
                             alt="${p.name}">
                        <div class="status" style="background:rgba(0,255,255,0.2); color:${statusColor};">
                            ${statusText}
                        </div>
                        <h3>${p.name}</h3>
                        <p>${p.desc}</p>
                    </div>`;
            });
        }

        // --- لود تبلیغات / اسپانسرها ---
        const ads = (data.ads || []).filter(ad => ad.active !== false);

        if (ads.length > 0) {
            adsGrid.innerHTML = "";
            ads.forEach(ad => {
                adsGrid.innerHTML += `
                    <a href="${ad.link}" target="_blank" rel="nofollow sponsored" class="ad-link">
                        <img src="${ad.image}" 
                             alt="${ad.title}" 
                             loading="lazy"
                             onerror="this.style.display='none'">
                    </a>`;
            });

            // افکت hover خفن برای تبلیغات
            document.querySelectorAll(".ad-link").forEach(link => {
                const img = link.querySelector("img");
                link.addEventListener("mouseenter", () => {
                    img.style.opacity = "1";
                    img.style.transform = "scale(1.05)";
                });
                link.addEventListener("mouseleave", () => {
                    img.style.opacity = "0.9";
                    img.style.transform = "scale(1)";
                });
            });
        } else {
            // اگه تبلیغی نبود، بخش رو مخفی کن (اختیاری)
            // document.querySelector(".ads-section").style.display = "none";
        }

    } catch (error) {
        console.error("خطا در بارگذاری داده‌ها:", error);
        projectsGrid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:100px; color:#ff3366;">
                خطا در بارگذاری پروژه‌ها<br>
                <small style="color:#888;">مطمئن شو data/projects.json آپلود شده</small>
            </div>`;
    }
});
