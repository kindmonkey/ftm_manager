#!/bin/sh

current_time=`date +%s`
pre_time=`expr $current_time - 60`
#echo $pre_time, $current_time

sudo sqlite3 /opt/sensor.db<< EOF
select * from sensor_data where node_id='$1' and sensor_id='$2' and strftime('%s', sqlitetimestamp) between '$pre_time' AND '$current_time';
EOF