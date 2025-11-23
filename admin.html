document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('projectsGrid');
    
    // لینک Google Sheet خودت رو اینجا بذار (فقط ID شیت)
    const SHEET_ID = "1aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890"; // ← عوض کن!
    const API_KEY = "AIzaSyBwN8k9o3j8s0vY8z8v8z8v8z8v8z8v8z8"; // کلید عمومی (همه می‌تونن بخونن)
    
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            const rows = data.values;
            if (!rows || rows.length <= 1) {
                grid.innerHTML = "<p style='text-align:center;color:#ffd700;'>به زودی پروژه‌های جدید!</p>";
                return;
            }

            // ردیف اول هدره، از ردیف دوم شروع کن
            for (let i = 1; i < rows.length; i++) {
                const [name, desc, image, status] = rows[i];
                if (!name) continue;

                const statusText = status === "completed" ? "تکمیل شده" :
                                  status === "in-progress" ? "در حال ساخت" : "لغو شده";

                const card = `
                    <div class="project-card" data-aos="fade-up">
                        <img src="${image || 'https://via.placeholder.com/800x600/222/ffd700?text=VIGIGAMES'}" alt="${name}">
                        <h3>${name}</h3>
                        <p>${desc || 'توضیحات در حال تکمیل...'}</p>
                        <span class="status ${status || 'in-progress'}">${statusText}</span>
                    </div>
                `;
                grid.innerHTML += card;
            }
        })
        .catch(() => {
            grid.innerHTML = "<p style='text-align:center;color:#ff6b6b;'>در حال بارگذاری...</p>";
        });
});
