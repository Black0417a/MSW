document.addEventListener('DOMContentLoaded', async () => {
    const calendar = document.getElementById('contributions-calendar');
    if (!calendar) return;

    const username = 'Black0417a'; // GitHub 用户名

    try {
        const contributionsData = await fetchGitHubContributions(username);
        renderContributionsCalendar(contributionsData);
    } catch (error) {
        console.error('加载GitHub贡献数据失败:', error);
        displayMockData();
    }

    // 从GitHub API获取过去一年的每日提交数（含今天）
    async function fetchGitHubContributions(username) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const oneYearAgo = new Date(today);
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        const fromDate = oneYearAgo.toISOString().split('T')[0];
        const toDate   = tomorrow  .toISOString()

        // 获取用户公开仓库列表
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        if (!reposResponse.ok) throw new Error('获取仓库列表失败');
        const repos = await reposResponse.json();

        // 初始化每天的贡献计数
        const contributionsMap = {};
        for (let d = new Date(oneYearAgo); d < tomorrow; d.setDate(d.getDate() + 1)) {
            contributionsMap[d.toISOString().split('T')[0]] = 0;
        }

        // 并行拉取每个仓库的提交
        const promises = repos.map(async repo => {
            const url = `https://api.github.com/repos/${username}/${repo.name}/commits`
                + `?author=${username}&since=${fromDate}&until=${toDate}&per_page=100`;
            const res = await fetch(url);
            if (!res.ok) return;
            const commits = await res.json();
            commits.forEach(c => {
                const date = c.commit.author.date.split('T')[0];
                if (contributionsMap.hasOwnProperty(date)) {
                    contributionsMap[date]++;
                }
            });
        });
        await Promise.allSettled(promises);

        // 转成数组
        return Object.entries(contributionsMap).map(([date, count]) => ({ date, count }));
    }

    function displayMockData() {
        calendar.innerHTML = `
            <div class="github-error">
                <p>无法从GitHub API获取贡献数据。</p>
                <ul>
                    <li>API请求限制</li>
                    <li>网络连接问题</li>
                    <li>用户名配置错误</li>
                </ul>
                <p>显示示例数据...</p>
            </div>
        `;
        renderContributionsCalendar(generateMockData());
    }

    function generateMockData() {
        const data = [];
        const today = new Date();
        for (let i = 0; i < 365; i++) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            data.push({ date: d.toISOString().split('T')[0], count: Math.floor(Math.random() * 5) });
        }
        return data;
    }

    // 渲染修正后的贡献日历
    function renderContributionsCalendar(data) {
        // 按日期快速索引
        const map = data.reduce((acc, { date, count }) => {
            acc[date] = count; return acc;
        }, {});

        // 计算网格起点：oneYearAgo 向前 pad 到最近的周日
        const dates = data.map(d => d.date).sort();
        const first = new Date(dates[0]);
        const startGrid = new Date(first);
        startGrid.setDate(first.getDate() - first.getDay()); // 回退到最近周日

        // 构建所有完整周
        const weeks = [];
        let cur = new Date(startGrid);
        const today = new Date();
        while (cur <= today) {
            const week = [];
            for (let dow = 0; dow < 7; dow++) {
                const iso = cur.toISOString().split('T')[0];
                week.push({
                    date: iso,
                    count: map[iso] != null ? map[iso] : 0,
                    inRange: iso >= dates[0] && iso <= dates[dates.length - 1]
                });
                cur.setDate(cur.getDate() + 1);
            }
            weeks.push(week);
        }

        // 创建 DOM 结构
        const container = document.createElement('div');
        container.className = 'calendar-container';

        // 左侧 weekday labels
        const labels = document.createElement('div');
        labels.className = 'weekday-labels';
        ['周日','周一','周二','周三','周四','周五','周六']
            .forEach(d => {
                const e = document.createElement('div');
                e.className = 'weekday-label';
                e.textContent = d;
                labels.appendChild(e);
            });
        container.appendChild(labels);

        // 网格
        const grid = document.createElement('div');
        grid.className = 'calendar-grid';
        // 先创建 7 行
        const rows = Array.from({ length: 7 }, () => {
            const row = document.createElement('div');
            row.className = 'calendar-row';
            return row;
        });

        // 填充
        weeks.forEach(week => {
            week.forEach((day, i) => {
                const cell = document.createElement('div');
                cell.className = 'calendar-day';
                if (!day.inRange) {
                    cell.style.backgroundColor = 'transparent';
                } else {
                    const c = day.count;
                    const color = c === 0 ? '#ebedf0'
                        : c <= 2 ? '#9be9a8'
                            : c <= 5 ? '#40c463'
                                : c <= 9 ? '#30a14e'
                                    :            '#216e39';
                    cell.style.backgroundColor = color;
                    cell.title = `${day.date}: ${c} 贡献`;
                }
                rows[i].appendChild(cell);
            });
        });

        rows.forEach(r => grid.appendChild(r));
        container.appendChild(grid);

        // 图例
        const legend = document.createElement('div');
        legend.className = 'calendar-labels';
        const texts  = ['无贡献','1-2 贡献','3-5 贡献','6-9 贡献','10+ 贡献'];
        const colors = ['#ebedf0','#9be9a8','#40c463','#30a14e','#216e39'];
        texts.forEach((t, i) => {
            const item = document.createElement('div');
            item.className = 'calendar-label';
            const box = document.createElement('div');
            box.className = 'calendar-label-color';
            box.style.backgroundColor = colors[i];
            item.appendChild(box);
            item.appendChild(document.createTextNode(t));
            legend.appendChild(item);
        });

        // 替换内容
        calendar.innerHTML = '';
        calendar.appendChild(container);
        calendar.appendChild(legend);
    }

});
