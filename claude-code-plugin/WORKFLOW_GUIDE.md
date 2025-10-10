# Supercharge Your Social Media Workflow with Thoth's Claude Code Plugin

> A complete guide to integrating AI-powered content creation into your daily workflow

**Reading time:** 15-20 minutes | **Skill level:** All levels welcome

---

## Introduction

If you're managing social media content, you know the drill: brainstorm ideas in Notion, draft content in Google Docs, switch to Thoth's web interface, copy-paste, schedule, repeat. By the end of the day, you've switched contexts dozens of times and your creative flow is in shambles.

**What if you could do all of this without leaving your terminal?**

That's exactly what the Thoth Claude Code plugin enables. It's not just about convenience—it's about maintaining flow state, working faster, and letting AI handle the heavy lifting while you focus on strategy and creativity.

### What is Claude Code?

Claude Code is Anthropic's official CLI tool that brings Claude's AI capabilities directly to your command line. Think of it as having an expert AI assistant that understands your codebase, tools, and workflows—and can actually execute tasks for you.

### Why This Matters for Content Creators

Traditional content creation workflows involve:

- 🔄 **Constant context switching** between tools
- 📝 **Manual copy-pasting** between platforms
- 🤔 **Remembering** brand guidelines and best practices
- ⏰ **Scheduling headaches** across time zones
- 🎨 **Inconsistent** brand voice across platforms

With the Thoth plugin, you get:

- ✨ **AI-powered content creation** right in your terminal
- 🚀 **Instant multi-platform optimization** with one command
- 🎯 **Brand consistency** automatically applied
- 📅 **Smart scheduling** with engagement optimization
- 🤖 **Expert AI agents** for creative guidance and strategy

### Who Is This For?

- **Social Media Managers** who juggle multiple platforms daily
- **Content Creators** who need to maintain brand consistency
- **Marketing Teams** coordinating campaigns across channels
- **Founders/Solopreneurs** wearing all the hats
- **Agency Teams** managing multiple client brands
- **Developer Relations** who live in the terminal anyway

If you create content regularly and want to work smarter (not harder), this guide is for you.

---

## Getting Started in 5 Minutes

Let's get you up and running with your first AI-generated post.

### Prerequisites Checklist

Before we begin, make sure you have:

