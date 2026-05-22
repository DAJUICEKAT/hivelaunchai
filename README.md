# HiveLaunch AI

## Environment setup

This project uses `OPENAI_API_KEY` and `OPENAI_MODEL` for the AI API call.

### Bash

```bash
export OPENAI_API_KEY="$GROQ_API_KEY"
export OPENAI_MODEL="gpt-4.1-mini"
export PORT=3000
```

Or set the key directly:

```bash
export OPENAI_API_KEY="your_actual_key_here"
export OPENAI_MODEL="gpt-4.1-mini"
export PORT=3000
```

### PowerShell

```powershell
$env:OPENAI_API_KEY = $env:GROQ_API_KEY
$env:OPENAI_MODEL = "gpt-4.1-mini"
$env:PORT = "3000"
```

## Notes

- `api/generate.js` will use `OPENAI_API_KEY` first.
- If `OPENAI_API_KEY` is not set, it falls back to `GROQ_API_KEY`.
- `OPENAI_MODEL` defaults to `llama-3.1-8b-instant` if not provided.
