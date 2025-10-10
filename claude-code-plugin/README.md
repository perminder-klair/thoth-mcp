# Thoth Plugin for Claude Code

> Create, schedule, and manage multi-platform social media content with AI-powered optimization.

The Thoth plugin brings powerful social media content creation capabilities to Claude Code. Generate platform-optimized posts, maintain brand consistency, and manage your content calendar—all without leaving your development environment.

## Features

### 5 Slash Commands

- **`/create-content`** - Quick content creation with AI enhancement
- **`/schedule-post`** - Schedule posts for optimal engagement times
- **`/view-brands`** - Browse and understand your brand styles
- **`/manage-posts`** - List, filter, and manage all your posts
- **`/preview-post`** - Preview platform-specific content formatting

### 3 Specialized Agents

- **Content Creator** - Expert at crafting engaging, platform-optimized content
- **Brand Manager** - Ensures brand consistency across all platforms
- **Social Media Optimizer** - Maximizes reach and engagement through data-driven optimization

### Supported Platforms

- Twitter/X
- Instagram
- LinkedIn
- Facebook
- Threads
- Reddit
- Blog

## Installation

### Prerequisites

1. **Thoth Account**: Sign up at [usethoth.com](https://www.usethoth.com)
2. **API Key**: Generate an API key from your Thoth dashboard
3. **Claude Code**: Install Claude Code CLI

### Quick Install

```bash
# Install the plugin
claude plugin install thoth

# Or install from local directory
cd /path/to/claude-code-plugin
claude plugin install .
```

### Configuration

Set your Thoth API key as an environment variable:

```bash
# Add to your ~/.bashrc, ~/.zshrc, or equivalent
export THOTH_API_KEY="your-api-key-here"

# Or create a .env file
echo "THOTH_API_KEY=your-api-key-here" > ~/.config/claude-code/.env
```

### Verify Installation

```bash
# Check plugin is installed
claude plugin list

# Test the plugin
claude /create-content "Test post about AI development"
```

## Quick Start

### Create Your First Post

```bash
claude /create-content "Announcing our new feature"
```

Claude will guide you through:

1. Selecting target platforms
2. Choosing content enhancements (images, hashtags)
3. Applying brand styles
4. Creating the post

### Schedule a Post

```bash
claude /schedule-post "Webinar reminder for next Tuesday at 2pm"
```

### View Your Brand Styles

```bash
claude /view-brands
```

### Manage Your Posts

```bash
claude /manage-posts
```

## 📚 Complete Workflow Guide

**New to the plugin or want to level up your workflow?**

Check out our comprehensive **[Workflow Guide](./WORKFLOW_GUIDE.md)** featuring:

- 🎯 **Real-world use cases** with step-by-step examples
- 📅 **Daily, weekly, and campaign workflows**
- 💡 **Power user techniques** and pro tips
- 🚀 **Product launch case study** from start to finish
- 🤝 **Team collaboration strategies**
- ⚡ **Time-saving shortcuts** and efficiency hacks
- 🔧 **Troubleshooting solutions** for common issues

**→ [Read the full Workflow Guide](./WORKFLOW_GUIDE.md)** to see how to integrate the plugin into your content creation process.

---

## Usage Guide

### Slash Commands

#### `/create-content`

Creates multi-platform social media content with AI enhancement.

**Basic Usage:**

```bash
claude /create-content "Your content idea"
```

**Interactive Mode:**

```bash
claude /create-content
```

**What it does:**

- Asks for your content idea (if not provided)
- Suggests appropriate platforms
- Offers to generate images
- Can apply brand styles
- Creates optimized content for each platform

**Example:**

```bash
claude /create-content "Launching our API v2 with 10x better performance"

# Claude will:
# 1. Suggest platforms (Twitter, LinkedIn, Blog)
# 2. Offer to generate an image
# 3. Ask about brand styles
# 4. Create the post
# 5. Return post ID and previews
```

#### `/schedule-post`

Creates and schedules content for future publication.

**Usage:**

```bash
claude /schedule-post "Holiday sale announcement for Black Friday"
```

**What it does:**

- Everything `/create-content` does
- Plus: Asks for schedule date/time
- Suggests optimal posting times
- Converts to ISO 8601 format
- Schedules the post

**Example:**

```bash
claude /schedule-post "Team announcement about our new office"

# Claude will ask:
# - When to schedule? (suggests optimal times)
# - Your timezone
# - Target platforms
# - Enhancements wanted
```

#### `/view-brands`

Browse and explore your brand styles.

**Usage:**

```bash
claude /view-brands
```

**What it does:**

- Lists all your brand styles
- Shows brand style IDs (for use in other commands)
- Can display detailed info (colors, tone, imagery)
- Explains how to use brand styles

**Example Output:**

```
Your Brand Styles:

1. Corporate Professional
   ID: abc-123-def
   For formal business communications

2. Tech Innovation
   ID: tech-456-xyz
   For product launches and technical content

Which would you like to see details for?
```

#### `/manage-posts`

List, filter, and manage your posts.

**Usage:**

```bash
claude /manage-posts
```

**With filtering:**

```bash
claude /manage-posts status:scheduled
claude /manage-posts status:draft
```

**What it does:**

- Lists recent posts
- Shows status badges (draft/scheduled/published/archived)
- Displays platforms and dates
- Suggests actions (view, edit, reschedule)
- Supports pagination

**Example Output:**

```
Recent Posts:

📅 SCHEDULED - Product Launch
   ID: post-123
   Platforms: Twitter, LinkedIn
   Scheduled: Oct 15, 2025 at 10:00 AM

📝 DRAFT - Weekend Tips
   ID: post-456
   Platforms: Instagram
   Created: Oct 10, 2025

Showing 2 of 24 posts
```

#### `/preview-post`

Preview how content appears on each platform.

**Usage:**

```bash
claude /preview-post post-123
```

**What it does:**

- Shows platform-specific formatting
- Displays character counts
- Shows hashtag placement
- Indicates platform optimizations
- Allows comparison across platforms

### Specialized Agents

Agents are autonomous assistants with deep expertise in specific areas.

#### Content Creator Agent

**When to use:**

- Creating new content from scratch
- Need creative guidance
- Want platform-specific recommendations
- Unsure which platforms to target

**How to use:**

```bash
claude "Hey Content Creator, help me announce our partnership with XYZ company"
```

**What it provides:**

- Creative content ideas
- Platform recommendations
- Content length optimization
- Hashtag suggestions
- Best practices guidance
- Brand style application

#### Brand Manager Agent

**When to use:**

- Understanding your brand styles
- Ensuring brand consistency
- Choosing the right brand style
- Auditing content for brand alignment

**How to use:**

```bash
claude "Brand Manager, which brand style should I use for our holiday campaign?"
```

**What it provides:**

- Brand style explanations
- Usage recommendations
- Consistency audits
- Multi-brand management
- Visual identity guidance

#### Social Media Optimizer Agent

**When to use:**

- Maximizing reach and engagement
- Understanding platform algorithms
- Timing and scheduling strategy
- Creating A/B test variations

**How to use:**

```bash
claude "Social Media Optimizer, help me get maximum engagement on our product launch"
```

**What it provides:**

- Platform-specific optimization
- Timing recommendations
- Engagement strategies
- Hashtag research
- Performance insights
- Multi-platform strategies

## Advanced Usage

### Working with Brand Styles

1. **List your brand styles:**

```bash
claude /view-brands
```

2. **Get detailed information:**

```bash
claude /view-brands

# Then: "Show me details for Corporate Professional"
```

3. **Use in content creation:**

```bash
claude /create-content "Product update"

# When prompted: "Use brand style: abc-123-def"
```

### Multi-Platform Optimization

For maximum reach, target multiple platforms:

```bash
claude "Social Media Optimizer, create a product announcement for Twitter, LinkedIn, and Instagram with optimal timing for each"
```

The optimizer will:

- Create platform-specific versions
- Suggest best posting times per platform
- Optimize content length and format
- Recommend hashtag strategies

### Content Workflows

**Weekly Content Creation:**

```bash
# Monday: Plan content
claude "Content Creator, I need 5 post ideas for this week about AI development"

# Tuesday-Friday: Create scheduled posts
claude /schedule-post "Idea 1 content for Tuesday 10 AM"
claude /schedule-post "Idea 2 content for Wednesday 2 PM"

# Review scheduled content
claude /manage-posts status:scheduled
```

**Brand Campaign:**

```bash
# 1. Check brand consistency
claude "Brand Manager, audit my last 10 posts for brand consistency"

# 2. Create campaign content with brand style
claude /create-content "Campaign message" --brand-style campaign-xyz

# 3. Schedule campaign posts
claude /schedule-post "Campaign post 1 for launch date"
```

## MCP Tools Reference

The plugin uses these Thoth MCP tools behind the scenes:

| Tool | Description | Used By |
|------|-------------|---------|
| `create-post` | Create multi-platform post | All commands/agents |
| `get-post` | Retrieve post details | /preview-post, /manage-posts |
| `get-all-posts` | List posts with filtering | /manage-posts |
| `update-post` | Modify existing post | /manage-posts |
| `get-brand-styles` | List brand styles | /view-brands |
| `get-brand-style` | Get brand style details | /view-brands |

## Configuration

### Environment Variables

```bash
# Required
THOTH_API_KEY=your-api-key-here

# Optional
THOTH_BASE_URL=https://www.usethoth.com  # Default API URL
```

### Custom MCP Server Location

If you want to use a self-hosted or development Thoth MCP server:

1. Edit `.mcp.json` in the plugin directory:

```json
{
  "mcpServers": {
    "thoth": {
      "command": "node",
      "args": ["/path/to/local/thoth-mcp/dist/index.js", "--api-key", "${THOTH_API_KEY}"],
      "env": {
        "THOTH_API_KEY": "${THOTH_API_KEY}"
      }
    }
  }
}
```

2. Or use the HTTP endpoint:

```json
{
  "mcpServers": {
    "thoth": {
      "url": "https://your-thoth-server.com/mcp",
      "apiKey": "${THOTH_API_KEY}"
    }
  }
}
```

## Troubleshooting

### Plugin Not Found

```bash
# Verify plugin installation
claude plugin list

# Reinstall if needed
claude plugin install thoth
```

### API Key Issues

```bash
# Check environment variable is set
echo $THOTH_API_KEY

# Test API key with curl
curl -H "X-API-Key: $THOTH_API_KEY" https://www.usethoth.com/api/v1/brand-styles
```

### MCP Server Not Connecting

```bash
# Test MCP server directly
npx @usethoth/mcp-server --api-key YOUR_KEY

# Check logs
claude logs
```

### Commands Not Working

```bash
# Clear plugin cache
claude plugin clear-cache

# Reinstall plugin
claude plugin uninstall thoth
claude plugin install thoth
```

## Examples

### Example 1: Product Launch Campaign

```bash
# Step 1: Create launch announcement
claude /create-content "Excited to announce Product X - the fastest solution for Y problem"

# Step 2: Schedule follow-up content
claude /schedule-post "Product X feature spotlight for tomorrow 10 AM"

# Step 3: Preview before publishing
claude /preview-post post-abc-123

# Step 4: Manage campaign posts
claude /manage-posts
```

### Example 2: Brand Consistency Check

```bash
# Check available brand styles
claude /view-brands

# Get detailed brand guidelines
claude "Brand Manager, show me details for our Professional brand style"

# Audit recent posts
claude "Brand Manager, check if my last 5 posts match our Professional brand style"

# Create on-brand content
claude /create-content "Company update" --brand-style prof-123
```

### Example 3: Engagement Optimization

```bash
# Get optimization advice
claude "Social Media Optimizer, I want to maximize engagement for our webinar announcement"

# Create optimized content
claude /create-content "Join our webinar on AI-powered content creation"

# Schedule at optimal times
claude "When's the best time to post this for maximum engagement?"
```

## Support

- **Issues**: [GitHub Issues](https://github.com/perminder-klair/thoth-mcp/issues)
- **Documentation**: [Thoth Docs](https://www.usethoth.com/docs)
- **MCP Server**: [@usethoth/mcp-server](https://www.npmjs.com/package/@usethoth/mcp-server)

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see [LICENSE](../LICENSE) for details

## About Thoth

Thoth is an AI-powered content creation platform that helps teams create, optimize, and manage social media content across multiple platforms. Learn more at [usethoth.com](https://www.usethoth.com).

---

Made with ❤️ by the Thoth Team
