# Chinese Sensitive Words MCP Server

[English](README_EN.md) | 中文

> 中文敏感词/违禁词检测 MCP Server，支持小红书、抖音、快手、B站等平台。

## ✨ 功能特点

- **海量词库，日日更新** — 覆盖政治、色情、暴力、赌博、毒品、广告法极限词、医疗功效词等
- **多平台支持** — 小红书、抖音、快手、B站专属词库
- **风险等级分类** — 高危（封号）/ 中危（限流）/ 低危（建议修改）/ 提示
- **替换建议** — 不只检测，还推荐安全替代词
- **谐音变体检测** — 识别 "薇信→微信"、"℡→电话" 等变体
- **跳字检测** — 识别 "加 微 信"、"最.好.的" 等干扰字符
- **手机号/URL 检测** — 自动识别联系方式和外链
- **NER 智能过滤** — 减少地名、人名、机构名误报

## 🛠️ 提供的工具

| Tool | 功能 | 适用场景 |
|------|------|----------|
| `check_sensitive_words` | 检测文本中的敏感词/违禁词 | 检查文案、产品描述、直播话术是否合规 |
| `get_word_suggestions` | 获取敏感词的安全替换建议 | 修改被标记的违禁词 |

## 📦 安装

### Claude Desktop / Cursor / Windsurf

在配置文件中添加：

```json
{
  "mcpServers": {
    "chinese-sensitive-words": {
      "command": "npx",
      "args": ["-y", "chinese-sensitive-words-mcp"]
    }
  }
}
```

### Claude Code

```bash
claude mcp add chinese-sensitive-words -- npx -y chinese-sensitive-words-mcp
```

### OpenClaw (龙虾)

```bash
npx mcporter config add chinese-sensitive-words-mcp --stdio "npx -y chinese-sensitive-words-mcp"
```

## 📖 使用示例

### 检测敏感词

**用户对 AI 说：**
> "帮我检查这段小红书文案有没有违禁词：这是全网最好用的美白产品，效果立竿见影，加微信13812345678领优惠"

**AI 调用 `check_sensitive_words` 返回：**

```
⚠️ Detected 4 sensitive word(s):

Risk summary: 🔴 High=1 | 🟡 Medium=2 | 🔵 Low=1

🔴 HIGH RISK (may cause account ban)
- "13812345678" — Category: 手机号

🟡 MEDIUM RISK (may cause content throttling)
- "最好用" — Category: 广告法极限词 → Suggested replacements: 很好用, 超好用
- "美白" — Category: 医疗功效 → Suggested replacements: 提亮, 焕亮

🔵 LOW RISK (recommend modification)
- "加微信" — Category: 引流 → Suggested replacements: 私信咨询
```

### 获取替换建议

**用户对 AI 说：**
> "最好用 这个词应该换成什么？"

**AI 调用 `get_word_suggestions(keyword="最好用")` 返回：**

```
"最好用" (极限词替换)
Suggested replacements: 很好用, 超好用, 非常好用, 特别好用
```

## 📖 实用案例

**输入：**
> 我们的产品是第一好，请留下你的薇信

**API 返回：**
```json
{
  "code": "0",
  "msg": "检测成功",
  "data": {
    "wordCount": 2,
    "wordList": [
      {
        "keyword": "第一",
        "category": "sl-compare-add",
        "level": "低",
        "suggestion": ["领先", "优秀", "出色", "很棒"],
        "startIndex": 6,
        "endIndex": 7
      },
      {
        "keyword": "薇信",
        "category": "特殊符号引流",
        "level": "低",
        "suggestion": null,
        "startIndex": 15,
        "endIndex": 16
      }
    ],
    "stats": { "high": 0, "mid": 0, "low": 2, "tip": 0 },
    "hasSensitive": true,
    "hasHighRisk": false
  }
}
```

**检测结果：**
| 违禁词 | 类别 | 说明 | 建议替换 |
|--------|------|------|----------|
| 第一 | 极限比较词 | 违反广告法，属于绝对化用语 | 领先、优秀、出色、很棒 |
| 薇信 | 特殊符号引流 | 用谐音字规避"微信"，平台仍能识别 | 删除，改为"私信我" |

**修改建议：**
> 我们的产品非常出色，私信我了解更多

## 📋 使用额度

| 类型 | 额度 | 说明 |
|------|------|------|
| 免费（无 TOKEN） | 100 次/天 | 开箱即用，无需注册 |
| 注册用户（有 TOKEN） | 无限制 | 配置 WORDSCHECK_ACCESS_TOKEN |

## 🔧 配置

### 基础用法（免费，100次/天）

```json
{
  "mcpServers": {
    "chinese-sensitive-words": {
      "command": "npx",
      "args": ["-y", "chinese-sensitive-words-mcp"]
    }
  }
}
```

### 注册用户（无限制）

```json
{
  "mcpServers": {
    "chinese-sensitive-words": {
      "command": "npx",
      "args": ["-y", "chinese-sensitive-words-mcp"],
      "env": {
        "WORDSCHECK_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

### 自定义服务地址

```json
{
  "mcpServers": {
    "chinese-sensitive-words": {
      "command": "npx",
      "args": ["-y", "chinese-sensitive-words-mcp"],
      "env": {
        "WORDSCHECK_API_BASE": "https://your-server.com/api",
        "WORDSCHECK_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

## 🌐 支持的平台词库

| 平台 | 词库内容 |
|------|----------|
| **通用** | 政治、色情、暴力、赌博、毒品、违法 |
| **小红书** | 广告法极限词、医疗功效、虚假宣传、焦虑营销、品牌词 |
| **抖音** | 直播违禁词、引流词、夸大宣传 |
| **快手** | 社区规范违禁词 |
| **B站** | 社区规范、内容审核词 |

## 📊 风险等级说明

| 等级 | 影响 | 示例 |
|------|------|------|
| 🔴 **高危** | 可能导致封号/删帖 | 政治敏感、色情、暴力、手机号 |
| 🟡 **中危** | 可能导致限流/降权 | 广告法极限词、医疗功效、虚假宣传 |
| 🔵 **低危** | 建议修改 | 引流词、促销词 |
| 💡 **提示** | 注意措辞 | 焦虑营销、容貌身材相关 |

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 📬 联系我们

- 微信：chenganp
- 邮箱：345048305@qq.com
- 网站：https://www.chenganp.top

> 💡 需要定制开发自己的 MCP Server？查看我们的 [MCP 定制开发服务](https://github.com/CCCpan/mcp-custom-dev)

## 📄 许可证

[MIT](LICENSE)
