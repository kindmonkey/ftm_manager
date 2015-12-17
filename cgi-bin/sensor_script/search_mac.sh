#!/bin/sh
# get /proc/net/arp -> ip
cat /proc/net/arp | awk '/'$1'/ && /0x2/ { print $1 }'
