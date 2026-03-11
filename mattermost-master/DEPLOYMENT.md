# Mattermost 源码部署文档

## 部署概览

- **部署时间**: 2026-03-08
- **部署方式**: 源码编译部署
- **安装目录**: `/Users/imac/midCreate/mattermost/mattermost-master/mattermost-master`
- **访问地址**: http://localhost:8065

## 环境信息

### 基础环境

| 组件 | 版本 | 说明 |
|------|------|------|
| Go | 1.25.7 | 服务器后端 |
| Node.js | 24.11.1 | Web 前端 |
| PostgreSQL | 14.22 | 数据库 |
| Docker | 29.2.1 | 本地开发未使用 |

### 软件版本

- **Mattermost Server**: master 分支 (开发版)
- **Node.js 要求**: 24.11 (见 .nvmrc)
- **Go 版本要求**: 1.21+

## 数据库配置

### PostgreSQL 配置

```bash
# 数据库名: mattermost_test
# 用户名: mmuser
# 密码: mostest
# 端口: 5432 (默认)
```

**创建数据库命令**:
```sql
CREATE USER mmuser WITH PASSWORD 'mostest' CREATEDB;
CREATE DATABASE mattermost_test OWNER mmuser;
GRANT ALL PRIVILEGES ON DATABASE mattermost_test TO mmuser;
```

## 关键配置文件

### 1. 服务器配置

文件: `server/config.override.mk`

```makefile
MM_NO_DOCKER=true
```

### 2. 目录结构

```
mattermost-master/mattermost-master/
├── server/           # Go 后端代码
│   ├── cmd/          # 命令行工具
│   ├── config.override.mk  # 本地配置
│   └── bin/          # 编译输出
├── webapp/           # React 前端
│   ├── channels/     # 主前端应用
│   └── node_modules/
├── client/           # 编译后的静态文件 (软链接)
├── api/              # API 定义
└── e2e-tests/        # 端到端测试
```

## 服务启动命令

### 启动服务器 (后台)

```bash
cd /Users/imac/midCreate/mattermost/mattermost-master/mattermost-master/server
make run-server
```

### 启动 Web 前端

```bash
cd /Users/imac/midCreate/mattermost/mattermost-master/mattermost-master/webapp
make run
```

### 停止服务器

```bash
cd /Users/imac/midCreate/mattermost/mattermost-master/mattermost-master/server
make stop-server
```

## 管理员账号

| 属性 | 值 |
|------|------|
| 用户名 | admin |
| 邮箱 | admin@mattermost.local |
| 密码 | Admin@123 |
| 权限 | 系统管理员 |

### 创建管理员命令

```bash
cd server
bin/mmctl user create --local --email admin@mattermost.local --username admin --password Admin@123 --system-admin
```

## API 验证

```bash
curl http://localhost:8065/api/v4/system/ping
```

返回示例:
```json
{"ActiveSearchBackend":"database","status":"OK"}
```

## 已知问题

1. **Docker 镜像拉取失败**: 本地网络无法访问 Docker Hub，使用 `MM_NO_DOCKER=true` 绕过
2. **Git 仓库警告**: 服务启动时会提示 "不是 git 仓库"，不影响运行

## 后续操作

1. 访问 http://localhost:8065 使用 admin/Admin@123 登录
2. 在系统控制台配置邮件服务 (可选)
3. 安装 Mattermost Calls 插件 (如需要视频通话功能)

---

## 中文界面设置

Mattermost 支持中文界面，登录后可按以下步骤设置：

1. 点击左上角头像 → **设置 (Settings)**
2. 点击 **显示 (Display)**
3. 在 **语言 (Language)** 下拉菜单中选择 **简体中文**
4. 点击 **保存 (Save)**

---

## 创建频道

### 方法一：通过界面创建

1. 登录后在左侧点击 **+** 号
2. 选择 **创建新频道 (Create New Channel)**
3. 填写以下信息：
   - **频道名称**: 填写英文名称（如 `my-channel`）
   - **显示名称**: 填写中文名称（如 "我的频道"）
   - **描述**: 填写频道描述（可选）
