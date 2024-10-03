---
layout: cheatsheet-layout
title: Linux Commands Cheatsheet
---

# Linux Commands Cheatsheet

## Quick Overview
This cheatsheet provides an essential guide to Linux commands for file management, process control, networking, and system administration.

## File and Directory Navigation

| Command                      | Description                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| `ls`                         | Lists all files and directories in the current directory.         |
| `cd [directory]`             | Changes the current directory.                                   |
| `pwd`                        | Prints the working directory.                                    |
| `mkdir [folder]`             | Creates a new directory.                                         |
| `rmdir [folder]`             | Removes an empty directory.                                      |
| `rm [file]`                  | Removes or deletes a file.                                       |
| `touch [file]`               | Creates an empty file or updates the timestamp of an existing file. |
| `cp [source] [destination]`   | Copies files from one place to another.                         |
| `mv [source] [destination]`   | Moves files or renames them.                                    |

## File Permissions and Ownership

| Command                      | Description                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| `chmod [permissions] [file]` | Changes the permissions of a file or directory.                  |
| `chown [owner] [file]`       | Changes the ownership of a file or directory.                    |
| `ls -l`                      | Lists files with detailed permissions.                           |
| `umask [value]`              | Sets default permissions for newly created files.                |

## Process and Task Management

| Command                      | Description                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| `ps`                         | Displays running processes.                                      |
| `top`                        | Displays real-time process activity.                             |
| `kill [pid]`                 | Terminates a process by its ID.                                  |
| `killall [name]`             | Terminates all processes by name.                                |
| `bg` and `fg`                | Resumes stopped jobs in background or foreground.                |

## Networking Commands

| Command                      | Description                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| `ifconfig`                   | Displays or configures network interfaces.                       |
| `ping [address]`             | Tests network connectivity to a host.                            |
| `netstat`                    | Shows active network connections.                                |
| `ssh [user@host]`            | Connects to a remote server using SSH.                           |
| `scp [file] [user@host:path]`| Copies files to/from a remote host.                              |

## System Information and Administration

| Command                      | Description                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| `df -h`                      | Displays disk space usage in human-readable format.              |
| `du -sh [directory]`         | Shows the size of a directory.                                   |
| `uname -a`                   | Displays detailed system information.                            |
| `whoami`                     | Shows the current logged-in user.                                |
| `sudo`                       | Executes a command as a superuser.                               |

## Useful Tips
- **Use `man [command]`** to access the manual page of any command.
- **Use `tab` for auto-completion** of file names and commands.
- **Press `Ctrl + C`** to cancel a running command.

## Further Reading
- [Linux Command Cheat Sheet](https://linuxcommand.org/)
