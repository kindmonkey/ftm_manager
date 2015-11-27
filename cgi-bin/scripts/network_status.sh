#!/bin/sh

modem_state=`/www/cgi-bin/scripts/modem_state.sh`

a=`ls /dev/ttyACM0`
if [ -n "$a" ]
then
	`echo 'at$lgtlvloc?' > /dev/ttyACM0; sleep 0.1`
fi

file="/var/log/modem"
if [ -f $file ]
then
	raw=`cat /var/log/modem | sed /^$/d | awk '/at\\$lgtlvloc?/{ print NR }' | awk 'END { print }'`
	if [ -n "$raw" ]
	then
		next_raw=`expr $raw + 1`
		result=`cat /var/log/modem | sed /^$/d | sed -n "$next_raw"p | awk '{ split($0,arr,":"); printf("%s", arr[1]); }'`
		#echo $result
		if [ "$result" = "\$LGTLVLOC" ]
		then
			#cmd=`cat /var/log/modem | sed /^$/d | sed -n "$next_raw"p'`
			cmd=`cat /var/log/modem | sed /^$/d | sed -n "$next_raw"p | awk '{ split($0,arr,":"); printf("%s", arr[2]); }'`
			echo $cmd
		elif [ "$result" = "+CME" ]
		then
			cmd=`cat /var/log/modem | sed /^$/d | sed -n "$next_raw"p'`
			echo $cmd
		else 
			echo "URC MESSAGE"
		fi
	else
		echo done
	fi
else
	echo done
fi