document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("data/projects.json?" + Date.now());
        const projects = await res.json();

        const grid = document.getElementById("projectsGrid");
        grid.innerHTML = "";

        if (projects.length === 0) {
            grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:120px;color:#334455;font-size:2rem;">
                هنوز پروژه‌ای اضافه نشده<br>
                <span style="font-size:1.1rem;color:#00ffff88;">در سایه‌ها منتظر باش</span>
            </div>`;
            return;
        }

        projects.forEach(p => {
            const statusText = p.status === "completed" ? "تکمیل شده" :
                              p.status === "in-progress" ? "در حال ساخت" : "لغو شده";
            const statusColor = p.status === "completed" ? "#00ff88" :
                               p.status === "in-progress" ? "#ff0088" : "#666";

            grid.innerHTML += `
                <div class="card">
                    <img src="${p.image}" onerror="this.src='https://placehold.co/800x600/111/00ffff?text=VIGIGAMES'" alt="${p.name}">
                    <div class="status" style="background:rgba(0,255,255,0.2);color:${statusColor}">${statusText}</div>
                    <h3>${p.name}</h3>
                    <p>${p.desc}</p>
                </div>
            `;
        });
    } catch (e) {
        document.getElementById("projectsGrid").innerHTML = "<p style='text-align:center;color:#f04444;padding:50px;'>خطا در بارگذاری پروژه‌ها</p>";
    }
});