- ✅ **Thoth account** ([sign up here](https://www.usethoth.com) if you don't have one)
- ✅ **Thoth API key** (get it from [Settings → API Keys](https://app.usethoth.com/settings/api-keys))
- ✅ **Claude Code CLI** installed
- ✅ **Terminal** you're comfortable with (Terminal, iTerm2, etc.)

### Installation (2 minutes)

```bash
# Step 1: Install the plugin
claude plugin install thoth

# Step 2: Set your API key
export THOTH_API_KEY="your-api-key-here"

# Add to your shell profile for persistence
echo 'export THOTH_API_KEY="your-api-key-here"' >> ~/.zshrc  # or ~/.bashrc
```

### Verify Installation (30 seconds)

```bash
# Check the plugin is installed
claude plugin list

# You should see:
# thoth - Social media content creation powered by Thoth
```

### Create Your First Post (2 minutes)

Let's create a simple announcement:

```bash
claude /create-content "We just launched our new feature that helps teams collaborate 10x faster"
```

**What happens next:**

Claude will conversationally ask you:

1. **Which platforms?** (Twitter, LinkedIn, Instagram, etc.)
2. **Generate an image?** (Yes/No)
3. **Include hashtags?** (Usually yes!)
4. **Content length?** (Short, medium, long)
5. **Apply brand style?** (If you have one set up)

Answer the questions, and within 30 seconds, you'll have:

- ✅ Platform-optimized content for each network
- ✅ Appropriate hashtags for each platform
- ✅ AI-generated image (if requested)
- ✅ A post ID to preview or schedule

**Example output:**

```
✅ Post Created Successfully!

Post ID: abc-123-def-456

📱 TWITTER (248 characters)
Big news! 🚀 We just launched a feature that helps teams collaborate 10x faster.

Say goodbye to endless email threads and hello to seamless teamwork.

Try it today → usethoth.com

#ProductLaunch #Collaboration #Productivity

💼 LINKEDIN (Professional tone, 1,240 characters)
I'm excited to share that we've just launched a groundbreaking feature designed
to revolutionize team collaboration.

[Full LinkedIn version with detailed benefits, call-to-action, and professional hashtags]

📅 Status: Draft
🎨 Image: https://img.usethoth.com/abc-123.png

Next steps:
- Preview: claude /preview-post abc-123-def-456
- Schedule: claude /schedule-post [specify time]
- Publish now: [Use Thoth dashboard]
```

**Congratulations!** You just created your first multi-platform post with AI in under 3 minutes. No web interface, no copy-pasting, no manual platform optimization.

Now let's see how to integrate this into real workflows.

---

## Daily Content Creator Workflow

This is your bread-and-butter, day-to-day content creation flow.

### Morning Routine (5 minutes)

Start your day by checking what's scheduled:

```bash
# See today's scheduled posts
claude /manage-posts status:scheduled

# Quick brand style check
claude /view-brands
```

**Why this matters:** You want to make sure everything queued up looks good and aligns with any last-minute business changes.

### Creating Daily Content (10-15 minutes)

You have a content idea. Let's turn it into posts:

**Option 1: Quick Command (When you know what you want)**

```bash
claude /create-content "5 productivity tips that actually work - no fluff"
```

**Option 2: Use the Content Creator Agent (When you need guidance)**

```bash
claude "Content Creator, I want to share productivity tips. Help me make this engaging for Twitter and LinkedIn."
```

The agent will:

- Ask clarifying questions about your audience
- Suggest optimal platforms
- Recommend content structure
- Guide you through creation
- Explain why certain choices work better

**Pro tip:** Use commands when you're executing. Use agents when you're strategizing.

### Example: Creating a How-To Post

```bash
claude "Content Creator, help me create a how-to post about setting up automated social media workflows"
```

**Agent conversation:**

```
Content Creator: Great topic! Let me help you create a comprehensive how-to post.
A few questions:

1. Who's your target audience? (Beginners, intermediate, advanced users?)
2. What's the main problem they're trying to solve?
3. Do you want to promote Thoth specifically, or keep it generic?

Based on how-to content performance, I recommend:
- LINKEDIN: Long-form with step-by-step breakdown (highest engagement for tutorials)
- TWITTER: Thread format with key steps (great for reach)
- BLOG: Comprehensive guide with screenshots (SEO value)

Should we proceed with these platforms?
```

You answer the questions, and the agent creates perfectly tailored content.

### Preview Before Scheduling

Always preview to see platform-specific formatting:

```bash
claude /preview-post post-abc-123

# See exactly how it looks on each platform
# Check character counts
# Verify hashtag placement
# Review image sizing
```

### End of Day: Tomorrow's Content (10 minutes)

Before you log off, schedule tomorrow's posts:

```bash
# Schedule morning post
claude /schedule-post "Your scheduled content for tomorrow 9 AM"

# When prompted for time:
# "Tomorrow at 9 AM EST"

# Schedule afternoon post
claude /schedule-post "Your scheduled content for tomorrow 2 PM"
```

**Daily workflow total time:** ~30-40 minutes for 2-3 high-quality, multi-platform posts.

Compare that to 2-3 hours doing it manually. That's your coffee break back, every single day.

---

## Weekly Content Planning Workflow

Most content teams plan weekly. Here's how to do it efficiently with the plugin.

### Monday: Content Planning Session (30 minutes)

**Step 1: Brainstorm with the Content Creator Agent**

```bash
claude "Content Creator, I need 5 content ideas for this week about AI automation in marketing. My audience is B2B marketing managers."
```

The agent will provide 5 thoughtfully crafted ideas with:

- Platform recommendations for each
- Suggested content angles
- Hook examples
- Best days/times to post

**Step 2: Create a Content Calendar**

Take the ideas and start creating drafts:

```bash
# Monday's post - Thought leadership
claude /create-content "Idea 1: Why AI automation isn't replacing marketers—it's empowering them"

# Tuesday's post - How-to
claude /create-content "Idea 2: 3-step framework for implementing AI in your marketing stack"

# Wednesday's post - Case study
claude /create-content "Idea 3: How Company X reduced content creation time by 60% with AI"

# Continue for the week...
```

**Pro tip:** Create all drafts on Monday, schedule them throughout the week.

### Tuesday-Thursday: Batch Content Creation (1 hour each day)

**Batching strategy:**

```bash
# Morning batch: Twitter threads
claude "Content Creator, turn these 3 topics into engaging Twitter threads"

# Afternoon batch: LinkedIn posts
claude "Content Creator, create professional LinkedIn posts from these same topics"

# End of day: Blog content
claude /create-content "Detailed blog post version of topic 1"
```

**Why batch?** You maintain creative flow and context. Switching between platforms in one session is more efficient than switching topics constantly.

### Friday: Review and Optimize

Check your week's performance and plan next week:

```bash
# Review what's scheduled
claude /manage-posts status:scheduled

# Check brand consistency
claude "Brand Manager, review my posts from this week for brand alignment"

# Get optimization insights
claude "Social Media Optimizer, based on my scheduled posts, when should I post each for maximum engagement?"
```

**Weekly workflow total time:** ~4-5 hours for 10-15 multi-platform posts.

That's creating content for 3+ platforms, 2-3 times per day, in less time than most teams spend on a single platform.

---

## Campaign Management Workflow

Campaigns require coordination, consistency, and timing. Here's how to nail it.

### Pre-Launch: Campaign Setup (Day 1)

**Step 1: Define Your Brand Style for the Campaign**

```bash
# Check existing brand styles
claude /view-brands

# Talk to Brand Manager about campaign-specific needs
claude "Brand Manager, I'm running a product launch campaign for 2 weeks. Should I create a special brand style or use our existing Professional style?"
```

The Brand Manager will advise based on:

- Campaign tone vs. regular content
- Duration and scope
- Platform mix
- Audience expectations

**Step 2: Create Campaign Content Hub**

```bash
# Master announcement post
claude "Content Creator, help me create a product launch announcement for Twitter, LinkedIn, Instagram, and our blog"

# Follow-up content series
claude "Content Creator, create a 5-post series highlighting different features of the product"

# User testimonials
claude /create-content "Customer success story: How [Customer] achieved [Result] with our new feature"
```

### Launch Day: Coordinated Multi-Platform Push

**Morning: Initial announcement (8 AM)**

```bash
# Create and immediately publish to all platforms
claude /create-content "We're live! Introducing [Product Name]..."

# When asked about scheduling:
# "Post now to all platforms"
```

**Midday: Feature spotlight (12 PM)**

```bash
# Detailed feature explanation
claude /schedule-post "Deep dive into Feature #1 - scheduled for 12 PM today"
```

**Afternoon: Social proof (3 PM)**

```bash
# Share early reactions
claude /schedule-post "The response has been incredible! Here's what early users are saying..."
```

**Evening: Call-to-action (6 PM)**

```bash
# Final push for day 1
claude /schedule-post "Last chance to get early access pricing. Link in bio!"
```

### Post-Launch: Sustained Momentum (Days 2-14)

**Daily rhythm:**

```bash
# Day 2-7: Feature highlights (one per day)
claude /schedule-post "Feature spotlight #2 for tomorrow 10 AM"

# Day 8-14: Case studies and testimonials
claude /schedule-post "Customer success story for next Monday 9 AM"
```

**Pro tip:** Use the Social Media Optimizer agent for timing:

```bash
claude "Social Media Optimizer, I have 10 campaign posts to schedule over 2 weeks for Twitter, LinkedIn, and Instagram. What's the optimal schedule for maximum reach?"
```

### Post-Campaign: Analysis & Audit

```bash
# Review all campaign posts
claude /manage-posts

# Brand consistency check
claude "Brand Manager, audit all posts from the [Product Launch] campaign for brand consistency"

# Get insights for next campaign
claude "Social Media Optimizer, based on this campaign's content, what worked well and what should we improve next time?"
```

**Campaign workflow result:** Coordinated, consistent, multi-platform campaign executed with minimal context switching and maximum creative flow.

---

## Team Collaboration Workflow

Multiple people creating content? Here's how to stay coordinated.

### Scenario: Content Team of 3

- **Sarah** (Content Creator) - Drafts posts
- **Mike** (Brand Manager) - Reviews for consistency
- **Lisa** (Social Media Manager) - Schedules and publishes

### Sarah's Workflow: Content Creation

```bash
# Morning: Check what needs to be created
claude /manage-posts status:draft

# Create drafts throughout the day
claude /create-content "Blog post promotion for tomorrow"
claude /create-content "Product update announcement"
claude /create-content "Industry trend commentary"

# Before handoff: Quick self-review
claude /preview-post post-123
```

**Handoff to Mike:**
Sarah shares post IDs via Slack: "Mike, please review posts post-123, post-456, post-789"

### Mike's Workflow: Brand Review

```bash
# Review each post
claude /preview-post post-123

# Use Brand Manager for consistency check
claude "Brand Manager, review post-123, post-456, post-789 for brand consistency with our Professional brand style"

# Agent provides detailed feedback:
# ✅ post-123: Perfectly aligned
# ⚠️ post-456: Tone slightly too casual, suggest revisions
# ✅ post-789: Good, minor hashtag adjustment recommended
```

If changes needed:

```bash
# Mike can directly update
claude /manage-posts

# Then search for post and use update-post tool
# Or send back to Sarah with feedback
```

**Handoff to Lisa:**
Mike approves: "Lisa, posts post-123 and post-789 are approved for scheduling"

### Lisa's Workflow: Scheduling Strategy

```bash
# Get optimization recommendations
claude "Social Media Optimizer, I need to schedule posts post-123 and post-789 this week for maximum engagement. Post-123 is a blog promotion (LinkedIn primary). Post-789 is a product update (Twitter + LinkedIn). What's the optimal schedule?"

# Agent suggests:
# post-123 (Blog promotion): Wednesday 8 AM LinkedIn, Thursday 10 AM Twitter
# post-789 (Product update): Tuesday 9 AM Twitter, Tuesday 11 AM LinkedIn

# Schedule accordingly
claude /schedule-post [specific details from agent recommendations]
```

### Team Communication Tips

**Use consistent post IDs in your team chat:**

```
Sarah: "Created post-abc-123 for tomorrow's launch"
Mike: "Reviewed post-abc-123, approved ✅"
Lisa: "Scheduled post-abc-123 for 9 AM launch time"
```

**Weekly team sync:**

```bash
# Everyone runs this Monday morning:
claude /manage-posts

# Discuss the week's content calendar
# Identify gaps and opportunities
# Assign creation tasks
```

---

## Real-World Use Case: SaaS Product Launch

Let's walk through a complete, real-world campaign from start to finish.

### Background

**Company:** CloudDev (fictional SaaS startup)
**Product:** New "Code Review AI" feature
**Goal:** 1,000 signups in launch week
**Platforms:** Twitter, LinkedIn, Blog
**Timeline:** 2-week campaign

### Week 1: Pre-Launch Buzz

**Monday: Teaser Campaign Begins**

```bash
claude "Content Creator, I'm launching a new AI-powered code review feature next Monday. Help me create a teaser campaign for this week to build anticipation on Twitter and LinkedIn."
```

**Agent creates:**

- Monday: "Something big is coming..." teaser
- Wednesday: Feature hint #1
- Friday: Feature hint #2

**Schedule them all:**

```bash
claude /schedule-post "Monday 9 AM: Teaser content"
claude /schedule-post "Wednesday 10 AM: Feature hint #1"
claude /schedule-post "Friday 11 AM: Feature hint #2"
```

**Tuesday-Thursday: Behind-the-Scenes Content**

```bash
claude /create-content "Behind the scenes: How we built our AI Code Review feature. Thread about the technical challenges and solutions."

# Specify: Twitter thread format, technical audience, hashtags: #DevTools #AI #CodeReview
```

### Week 2: Launch Week

**Launch Day (Monday):**

```bash
# 6 AM: Early access announcement for newsletter subscribers
claude /schedule-post "Early access is live for our subscribers! AI-powered code reviews are here."

# 9 AM: Full public announcement
claude "Content Creator, create our main launch announcement for Twitter (thread), LinkedIn (long-form), and Blog (comprehensive). Highlight the 3 main benefits: 50% faster reviews, catches 90% of bugs, learns your team's coding style."

# 12 PM: Founder's personal take
claude /schedule-post "From our founder: Why we built Code Review AI and what it means for developers"

# 3 PM: First user testimonials
claude /schedule-post "The response has been amazing! Here's what early users are saying..."

# 6 PM: Call-to-action
claude /schedule-post "2,000+ developers have signed up today. Join them and revolutionize your code reviews."
```

**Tuesday-Friday: Feature Deep Dives**

```bash
# Each day, deep dive into one feature
claude "Content Creator, create a detailed post about how Code Review AI learns your team's coding patterns. Make it technical but accessible. Twitter thread + LinkedIn post."

# Schedule for optimal times
claude "Social Media Optimizer, when should I post technical content about AI for a developer audience on Twitter and LinkedIn?"
```

**End of Week: Results**

```bash
# Review campaign performance
claude /manage-posts

# Get Brand Manager's assessment
claude "Brand Manager, review all posts from the Code Review AI launch campaign. Were we consistent? What worked well?"

# Optimize for next campaign
claude "Social Media Optimizer, based on the engagement patterns from this campaign, what should we do differently next time?"
```

### Results

- ✅ **1,247 signups** (24.7% over goal)
- ✅ **12 pieces of content** created in 3 hours (vs. usual 8+ hours)
- ✅ **100% brand consistency** (Brand Manager validated)
- ✅ **3x engagement** on optimized schedule (vs. previous campaigns)

**Key success factor:** The ability to maintain creative flow and execute rapidly without tool-switching enabled Sarah (content creator) to focus on messaging quality rather than logistics.

---

## Real-World Use Case: Thought Leadership Series

### Background

**Creator:** Alex, DevRel Engineer at an API company
**Goal:** Establish thought leadership in API design
**Format:** Weekly posts for 12 weeks
**Platforms:** Twitter, LinkedIn, Personal blog

### Week 1: Series Planning

```bash
claude "Content Creator, I want to create a 12-week thought leadership series about API design best practices. My audience is senior engineers and technical leads. Help me outline the series."
```

**Agent provides:**

- 12 weekly topics with progression (beginner to advanced concepts)
- Platform strategy for each topic
- Content angles that differentiate from existing content

### Batch Content Creation

Alex dedicates Monday mornings to creating 2-3 weeks of content:

```bash
# Week 1 topic: "RESTful APIs Are Dead. Here's What's Next"
claude "Content Creator, create a thought-provoking post challenging conventional wisdom about REST APIs for Twitter and LinkedIn. Include data/examples. Slightly contrarian tone to spark discussion."

# Week 2 topic: "The Hidden Costs of Poor API Design"
claude /create-content "Blog post: Calculate the real business cost of bad API design - include framework for measuring technical debt in APIs"

# Week 3 topic: "API Versioning Strategies That Actually Work"
claude /create-content "Practical guide to API versioning with real-world examples from companies like Stripe, Twilio, and GitHub"
```

### Maintaining Consistency Across 12 Weeks

**Brand style for the series:**

```bash
claude "Brand Manager, I'm creating a 12-week series on API design. My personal brand is: technical-but-accessible, data-driven, occasionally contrarian. Should I create a specific brand style for this series?"
```

**Brand Manager suggests:**

- Create "Alex - Thought Leadership" brand style
- Key elements: Professional but personal tone, always cite sources, include code examples, end with open questions

**Apply to all content:**

```bash
# When creating each post:
claude /create-content "Weekly post content" --brand-style alex-thought-leadership-123
```

### Cross-Promotion Strategy

```bash
# Each Monday: Long-form blog post
claude /create-content "Week 1 API series: Full blog post"

# Tuesday: Twitter thread summary
claude "Content Creator, convert my blog post post-abc-123 into an engaging Twitter thread. Keep the key insights but make it Twitter-native."

# Thursday: LinkedIn perspective
claude /create-content "Professional take on this week's API topic for LinkedIn audience"

# Friday: Engagement post
claude /create-content "Ask the audience: What's your experience with [this week's topic]? Generate discussion"
```

### Results After 12 Weeks

- ✅ **48 pieces of content** created in ~20 hours total (vs. 60+ hours traditional)
- ✅ **312% follower growth** on Twitter
- ✅ **5 conference talk invitations** from the series
- ✅ **Perfect brand consistency** across all content
- ✅ **Never missed a week** (pre-scheduling made it reliable)

**Key success factor:** Batch creation with the plugin allowed Alex to maintain consistent quality and voice while working full-time as a DevRel engineer.

---

## Power User Techniques

Once you're comfortable with basics, level up with these advanced techniques.

### 1. Command Chaining for Speed

Create multiple related posts in one session:

```bash
# Create main post
claude /create-content "Main announcement about feature X"

# Immediately create follow-ups referencing the first post
claude /create-content "Feature highlight #1 from our launch today"
claude /create-content "Feature highlight #2 - deep dive into specific benefit"
claude /create-content "Customer testimonial about feature X"

# Schedule them as a sequence
claude "Social Media Optimizer, I just created 4 related posts (post-1, post-2, post-3, post-4) for a product feature launch. Create an optimal 3-day posting schedule across Twitter and LinkedIn."
```

### 2. Agent Collaboration

Use multiple agents in sequence for comprehensive strategy:

```bash
# Step 1: Content Creator for ideation
claude "Content Creator, give me 5 angles for announcing our new pricing tier"

# Step 2: Brand Manager for alignment check
claude "Brand Manager, which of these 5 angles best fits our Professional brand style?"

# Step 3: Social Media Optimizer for execution
claude "Social Media Optimizer, take the recommended angle and create an optimized posting strategy for max conversions"

# Step 4: Create the actual content
claude /create-content [using insights from all three agents]
```

### 3. Brand Style Mastery

**Create situational brand styles:**

```bash
# Check current styles
claude /view-brands

# Discuss with Brand Manager
claude "Brand Manager, I have 3 types of content: 1) Product updates (professional), 2) Company culture (casual), 3) Thought leadership (authoritative). Should I create separate brand styles?"
```

**Use styles strategically:**

```bash
# Professional product update
claude /create-content "Q4 product roadmap" --brand-style professional-xyz

# Casual culture post
claude /create-content "Friday team fun" --brand-style casual-abc

# Authoritative thought leadership
claude /create-content "Industry trend analysis" --brand-style thought-leader-def
```

### 4. Content Repurposing

Turn one piece of content into 10:

```bash
# Start with long-form blog
claude /create-content "Comprehensive guide to API security - 2000 word blog post"

# Extract for Twitter thread
claude "Content Creator, turn blog post post-abc-123 into a Twitter thread hitting the key points"

# Create LinkedIn article
claude "Content Creator, adapt post-abc-123 for LinkedIn with a professional perspective"

# Pull quotes for Instagram
claude "Content Creator, extract 5 quote graphics from post-abc-123 for Instagram"

# Create FAQ post
claude "Content Creator, based on post-abc-123, create a FAQ post addressing common questions"

# Schedule strategically
claude "Social Media Optimizer, I have 1 blog post and 4 derivative pieces of content. Create a 2-week posting schedule that maximizes reach without cannibalizing engagement"
```

### 5. A/B Testing Strategy

Test different approaches:

```bash
# Create variant A
claude "Content Creator, create a product announcement with an emotional appeal angle for Twitter and LinkedIn"

# Create variant B
claude "Content Creator, create the same announcement with a data-driven, ROI-focused angle"

# Get expert analysis
claude "Social Media Optimizer, I have two variants of the same announcement (post-a and post-b). Based on current best practices, which approach is likely to perform better for a B2B SaaS audience?"

# Test and learn
# Schedule variant A for Week 1
# Schedule variant B for Week 2
# Compare engagement in Thoth dashboard
# Apply learnings to future content
```

### 6. Efficiency Shortcuts

**Create aliases for common commands:**

```bash
# Add to your ~/.zshrc or ~/.bashrc
alias tc='claude /create-content'
alias ts='claude /schedule-post'
alias tm='claude /manage-posts'
alias tp='claude /preview-post'
alias tb='claude /view-brands'

# Now you can:
tc "Your content here"  # Instead of claude /create-content
ts "Schedule this"       # Instead of claude /schedule-post
```

**Save common agent prompts:**

```bash
# Create a snippets file
echo 'Content Creator, create Twitter thread about [TOPIC]' > ~/thoth-snippets.txt
echo 'Brand Manager, review these posts for consistency' >> ~/thoth-snippets.txt
echo 'Social Media Optimizer, when should I post this?' >> ~/thoth-snippets.txt

# Use with cat and pipe
cat ~/thoth-snippets.txt | grep "Twitter" | xargs -I {} claude "{}"
```

---

## Best Practices & Pro Tips

### When to Use Commands vs. Agents

**Use Commands when:**

- ✅ You know exactly what you want to create
- ✅ You're executing a plan you've already made
- ✅ You're in "production mode" churning out content
- ✅ Speed is the priority

**Use Agents when:**

- ✅ You need strategic guidance
- ✅ You're brainstorming or planning
- ✅ You want expert input on timing, platforms, or angles
- ✅ You're learning or trying something new
- ✅ Quality and insight are the priority

**Pro tip:** Start each content session with an agent conversation, then switch to commands for execution.

### Content Organization

**Use consistent naming:**

```bash
# Bad (hard to track)
claude /create-content "New post"
claude /create-content "Another one"

# Good (easy to track)
claude /create-content "[PRODUCT-LAUNCH] Main announcement"
claude /create-content "[PRODUCT-LAUNCH] Feature #1 highlight"
claude /create-content "[BLOG-PROMO] New article about X"
```

**Tag in your content management system:**

- Use `[CAMPAIGN-NAME]` prefix in drafts
- Add dates for time-sensitive content: `[2025-10-15]`
- Include platform priority: `[TWITTER-PRIMARY]`

### Scheduling Strategies

**Work with your energy, not against it:**

```bash
# Monday morning (high energy): Create complex, strategic content
claude "Content Creator, help me craft thought leadership content about emerging trends"

# Tuesday-Thursday (execution mode): Batch create scheduled content
claude /create-content "Daily tip #1"
claude /create-content "Daily tip #2"
claude /create-content "Daily tip #3"

# Friday (reflection): Review and optimize
claude /manage-posts
claude "Brand Manager, audit this week's content"
```

**Always buffer your schedule:**

```bash
# Don't schedule day-of. Schedule 24-48 hours ahead:
claude /schedule-post "Tomorrow's content created today"

# Build a content buffer:
# Aim to have 3-5 days of content always scheduled
# This gives you flexibility for breaking news or time off
```

### Brand Consistency

**Set up brand style once, use it everywhere:**

```bash
# First time setup
claude /view-brands
claude "Brand Manager, help me understand my Professional brand style"

# From then on, always specify
claude /create-content "Post content" --brand-style professional-xyz
```

**Regular audits prevent drift:**

```bash
# Every Friday:
claude "Brand Manager, review all posts created this week for brand consistency"

# Monthly:
claude "Brand Manager, compare posts from this month vs. last month. Are we maintaining consistency or drifting?"
```

### Backup and Recovery

**Your content lives in Thoth's platform, not just locally:**

```bash
# Always verify posts are created:
claude /manage-posts

# Save important post IDs:
echo "Launch post: post-abc-123" >> ~/content-calendar.txt

# Review before major delete operations
```

**The plugin is stateless - all your content is safe in Thoth:**

- Uninstalling the plugin doesn't delete your content
- You can reinstall and access everything
- Web interface is always available as backup

---

## Common Pitfalls & How to Avoid Them

### Pitfall #1: Over-Scheduling Content

**The Problem:**
It's so easy to create content that you schedule 3 months ahead, then market conditions change and all your content is outdated.

**The Solution:**

```bash
# Don't schedule more than 2 weeks ahead for most content
# Exception: Evergreen content (tips, how-tos) can be scheduled further out

# Regular review:
claude /manage-posts status:scheduled

# Be ready to reschedule:
# If plans change, update scheduled posts rather than canceling them
```

### Pitfall #2: Ignoring Platform Differences

**The Problem:**
Assuming "multi-platform" means "exactly the same content" for each platform.

**The Solution:**

```bash
# Always preview platform-specific versions:
claude /preview-post post-123

# Let AI handle platform optimization:
# When creating, specify: "Optimize for each platform's best practices"

# Trust the Social Media Optimizer:
claude "Social Media Optimizer, should this content work equally well on Twitter and LinkedIn, or should I adjust the approach?"
```

### Pitfall #3: Not Leveraging Agents Enough

**The Problem:**
Using only commands and missing out on strategic insights from agents.

**The Solution:**

Set a weekly agent check-in:

```bash
# Monday planning:
claude "Content Creator, review my content calendar for the week ahead"

# Wednesday check-in:
claude "Social Media Optimizer, how's my posting timing this week? Any adjustments needed?"

# Friday review:
claude "Brand Manager, what patterns do you see in this week's content? Am I being too repetitive?"
```

### Pitfall #4: Inconsistent Brand Voice

**The Problem:**
Creating content in different moods/contexts leads to brand voice inconsistency.

**The Solution:**

```bash
# ALWAYS specify brand style:
claude /create-content "Your content" --brand-style your-style-123

# Regular consistency checks:
claude "Brand Manager, audit my last 10 posts for consistency"

# Create style guides for different scenarios:
# Morning posts: Energetic professional style
# Thought leadership: Authoritative expert style
# Company culture: Casual friendly style
```

### Pitfall #5: Creating Content in Isolation

**The Problem:**
Making content decisions without considering overall strategy or team input.

**The Solution:**

```bash
# Before creating anything new, consult agents:
claude "Social Media Optimizer, based on my recent posts, what content types are we missing?"

# Review what's already scheduled:
claude /manage-posts

# Consider the bigger picture:
claude "Content Creator, I'm planning to post about topic X. How does this fit with my recent content themes?"
```

### Pitfall #6: Not Tracking What Works

**The Problem:**
Creating content without learning from past performance.

**The Solution:**

While the plugin doesn't show analytics, establish a review rhythm:

```bash
# Weekly: Note what performed well
# Use Thoth dashboard for analytics
# Then ask:
claude "Social Media Optimizer, based on the fact that [specific post type] performed well last week, what should I create more of?"

# Monthly: Strategy refinement
claude "Content Creator, based on what I've told you about performance trends, how should I adjust my content strategy?"
```

---

## Advanced: Integrating with Other Tools

### Combining with Notion/Airtable

Keep your content calendar in Notion, execute in Claude Code:

```bash
# Morning routine:
# 1. Check Notion content calendar
# 2. Copy today's content ideas
# 3. Execute with Claude Code:

claude /create-content "Idea from Notion: [content here]"

# After creation:
# 4. Copy post ID back to Notion
# 5. Link: https://app.usethoth.com/posts/[post-id]
```

### Scripting Repetitive Tasks

Create bash scripts for common workflows:

```bash
# ~/create-daily-tip.sh
#!/bin/bash

echo "What's today's tip topic?"
read TOPIC

claude /create-content "Daily productivity tip: $TOPIC"

# Usage:
./create-daily-tip.sh
```

**More advanced: Weekly batch script**

```bash
# ~/weekly-batch.sh
#!/bin/bash

echo "Creating this week's content batch..."

# Monday
claude /schedule-post "Monday morning motivation - Monday 8 AM"

# Wednesday
claude /schedule-post "Mid-week tips - Wednesday 12 PM"

# Friday
claude /schedule-post "Friday wins - Friday 3 PM"

echo "✅ Week scheduled!"
```

### Integration with Screenshot Tools

Combine with tools like `flameshot` or `screencapture`:

```bash
# Take screenshot
screencapture -i ~/screenshot.png

# Upload to your image host (varies by platform)
# Get URL

# Create post with image
claude /create-content "Check out this new feature" --image-url https://yourhost.com/screenshot.png
```

---

## Troubleshooting FAQ

### Q: "Plugin command not found"

**Solution:**

```bash
# Verify installation
claude plugin list

# If not listed, reinstall:
claude plugin install thoth

# Verify API key is set:
echo $THOTH_API_KEY
```

### Q: "API key invalid" error

**Solution:**

```bash
# Regenerate API key in Thoth dashboard:
# https://app.usethoth.com/settings/api-keys

# Update your environment:
export THOTH_API_KEY="new-key-here"

# Add to shell profile:
echo 'export THOTH_API_KEY="new-key"' >> ~/.zshrc

# Reload shell:
source ~/.zshrc
```

### Q: Content not matching my brand

**Solution:**

```bash
# Check available brand styles:
claude /view-brands

# View specific style details:
claude "Brand Manager, show me full details for [style name]"

# Always specify brand style when creating:
claude /create-content "Your content" --brand-style style-id-123
```

### Q: Can't find my post ID

**Solution:**

```bash
# List all recent posts:
claude /manage-posts

# Filter by status:
claude /manage-posts status:draft    # Drafts only
claude /manage-posts status:scheduled # Scheduled only

# Search in your terminal history:
# Press Ctrl+R and search for keywords from your post
```

### Q: Agent not responding as expected

**Solution:**

Be more specific in your request:

```bash
# Too vague:
claude "help me with content"

# Better:
claude "Content Creator, I need a Twitter thread about API design best practices for senior engineers. Technical but accessible tone."

# Best:
claude "Content Creator, create a 10-tweet thread about API versioning strategies. Audience: technical leads at B2B SaaS companies. Include code examples. Reference Stripe and Twilio as examples. Slightly contrarian take on semantic versioning."
```

### Q: Scheduled post didn't publish

**Check these:**

```bash
# 1. Verify post was actually scheduled:
claude /manage-posts status:scheduled

# 2. Check the schedule time is correct:
claude /preview-post post-id-123

# 3. Verify in Thoth web dashboard:
# https://app.usethoth.com/posts

# 4. Check if social accounts are connected:
# https://app.usethoth.com/settings/integrations
```

### Q: How do I delete a post?

**Solution:**

```bash
# Posts can be archived via the web interface
# Or update to archived status:
claude /manage-posts

# Then use update-post tool through the interface to archive
```

### Q: Plugin slowing down my terminal

**Solution:**

```bash
# Clear plugin cache:
claude plugin clear-cache

# Check for updates:
claude plugin update thoth

# Verify only needed plugins are installed:
claude plugin list
```

### Q: Want to use with team - how to share API key?

**Best practice:**

- ❌ **Don't** share personal API keys
- ✅ **Do** create team API keys in Thoth dashboard
- ✅ **Do** use environment variables, not hardcoded keys
- ✅ **Do** rotate keys quarterly for security

```bash
# Each team member:
export THOTH_API_KEY="team-key-here"

# For agencies: Create separate keys per client
export THOTH_CLIENT_A="client-a-key"
export THOTH_CLIENT_B="client-b-key"

# Switch between clients:
export THOTH_API_KEY=$THOTH_CLIENT_A  # Work on Client A
export THOTH_API_KEY=$THOTH_CLIENT_B  # Switch to Client B
```

### Q: Can I use this in CI/CD?

**Yes!** Advanced use case:

```bash
# In your GitHub Actions workflow:
- name: Create release announcement
  env:
    THOTH_API_KEY: ${{ secrets.THOTH_API_KEY }}
  run: |
    claude /create-content "Just released version ${{ github.ref_name }}"
    claude /schedule-post "Release notes for launch day"
```

---

## Next Steps

Congratulations! You now have a comprehensive understanding of how to integrate the Thoth Claude Code plugin into your workflows.

### Immediate Action Items

**This week:**

1. ✅ Install the plugin and create your first post
2. ✅ Have a conversation with each of the 3 agents
3. ✅ Create a simple weekly content batch

**This month:**

1. ✅ Set up brand styles properly
2. ✅ Establish your personal workflow (daily/weekly rhythm)
3. ✅ Run a small campaign end-to-end with the plugin

**This quarter:**

1. ✅ Optimize your workflow based on what works
2. ✅ Train team members if applicable
3. ✅ Measure time saved and quality improvements

### Learning Resources

- **Plugin Documentation:** [claude-code-plugin/README.md](./README.md)
- **MCP Server Docs:** [Main README.md](../README.md)
- **Thoth Platform Docs:** [docs.usethoth.com](https://docs.usethoth.com)
- **Claude Code Docs:** [docs.claude.com/claude-code](https://docs.claude.com/claude-code)

### Join the Community

- **GitHub Issues:** Report bugs or request features at [github.com/perminder-klair/thoth-mcp/issues](https://github.com/perminder-klair/thoth-mcp/issues)
- **Discussions:** Share workflows and tips
- **Twitter:** Follow [@usethoth](https://twitter.com/usethoth) for updates

### Share Your Workflows

We'd love to hear how you're using the plugin! Share your workflows, tips, and success stories:

- Submit workflow examples via PR to this repo
- Share screenshots and tips on social media
- Write about your experience (we'll feature the best ones!)

---

## Conclusion

The Thoth Claude Code plugin isn't just a productivity tool—it's a fundamental shift in how you approach content creation.

**Before:** Context switching, manual optimization, inconsistent brand voice, hours of work.

**After:** Flow state, AI-powered optimization, automatic brand consistency, minutes of work.

The teams and creators who adopt this workflow first will have a significant competitive advantage. Not just in speed, but in quality and consistency.

Your audience deserves content that's thoughtfully crafted, platform-optimized, and brand-consistent. The plugin makes this possible without burning out your team.

**Now go create something amazing.** 🚀

---

*Last updated: October 10, 2025*
*Questions? Issues? → [github.com/perminder-klair/thoth-mcp/issues](https://github.com/perminder-klair/thoth-mcp/issues)*

**Made with ❤️ by the Thoth Team**
