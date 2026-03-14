# MCP Calling Specification

This document describes when and how to use the Chinese Sensitive Words MCP Server.

## When to use this MCP server

- User asks to **check text** for sensitive, prohibited, or banned words
- User is **writing content** for Chinese social media (Xiaohongshu, Douyin, Kuaishou, Bilibili)
- User needs **compliance check** for marketing copy, product descriptions, or live-streaming scripts
- User wants to find **safe alternatives** for flagged words
- User asks about **advertising law** (广告法) compliance for Chinese content
- User mentions **content moderation** for Chinese platforms

## Recommended workflow

```
1. User provides text to check
   → Call check_sensitive_words(text, ner=true)

2. If sensitive words found, present results grouped by risk level
   → Show HIGH risk items first (most critical)
   → Include replacement suggestions inline

3. If user wants to fix specific words
   → Call get_word_suggestions(keyword="the flagged word")
   → Help user rewrite with suggested alternatives

4. After rewriting, offer to re-check the modified text
   → Call check_sensitive_words again with the new text
```

## Example conversations

### Scenario 1: Full text check

```
User: 帮我检查这段小红书文案：这是全网最好用的美白神器
AI:   → check_sensitive_words(text="这是全网最好用的美白神器", ner=true)
      → Show: "最好用" (medium risk) → 建议: 很好用, 超好用
      → Show: "美白" (medium risk) → 建议: 提亮, 焕亮
      → Offer to help rewrite
```

### Scenario 2: Fix specific word

```
User: "最好用" 换成什么好？
AI:   → get_word_suggestions(keyword="最好用")
      → Show: 很好用, 超好用, 非常好用, 特别好用
```

### Scenario 3: Re-check after edit

```
User: 改成"这是非常好用的焕亮神器"，再帮我查一下
AI:   → check_sensitive_words(text="这是非常好用的焕亮神器", ner=true)
      → Show: ✅ No sensitive words detected
```

## Error handling

| Error | Cause | Action |
|-------|-------|--------|
| Service error / timeout | Detection service unreachable | Inform user, suggest trying later |
| Text exceeds 3000 chars | Input too long | Ask user to split text into smaller parts |
| No suggestions found | Word not in suggestion library | Inform user, suggest manual alternatives |

## Parameters reference

### check_sensitive_words

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| text | string | Yes | - | Text to check (max 3000 chars) |
| ner | boolean | No | true | Enable NER filtering for fewer false positives |

### get_word_suggestions

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| keyword | string | No | - | Specific word to get suggestions for. Omit for full library |
