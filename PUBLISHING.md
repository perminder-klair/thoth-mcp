# Publishing Guide

This document outlines the process for building and publishing updates to the Thoth MCP Server.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Version Management](#version-management)
- [Building the Project](#building-the-project)
- [Publishing to npm](#publishing-to-npm)
- [Publishing to MCP Registry](#publishing-to-mcp-registry)
- [Complete Release Workflow](#complete-release-workflow)
- [Rollback Procedure](#rollback-procedure)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Tools

- **Node.js**: v18.0.0 or higher
- **pnpm**: Package manager (install via `npm install -g pnpm`)
- **npm account**: Access to publish `@usethoth/mcp-server`
- **GitHub account**: For MCP Registry authentication
- **MCP Publisher CLI**: For registry publishing

### Installation

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Install MCP Publisher CLI (if not already installed):

   ```bash
   # Download latest version
   curl -L "https://github.com/modelcontextprotocol/registry/releases/download/v1.2.3/mcp-publisher_1.2.3_darwin_arm64.tar.gz" -o /tmp/mcp-publisher.tar.gz
   cd /tmp && tar xzf mcp-publisher.tar.gz
   chmod +x mcp-publisher
   sudo mv mcp-publisher /usr/local/bin/
   ```

### Authentication Setup

#### npm Authentication

```bash
npm login
```

Enter your npm credentials when prompted.

#### MCP Registry Authentication

```bash
mcp-publisher login github
```

Follow the GitHub device flow:

1. Visit the provided GitHub URL
2. Enter the device code
3. Authorize the application

Your authentication token will be saved to `.mcpregistry_github_token` (already in `.gitignore`).

## Version Management

### Semantic Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (X.0.0): Breaking changes
- **MINOR** (0.X.0): New features, backward compatible
- **PATCH** (0.0.X): Bug fixes, backward compatible

### Version Bump

Update version in **THREE** places:

1. **package.json**

   ```json
   {
     "version": "1.0.X"
   }
   ```

2. **server.json** (top-level version)

   ```json
   {
     "version": "1.0.X"
   }
   ```

3. **server.json** (package version)

   ```json
   {
     "packages": [{
       "version": "1.0.X"
     }]
   }
   ```

**Pro tip**: Use search and replace to update all three at once.

## Building the Project

### Type Checking

Before building, ensure no TypeScript errors:

```bash
pnpm typecheck
```

Fix any errors before proceeding.

### Build for Production

```bash
pnpm build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

### Verify Build

Test the built version locally:

```bash
pnpm start -- --api-key YOUR_TEST_API_KEY
```

Or with MCP Inspector:

```bash
npx @modelcontextprotocol/inspector pnpm start -- --api-key YOUR_TEST_API_KEY
```

## Publishing to npm

### Pre-publish Checklist

- [ ] All tests pass (if applicable)
- [ ] TypeScript compiles without errors
- [ ] Version bumped in all three locations
- [ ] CHANGELOG updated (in README.md)
- [ ] No `console.log` statements in code (use `console.error` for debugging)
- [ ] Changes committed to git

### Publish Command

```bash
pnpm build && pnpm publish --access public --no-git-checks
```

**Note**: The `--no-git-checks` flag bypasses git status checks. Ensure your changes are committed first.

### Verify npm Publication

1. Check on npmjs.com:

   ```
   https://www.npmjs.com/package/@usethoth/mcp-server
   ```

2. Test installation:

   ```bash
   npx @usethoth/mcp-server@latest --help
   ```

## Publishing to MCP Registry

### Prerequisites

- npm package must be published first
- MCP Publisher CLI authenticated with GitHub
- Namespace permission: `io.github.zeiq-co/*`

### Update server.json

Ensure `server.json` is current:

```json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/2025-09-29/server.schema.json",
  "name": "io.github.zeiq-co/thoth-mcp",
  "description": "MCP server for Thoth with multi-platform AI content generation",
  "version": "1.0.X",
  "repository": {
    "url": "https://github.com/perminder-klair/thoth-mcp",
    "source": "github"
  },
  "packages": [
    {
      "registryType": "npm",
      "registryBaseUrl": "https://registry.npmjs.org",
      "identifier": "@usethoth/mcp-server",
      "version": "1.0.X",
      "transport": {
        "type": "stdio"
      }
    }
  ]
}
```

### Publish to Registry

```bash
mcp-publisher publish
```

### Verify Registry Publication

1. Check the registry:

   ```
   https://registry.modelcontextprotocol.io/servers/io.github.zeiq-co/thoth-mcp
   ```

2. View in Claude Desktop's MCP settings (should appear in available servers)

## Complete Release Workflow

### Step-by-Step Release Process

```bash
# 1. Ensure working directory is clean
git status

# 2. Update version in package.json, server.json (2 places)
# Use your editor to update version numbers

# 3. Update CHANGELOG in README.md
# Add release notes for the new version

# 4. Build and test
pnpm build
pnpm typecheck
pnpm start -- --api-key YOUR_TEST_API_KEY  # Test locally

# 5. Commit changes
git add package.json server.json README.md src/
git commit -m "chore: release v1.0.X"

# 6. Authenticate (if tokens expired)
npm whoami  # Verify npm auth
mcp-publisher login github  # Re-auth if needed

# 7. Publish to npm
pnpm build && pnpm publish --access public --no-git-checks

# 8. Publish to MCP Registry
mcp-publisher publish

# 9. Create git tag
git tag v1.0.X
git push origin main --tags

# 10. Verify both publications
# - Check npmjs.com
# - Check registry.modelcontextprotocol.io
# - Test in Claude Desktop
```

### Post-Release Checklist

- [ ] npm package visible at npmjs.com
- [ ] MCP Registry updated
- [ ] Git tag created and pushed
- [ ] Test installation: `npx @usethoth/mcp-server@latest --help`
- [ ] Test in Claude Desktop
- [ ] Update any related documentation

## Rollback Procedure

### Unpublish from npm (within 72 hours)

```bash
npm unpublish @usethoth/mcp-server@1.0.X
```

**Warning**: Unpublishing is permanent and can only be done within 72 hours.

### Deprecate a Version

If past 72 hours, deprecate instead:

```bash
npm deprecate @usethoth/mcp-server@1.0.X "This version has critical bugs. Use @latest instead."
```

### Revert in MCP Registry

Re-publish a previous version:

```bash
# Update server.json to previous version
# Then re-publish
mcp-publisher publish
```

### Git Rollback

```bash
git revert <commit-hash>
git push origin main
```

## Troubleshooting

### Common Issues

#### 1. npm Authentication Failed

**Error**: `npm error code ENEEDAUTH`

**Solution**:

```bash
npm login
# Re-enter credentials
```

#### 2. MCP Registry Token Expired

**Error**: `Invalid or expired Registry JWT token`

**Solution**:

```bash
mcp-publisher login github
# Complete device flow
```

#### 3. Version Already Published

**Error**: `You cannot publish over the previously published versions`

**Solution**: Bump the version number and try again.

#### 4. Package Name Conflict

**Error**: `404 Not Found - PUT https://registry.npmjs.org/@usethoth%2fmcp-server`

**Solution**: Ensure you have permission to publish to the `@usethoth` scope.

#### 5. MCP Registry Namespace Permission Denied

**Error**: `You do not have permission to publish this server`

**Solution**:

- Verify you're authenticated with the correct GitHub account
- Check namespace matches your permissions (`io.github.zeiq-co/*`)
- Re-authenticate: `mcp-publisher login github`

#### 6. Validation Errors

**Error**: `validation failed`, `unexpected property`

**Solution**:

- Verify `server.json` uses latest schema: `2025-09-29`
- Use camelCase for all fields (e.g., `registryType`, not `registry_type`)
- Check against [schema documentation](https://github.com/modelcontextprotocol/registry/blob/main/docs/reference/server-json/CHANGELOG.md)

#### 7. Console Output Breaking stdio Mode

**Error**: `Unexpected token 'S', "Starting T"... is not valid JSON`

**Solution**:

- Remove all `console.log()` statements
- Use `console.error()` for debugging (goes to stderr, not stdout)
- Remember: stdout is reserved for JSON-RPC messages only

#### 8. Build Failures

**Error**: TypeScript compilation errors

**Solution**:

```bash
# Check for type errors
pnpm typecheck

# Clean and rebuild
rm -rf dist/
pnpm build
```

### Debug Mode

Run with verbose logging:

```bash
# npm publish with verbose
pnpm publish --access public --loglevel verbose

# MCP Inspector for testing
npx @modelcontextprotocol/inspector pnpm start -- --api-key YOUR_API_KEY
```

### Getting Help

- **npm issues**: <https://docs.npmjs.com/>
- **MCP Registry**: <https://github.com/modelcontextprotocol/registry/issues>
- **Project issues**: <https://github.com/perminder-klair/thoth-mcp/issues>

## Security Notes

### Sensitive Files

**NEVER** commit these files:

- `.mcpregistry_github_token` - GitHub auth token
- `.mcpregistry_registry_token` - MCP Registry JWT token
- `*.pem` - Private keys
- `.env` - Environment variables

These are already in `.gitignore`, but verify before pushing.

### Token Management

- Tokens expire after a few hours
- Re-authenticate before each publish session
- Revoke tokens if compromised:
  - GitHub: <https://github.com/settings/tokens>
  - npm: <https://www.npmjs.com/settings/tokens>

## Best Practices

1. **Test before publishing**: Always test locally with MCP Inspector
2. **One version per release**: Don't skip version numbers
3. **Keep CHANGELOG updated**: Document all changes in README.md
4. **Commit before publishing**: Ensure git is clean
5. **Tag releases**: Create git tags for all releases
6. **Monitor errors**: Check for errors in Claude Desktop logs
7. **Communicate changes**: Update documentation and notify users

## Quick Reference

```bash
# Full release in one go
pnpm typecheck && \
pnpm build && \
npm whoami && \
pnpm publish --access public --no-git-checks && \
mcp-publisher publish && \
git tag v$(node -p "require('./package.json').version") && \
git push origin main --tags
```

## Additional Resources

- [Semantic Versioning](https://semver.org/)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [MCP Registry Documentation](https://github.com/modelcontextprotocol/registry)
- [MCP Specification](https://modelcontextprotocol.io/)
