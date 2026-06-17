# MCP Servers

Monorepo de mes serveurs MCP (Model Context Protocol) custom pour Claude Code.

## Structure

```
mcp-servers/
└── servers/
    └── <nom-du-serveur>/   # Un répertoire par MCP
        ├── src/index.ts
        ├── package.json
        └── tsconfig.json
```

## Créer un nouveau serveur

```bash
cp -r servers/template servers/mon-serveur
cd servers/mon-serveur
npm install
npm run build
```

Puis ajouter dans `~/.claude/settings.json` :

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

## Serveurs

| Serveur | Description |
|---------|-------------|
| template | Serveur de base pour démarrer |
