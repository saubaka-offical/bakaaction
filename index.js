const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const buildDir = core.getInput('build_dir');
    const token = core.getInput('token');

    if (!buildDir) {
      core.setFailed('❌ 必须提供 build_dir 参数');
      return;
    }

    // 配置 Git 用户信息
    await exec.exec('git', ['config', '--global', 'user.name', 'github-actions[bot]']);
    await exec.exec('git', ['config', '--global', 'user.email', 'github-actions[bot]@users.noreply.github.com']);

    // 初始化临时部署目录
    await exec.exec('git', ['clone', '--branch', 'gh-pages', `https://x-access-token:${token}@github.com/${process.env.GITHUB_REPOSITORY}.git`, 'gh-pages']);

    // 复制构建产物
    await exec.exec('rm', ['-rf', 'gh-pages/*']);
    await exec.exec('cp', ['-r', `${buildDir}/.`, 'gh-pages/']);

    // 提交并推送
    process.chdir('gh-pages');
    await exec.exec('git', ['add', '.']);
    await exec.exec('git', ['commit', '-m', '🚀 Deploy static site']);
    await exec.exec('git', ['push']);
    
    core.info('✅ 部署完成！');
  } catch (error) {
    core.setFailed(`部署失败: ${error.message}`);
  }
}

run();
