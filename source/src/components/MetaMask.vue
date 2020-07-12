<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ currentAccount }}, 你好！</h1>
    
    <h2>连接网络： <span>{{ network }}</span></h2>
    <h2>账户余额:  <span>{{ tokenCount }} ETH</span></h2>
    

      <el-button v-on:click="counter += 1,checkMetaMask()" type="primary" round>Web3浏览器检测</el-button>
      <el-button v-on:click="loginMetaMask()" type="warning" round>web3登录</el-button>
        <el-button v-on:click="getBalance()" type="warning" round>查询余额</el-button>
    <ul>
      <li><a href="https://metamask.io/" target="_blank" rel="noopener">MetaMask安装</a></li>
      <li><a href="#">检测次数 {{ counter }}</a></li>
      <li v-if="connect"><a href="#">已连接</a></li>
      <li v-else><a href="#" style="color:red;">未连接</a></li>
    </ul>
  </div>
</template>

<script>
import detectEthereumProvider from '@metamask/detect-provider';
export default {
  name: 'MetaMask',
  props: {
    msg: String
  },
  data: function(){
    return {
      counter: 0,
      connect: false,
      provider: null,
      currentAccount: "游客",
      network: "断开连接",
      tokenCount: 0
    }
  },
  created: function(){
  
  },
  mounted: function(){
      this.checkNetStatus()
  },
  methods: {
    // 检测浏览器是否安装 MetaMask
    checkMetaMask: function() {
      if (typeof window.ethereum !== 'undefined') {
         alert('MetaMask 已经安装!')
         console.log('MetaMask 已经安装!');
      }else{
         alert('未安装 MetaMask！')
      }
    },
    // 连接到MetaMask 网络
    loginMetaMask: async function() {
    
        const provider = await detectEthereumProvider();
     
        if (provider) {
            // 初始化 网站APP
             if (provider === window.ethereum) {
                await provider.request({ method: 'eth_requestAccounts' });
                this.connect = true
                 this.checkNetStatus()
                alert("连接成功！")
             }
           
        }else{
            console.log("请安装MetaMask！")
        }
    },
    // 当前账户被改变， 或者未连接， 判断连接账户数量
    handleAccountsChanged: function (accounts) {
        if (accounts.length === 0) {
          // MetaMask is locked or the user has not connected any accounts
          console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== this.currentAccount) {
          this.currentAccount = accounts[0];
          // Do any other work!
          console.log(this.currentAccount)
          this.connect = true
        }
    },
    // 检测当前连接网络，及连接状态
    checkNetStatus: async function() { 
        const provider = await detectEthereumProvider();
        provider.request({ method: 'eth_accounts' })
                .then(this.handleAccountsChanged) // 检测账户数量 
                .then(this.checkNetworkChain)     // 检测网络类型
                .catch((err) => {
                  console.error(err);
                }); 
    },
    // 检测网络类型
    checkNetworkChain: async function() {
      const provider = await detectEthereumProvider();
      let currentChainId = provider.chainId;

      if(currentChainId === "0x1"){
         this.network = "Ethereum 主网"
      }else if(currentChainId === "0x2"){
        this.network = "Expanse 测试网"
      }else if(currentChainId === "0x3"){
        this.network = "Ropsten 测试网"
      }else if(currentChainId === "0x4"){
        this.network = "Rinkeby 测试网"
      }else if(currentChainId === "0x5"){
        this.network = "Goerli 测试网"
      }else if(currentChainId === "0x2a"){
        this.network = "Kovan 测试网 "
      }else if(currentChainId === "0x1337"){
        this.network = "Geth private chains 私链网网"
      }else if(currentChainId === "undefined"){
        this.network = "未知"
      }
      provider.on('chainChanged', this.handleChainChanged);
    },
    // 网络切换
    handleChainChanged: function() {
       // 网络如果切换，应该重新加载页面，避免用户混淆
      window.location.reload();
    },
    // 查询余额
    getBalance: async function() { 
  

    // var data = { 
    //   "jsonrpc":"2.0",
    //   "method":"eth_getBalance",
    //   "params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],
    //   "id":1
    //   }
      const provider = await detectEthereumProvider();
      provider.request({ method: 'eth_getBalance',params: [this.currentAccount, "latest"] })
            .then(this.updateBalance) // 查询余额后更新状态
            .catch((err) => {
              console.error(err);
            }); 
    },
    // 更新余额
    updateBalance: function(data){
      // 返回值是 wei 单位的十六进制数， 需转换成 eth 单位的 十进制数便于查看
      this.tokenCount = (eval(data).toString(10)  / 10**18).toFixed(4)
      console.log(this.tokenCount)
    }
 
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
span {
  color: red;
}
</style>
