#!/bin/sh
# get IP
ip=`/www/cgi-bin/sensor_script/search_mac.sh $1`
#ip=`/home/kindmong/work/ftm_manager/cgi-bin/sensor_script/search_mac.sh $1`
echo $1

# search humidity
/home/kindmong/work/ftm_manager/cgi-bin/sensor_script/get_di_info.sh $ip | awk -f /home/kindmong/work/ftm_manager/cgi-bin/sensor_script/get_di_info.awk
/home/kindmong/work/ftm_manager/cgi-bin/sensor_script/get_do_info.sh $ip | awk -f /home/kindmong/work/ftm_manager/cgi-bin/sensor_script/get_do_info.awk
