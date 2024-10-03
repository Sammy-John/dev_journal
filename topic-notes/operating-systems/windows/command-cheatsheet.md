---
layout: cheatsheet-layout
title: Windows Command Prompt Cheatsheet
---

# Windows Command Prompt Cheatsheet

## Quick Overview
This cheatsheet covers the essential Windows Command Prompt commands for navigating the file system, managing files, and networking.

## File and Directory Navigation

| Command                      | Description                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| `dir`                        | Lists all files and folders in the current directory.             |
| `cd [directory]`             | Changes the current directory to the specified one.               |
| `cd..`                       | Moves one level up in the directory structure.                    |
| `md [folder]` or `mkdir`      | Creates a new directory.                                         |
| `rd [folder]` or `rmdir`      | Deletes a directory (must be empty).                             |
| `tree`                       | Displays directory structure in a tree format.                   |

## File Management

| Command                      | Description                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| `copy [source] [destination]` | Copies files from one location to another.                       |
| `move [source] [destination]` | Moves files from one location to another.                        |
| `del [file]`                  | Deletes a specified file.                                        |
| `ren [oldname] [newname]`     | Renames a file.                                                  |
| `attrib`                      | Displays or changes file attributes.                            |

## Networking Commands

| Command                      | Description                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| `ipconfig`                   | Displays the network configuration of your machine.              |
| `ping [address]`             | Sends ICMP echo requests to check network connectivity.           |
| `tracert [address]`          | Traces the route to a remote server.                             |
| `netstat`                    | Displays active TCP/IP connections and ports.                    |
| `nslookup [domain]`          | Looks up the IP address of a domain.                             |

## System Information and Task Management

| Command                      | Description                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| `systeminfo`                 | Displays detailed system information.                            |
| `tasklist`                   | Lists running processes on the system.                           |
| `taskkill /pid [id]`         | Terminates a process by its process ID.                          |

## Disk and Drive Commands

| Command                      | Description                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| `chkdsk`                     | Checks the disk for errors.                                      |
| `diskpart`                   | Opens the disk partitioning tool.                                |
| `format [drive:]`            | Formats a specified drive.                                       |
| `label [drive:] [label]`     | Changes the label of a drive.                                    |

## Useful Tips
- Use `cls` to clear the Command Prompt screen.
- Use `help [command]` for detailed help on any command.
- Use the arrow keys to quickly recall previously executed commands.

## Further Reading
- [Microsoft's Command Line Documentation](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands)
