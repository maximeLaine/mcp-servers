# Claude Tools

Monorepo contenant mes outils Claude Code : serveurs MCP custom, agents, et commandes.

## Structure

```
mcp-servers/
├── servers/          # Serveurs MCP custom (TypeScript + MCP SDK)
│   └── template/
├── agents/           # Agents Claude SDK (Netlify, Supabase, GitHub)
│   └── src/agents/
└── commands/         # Commandes slash Claude Code
    └── pr.md
```

## Servers MCP

Serveurs MCP à connecter dans `~/.claude/settings.json`.

### Créer un nouveau serveur

```bash
cp -r servers/template servers/mon-serveur
cd servers/mon-serveur
npm install
npm run build
```

Ajouter dans `~/.claude/settings.json` :

```json
{
  "mcpServers": {
    "mon-serveur": {
      "command": "node",
      "args": ["/Users/maxlaine/GitHub/mcp-servers/servers/mon-serveur/dist/index.js"]
    }
  }
}
```

| Serveur | Description |
|---------|-------------|
| template | Serveur de base pour démarrer |

## Agents

Agents utilisant l'Anthropic Agent SDK avec des MCP servers.

### Setup

```bash
cp .env.example .env
# Remplir les tokens dans .env
cd agents && npm install
```

### Utilisation

```bash
cd agents
npm run netlify "Liste mes sites et leurs statuts de déploiement"
npm run supabase "Montre mes projets Supabase"
npm run github "Liste mes 5 derniers repos"
```

| Agent | MCP utilisé |
|-------|-------------|
| netlify-agent | `@netlify/mcp-server` |
| supabase-agent | `@supabase/mcp-server-supabase` |
| github-agent | `@modelcontextprotocol/server-github` |

## Commands

Commandes slash pour Claude Code, installables via `/plugin install claude-plugins@maximeLaine`.

| Commande | Description |
|----------|-------------|
| `/pr` | Crée une PR GitHub depuis la branche courante |
