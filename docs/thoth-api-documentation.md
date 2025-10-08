# Thoth API Documentation

Complete reference for all Thoth API endpoints

## Authentication

All API requests must include your API key in the header:

```
X-API-Key: your_api_key_here
```

## Base URL

```
https://www.usethoth.com/api
```

## Endpoints

### POST /v1/posts

**Create Post**

Create enhanced content optimized for multiple social media platforms

#### Parameters

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| `content` | string | Yes | Original content to enhance and optimize | "Just launched our new Intelligent Content Creation tool!" |
| `platforms` | string[] | Yes | Array of platforms to optimize for | ["twitter","linkedin","instagram"] |
| `scheduleTime` | string | No | ISO 8601 datetime to schedule the post | "2024-01-15T10:00:00Z" |
| `createImage` | boolean | No | Generate AI images for the content | true |
| `length` | string | No | Content length preference | "medium" |
| `createHashtags` | boolean | No | Generate relevant hashtags | true |
| `postToSocialNetworks` | boolean | No | Automatically post to connected social accounts | false |

#### Example Request

```bash
curl -X POST https://www.usethoth.com/api/v1/posts \
  -H "X-API-Key: your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Just launched our new AI tool!",
    "platforms": ["twitter", "linkedin"],
    "createImage": true,
    "createHashtags": true,
    "length": "medium"
  }'
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "postId": "post_123abc",
    "originalContent": "Just launched our new AI tool!",
    "platformContents": {
      "twitter": {
        "content": "🚀 Just launched our new AI tool! ...",
        "hashtags": ["AI", "Launch", "Innovation"]
      }
    },
    "status": "draft"
  }
}
```

---

### GET /v1/posts/{postId}

**Get Post Details**

Retrieve details and status of a previously created post

#### Parameters

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| `postId` | string | Yes | Unique identifier of the post | "post_123abc" |

#### Example Request

```bash
curl -X GET https://www.usethoth.com/api/v1/posts/post_123abc \
  -H "X-API-Key: your_api_key"
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "postId": "post_123abc",
    "originalContent": "Just launched our new AI tool!",
    "status": "published",
    "publishedAt": "2024-01-15T10:00:15Z"
  }
}
```

---

### GET /v1/posts

**Get All Posts**

Retrieve all posts created by the authenticated user with optional filtering and pagination

#### Parameters

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| `page` | number | No | Page number for pagination | "1" |
| `limit` | number | No | Number of posts per page | "10" |
| `status` | string | No | Filter posts by status | "draft" |

#### Example Request

```bash
curl -X GET "https://www.usethoth.com/api/v1/posts?page=1&limit=10&status=draft" \
  -H "X-API-Key: your_api_key"
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "post_123abc",
        "title": "My First Post",
        "status": "draft",
        "createdAt": "2024-01-15T09:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25
    }
  }
}
```

---

### PUT /v1/posts/{postId}

**Update Post**

Update an existing post with new content, platforms, or status

#### Parameters

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| `postId` | string | Yes | Unique identifier of the post to update | "post_123abc" |
| `title` | string | No | Updated title for the post | "Updated Post Title" |
| `originalContent` | string | No | Updated original content | "This is the updated content for my post" |
| `platformContents` | array | No | Updated platform-specific content variations | - |
| `status` | string | No | Updated post status | "published" |

#### Example Request

```bash
curl -X PUT https://www.usethoth.com/api/v1/posts/post_123abc \
  -H "X-API-Key: your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Post Title",
    "status": "published"
  }'
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "post_123abc",
    "title": "Updated Post Title",
    "status": "published",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### GET /v1/brand-styles

**Get All Brand Styles**

Retrieve all brand styles created by the authenticated user

#### Parameters

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|

#### Example Request

```bash
curl -X GET https://www.usethoth.com/api/v1/brand-styles \
  -H "X-API-Key: your_api_key"
```

#### Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": "style_abc123",
      "name": "Default Style",
      "contentMode": "brand",
      "isDefault": "true",
      "createdAt": "2024-01-10T09:00:00Z"
    }
  ]
}
```

---

### GET /v1/brand-styles/{brandStyleId}

**Get Brand Style by ID**

Retrieve a specific brand style with full details including colors, tone, and imagery style

#### Parameters

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| `brandStyleId` | string | Yes | Unique identifier of the brand style | "style_abc123" |

#### Example Request

```bash
curl -X GET https://www.usethoth.com/api/v1/brand-styles/style_abc123 \
  -H "X-API-Key: your_api_key"
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "style_abc123",
    "name": "Default Style",
    "contentMode": "brand",
    "colors": {
      "primary1": "#4F46E5",
      "primary2": "#818CF8"
    },
    "tone": {
      "voice": "Professional and friendly",
      "style": "Informative"
    },
    "isDefault": "true"
  }
}
```

---

