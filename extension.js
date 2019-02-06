const vscode = require("vscode")
const fortunes = require("./fortunes.json")
const message_timeout = 10000

function get_random_int(min, max, exclude=undefined)
{
	let num = Math.floor(Math.random() * (max - min + 1) + min)

	if(exclude !== undefined)
	{
		if(num === exclude)
		{
			if(num + 1 <= max)
			{
				num = num + 1
			}

			else if(num - 1 >= min)
			{
				num = num - 1
			}
		}
	}

	return num
}

function activate(context) 
{
	let disposable = vscode.commands.registerCommand('extension.show_fortune', () => 
	{
		show_fortune()
	})

	context.subscriptions.push(disposable)

	show_fortune()
}

function show_fortune()
{
	let fortune = fortunes[get_random_int(0, fortunes.length)]
	vscode.window.setStatusBarMessage(fortune, message_timeout)
}

exports.activate = activate

function deactivate() {}

module.exports = 
{
	activate,
	deactivate
}
