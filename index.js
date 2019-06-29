

const token = "YOUR_DISOCRD_TOKEN_HERE";


const Discord = require('discord.js');
const request = require('request');
const client = new Discord.Client();
const redirectregex = /content="0; url=(.*)"/;
const cuteregex = /class="single-cute-image" alt=".*" src="(.*)"\/>/;
function GetPage()
{
    return new Promise((resolve) =>{
        request("http://www.cutestpaw.com/random/", function(a,b, txt){
            m = redirectregex.exec(txt);
            newurl = m[1];
            request(newurl, function(a,b, txt){
                c = cuteregex.exec(txt);
                cuteurl = c[1];
                resolve(cuteurl);
            });
        });
    });
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '^^cute') {
    GetPage().then((urlc) => {
        console.log(urlc);
		msg.channel.send({
			embed: 
			{
				color: Math.floor(Math.random() * 16777214) + 1,
				image: 
				{
					url: urlc
				},
				footer:
				{
					"text": "John-Duckesent"
				},
				timestamp: new Date()
			}
		})
    });
  }
});

client.login(token);