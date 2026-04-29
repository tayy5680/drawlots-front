const os = require('os')
const { exec } = require('child_process')

const platform = os.platform()

// windows刪除不太一樣，其他幾乎可以使用這樣的方式做打包
const platformRemoveCommand = platform === 'darwin' ? 'rmdir /q /s dist' : 'rm -rf dist'
exec(`tar zcvf dist.tar.gz dist && ${platformRemoveCommand}`)
