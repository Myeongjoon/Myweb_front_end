kill $(ps ax | grep '[j]s' | awk '{ print $1 }')
sudo git pull; npm install;
rm nohup.out
nohup node server.js --be_ip 104.199.189.198 --fe_ip localhost &
