# 零散记录所有的备忘录

## office KMS 激活 
* [GVLK密钥 官方文档 ]( https://learn.microsoft.com/en-us/deployoffice/vlactivation/gvlks)

### 错误代码
* `0xc004F074` > KMS 服务器不可用
* `0xc004e016` > 输入的密钥不正确 或 不适用于该版本
* `0xc004f050` > 密钥无效
### VL版本
* 确定你是不是批量版本 
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
* 设置`root` 密码
```bash
 sudo -i 
 passwd  # 设置Root密码
```
* 修改 SSH 配置
    修改ssh 配置文件 `/etc/ssh/sshd_comfig`
* 找到或添加这几行
```bash
PermitRootLogin no 修改为 PermitRootLogin yes
PasswordAuthentication no 修改为 PasswordAuthentication yes
```
* 重启SSH 服务
```bash
sudo systemctl restart sshd
```
--- 


## Markdown 语法速查
[Markdown 语法](https://markdown.com.cn/cheat-sheet.html)


---
##