4. 选择频道类型：
   - **公开 (Public)**: 所有人可见
   - **私有 (Private)**: 仅成员可见
5. 点击 **创建频道 (Create Channel)**

### 方法二：通过命令行创建

```bash
cd /Users/imac/midCreate/mattermost/mattermost-master/mattermost-master/server

# 创建公开频道
bin/mmctl channel create --team myteam --name mychannel --display-name "我的频道" --private false

# 创建私有频道
bin/mmctl channel create --team myteam --name mychannel --display-name "我的私有频道" --private true
```

### 方法三：通过 API 创建

```bash
# 先登录获取 Token
TOKEN=$(curl -s -X POST 'http://localhost:8065/api/v4/users/login' \
  -H 'Content-Type: application/json' \
  -d '{"login_id":"admin","password":"Admin@123"}' | jq -r '.token')

# 创建频道
curl -X POST 'http://localhost:8065/api/v4/channels' \
  -H "Authorization: $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "my-channel",
    "display_name": "我的频道",
    "type": "O"
  }'
```

---

## 创建机器人

### 前提条件

首次创建机器人前，需要在系统控制台启用机器人账户功能：

1. 点击左上角头像 → **系统控制台 (System Console)**
2. 找到 **集成功能 (Integrations)** → **Bot 账户 (Bot Accounts)**
3. 启用 **启用 Bot 账户创建 (Enable Bot Account Creation)**
4. 点击 **保存 (Save)**

### 方法一：通过界面创建

1. 进入 **系统控制台 (System Console)**
2. 找到 **集成功能 (Integrations)** → **Bot 账户 (Bot Accounts)**
3. 点击 **添加 Bot 账户 (Add Bot Account)**
4. 填写以下信息：
   - **用户名**: 填写机器人用户名（如 `mybot`）
   - **显示名称**: 填写中文名称（如 "我的机器人"）
   - **描述**: 填写机器人描述
5. 设置权限：
   - **可以发布到所有频道**: 启用后机器人可以发送消息到任意频道
   - **可以发布到所有公开频道**: 仅限公开频道
6. 点击 **创建 Bot 账户 (Create Bot Account)**

### 方法二：通过命令行创建

```bash
cd /Users/imac/midCreate/mattermost/mattermost-master/mattermost-master/server

# 创建机器人
bin/mmctl bot create --local --username mybot --display-name "我的机器人" --description "测试机器人"

# 启用机器人
bin/mmctl bot enable --local mybot
```

### 方法三：通过 API 创建

```bash
# 先登录获取 Token
TOKEN=$(curl -s -X POST 'http://localhost:8065/api/v4/users/login' \
  -H 'Content-Type: application/json' \
  -d '{"login_id":"admin","password":"Admin@123"}' | jq -r '.token')

# 创建机器人
curl -X POST 'http://localhost:8065/api/v4/bots' \
  -H "Authorization: $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "mybot",
    "display_name": "我的机器人",
    "description": "测试机器人"
  }'
```

### 使用机器人发送消息

1. 获取机器人 Access Token：
   - 在机器人的 **编辑 (Edit)** 页面生成 **Access Token**
   - 或者通过 API 创建时获取

2. 将机器人添加到频道：
   ```bash
   # 添加机器人到团队
   curl -X POST "http://localhost:8065/api/v4/teams/{team_id}/members" \
     -H "Authorization: $TOKEN" \
     -H 'Content-Type: application/json' \
     -d '{"user_id": "机器人用户ID"}'
   
   # 添加机器人到频道
   curl -X POST "http://localhost:8065/api/v4/channels/{channel_id}/members" \
     -H "Authorization: $TOKEN" \
     -H 'Content-Type: application/json' \
     -d '{"user_id": "机器人用户ID"}'
   ```

3. 使用机器人发送消息：
   ```bash
   # 使用机器人 Token 发送消息
   curl -X POST 'http://localhost:8065/api/v4/posts' \
     -H "Authorization: Bearer {机器人AccessToken}" \
     -H 'Content-Type: application/json' \
     -d '{
       "channel_id": "频道ID",
       "message": "你好！我是机器人。"
     }'
   ```
