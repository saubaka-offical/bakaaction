# 🚀 Baka's website Action

自动将静态网站部署到 GitHub Pages，只需两步配置。

## 使用方法

在你的项目仓库中添加 `.github/workflows/deploy.yml`：

```yaml
name: xxxx e.g. my website deploying action
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build site
        run: |
          npm install
          npm run build
      - name: Deploy to GitHub Pages
        uses: saubaka-offical/Baka's website Action@v1
        with:
          build_dir: dist
          token: ${{ secrets.GITHUB_TOKEN }}
