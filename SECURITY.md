# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

- **Do NOT** open a public issue
- Email the maintainer directly or use GitHub's private vulnerability reporting

## Security Considerations

- API tokens and access credentials should only be stored in environment variables
- Never commit `.env` files to version control
- The MCP server communicates with the detection API over HTTPS
