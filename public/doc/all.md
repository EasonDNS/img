# 零散记录所有的备忘录

## office KMS 激活

- [GVLK密钥 官方文档 ](https://learn.microsoft.com/en-us/deployoffice/vlactivation/gvlks)

### 错误代码

- `0xc004F074` > KMS 服务器不可用
- `0xc004e016` > 输入的密钥不正确 或 不适用于该版本
- `0xc004f050` > 密钥无效

### VL版本

- 确定你是不是批量版本

```cmd
 cscript "C:\Program Files\Microsoft Office\Office16\ospp.vbs" /dstatus
```

    > 路径中的 Office16 可能是 Office15 或 Office17，取决于你的 Office 安装版本。

### 一键激活脚本 --> office LTSC 2024 Rro Plus

```bat
@echo off
cd /d "C:\Program Files\Microsoft Office\Office16"
cscript ospp.vbs /inpkey:XGVPP-NMH47-7TTHJ-W3FW7-8HV2C
cscript ospp.vbs /sethst:kms.loli.beer
cscript ospp.vbs /act
pause

```

### 验证是否激活成功

```cmd
cscript "C:\Program Files\Microsoft Office\Office16\ospp.vbs" /dstatus

```

你会看到一段内容包含:

```yaml
License Name: Office 24ProPlusVL_KMS_Client
License Status: LICENSED
```

说明已经激活成功

---

## 在使用Linux 的 `ls` 时没有颜色

### 检查Shell 配置

```bash
alias ls
#  如果 显示 `alias ls = `ls --color=auto``  表示alias 生效
```

如果没有 需要在`~/.bashrc` 或 `~/.ash_profile`添加:

```bash
# 彩色 ls
if [ -x /usr/bin/dircolors ]; then
    eval "$(dircolors -b)"
    alias ls='ls --color=auto'
fi
```

然后执行

```bash
source ~/.bashrc
```

---

## GCP 配置 `root` 登陆

- 设置`root` 密码

```bash
 sudo -i
 passwd  # 设置Root密码
```

- 修改 SSH 配置
  修改ssh 配置文件 `/etc/ssh/sshd_comfig`
- 找到或添加这几行

```bash
PermitRootLogin no 修改为 PermitRootLogin yes
PasswordAuthentication no 修改为 PasswordAuthentication yes
```

- 重启SSH 服务

```bash
sudo systemctl restart sshd
```

---

## Markdown 语法速查

[Markdown 语法](https://markdown.com.cn/cheat-sheet.html)

---

##

---

## GCP 安装MariaDB 及配置

1,更新软件包及包列表

```bash
sudo apt update && sudo apt upgrade -y
```

2,安装MariaDB

```bash
sudo apt install mariadb-server -y
```

3,运行安全脚本

```bash
sudo mysql_secure_installation
```

> ps :这是非常重要的一步。它会引导您设置 root 密码、删除匿名用户、禁止 root 远程登录等，以增强数据库的安全性。

- 执行这一步之后 每个选项详解

### `mysql_secure_installation` 步骤详解

| 步骤  | 脚本提示 (Script Prompt)                            | 解释 (Explanation)                                                                                                                                                                 | 推荐操作                               |
| :---- | :-------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------- |
| **1** | `Enter current password for root (enter for none):` | 脚本需要以 root 用户的身份登录数据库，才能进行安全设置。如果是全新安装，root 用户默认没有密码，所以直接按回车键即可。                                                              | **按 Enter**                           |
| **2** | `Switch to unix_socket authentication [Y/n]`        | 这是一种身份验证插件，它允许您在服务器上使用 `sudo mysql` 直接登录数据库，而无需输入密码。它将数据库的 root 权限与操作系统的 root 用户绑定，被认为是更现代、更安全方便的管理方式。 | **Y (是)**                             |
| **3** | `Change the root password? [Y/n]`                   | 即使您开启了 unix_socket，为 root 用户设置一个密码仍然是一个好习惯。这个密码将用于不通过 unix_socket 的连接方式（例如，如果您之后配置了远程TCP/IP连接）。                          | **Y (是)**，然后输入一个强度高的密码。 |
| **4** | `Remove anonymous users? [Y/n]`                     | 默认安装会创建一个“匿名用户”，允许任何人连接到数据库，这主要用于测试目的。在生产环境中，这是一个巨大的安全漏洞。                                                                   | **Y (是)**，必须移除。                 |
| **5** | `Disallow root login remotely? [Y/n]`               | **这是最关键的安全步骤之一**。它会限制 `root` 用户只能从 `localhost` (即数据库所在的服务器本机) 登录。这可以防止攻击者从网络上尝试暴力破解您的 root 密码。                         | **Y (是)**，强烈建议禁止。             |
| **6** | `Remove test database and access to it? [Y/n]`      | 默认安装会包含一个名为 `test` 的数据库，并且所有人都可以访问它。这个数据库在生产环境中没有任何用处，应该被删除。                                                                   | **Y (是)**                             |
| **7** | `Reload privilege tables now? [Y/n]`                | 在完成了以上所有用户的创建/删除和权限的修改后，需要重新加载授权表 (privilege tables)，让所有设置立即生效，而无需重启整个数据库服务。                                               | **Y (是)**                             |

4,登录到mariaDB 创建用户并授权远程登录

### 为本地应用创建数据库和用户

| 步骤           | SQL 命令 (在 MariaDB 提示符下执行)                                          | 描述                                            |
| :------------- | :-------------------------------------------------------------------------- | :---------------------------------------------- |
| **创建数据库** | `CREATE DATABASE your_database;`                                            | 为您的应用程序创建一个新的数据库。              |
| **创建用户**   | `CREATE USER 'your_user'@'localhost' IDENTIFIED BY 'your_strong_password';` | 创建一个只能从本机 (`localhost`) 连接的新用户。 |
| **授予权限**   | `GRANT ALL PRIVILEGES ON your_database.* TO 'your_user'@'localhost';`       | 将新数据库的所有权限授予这个新用户。            |
| **刷新权限**   | `FLUSH PRIVILEGES;`                                                         | 使所有更改立即生效。                            |
| **退出**       | `EXIT;`                                                                     | 退出 MariaDB 命令行。                           |

举例:

```sql
CREATE USER 'jxls@%' IDENTIFIED BY '@SinaCom312';
GRANT ALL PRIVILEGES ON image.* TO 'jxls@/%';
# 这行就是授予用户jxls@/%  对 image 这个数据库的全能权限

```

- 远程连接 需要两步
  - 查看是否在GCP上开启了防火墙 3306 端口
  - 修改MariaDB 配置以监听 外部连接
  ```bash
  sudo vim  /etc/mysql/mariadb.conf.d/50-server.cnf
  ```

  - 找到 `bind-address = 127.0.0.1` 修改为 `bind-address = 0.0.0.0` 保存退出
  - 重启MariaDB 服务 `sudo systemctl restart mariadb`
  - 刷新权限 `flush privieges;`

5, 创建的用户 允许它有 建库 的权限

```sql
GRANT CREATE ON *.* TO 'jxls'@'%';
# 它授予 jxls 用户创建新数据库的权限
  FLUSH PRIVILEGES;
# 刷新权限

```

到这里基本就差不多了.就可以用datagrip连接数据库了.

---
