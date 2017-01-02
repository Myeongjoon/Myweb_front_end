kill $(ps ax | grep '[j]s' | awk '{ print $1 }')
sudo git pull; npm install;
rm nohup.out
nohup nodejs server.js --be_ip 10.140.0.2 --fe_ip 10.140.0.4 &
