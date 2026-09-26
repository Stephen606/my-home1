# hh & ff · 我们的相册

从 2021.04.02 开始的年份相册，把每一年的点滴收在这里。纯静态网页，按年份归档照片。

## 在线地址

https://stephen606.github.io/my-home1/

## 技术

- 原生 **HTML / CSS / JavaScript**，无框架、无构建步骤、无后端、无数据库
- 纯静态，双击 `index.html` 即可本地预览

## 文件结构

```
my-home/
├── index.html   结构 + title/description/Open Graph + favicon
├── styles.css   全部样式
├── script.js    相册数据 + 在一起天数计算 + 滚动显隐
├── assets/      照片资源
└── .nojekyll    GitHub Pages 跳过 Jekyll 处理
```

## 本地预览

直接双击 `index.html`。

也可以起一个本地静态服务器（需要 Python）：

```sh
python -m http.server 5500
```

然后打开 http://127.0.0.1:5500/

## 怎么加照片

1. 把照片文件放进 `assets/` 目录
2. 打开 `script.js`，在顶部的 `ALBUM` 里找到对应年份，在它的 `photos` 数组中加一条：

```js
{
  year: 2023,
  note: "搬到一起住的那年",   // 可选：该年份的一句话
  photos: [
    { src: "assets/sea.jpg", date: "2023.05.20", caption: "第一次一起看海" }
  ]
}
```

3. 保存后刷新页面即可看到

**字段说明**

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `year` | 是 | 年份，决定归入哪个章节 |
| `note` | 否 | 该年份的一句小结，留空则显示默认空白文案 |
| `photos` | 是 | 照片数组，留空则显示空白态 |
| `photos[].src` | 是 | 图片路径，例如 `assets/xxx.jpg` |
| `photos[].date` | 否 | 显示用的日期，例如 `2023.05.20` |
| `photos[].caption` | 否 | 图注 |

> 相机直出的大图建议先压缩一下再放进来，能明显加快打开速度。

## 发布更新

```sh
git add .
git commit -m "描述这次改动"
git push
```

推送到 `main` 后，GitHub Pages 会在 1–2 分钟内自动更新，链接不变。

## 设计说明

- 配色取自照片材质：暖象牙 `#F7F3EC` / 墨褐 `#2B2521` / 酒红 `#7A2E3B` / 橡木 `#B98A5A`
- 字体：Fraunces（年份、`hh & ff`）+ Hanken Grotesk（正文），中文走系统字体
- 响应式，兼容手机与电脑；动效尊重 `prefers-reduced-motion`

## 隐私提醒

当前仓库与网站均为**公开**状态，`assets/` 下的所有照片都能被任何人通过链接访问。请勿放入不希望公开的内容。
