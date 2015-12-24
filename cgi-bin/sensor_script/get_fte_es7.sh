#!/bin/sh
# broadcast
#ping -c5 192.168.1.255 > /dev/null
#ping -c 5 -b 10.0.1.255 > /dev/null

# get IP
#ip=`sudo arp-scan -l | awk '/'$1'/ { print $1 }'`
#ip=`/www/cgi-bin/sensor_script/search_mac.sh $1`
#ip=`/home/kindmong/work/ftm_manager/cgi-bin/sensor_script/search_mac.sh $1`
echo $1

# search humidity
/home/kindmong/work/ftm_manager/cgi-bin/sensor_script/get_humidity_info.sh $1 | awk -f /home/kindmong/work/ftm_manager/cgi-bin/sensor_script/get_humidity_info.awk
/home/kindmong/work/ftm_manager/cgi-bin/sensor_script/get_temperature_info.sh $1 | awk -f /home/kindmong/work/ftm_manager/cgi-bin/sensor_script/get_temperature_info.awk
/home/kindmong/work/ftm_manager/cgi-bin/sensor_script/get_di_info.sh $1 | awk -f /home/kindmong/work/ftm_manager/cgi-bin/sensor_script/get_di_info.awk
