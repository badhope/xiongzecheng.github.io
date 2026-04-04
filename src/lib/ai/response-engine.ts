import { knowledgeBase } from '../knowledge-base';
import { extendedKB } from '../knowledge-base-extended';

type KBRow = { id: string; keywords: string[]; question: string; answer: string; category: string; priority?: number };

// Merge both KBs
const allKB: KBRow[] = [...knowledgeBase, ...extendedKB];

function scoreMatch(item: KBRow, query: string): number {
  const q = query.toLowerCase();
  let score = 0;

  // Exact question match (highest)
  if (item.question.toLowerCase().includes(q)) score += 30;

  // Keyword matches
  for (const kw of item.keywords) {
    const k = kw.toLowerCase();
    if (q === k) score += 20;           // exact keyword match
    else if (q.includes(k) || k.includes(q)) score += 10; // partial
    else {
      // fuzzy: check each word
      const qWords = q.split(/\s+/);
      const kWords = k.split(/\s+/);
      for (const qw of qWords) {
        for (const kw2 of kWords) {
          if (qw.length > 2 && (qw.includes(kw2) || kw2.includes(qw))) score += 5;
        }
      }
    }
  }

  // Answer content hint
  if (item.answer.toLowerCase().includes(q)) score += 3;

  return score;
}

export function generateResponse(input: string): string {
  const query = input.trim();
  if (!query) return '';

  // Score all items
  const scored = allKB
    .map(item => ({ item, score: scoreMatch(item, query) }))
    .filter(s => s.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (b.item.priority ?? 5) - (a.item.priority ?? 5);
    });

  if (scored.length > 0) {
    return scored[0].item.answer;
  }

  // No match - return contextual fallback
  const q = query.toLowerCase();

  // Category-based fallbacks
  if (q.includes('how') || q.includes('怎么') || q.includes('如何')) {
    return '这个问题问得很好！badhope 的网站涵盖了丰富的内容。你可以试试问：\n• badhope 擅长哪些技术？\n• 有哪些开源项目？\n• 如何联系 badhope？\n• 这个网站用什么做的？\n\n或者去相关页面探索更多信息 🚀';
  }
  if (q.includes('what') || q.includes('是什') || q.includes('什么')) {
    return '这个问题我需要了解更多背景。不过 badhope 的网站里有很多精彩内容等你发现：\n• 作品集页面看看他的项目\n• AI 助手页面了解更多\n• 去 Fun Zone 玩贪吃蛇放松一下 😄';
  }
  if (q.includes('why') || q.includes('为什么')) {
    return '有趣的问题！badhope 的网站展示了从全栈开发到 AI 探索的成长历程。也许答案就藏在网站的某个角落里~ 试着换个角度问问？';
  }

  const fallbacks = [
    '这个问题很有趣！虽然我暂时没有完美的答案，但 badhope 的网站里有很多精彩内容等你发现。试试问问他擅长什么技术，或者去 Fun Zone 玩贪吃蛇放松一下 😄',
    '好问题！不过这个问题超出了我目前的知识库范围。你可以：\n• 访问 /projects 页面查看他的项目\n• 去 /ai 页面和我深入聊聊\n• 给他发邮件：x18825407105@outlook.com',
    '我暂时无法回答这个问题，但 badhope 的个人网站和 GitHub 上有大量信息值得探索。期待你的下一次提问！ ✨',
  ];

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

export function getSuggestedQuestions(): string[] {
  const suggestions = [
    'badhope 擅长哪些技术？',
    '这个网站是用什么做的？',
    '有哪些开源项目？',
    '如何联系 badhope？',
    '介绍一下 badhope',
    'badhope 在哪里工作？',
    '推荐学什么技术？',
    'AI会取代程序员吗？',
    '有哪些好用的AI模型？',
    '独立开发者怎么起步？',
  ];
  // Shuffle and pick 5
  const shuffled = suggestions.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}
