# Chinese Sensitive Words MCP Server

[中文](https://github.com/CCCpan/chinese-sensitive-words-mcp/blob/main/README.md) | English

> MCP Server for detecting sensitive/prohibited words in Chinese text. Built for social media content compliance on Xiaohongshu (Little Red Book), Douyin (TikTok China), Kuaishou, and Bilibili.

## ✨ Features

- **Massive dictionary, updated daily** — Covers politics, pornography, violence, gambling, drugs, advertising law violations, medical claims, and more
- **Multi-platform support** — Platform-specific dictionaries for Xiaohongshu, Douyin, Kuaishou, Bilibili
- **Risk level classification** — High (account ban) / Medium (content throttling) / Low (recommended edit) / Tip
- **Replacement suggestions** — Not just detection, also recommends safe alternative words
- **Homophone & variant detection** — Catches "薇信→微信", "℡→电话" and similar evasion patterns
- **Skip-character detection** — Catches "加 微 信", "最.好.的" with interference characters
- **Phone number & URL detection** — Automatically flags contact info and external links
- **NER smart filtering** — Reduces false positives for place names, person names, organizations

## 🛠️ Tools

| Tool | Description | When to use |
|------|-------------|-------------|
| `check_sensitive_words` | Detect sensitive/prohibited words in Chinese text | Check marketing copy, product descriptions, live-streaming scripts for compliance |
| `get_word_suggestions` | Get safe replacement suggestions for flagged words | Fix detected violations with platform-safe alternatives |

## 📦 Installation

### Claude Desktop / Cursor / Windsurf

Add to your configuration file:

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

### OpenClaw

```bash
npx mcporter config add chinese-sensitive-words-mcp --stdio "npx -y chinese-sensitive-words-mcp"
```

## 📖 Usage Examples

### Check text for sensitive words

**User:** "Check this marketing copy for prohibited words"

**AI calls `check_sensitive_words` and returns:**

```
⚠️ Detected 3 sensitive word(s):

Risk summary: 🔴 High=0 | 🟡 Medium=2 | 🔵 Low=1

🟡 MEDIUM RISK (may cause content throttling)
- "最好用" — Category: Advertising extreme word → Suggested replacements: 很好用, 超好用
- "美白" — Category: Medical claim → Suggested replacements: 提亮, 焕亮

🔵 LOW RISK (recommend modification)
- "加微信" — Category: Traffic diversion → Suggested replacements: 私信咨询
```

### Get replacement suggestions

**User:** "What can I use instead of 最好用?"

**AI calls `get_word_suggestions(keyword="最好用")` and returns:**

```
"最好用" (Extreme word replacement)
Suggested replacements: 很好用, 超好用, 非常好用, 特别好用
```

## 📋 Usage Limits

| Tier | Quota | Notes |
|------|-------|-------|
| Free (no token) | 100 requests/day | Works out of the box |
| Registered (with token) | Unlimited | Set WORDSCHECK_ACCESS_TOKEN |

## 🔧 Configuration

### Basic (free, 100 requests/day)

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

### Registered user (unlimited)

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

### Custom service endpoint

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

## 📊 Risk Levels

| Level | Impact | Examples |
|-------|--------|----------|
| 🔴 **High** | Account ban / content removal | Political, pornography, violence, phone numbers |
| 🟡 **Medium** | Content throttling / reduced reach | Advertising law violations, medical claims |
| 🔵 **Low** | Recommended to modify | Traffic diversion, promotional terms |
| 💡 **Tip** | Consider rewording | Anxiety marketing, appearance-related terms |

## 🤝 Contributing

Issues and Pull Requests are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md).

## 📄 License

[MIT](LICENSE)
