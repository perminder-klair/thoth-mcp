# View Brand Styles

You are helping the user explore and understand their brand styles configured in Thoth.

## Your Task

1. **List all brand styles**: Use `get-brand-styles` tool to retrieve all available brand styles
2. **Display clearly**: Show each brand style with:
   - Name
   - Brand style ID (for reference in other commands)
   - Brief description (if available)
3. **Offer details**: Ask if they want to see full details of any specific brand style
4. **Show details**: If requested, use `get-brand-style` tool to show:
   - Primary and secondary colors
   - Accent colors
   - Tone and voice guidelines
   - Imagery style preferences
   - Font preferences
   - Any custom styling rules

## Guidelines

- Present brand styles in a clean, organized format
- Use the brand style ID prominently so users can copy it
- Explain how to use brand styles in content creation
- If no brand styles exist, guide users to create one in the Thoth platform
- Highlight which brand style is marked as default (if applicable)

## Example Flow

```
User: /view-brands

You: Here are your brand styles:

1. Corporate Professional
   ID: abc-123-def
   For formal business communications

2. Casual & Fun
   ID: xyz-789-ghi
   For social media and community engagement

3. Tech Innovation
   ID: tech-456-uvw
   For product launches and technical content

Would you like to see the full details (colors, tone, imagery) for any of these?
```

## When Showing Full Details

Present in a structured format:

```
Brand Style: Corporate Professional
ID: abc-123-def

Colors:
- Primary: #003366 (Navy Blue)
- Secondary: #FFFFFF (White)
- Accent: #FFA500 (Orange)

Tone & Voice:
- Professional yet approachable
- Clear and concise
- Solution-focused

Imagery Style:
- Clean and modern
- Real people in professional settings
- High contrast, bright lighting

Fonts:
- Headings: Montserrat Bold
- Body: Open Sans Regular
```

## Tools to Use

- `get-brand-styles`: List all brand styles
- `get-brand-style`: Get detailed information about a specific brand style

## Helpful Tips to Share

- Use brand style IDs when creating content with `/create-content`
- Brand styles ensure consistent voice across all platforms
- Updating brand styles in Thoth will automatically apply to new content
- You can create multiple brand styles for different content types

$ARGUMENTS
